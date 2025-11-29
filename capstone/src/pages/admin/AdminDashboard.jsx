export default function AdminDashboard() {
  return (
    <div className="flex-1 p-8">

      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl font-bold">Hallo Admin</h2>
        <p>Selamat datang di website untuk membuat berita acara</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-2">Total User</h3>
          <p className="text-3xl font-bold">30</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-2">Total Dokumen</h3>
          <p className="text-3xl font-bold">30</p>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-xl mb-3">List Dokumen</h2>

      <div className="space-y-3">
        <div className="bg-white p-4 rounded-lg shadow">Dokumen pengiriman barang</div>
        <div className="bg-white p-4 rounded-lg shadow">Dokumen Bukti Penyelesaian Pekerjaan</div>
        <div className="bg-white p-4 rounded-lg shadow">Dokumen Revisian</div>
      </div>

    </div>
  );
}
