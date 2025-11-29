import { useEffect, useState } from "react";

// --- KOMPONEN MODAL DETAIL DOKUMEN ---
const DetailModal = ({ dokumen, onClose }) => {
    if (!dokumen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl w-[700px] shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-green-700">Detail BAPB: {dokumen.header.judul}</h2>
                <hr className="mb-4" />

                {/* HEADER INFO */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <p className="font-semibold">Nomor Dokumen:</p>
                        <p>{dokumen.header.nomor}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Tanggal Pemeriksaan:</p>
                        <p>{dokumen.header.tanggal_pemeriksaan}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Vendor:</p>
                        <p>{dokumen.header.pihak_vendor}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Tempat Pemeriksaan:</p>
                        <p>{dokumen.header.tempat_pemeriksaan}</p>
                    </div>
                </div>

                {/* ITEMS TABLE */}
                <h3 className="text-lg font-bold mb-3">Daftar Barang ({dokumen.items.length} Item)</h3>
                <table className="w-full border text-sm mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">No</th>
                            <th className="border p-2">Barang</th>
                            <th className="border p-2">Spesifikasi</th>
                            <th className="border p-2">Qty</th>
                            <th className="border p-2">Satuan</th>
                            <th className="border p-2">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dokumen.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border p-2 text-center">{index + 1}</td>
                                <td className="border p-2">{item.nama_barang}</td>
                                <td className="border p-2">{item.spesifikasi}</td>
                                <td className="border p-2 text-center">{item.quantity}</td>
                                <td className="border p-2 text-center">{item.satuan}</td>
                                <td className="border p-2">{item.keterangan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {/* FILES (Optional - Uncomment jika ada) */}
                {/* <h3 className="text-lg font-bold mb-3">File Pendukung ({dokumen.files.length})</h3>
                <ul className="list-disc ml-5 mb-6">
                    {dokumen.files.map((file, index) => (
                        <li key={index} className="text-blue-600 hover:underline">
                            <a href={`http://localhost/capstone_backend/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                                {file.file_name}
                            </a>
                        </li>
                    ))}
                </ul> */}


                <div className="flex justify-end mt-6">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- END KOMPONEN MODAL ---


export default function ProgresGudang() {
  const [dokumenList, setDokumenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalData, setModalData] = useState(null); 

  const fetchDokumen = async () => { 
    setLoading(true);
    try {
      const res = await fetch("http://localhost/capstone_backend/list_progres_bapb.php");
      const result = await res.json();
      
      if (result.success) {
        // Asumsi list_progres_bapb.php hanya menampilkan yang statusnya 'Pending'
        setDokumenList(result.data);
      } else {
        alert("Gagal mengambil data dokumen: " + result.message);
      }
    } catch (error) {
      alert("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDokumen();
  }, []);

  // Handler untuk melihat detail dokumen (menggunakan get_bapb.php)
  const viewDetail = async (bapbId) => {
    try {
        const res = await fetch(`http://localhost/capstone_backend/get_bapb.php?id=${bapbId}`);
        const result = await res.json();

        if (result.success) {
            setModalData(result); // result berisi header, items, files
            setShowDetailModal(true);
        } else {
            alert("Gagal memuat detail dokumen.");
        }
    } catch (error) {
        alert("Error memuat detail: " + error.message);
    }
  };
  
  // Handler untuk menyetujui/menolak dokumen
  const handleAction = async (id, status) => {
    let catatan = null;

    if (status === 'Rejected') {
        catatan = prompt("Masukkan alasan penolakan (Wajib):");
        if (!catatan || catatan.trim() === "") {
            alert("Penolakan dibatalkan. Alasan penolakan wajib diisi.");
            return;
        }
    } else {
        if (!confirm("Yakin ingin MENYETUJUI dokumen ini? Dokumen akan hilang dari daftar progres.")) return;
    }

    try {
      // Endpoint update_bapb_status.php menerima 'catatan'
      const res = await fetch("http://localhost/capstone_backend/update_bapb_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, catatan }), 
      });

      const result = await res.json();
      
      if (result.success) {
        alert(result.message);
        fetchDokumen(); // Refresh list 
      } else {
        alert("Aksi gagal: " + result.message);
      }

    } catch (error) {
      alert("Error saat mengirim aksi: " + error.message);
    }
  };


  if (loading) { 
    return (
      <div className="p-6 w-full">
        <div className="text-center text-lg">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
        {/* Tampilkan Modal */}
        {showDetailModal && <DetailModal dokumen={modalData} onClose={() => setShowDetailModal(false)} />}

      {/* Header */}
      <div className="bg-green-600 h-32 rounded-xl text-white p-6 flex items-center text-xl font-bold">
        Hallo PIC Gudang
      </div>

      {/* Search (Bisa diimplementasikan nanti) */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Cari permintaan vendor..."
          className="flex-1 border p-2 rounded"
        />
      </div>

      {/* List Dokumen Masuk */}
      <h2 className="text-lg font-bold mt-6 mb-4">Permintaan Pemeriksaan BAPB (Pending)</h2>

      <div className="space-y-4">
        {dokumenList.length === 0 ? (
          <div className="bg-white p-4 rounded-md shadow text-gray-500">
            Tidak ada dokumen BAPB yang menunggu pemeriksaan.
          </div>
        ) : (
            dokumenList.map((item) => (
            <div
                key={item.id}
                className="bg-white p-4 rounded-md shadow flex justify-between items-center"
            >
                <div>
                    <p className="font-semibold">{item.judul} - No. {item.nomor}</p>
                    <p className="text-sm text-gray-600">
                      Dokumen dari Vendor: **{item.pihak_vendor}** (Total Barang: {item.total_items})
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Diajukan pada: {new Date(item.dibuat_pada).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2">
                    {/* Tombol Lihat Detail */}
                    <button 
                        onClick={() => viewDetail(item.id)}
                        className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                        Lihat Detail
                    </button>
                    <button 
                        onClick={() => handleAction(item.id, 'Approved')}
                        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
                    >
                        Setujui
                    </button>
                    <button 
                        onClick={() => handleAction(item.id, 'Rejected')}
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                    >
                        Tolak
                    </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}