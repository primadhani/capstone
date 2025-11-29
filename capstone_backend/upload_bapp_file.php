<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'config.php';

$bapp_id = $_POST["bapp_id"];

$targetDir = "../uploads/bapp/"; // Folder BAPP di luar capstone_backend
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

// Periksa apakah file diupload
if (!isset($_FILES["file"])) {
    echo json_encode(["success" => false, "message" => "Tidak ada file yang diupload"]);
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
        echo json_encode(["success" => false, "message" => "Upload berhasil, tapi gagal mencatat ke database."]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Upload gagal"]);
}
?>