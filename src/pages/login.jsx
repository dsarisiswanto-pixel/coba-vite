function Login() {
  return (
    <div className="bg-pink-200 min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-r from-pink-100 to-pink-300 
                      w-96 p-6 rounded-2xl shadow-xl">

        <img
          src="/Logo_desain_Brana_dengan_daun_dan_tetesan-removebg-preview.png"
          className="w-32 mx-auto mb-4"
          alt="Brana Logo"
        />

        <h1 className="text-2xl font-bold text-pink-600 text-center">
          Welcome Back!
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue to your account
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-pink-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg 
                         border border-pink-300 
                         focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-pink-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg 
                         border border-pink-300 
                         focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg
                       hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
