<?php
header("Content-Type: application/json");
include '../config.php';

$id = $_GET["id"];

// Ambil header
$bapb = $conn->query("SELECT * FROM bapb WHERE id=$id")->fetch_assoc();

// Ambil barang
$items = [];
$item_result = $conn->query("SELECT * FROM bapb_items WHERE bapb_id=$id");
while($row = $item_result->fetch_assoc()) {
    $items[] = $row;
}

// Ambil file
$files = [];
$file_result = $conn->query("SELECT * FROM bapb_files WHERE bapb_id=$id");
while($row = $file_result->fetch_assoc()) {
    $files[] = $row;
}

echo json_encode([
    "success" => true,
    "header" => $bapb,
    "items" => $items,
    "files" => $files
]);
