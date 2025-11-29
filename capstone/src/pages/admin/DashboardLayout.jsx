import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="w-full h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-xl font-bold mb-8">Berita Acara</h1>

        <ul className="space-y-4">
          <li><Link to="/admin/dashboard">Home</Link></li>
          <li><Link to="/admin/dashboard/progres">Progres</Link></li>
          <li><Link to="/admin/dashboard/user">User</Link></li>
          <li><Link to="/admin/dashboard/arsip">Arsip</Link></li>
        </ul>
      </div>

      {/* HALAMAN BERUBAH DISINI */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}
