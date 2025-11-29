<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'config.php';

$bapp_id = $_POST["bapp_id"];

// Folder target: satu level di atas capstone_backend/
$targetDir = "../uploads/bapp/"; 
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true); // Mencoba membuat folder jika belum ada

// Periksa apakah file diupload
if (!isset($_FILES["file"]) || $_FILES["file"]["error"] !== UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "Tidak ada file yang diupload atau terjadi kesalahan upload (Error Code: " . $_FILES["file"]["error"] . ")"]);
    exit;
}

$originalFileName = basename($_FILES["file"]["name"]);
$fileExtension = pathinfo($originalFileName, PATHINFO_EXTENSION);
$fileName = time() . "_" . $bapp_id . "." . $fileExtension;
$targetPath = $targetDir . $fileName;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {

    $stmt = $conn->prepare("
        INSERT INTO bapp_files (bapp_id, file_path, file_name)
        VALUES (?, ?, ?)
    ");
    // Simpan path relatif ke database
    $dbFilePath = "uploads/bapp/" . $fileName; 
    $stmt->bind_param("iss", $bapp_id, $dbFilePath, $originalFileName); 
    
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "file_name" => $originalFileName
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Upload berhasil, tapi gagal mencatat ke database. Error: " . $conn->error]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Gagal memindahkan file. Periksa izin tulis folder " . $targetDir]);
}
?>