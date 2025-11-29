import { FiDownload, FiCopy } from "react-icons/fi";

const dataArsipVendor = [
  {
    id: 1,
    title: "Dokumen Pengiriman Vendor",
    date: "12 Agustus 2025",
    info: "PT Prima Jasa",
  },
  {
    id: 2,
    title: "Form Invoice Vendor",
    date: "10 Agustus 2025",
    info: "PT Mitra Abadi",
  },
];

export default function Arsip() {
  return (
      <div className="p-6 w-full">

        {/* HEADER */}
        <div className="w-full bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl text-white p-6 shadow">
          <h2 className="text-2xl font-bold">Hallo Vendor</h2>
          <p className="text-sm opacity-80">Semua arsip dokumen Anda di sini</p>
        </div>

        {/* LIST ARSIP */}
        <div className="mt-6 space-y-4">
          {dataArsipVendor.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date} • {item.info}</p>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <button className="hover:text-blue-700">
                  <FiDownload size={20} />
                </button>
                <button className="hover:text-blue-700">
                  <FiCopy size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
  );
}
