import { FiDownload, FiCopy } from "react-icons/fi";
import DashboardLayoutGudang from "../../components/DashboardLayoutGudang";

const dataArsipGudang = [
  {
    id: 1,
    title: "Laporan Penerimaan Barang",
    date: "11 Agustus 2025",
    info: "Gudang Utama",
  },
  {
    id: 2,
    title: "Bukti Pemeriksaan Barang Masuk",
    date: "9 Agustus 2025",
    info: "Gudang Cabang",
  },
  {
    id: 3,
    title: "Laporan Penyimpanan Barang",
    date: "5 Agustus 2025",
    info: "PIC: M. Dimas",
  },
];

export default function Arsip() {
  return (
    <DashboardLayoutGudang>
      <div className="p-6 w-full">

        {/* HEADER */}
        <div className="w-full bg-gradient-to-r from-green-700 to-green-500 rounded-xl text-white p-6 shadow">
          <h2 className="text-2xl font-bold">Hallo PIC Gudang</h2>
          <p className="text-sm opacity-80">Arsip pemeriksaan & penerimaan barang</p>
        </div>

        {/* LIST ARSIP */}
        <div className="mt-6 space-y-4">
          {dataArsipGudang.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date} • {item.info}</p>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <button className="hover:text-green-700">
                  <FiDownload size={20} />
                </button>
                <button className="hover:text-green-700">
                  <FiCopy size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayoutGudang>
  );
}
