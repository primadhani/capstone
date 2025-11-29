<?php
// HARD-CODE DEBUGGING: Paksa matikan tampilan error HTML
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING); 
ini_set('display_errors', 'Off');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Menggunakan path yang Anda minta
include 'config.php';

$bapb_id = $_GET["id"] ?? null;

if (!$bapb_id) {
    // Memberikan respons JSON error yang dapat diolah oleh frontend
    echo json_encode(["success" => false, "message" => "ID dokumen wajib diisi."]);
    exit;
}

// Cek Koneksi Database
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Gagal terhubung ke database."]);
    exit;
}

try {
    // 1. Ambil Data Header BAPB
    $header_query = $conn->query("SELECT * FROM bapb WHERE id=$bapb_id");
    $header = $header_query->fetch_assoc();

    if (!$header) {
        echo json_encode(["success" => false, "message" => "Dokumen tidak ditemukan."]);
        exit;
    }

    // 2. Ambil Data Item BAPB
    $items = [];
    $item_result = $conn->query("SELECT * FROM bapb_items WHERE bapb_id=$bapb_id");
    while($row = $item_result->fetch_assoc()) {
        $items[] = $row;
    }

    // 3. Ambil Data File Pendukung BAPB (jika ada)
    $files = [];
    $file_result = $conn->query("SELECT file_path FROM bapb_files WHERE bapb_id=$bapb_id");
    while($row = $file_result->fetch_assoc()) {
        $files[] = $row;
    }

    echo json_encode([
        "success" => true,
        "header" => $header,
        "items" => $items,
        "files" => $files
    ]);

} catch (Exception $e) {
    // Menangkap error jika ada kegagalan SQL
    echo json_encode(["success" => false, "message" => "Error database saat mengambil detail: " . $e->getMessage()]);
}

?>