<?php
header("Content-Type: application/json");
include '../config.php';

$data = json_decode(file_get_contents("php://input"), true);

$judul = $data["judul"];
$nomor = $data["nomor"];
$tanggal = $data["tanggal_pemeriksaan"];
$tempat = $data["tempat_pemeriksaan"];
$pemeriksa = $data["pihak_pemeriksa"];
$pengiriman = $data["tempat_pengiriman"];
$vendor = $data["pihak_vendor"];
$valid = $data["menyatakan_valid"] ? 1 : 0;

$stmt = $conn->prepare("
    INSERT INTO bapb (judul, nomor, tanggal_pemeriksaan, tempat_pemeriksaan, pihak_pemeriksa, tempat_pengiriman, pihak_vendor, menyatakan_valid)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param("sssssssi", $judul, $nomor, $tanggal, $tempat, $pemeriksa, $pengiriman, $vendor, $valid);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "bapb_id" => $stmt->insert_id
    ]);
} else {
    echo json_encode(["success" => false]);
}
