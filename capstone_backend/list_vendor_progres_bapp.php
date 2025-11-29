<?php
// Untuk menekan error HTML jika ada kegagalan lain
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING); 
ini_set('display_errors', 'Off');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'config.php';

$vendor_id = $_GET["vendor_id"] ?? null;

if (!$vendor_id) {
    echo json_encode(["success" => true, "data" => [], "message" => "Vendor ID missing."]);
    exit;
}

try {
    // Jika ada masalah kolom, kita hilangkan catatan_direksi SEMENTARA UNTUK TESTING
    $stmt = $conn->prepare("
        SELECT 
            id, nomor, status, dibuat_pada, nama_pekerjaan, 'BAPP' as type 
            /* Kolom catatan_direksi DIHILANGKAN SEMENTARA */
        FROM bapp
        WHERE vendor_id = ?
        ORDER BY dibuat_pada DESC
    ");
    $stmt->bind_param("i", $vendor_id);
    
    if (!$stmt->execute()) {
        // Jika eksekusi gagal (misal: kolom yang di-SELECT masih salah)
        throw new Exception("SQL EXECUTION FAILED: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    $stmt->close();

    echo json_encode([
        "success" => true,
        "data" => $data
    ]);

} catch (Exception $e) {
    // Laporkan error fatal yang sebenarnya ke frontend
    echo json_encode(["success" => false, "message" => "FATAL CRASH in BAPP List: " . $e->getMessage()]);
    exit;
}
?>