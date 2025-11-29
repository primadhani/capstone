import { useState } from "react";

export default function FormBAPB() {
  const [showModal, setShowModal] = useState(false);

  // ===================== FORM DATA BAPB =====================
  const [form, setForm] = useState({
    judul: "",
    nomor: "",
    tanggal: "",
    tempat_pemeriksaan: "",
    pihak_pemeriksa: "",
    tempat_pengiriman: "",
    pihak_vendor: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===================== DETAIL BARANG DINAMIS =====================
  const [items, setItems] = useState([]);

  const [itemForm, setItemForm] = useState({
    nama_barang: "",
    spesifikasi: "",
    qty: "",
    satuan: "",
    keterangan: "",
  });

  const handleItemChange = (e) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, itemForm]);
    setItemForm({
      nama_barang: "",
      spesifikasi: "",
      qty: "",
      satuan: "",
      keterangan: "",
    });
    setShowModal(false);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // ===================== SUBMIT KE BACKEND =====================
  const submitForm = async () => {
    const payload = {
      ...form,
      items,
    };

    const res = await fetch("http://localhost/api/bapb/create.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded-md shadow-sm">

      {/* FORM FIELD */}
      <div className="grid gap-4">
        <div>
          <label className="block mb-1 font-semibold">Judul</label>
          <input name="judul" value={form.judul} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nomor</label>
          <input name="nomor" value={form.nomor} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tanggal Pemeriksaan</label>
          <input name="tanggal" value={form.tanggal} onChange={handleChange} type="date" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tempat Pemeriksaan</label>
          <input name="tempat_pemeriksaan" value={form.tempat_pemeriksaan} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Pihak Pemeriksa</label>
          <input name="pihak_pemeriksa" value={form.pihak_pemeriksa} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tempat Pengiriman</label>
          <input name="tempat_pengiriman" value={form.tempat_pengiriman} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Pihak Vendor</label>
          <input name="pihak_vendor" value={form.pihak_vendor} onChange={handleChange} type="text" className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="my-10" />

      {/* DETAIL BARANG TABLE */}
      <h2 className="text-center text-xl font-bold mb-6">
        Detail Barang Yang Dikirim
      </h2>

      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-center">No</th>
            <th className="border p-2 text-center">Nama Barang</th>
            <th className="border p-2 text-center">Spesifikasi</th>
            <th className="border p-2 text-center">Quantity</th>
            <th className="border p-2 text-center">Satuan</th>
            <th className="border p-2 text-center">Keterangan</th>
            <th className="border p-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{item.nama_barang}</td>
              <td className="border p-2">{item.spesifikasi}</td>
              <td className="border p-2">{item.qty}</td>
              <td className="border p-2">{item.satuan}</td>
              <td className="border p-2">{item.keterangan}</td>
              <td className="border p-2 text-center">
                <button onClick={() => deleteItem(index)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded mb-10"
      >
        + Tambah Barang
      </button>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-between mt-8">
        <button
          onClick={submitForm}
          className="bg-blue-700 text-white px-6 py-2 rounded"
        >
          Ajukan ke PIC Gudang
        </button>
      </div>

      {/* MODAL TAMBAH BARANG */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white w-[450px] p-6 rounded-lg shadow-xl relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 bg-blue-900 text-white px-3 py-1 rounded"
            >
              X
            </button>

            <h2 className="text-center text-xl font-bold mb-6">
              Tambah Barang Baru
            </h2>

            <div className="grid gap-3">
              <div>
                <label>Nama Barang</label>
                <input name="nama_barang" value={itemForm.nama_barang} onChange={handleItemChange} type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Spesifikasi</label>
                <input name="spesifikasi" value={itemForm.spesifikasi} onChange={handleItemChange} type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Quantity</label>
                <input name="qty" value={itemForm.qty} onChange={handleItemChange} type="number" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Satuan</label>
                <input name="satuan" value={itemForm.satuan} onChange={handleItemChange} type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Keterangan</label>
                <input name="keterangan" value={itemForm.keterangan} onChange={handleItemChange} type="text" className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-900 text-white px-6 py-2 rounded"
              >
                Batal
              </button>

              <button
                onClick={addItem}
                className="bg-blue-900 text-white px-6 py-2 rounded"
              >
                Tambah ke Daftar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
