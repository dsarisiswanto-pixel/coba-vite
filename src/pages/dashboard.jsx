import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiLogOut,
  FiDollarSign,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";



const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const SummaryCard = ({ title, value, icon, color }) => {

  const cardStyles = {
    pink: { bg: "from-pink-100 to-pink-200", text: "text-pink-600", iconBg: "bg-pink-500" },
    purple: { bg: "from-purple-100 to-purple-200", text: "text-purple-600", iconBg: "bg-purple-500" },
    amber: { bg: "from-yellow-100 to-yellow-200", text: "text-yellow-600", iconBg: "bg-yellow-500" },
    green: { bg: "from-green-100 to-green-200", text: "text-green-600", iconBg: "bg-green-500" },
  };

  const style = cardStyles[color] || cardStyles.pink;

  return (
    <div className={`bg-gradient-to-r ${style.bg} p-4 rounded-lg shadow-sm border border-white/50`}>
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-sm ${style.text} mb-2 font-medium`}>{title}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${style.iconBg} text-white p-3 rounded-full shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
};



export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const [summary, setSummary] = useState({
    sales: 0,
    products: 0,
    orders: 0,
    customers: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const hasSeenWelcome = localStorage.getItem("welcome_admin");
    if (!hasSeenWelcome) {
      setModal({
        show: true,
        type: "success",
        message: "Selamat datang Admin 💖",
      });
      localStorage.setItem("welcome_admin", "true");
    }
  }, [navigate]);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard", {
          params: { page, limit: 5 },
        });

        setSummary(res.data?.summary || {
          sales: 0,
          products: 0,
          orders: 0,
          customers: 0,
        });

        setChartData(res.data?.chart || []);
        setOrders(res.data?.orders?.data || []);
        setLastPage(res.data?.orders?.last_page || 1);

      } catch (err) {
        console.error("Dashboard API error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchDashboard();
  }, [page, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("welcome_admin");
    localStorage.setItem("logout_success", "true");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-700">
      

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-pink-100 shadow-xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-pink-500">🔐 Admin</h2>
            <button className="md:hidden text-pink-500" onClick={() => setOpen(false)}>
              <FiX size={24} />
            </button>
          </div>
           <ul className="space-y-3 text-gray-600">
            <li>
              <a href="/dashboard" className="flex gap-3 px-4 py-2 rounded-lg  bg-pink-200 text-pink-600 ">
                <FiHome /> Dashboard
              </a>
            </li>
            <li>
              <a href="/product" className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50">
                <FiBox /> Products
              </a>
            </li>
            <li>
              <a href="/order" className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50">
                <FiShoppingCart /> Orders
              </a>
            </li>
            <li>
             <button
              onClick={() => setShowLogoutModal(true)}
              className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50">
                <FiLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <div className="flex-1 p-4 sm:p-6 md:p-8 md:ml-64 w-full">
        <button onClick={() => setOpen(true)} className="md:hidden mb-6 bg-pink-500 text-white p-2 rounded-lg shadow-lg">
          <FiMenu size={20} />
        </button>

        <h1 className="text-3xl font-bold mb-6 mt-3 text-gray-800">Dashboard</h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="Total Sales" value={`Rp ${summary.sales.toLocaleString()}`} icon={<FiDollarSign />} color="pink" />
          <SummaryCard title="Products" value={summary.products} icon={<FiBox />} color="purple" />
          <SummaryCard title="Orders" value={summary.orders} icon={<FiShoppingCart />} color="amber" />
          <SummaryCard title="Customers" value={summary.customers} icon={<FiUsers />} color="green" />
        </div>


        <div className="bg-white rounded-xl shadow-sm mt-8 p-6 border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">Sales Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="right" iconType="circle" />
                <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={4} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="orders" stroke="#a855f7" strokeWidth={4} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-sm mt-8 overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-gray-800 text-lg">Recent Orders</h2>
              <p className="text-sm text-gray-400">Latest transactions</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4 text-right">Total</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-pink-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-pink-600">#{o.id}</td>
                    <td className="px-6 py-4 font-medium">{o.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{o.product}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800">{o.total}</td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-end items-center gap-3 border-t border-gray-50 bg-gray-50/30">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-semibold disabled:opacity-40 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              Prev
            </button>
            <span className="text-sm font-bold text-gray-500">{page} / {lastPage}</span>
            <button
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-semibold disabled:opacity-40 hover:bg-pink-50 hover:text-pink-600 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-xs p-8 text-center shadow-2xl animate-in zoom-in duration-300">
            <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4 text-2xl ${modal.type === "error" ? "bg-red-100 text-red-500" : "bg-pink-100 text-pink-500"}`}>
              {modal.type === "error" ? "✖" : "💖"}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{modal.type === "error" ? "Oops!" : "Welcome"}</h2>
            <p className="text-sm text-gray-500 mb-8">{modal.message}</p>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="w-full py-3 rounded-xl text-white font-bold bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-200 transition-all active:scale-95"
            >
              Oke
            </button>
          </div>
        </div>
      )}

  {showLogoutModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 animate-scale">
                  
                  <h2 className="text-xl font-bold text-pink-500 mb-3">
                    Logout
                  </h2>

                  <p className="text-gray-500 mb-6">
                    Apakah kamu yakin ingin logout?
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                    >
                      Batal
                    </button>

                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
                    >
                      Ya, Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
}