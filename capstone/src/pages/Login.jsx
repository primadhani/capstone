import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost/capstone_backend/users/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    // simpan user (ada email, role, id, dll)
    localStorage.setItem("user", JSON.stringify(result.user));

    const role = result.user.role;

    // Arahkan berdasarkan role (FIX ROUTE)
    if (role === "PIC Gudang") {
      navigate("/gudang/home");
    } 
    else if (role === "Vendor") {
      navigate("/vendor/home");
    } 
    else if (role === "Admin") {
      navigate("/admin/dashboard");
    } 
    else if (role === "Direksi Pekerjaan") {
      navigate("/direksi/home");
    } 
    else {
      alert("Role tidak dikenali!");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[800px] h-[420px] bg-white rounded-xl shadow-xl flex overflow-hidden">

        <div className="w-1/2 bg-blue-700 text-white p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="white" 
              className="w-20 h-20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c3.866 0 7 1.791 7 4v2H5v-2c0-2.209 3.134-4 7-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 text-black rounded-md focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 text-black rounded-md focus:outline-none"
                required
              />
            </div>

            <button className="w-full bg-blue-900 hover:bg-blue-800 py-3 rounded-md transition">
              LOGIN
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-white flex flex-col items-center justify-center p-6">
          <img src="/logo.png" className="w-32 mb-3" />
          <p className="text-blue-700 text-2xl font-semibold">Asah</p>
          <p className="text-blue-700 text-base -mt-1">Berita Acara</p>
        </div>

      </div>
    </div>
  );
}
