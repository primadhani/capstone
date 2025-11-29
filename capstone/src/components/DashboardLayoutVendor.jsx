import { Link, Outlet } from "react-router-dom";

export default function DashboardLayoutVendor() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="w-60 bg-white shadow-md p-5">
        <h2 className="text-blue-700 font-bold text-lg mb-8">Vendor</h2>

        <nav className="space-y-4">
          <Link to="/vendor/home" className="block p-2 rounded hover:bg-gray-200">
            Home
          </Link>
          <Link to="/vendor/progres" className="block p-2 rounded hover:bg-gray-200">
            Progres
          </Link>
          <Link to="/vendor/arsip" className="block p-2 rounded hover:bg-gray-200">
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
