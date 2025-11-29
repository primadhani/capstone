<?php
// HARD-CODE DEBUGGING: Paksa matikan tampilan error HTML
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING); 
ini_set('display_errors', 'Off');

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

// Pastikan semua kunci yang dibutuhkan ada
$required_keys = ["judul", "nomor", "tanggal", "tempat_pemeriksaan", "pihak_pemeriksa", "tempat_pengiriman", "pihak_vendor", "vendor_id", "items"];
foreach ($required_keys as $key) {
    if (!isset($data[$key])) {
        echo json_encode(["success" => false, "message" => "Data yang hilang: " . $key]);
        exit;
    }
}

$judul = $data["judul"];
$nomor = $data["nomor"];
$tanggal = $data["tanggal"]; 
$tempat = $data["tempat_pemeriksaan"];
$pemeriksa = $data["pihak_pemeriksa"];
$pengiriman = $data["tempat_pengiriman"];
$vendor = $data["pihak_vendor"];
$vendor_id = (int)$data["vendor_id"];
$items = $data["items"]; 
$valid = 1; 
$status = 'Pending'; 

if ($vendor_id === 0) {
    echo json_encode(["success" => false, "message" => "Vendor ID tidak valid atau hilang."]);
    exit;
}

// 1. INSERT BAPB HEADER
$stmt = $conn->prepare("
    INSERT INTO bapb (judul, nomor, tanggal_pemeriksaan, tempat_pemeriksaan, pihak_pemeriksa, tempat_pengiriman, pihak_vendor, vendor_id, menyatakan_valid, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

// Tipe data untuk bind_param: (s, s, s, s, s, s, s, i, i, s) -> 7 string, 2 integer, 1 string
$stmt->bind_param("sssssssiss", 
    $judul, 
    $nomor, 
    $tanggal, 
    $tempat, 
    $pemeriksa, 
    $pengiriman, 
    $vendor, 
    $vendor_id, 
    $valid, 
    $status
);

if ($stmt->execute()) {
    $bapb_id = $stmt->insert_id;

    // 2. INSERT BAPB ITEMS
    $item_success = true;
    if (!empty($items)) {
        foreach ($items as $item) {
            
            $nama_barang = $item["nama_barang"] ?? '';
            $spesifikasi = $item["spesifikasi"] ?? '';
            $qty = (int)($item["qty"] ?? 0);
            $satuan = $item["satuan"] ?? '';
            $keterangan = $item["keterangan"] ?? '';

            // Query INSERT ITEM
            $item_stmt = $conn->prepare("
                INSERT INTO bapb_items (bapb_id, nama_barang, spesifikasi, quantity, satuan, keterangan)
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            // Tipe data untuk item: (i, s, s, i, s, s)
            $item_stmt->bind_param("ississ", 
                $bapb_id, 
                $nama_barang, 
                $spesifikasi, 
                $qty, 
                $satuan, 
                $keterangan
            );
            
            if (!$item_stmt->execute()) {
                $item_success = false;
                break; 
            }
            $item_stmt->close();
        }
    }
    
    if ($item_success) {
        echo json_encode([
            "success" => true,
            "bapb_id" => $bapb_id,
            "message" => "Dokumen BAPB berhasil dibuat dan diajukan. Menunggu persetujuan PIC Gudang."
        ]);
    } else {
        // Rollback: Hapus header yang sudah terbuat jika item gagal disimpan
        $conn->query("DELETE FROM bapb WHERE id=$bapb_id");
        echo json_encode(["success" => false, "message" => "Gagal menyimpan detail barang. Transaksi dibatalkan."]);
    }

} else {
    // Error di header, kemungkinan besar karena kolom DB belum ditambahkan (vendor_id/status)
    echo json_encode(["success" => false, "message" => "Gagal membuat dokumen BAPB. Cek apakah kolom database 'vendor_id' dan 'status' sudah ditambahkan di tabel 'bapb'. Error SQL: " . $conn->error]);
}
?>