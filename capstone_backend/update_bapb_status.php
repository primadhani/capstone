<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Menggunakan path yang diminta
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["id"]) || !isset($data["status"])) {
    echo json_encode(["success" => false, "message" => "ID dokumen dan status wajib diisi"]);
    exit;
}

$id = $data["id"];
$status = $data["status"]; 
$catatan = $data["catatan"] ?? null; // Menerima catatan dari frontend

if (!in_array($status, ['Approved', 'Rejected'])) {
    echo json_encode(["success" => false, "message" => "Status tidak valid."]);
    exit;
}

if ($status === 'Rejected') {
    // Jika ditolak, update status DAN catatan penolakan
    $stmt = $conn->prepare("
        UPDATE bapb SET status = ?, catatan_gudang = ? WHERE id = ?
    ");
    $stmt->bind_param("ssi", $status, $catatan, $id);
    $message = "Dokumen berhasil **ditolak**. Catatan telah disimpan.";
} else {
    // Jika disetujui, update status dan hapus catatan lama (jika ada)
    $stmt = $conn->prepare("
        UPDATE bapb SET status = ?, catatan_gudang = NULL WHERE id = ?
    ");
    $stmt->bind_param("si", $status, $id);
    $message = "Dokumen berhasil **disetujui**.";
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => $message]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal memperbarui status dokumen: " . $conn->error]);
}

$stmt->close();
?>