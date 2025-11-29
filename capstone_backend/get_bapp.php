<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'config.php';

$bapp_id = $_GET["id"] ?? null;

if (!$bapp_id) {
    echo json_encode(["success" => false, "message" => "ID dokumen wajib diisi."]);
    exit;
}

// 1. Ambil Data Header BAPP
$header_query = $conn->query("SELECT * FROM bapp WHERE id=$bapp_id");
$header = $header_query->fetch_assoc();

if (!$header) {
    echo json_encode(["success" => false, "message" => "Dokumen BAPP tidak ditemukan."]);
    exit;
}

// 2. Ambil Data File Pendukung BAPP
$files = [];
$file_result = $conn->query("SELECT id, file_path, file_name FROM bapp_files WHERE bapp_id=$bapp_id");
while($row = $file_result->fetch_assoc()) {
    $files[] = $row;
}

echo json_encode([
    "success" => true,
    "header" => $header,
    "files" => $files
]);
?>