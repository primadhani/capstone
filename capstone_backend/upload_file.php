<?php
header("Content-Type: application/json");
include '../config.php';

$bapb_id = $_POST["bapb_id"];

$targetDir = "../uploads/bapb/";
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

$fileName = time() . "_" . basename($_FILES["file"]["name"]);
$targetPath = $targetDir . $fileName;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {

    $stmt = $conn->prepare("
        INSERT INTO bapb_files (bapb_id, file_path)
        VALUES (?, ?)
    ");
    $stmt->bind_param("is", $bapb_id, $fileName);
    $stmt->execute();

    echo json_encode([
        "success" => true,
        "file" => $fileName
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Upload gagal"]);
}
