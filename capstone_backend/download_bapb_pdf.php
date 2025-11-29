<?php
// =======================================================
// DEBUGGING WAJIB: Biarkan ini tetap ON sampai download berhasil!
error_reporting(E_ALL); 
ini_set('display_errors', 'On'); 
// =======================================================

// --- KOREKSI PATH DEFINITIF ---
// __DIR__ adalah direktori absolut: C:\xampp\htdocs\capstone_backend
$base_dir = __DIR__;

// 1. INCLUDE config.php (diasumsikan config.php di folder yang sama)
include $base_dir . '/config.php'; 

// 2. REQUIRE FPDF LIBRARY (diasumsikan fpdf/fpdf.php berada di folder yang sama)
require $base_dir . '/fpdf/fpdf.php'; 
// ------------------------------

$bapb_id = $_GET["id"] ?? null;

if (!$bapb_id) {
    die("ID dokumen tidak valid.");
}

// Cek Koneksi Database (menggunakan isset untuk menghindari warning jika $conn tidak terdefinisi)
if (!isset($conn) || !$conn) {
    die("Error Fatal: Gagal terhubung ke database. Cek kredensial di config.php.");
}

// 2. AMBIL DATA HEADER BAPB
$bapb = $conn->query("SELECT * FROM bapb WHERE id=$bapb_id AND status='Approved'")->fetch_assoc();

if (!$bapb) {
    die("Dokumen tidak ditemukan atau belum disetujui.");
}

// 3. AMBIL DATA DETAIL BARANG (BAPB ITEMS)
$items = [];
$item_result = $conn->query("SELECT * FROM bapb_items WHERE bapb_id=$bapb_id");
while($row = $item_result->fetch_assoc()) {
    $items[] = $row;
}

// 4. GENERASI PDF MENGGUNAKAN FPDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetMargins(15, 15, 15); 
$pdf->SetFont('Arial','B',16);

// JUDUL DOKUMEN
$pdf->Cell(0,10,'BERITA ACARA PEMERIKSAAN BARANG (BAPB)',0,1,'C');

$pdf->SetFont('Arial','',10);
$pdf->Cell(0,5,'Nomor: ' . $bapb['nomor'],0,1,'C');
$pdf->Ln(10); 

// DETAIL HEADER BAPB
$pdf->SetFont('Arial','B',10);
$pdf->Cell(50, 7, 'Judul Dokumen', 0);
$pdf->SetFont('Arial','',10);
$pdf->Cell(0, 7, ': ' . $bapb['judul'], 0, 1);

$pdf->SetFont('Arial','B',10);
$pdf->Cell(50, 7, 'Tanggal Pemeriksaan', 0);
$pdf->SetFont('Arial','',10);
$pdf->Cell(0, 7, ': ' . $bapb['tanggal_pemeriksaan'], 0, 1);

$pdf->SetFont('Arial','B',10);
$pdf->Cell(50, 7, 'Pihak Vendor', 0);
$pdf->SetFont('Arial','',10);
$pdf->Cell(0, 7, ': ' . $bapb['pihak_vendor'], 0, 1);

$pdf->SetFont('Arial','B',10);
$pdf->Cell(50, 7, 'Tempat Pemeriksaan', 0);
$pdf->SetFont('Arial','',10);
$pdf->Cell(0, 7, ': ' . $bapb['tempat_pemeriksaan'], 0, 1);
$pdf->Ln(5);

// JUDUL TABEL
$pdf->SetFont('Arial','B',10);
$pdf->Cell(10, 8, 'No', 1, 0, 'C');
$pdf->Cell(45, 8, 'Nama Barang', 1, 0, 'C');
$pdf->Cell(45, 8, 'Spesifikasi', 1, 0, 'C');
$pdf->Cell(20, 8, 'Qty', 1, 0, 'C');
$pdf->Cell(20, 8, 'Satuan', 1, 0, 'C');
$pdf->Cell(40, 8, 'Keterangan', 1, 1, 'C');

// ISI TABEL
$pdf->SetFont('Arial','',10);
$no = 1;
foreach($items as $item) {
    // Memberikan nilai default jika kolom item tidak ditemukan (untuk menghindari error)
    $nama_barang = $item['nama_barang'] ?? 'N/A';
    $spesifikasi = $item['spesifikasi'] ?? '';
    $quantity = $item['quantity'] ?? 0;
    $satuan = $item['satuan'] ?? 'Unit';
    $keterangan = $item['keterangan'] ?? '';
    
    $pdf->Cell(10, 6, $no++, 1, 0, 'C');
    $pdf->Cell(45, 6, $nama_barang, 1, 0);
    $pdf->Cell(45, 6, $spesifikasi, 1, 0);
    $pdf->Cell(20, 6, $quantity, 1, 0, 'C');
    $pdf->Cell(20, 6, $satuan, 1, 0, 'C');
    $pdf->Cell(40, 6, $keterangan, 1, 1);
}

// KAKI DOKUMEN
$pdf->Ln(15);
$pdf->Cell(100, 5, 'Disetujui dan Diperiksa oleh:', 0, 0);
$pdf->Cell(0, 5, 'Dibuat oleh:', 0, 1);
$pdf->Ln(20);

$pdf->SetFont('Arial','U',10);
$pdf->Cell(100, 5, $bapb['pihak_pemeriksa'], 0, 0); 
$pdf->Cell(0, 5, $bapb['pihak_vendor'], 0, 1); 
$pdf->SetFont('Arial','',10);

$pdf->Cell(100, 5, '(PIC Gudang)', 0, 0);
$pdf->Cell(0, 5, '(Vendor)', 0, 1);

// 5. OUTPUT KE BROWSER SEBAGAI DOWNLOAD FILE
$filename = "BAPB_" . str_replace('/', '-', $bapb['nomor']) . ".pdf";
$pdf->Output('D', $filename);

exit;
?>