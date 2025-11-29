export default function ProgresGudang() {
  return (
    <div className="p-6 w-full">

      {/* Header */}
      <div className="bg-green-600 h-32 rounded-xl text-white p-6 flex items-center text-xl font-bold">
        Hallo PIC Gudang
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Cari permintaan vendor..."
          className="flex-1 border p-2 rounded"
        />
      </div>

      {/* List Dokumen Masuk */}
      <div className="mt-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-md shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Permintaan Pemeriksaan {i}</p>
              <p className="text-sm text-gray-600">Dokumen masuk dari Vendor</p>
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Periksa
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
