import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/capstone_backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.status === "success") {
        localStorage.setItem("admin_logged_in", "true");
        navigate("/admin/dashboard");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Gagal menghubungi server!");
    }
  };


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      {/* Card */}
      <div className="bg-blue-600 w-[550px] p-10 rounded-2xl shadow-2xl">

        {/* Title */}
        <h1 className="text-center text-white font-bold text-xl mb-6">
          Selamat Datang <br /> Admin!
        </h1>

        {/* Form Container */}
        <form
          onSubmit={handleLogin}
          className="bg-blue-400 p-6 rounded-xl"
        >
          {/* Username */}
          <div className="flex items-center bg-white rounded-md px-3 py-2 mb-4">
            <span className="text-gray-500 mr-2">
              <i className="fa-solid fa-user"></i>
            </span>
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white rounded-md px-3 py-2 mb-2">
            <span className="text-gray-500 mr-2">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show Password */}
          <label className="flex items-center text-xs text-white mb-4 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>

          {/* Error Message */}
          {error && (
            <p className="text-red-200 text-sm mb-3">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-950 transition"
          >
            LOGIN
          </button>

        </form>
      </div>
    </div>
  );
}
