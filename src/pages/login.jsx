import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modal, setModal] = useState({
    show: false,
    type: "error",
    message: "",
  });

  useEffect(() => {
    const isLogout = localStorage.getItem("logout_success");

    if (isLogout === "true") {
      setTimeout(() => {
        setModal({
          show: true,
          type: "success",
          message: "Berhasil logout 👋",
        });
      }, 0);

      localStorage.removeItem("logout_success");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setModal({
        show: true,
        type: "error",
        message: "Email dan password wajib diisi",
      });
      return;
    }

    try {
      const res = await api.post("/login", {
        email: email.trim(),
        password: password.trim(),
      });


      localStorage.setItem("token", res.data.token);

   
      localStorage.removeItem("welcome_admin");

      setModal({
        show: true,
        type: "success",
        message: "Login berhasil 🎉",
      });

     
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message:
          err.response?.status === 401
            ? "Email atau password salah"
            : "Terjadi kesalahan, coba lagi",
      });
    }
  };

  return (
    <>

      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs p-6 shadow-xl animate-scale transition-all">
            <div className="text-center">
              <div
                className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-4
                ${
                  modal.type === "error"
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {modal.type === "error" ? "✖" : "✔"}
              </div>

              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {modal.type === "error" ? "Oops!" : "Success"}
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                {modal.message}
              </p>

              <button
                onClick={() => setModal({ ...modal, show: false })}
                className={`w-full py-2.5 rounded-xl text-white font-bold transition-all active:scale-95
                  ${
                    modal.type === "error"
                      ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-100"
                      : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-100"
                  }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="bg-pink-200 min-h-screen flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-pink-50 to-pink-200 w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/50">
          
          <div className="flex flex-col items-center mb-8">
            <img
              src="/Logo_desain_Brana_dengan_daun_dan_tetesan-removebg-preview.png"
              className="w-28 mb-4 drop-shadow-md"
              alt="Brana Logo"
            />
            <h1 className="text-3xl font-extrabold text-pink-600">
              Welcome Back!
            </h1>
            <p className="text-sm text-pink-400 font-medium">
              Login to manage your beauty store
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="block text-sm font-bold text-pink-600 ml-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                placeholder="admin@brana.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-pink-600 ml-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-200 active:scale-[0.98]"
              >
                Login
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-white/50 text-pink-600 py-3 rounded-xl font-bold hover:bg-white transition-all border border-pink-100"
              >
                Kembali
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;