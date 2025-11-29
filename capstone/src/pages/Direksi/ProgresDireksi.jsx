import { useEffect, useState } from "react";

// --- KOMPONEN MODAL DETAIL DOKUMEN ---
const DetailModal = ({ dokumen, onClose }) => {
    if (!dokumen) return null;

    const { header, files } = dokumen;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className className="bg-white p-8 rounded-xl w-[750px] shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Detail BAPP: {header.nama_pekerjaan}</h2>
                <hr className="mb-4" />

                {/* HEADER INFO */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <p className="font-semibold">Nomor BAPP:</p>
                        <p>{header.nomor}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Tanggal:</p>
                        <p>{header.tanggal}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Vendor:</p>
                        <p>{header.nama_vendor}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Nomor Kontrak:</p>
                        <p>{header.nomor_kontrak}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Persentase Selesai:</p>
                        <p className="font-bold text-lg text-purple-700">{header.persentase_penyelesaian}%</p>
                    </div>
                    <div>
                        <p className="font-semibold">Pejabat Penerima:</p>
                        <p>{header.pejabat_penerima}</p>
                    </div>
                </div>

                <h3 className="text-lg font-bold mt-4 mb-2">Deskripsi & Catatan</h3>
                <p className="mb-3 text-sm">{header.deskripsi_pekerjaan}</p>
                <p className="font-semibold text-sm">Catatan Vendor:</p>
                <p className="mb-6 text-sm italic">{header.catatan || 'Tidak ada catatan.'}</p>


                {/* FILES */}
                <h3 className="text-lg font-bold mb-3">Lampiran Dokumentasi ({files.length})</h3>
                {files.length > 0 ? (
                    <ul className="list-disc ml-5 mb-6">
                        {files.map((file, index) => (
                            <li key={index} className="text-blue-600 hover:underline">
                                <a 
                                    href={`http://localhost/capstone_backend/${file.file_path}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {file.file_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">Tidak ada file lampiran.</p>
                )}


                <div className="flex justify-end mt-6">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- END KOMPONEN MODAL ---


export default function ProgresDireksi() {
  const [dokumenList, setDokumenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalData, setModalData] = useState(null); 

  const fetchDokumen = async () => { 
    setLoading(true);
    try {
      const res = await fetch("http://localhost/capstone_backend/list_progres_bapp.php");
      const result = await res.json();
      
      if (result.success) {
        setDokumenList(result.data);
      } else {
        alert("Gagal mengambil data BAPP: " + result.message);
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

  // Handler for viewing detail document
  const viewDetail = async (bappId) => {
    try {
        const res = await fetch(`http://localhost/capstone_backend/get_bapp.php?id=${bappId}`);
        const result = await res.json();

        if (result.success) {
            setModalData(result); 
            setShowDetailModal(true);
        } else {
            alert("Gagal memuat detail dokumen BAPP.");
        }
    } catch (error) {
        alert("Error memuat detail: " + error.message);
    }
  };
  
  // Handler for approving/rejecting document
  const handleAction = async (id, status) => {
    let catatan = null;

    if (status === 'Rejected') {
        catatan = prompt("Masukkan alasan penolakan (Wajib):");
        if (!catatan || catatan.trim() === "") {
            alert("Penolakan dibatalkan. Alasan penolakan wajib diisi.");
            return;
        }
    } else {
        if (!confirm("Yakin ingin MENYETUJUI dokumen BAPP ini?")) return;
    }

    try {
      // Endpoint update_bapp_status.php
      const res = await fetch("http://localhost/capstone_backend/update_bapp_status.php", {
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

      <div className="bg-purple-600 h-32 rounded-xl text-white p-6 flex items-center text-xl font-bold">
        Daftar BAPP Menunggu Persetujuan
      </div>
      
      {/* Form Pencarian */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Cari dokumen BAPP..."
          className="flex-1 border p-2 rounded"
        />
      </div>

      {/* List Dokumen Pending */}
      <div className="mt-6 space-y-4">
        {dokumenList.length === 0 ? (
            <div className="bg-white p-4 rounded-md shadow text-gray-500">
                Tidak ada dokumen BAPP yang menunggu persetujuan.
            </div>
        ) : (
            dokumenList.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-white p-4 rounded-md shadow flex justify-between items-center"
                >
                    <div>
                        <p className="font-semibold">{item.nama_pekerjaan} - No. {item.nomor}</p>
                        <p className="text-sm text-gray-600">
                            Dokumen dari Vendor: **{item.nama_vendor}**
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
                            className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 text-sm"
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