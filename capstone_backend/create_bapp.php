<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Data tidak valid."]);
    exit;
}

// Ambil data dan pastikan semua ada
$nomor = $data["nomor"] ?? null;
$tanggal = $data["tanggal"] ?? null;
$nama_pekerjaan = $data["nama_pekerjaan"] ?? null;
$nomor_kontrak = $data["nomor_kontrak"] ?? null;
$nama_vendor = $data["nama_vendor"] ?? null;
$pj_vendor = $data["penanggung_jawab_vendor"] ?? null;
$pejabat_penerima = $data["pejabat_penerima"] ?? null;
// Pastikan persentase dikonversi ke float
$persentase = (float)($data["persentase_penyelesaian"] ?? 0.0);
$deskripsi = $data["deskripsi_pekerjaan"] ?? null;
$catatan = $data["catatan"] ?? null;
$vendor_id = (int)($data["vendor_id"] ?? 0); 
$status = 'Pending'; 

if (!$nomor || $vendor_id === 0) {
    echo json_encode(["success" => false, "message" => "Nomor BAPP dan Vendor ID wajib diisi."]);
    exit;
}

// 1. INSERT BAPP HEADER
$stmt = $conn->prepare("
    INSERT INTO bapp (nomor, tanggal, nama_pekerjaan, nomor_kontrak, nama_vendor, penanggung_jawab_vendor, pejabat_penerima, persentase_penyelesaian, deskripsi_pekerjaan, catatan, vendor_id, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

// Tipe data (Total 12): sssssss d s s i s
// 7x string, 1x double, 2x string, 1x integer, 1x string
$stmt->bind_param("sssssssdsiss", 
    $nomor, $tanggal, $nama_pekerjaan, $nomor_kontrak, $nama_vendor, $pj_vendor, $pejabat_penerima, 
    $persentase, $deskripsi, $catatan, $vendor_id, $status
);

if ($stmt->execute()) {
    $bapp_id = $stmt->insert_id;
    echo json_encode([
        "success" => true,
        "bapp_id" => $bapp_id,
        "message" => "Dokumen BAPP berhasil diajukan. Lanjut upload lampiran."
    ]);
} else {
    // Pesan error SQL yang jelas
    echo json_encode(["success" => false, "message" => "Gagal membuat dokumen BAPP. Error SQL: " . $conn->error]);
}
?>