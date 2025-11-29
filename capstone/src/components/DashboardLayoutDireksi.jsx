import { Link, Outlet } from "react-router-dom";

export default function DashboardLayoutDireksi() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar Section */}
      <div className="w-60 bg-white shadow-md p-5">
        {/* PASTIKAN JUDUL INI BENAR: */}
        <h2 className="text-purple-700 font-bold text-lg mb-8">Direksi Pekerjaan</h2> 

        <nav className="space-y-4">
          <Link to="/direksi/home" className="block p-2 rounded hover:bg-gray-200">
            Home
          </Link>
          <Link to="/direksi/progres" className="block p-2 rounded hover:bg-gray-200">
            Progres BAPP
          </Link>
          <Link to="/direksi/arsip" className="block p-2 rounded hover:bg-gray-200">
            Arsip
          </Link>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}