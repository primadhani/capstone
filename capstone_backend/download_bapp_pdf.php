<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include 'config.php'; // Menggunakan path yang diminta

$bapp_id = $_GET["id"] ?? null;

if (!$bapp_id) {
    echo json_encode(["success" => false, "message" => "ID dokumen BAPP wajib diisi."]);
    exit;
}

// Cek status dokumen dari tabel 'bapp'
$bapp_status_result = $conn->query("SELECT status FROM bapp WHERE id=$bapp_id");
$bapp_status = $bapp_status_result->fetch_assoc();

if (!$bapp_status || $bapp_status['status'] !== 'Approved') {
    echo json_encode(["success" => false, "message" => "Dokumen BAPP tidak ditemukan atau belum disetujui oleh Direksi Pekerjaan."]);
    exit;
}

// --- Placeholder FPDF ---
// Di sini adalah tempat kode FPDF untuk mengambil data dari tabel 'bapp' dan 'bapp_files'
// serta menghasilkan file PDF.

echo json_encode([
    "success" => true,
    "message" => "Dokumen BAPP disetujui. Siap diunduh. (Harap implementasikan FPDF di file ini untuk menghasilkan PDF)."
]);
?>