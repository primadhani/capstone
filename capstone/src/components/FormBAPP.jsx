import { useState } from "react";

export default function FormBAPP() {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]); 
  const [selectedFile, setSelectedFile] = useState(null); 

  // ===================== FORM DATA BAPP =====================
  const [form, setForm] = useState({
    nomor: "",
    tanggal: "",
    nama_pekerjaan: "",
    nomor_kontrak: "",
    nama_vendor: "",
    penanggung_jawab_vendor: "",
    pejabat_penerima: "",
    persentase_penyelesaian: 0,
    deskripsi_pekerjaan: "",
    catatan: "", 
  });

  const handleChange = (e) => {
    // Batasi persentase antara 0-100
    if (e.target.name === "persentase_penyelesaian") {
      let value = parseFloat(e.target.value);
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      setForm({ ...form, [e.target.name]: value });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (bappId, file) => {
    const formData = new FormData();
    formData.append("bapp_id", bappId);
    formData.append("file", file);

    const res = await fetch("http://localhost/capstone_backend/upload_bapp_file.php", {
      method: "POST",
      body: formData,
    });
    return res.json();
  };

  const handleUpload = async () => {
    
    // --- VALIDASI AWAL ---
    if (!form.nomor || !form.nama_pekerjaan || !selectedFile) {
        alert("Harap lengkapi semua data wajib (Nomor BAPP, Nama Pekerjaan, dan File Lampiran).");
        return;
    }
    
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || user.role !== "Vendor") {
        alert("Autentikasi Vendor gagal.");
        setLoading(false);
        return;
    }

    const payload = {
        ...form,
        vendor_id: user.id,
    };

    try {
        // 1. Submit Header BAPP (untuk mendapatkan bapp_id)
        const headerRes = await fetch("http://localhost/capstone_backend/create_bapp.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const headerData = await headerRes.json();
        
        if (!headerData.success) {
            alert("Gagal mengajukan dokumen BAPP: " + headerData.message);
            setLoading(false);
            return;
        }

        const bappId = headerData.bapp_id;

        // 2. Upload File Lampiran
        const uploadRes = await uploadFile(bappId, selectedFile);

        if (uploadRes.success) {
            alert("Dokumen BAPP berhasil diajukan bersama lampiran!");
            
            // Reset form dan file setelah sukses
            setForm({
                nomor: "", tanggal: "", nama_pekerjaan: "", nomor_kontrak: "", 
                nama_vendor: "", penanggung_jawab_vendor: "", pejabat_penerima: "",
                persentase_penyelesaian: 0, deskripsi_pekerjaan: "", catatan: "",
            });
            setSelectedFile(null);
            setFileList([]);
        } else {
            alert("Gagal upload lampiran: " + uploadRes.message);
            // Anda dapat menambahkan logika di sini untuk menghapus header BAPP yang sudah dibuat jika upload file gagal.
        }

    } catch (error) {
        alert("Terjadi kesalahan jaringan/server: " + error.message);
    }
    
    setLoading(false);
  };


  return (
    <div className="max-w-5xl mx-auto p-6 border rounded-md shadow-sm">

      <h2 className="text-xl font-bold mb-4">Form Berita Acara Penyelesaian Pekerjaan (BAPP)</h2>
      <hr className="mb-6" />

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* KOLOM KIRI: Identitas Dokumen */}
        <div>
            <label className="block mb-1 font-semibold">Nomor BAPP</label>
            <input name="nomor" value={form.nomor} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2 mb-4" required />
        
            <label className="block mb-1 font-semibold">Tanggal</label>
            <input name="tanggal" value={form.tanggal} onChange={handleChange} type="date" className="w-full border rounded px-3 py-2 mb-4" required />

            <label className="block mb-1 font-semibold">Nama Pekerjaan</label>
            <input name="nama_pekerjaan" value={form.nama_pekerjaan} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2 mb-4" required />
            
            <label className="block mb-1 font-semibold">Nomor Kontrak/SPK</label>
            <input name="nomor_kontrak" value={form.nomor_kontrak} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2 mb-4" required />

            <label className="block mb-1 font-semibold">Persentase Penyelesaian (%)</label>
            <input name="persentase_penyelesaian" value={form.persentase_penyelesaian} onChange={handleChange} type="number" step="0.01" min="0" max="100" className="w-full border rounded px-3 py-2 mb-4" required />

            <label className="block mb-1 font-semibold">Deskripsi Pekerjaan</label>
            <textarea name="deskripsi_pekerjaan" value={form.deskripsi_pekerjaan} onChange={handleChange} className="w-full border rounded px-3 py-2 h-24 mb-4" required />
        </div>


        {/* KOLOM KANAN: Pihak Terkait */}
        <div>
            <label className="block mb-1 font-semibold">Nama Vendor</label>
            <input name="nama_vendor" value={form.nama_vendor} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2 mb-4" required />

            <label className="block mb-1 font-semibold">Nama Penanggung Jawab Vendor</label>
            <input name="penanggung_jawab_vendor" value={form.penanggung_jawab_vendor} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2 mb-4" required />

            <label className="block mb-1 font-semibold">Nama Pejabat Penerima Pekerjaan</label>
            <input name="pejabat_penerima" value={form.pejabat_penerima} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2 mb-4" required />

            <label className="block mb-1 font-semibold">Catatan (Vendor)</label>
            <textarea name="catatan" value={form.catatan} onChange={handleChange} className="w-full border rounded px-3 py-2 h-24 mb-4" />

            <h3 className="font-semibold mb-3 mt-4">Upload File Lampiran (PDF/Foto)</h3>
            <input 
                type="file" 
                onChange={handleFileChange} 
                className="border p-2 rounded mb-3" 
                accept=".pdf,.jpg,.jpeg,.png"
            />
            
            {/* Display selected file name */}
            {selectedFile && (
                <p className="text-gray-600 text-sm mt-2">File dipilih: **{selectedFile.name}**</p>
            )}

        </div>
      </div>

      <hr className="my-8" />

      {/* BUTTON SUBMIT */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="bg-blue-700 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Mengajukan..." : "Ajukan BAPP ke Direksi"}
        </button>
      </div>

    </div>
  );
}