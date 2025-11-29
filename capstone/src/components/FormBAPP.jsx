import { useState } from "react";

export default function FormBAPP() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 border rounded-md shadow-sm">

      {/* ===================== FORM UTAMA ===================== */}
      <div>
        <label className="block mb-1 font-semibold">Judul</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Nomor</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Tanggal Pekerjaan</label>
        <input type="date" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Tempat Pekerjaan</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Pihak Pengawas</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Tempat Pelayanan</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Pihak Vendor</label>
        <input type="text" className="w-full border rounded px-3 py-2" />
      </div>

      {/* SPACING */}
      <div className="my-10" />

      {/* ===================== DETAIL PEKERJAAN ===================== */}
      <h2 className="text-center text-xl font-bold mb-4">Detail Pekerjaan</h2>

      <h3 className="font-semibold mb-2">Daftar Item Pekerjaan</h3>

      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-center">No</th>
            <th className="border p-2 text-center">Nama Pekerjaan</th>
            <th className="border p-2 text-center">Deskripsi</th>
            <th className="border p-2 text-center">Volume</th>
            <th className="border p-2 text-center">Satuan</th>
            <th className="border p-2 text-center">Status</th>
            <th className="border p-2 text-center">Keterangan</th>
            <th className="border p-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2 text-center">1</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2 text-center">
              <button className="mr-2">✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===================== BUTTON BUKA MODAL ===================== */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded mb-10"
      >
        + Tambah Item Pekerjaan
      </button>

      <hr className="my-8" />

      {/* ===================== UPLOAD DOKUMENTASI ===================== */}
      <h3 className="font-semibold mb-3">Lampiran Dokumentasi</h3>

      <input type="file" className="border p-2 rounded mb-3" />
      <p className="text-gray-600 text-sm mt-2">IMG_20251114-354829.png</p>

      <hr className="my-6" />

      {/* ===================== CHECKBOX ===================== */}
      <label className="flex items-center gap-2 my-4">
        <input type="checkbox" />
        <span>Saya menyatakan bahwa data yang diinput sudah benar.</span>
      </label>

      {/* ===================== BUTTON SUBMIT ===================== */}
      <div className="flex justify-between mt-8">
        <button className="bg-blue-700 text-white px-6 py-2 rounded">
          Kirim BAPP
        </button>
      </div>

      {/* ============================================================
                     MODAL — TAMBAH ITEM PEKERJAAN
         ============================================================ */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[450px] p-6 rounded-lg shadow-xl relative">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 bg-blue-900 text-white px-3 py-1 rounded"
            >
              X
            </button>

            <h2 className="text-center text-xl font-bold mb-6">
              Tambah Item Pekerjaan
            </h2>

            <div className="grid gap-3">
              <div>
                <label>Nama Pekerjaan</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Deskripsi Pekerjaan</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Volume</label>
                <input type="number" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Satuan</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Status</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>

              <div>
                <label>Keterangan</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-900 text-white px-6 py-2 rounded"
              >
                Batal
              </button>

              <button className="bg-blue-900 text-white px-6 py-2 rounded">
                Tambah ke Daftar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}