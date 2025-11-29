import DashboardLayoutGudang from "../../components/DashboardLayoutGudang";

export default function GudangHome() {
  return (
    <DashboardLayoutGudang>

      <div className="bg-green-600 h-44 rounded-xl text-white flex items-center px-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hallo PIC Gudang</h1>
          <p>Selamat datang di dashboard pengelolaan gudang</p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Daftar Tugas Gudang</h2>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between">
          <div>
            <p className="font-semibold">Pemeriksaan Barang Masuk</p>
          </div>
          <p className="text-sm text-gray-600">Menunggu Konfirmasi</p>
        </div>
      </div>

    </DashboardLayoutGudang>
  );
}
