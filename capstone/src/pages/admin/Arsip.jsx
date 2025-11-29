export default function ArsipAdmin() {
  const data = [
    {
      nama: "Dokumen pengiriman barang",
      tanggal: "12 Agustus 2025",
      vendor: "PT Prima Jasa"
    },
    {
      nama: "Dokumen pengiriman barang",
      tanggal: "12 Agustus 2025",
      vendor: "PT Jasa Raharja"
    },
    {
      nama: "Dokumen pengiriman barang",
      tanggal: "12 Agustus 2025",
      vendor: "PT Maju Bersama"
    },
    {
      nama: "Dokumen pengiriman barang",
      tanggal: "12 Agustus 2025",
      vendor: "PT Mencari Cinta Abadi"
    }
  ];

  return (
    <div className="flex-1 p-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl font-bold">Hallo Vendor</h2>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between"
        >
          <div>
            <h3 className="font-bold">{item.nama}</h3>
            <div className="flex gap-8 text-sm text-gray-600 mt-1">
              <span>{item.tanggal}</span>
              <span>{item.vendor}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xl text-gray-600">
            <i className="fa-solid fa-download cursor-pointer"></i>
            <i className="fa-regular fa-copy cursor-pointer"></i>
          </div>
        </div>
      ))}
    </div>
  );
}
