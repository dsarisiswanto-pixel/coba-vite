import { useState } from "react";
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



const data = [
  { name: "Jan", revenue: 400, orders: 523 },
  { name: "Feb", revenue: 700, orders: 543 },
  { name: "Mar", revenue: 500, orders: 623 },
  { name: "Apr", revenue: 900, orders: 734 },
  { name: "Mei", revenue: 800, orders: 742 },
  { name: "Jun", revenue: 780, orders: 742 },
  { name: "Jul", revenue: 750, orders: 234 },
  { name: "Agus", revenue: 650, orders: 530 },
  { name: "Sep", revenue: 905, orders: 735 },
  { name: "Okt", revenue: 654, orders: 742 },
  { name: "Nov", revenue: 324, orders: 756 },
  { name: "Des", revenue: 645, orders: 645 },
];

const orders = [
  { id: "#001", date: "2026-01-26", customer: "Della", product: "FaceWash", total: "Rp 40.000", status: "Completed" },
  { id: "#002", date: "2026-01-26", customer: "Adhisti", product: "Moisturaizer", total: "Rp 48.000", status: "Pending" },
  { id: "#003", date: "2026-01-26", customer: "Natalie", product: "Moisturaizer", total: "Rp 40.500", status: "Paid" },
  { id: "#004", date: "2026-01-26", customer: "Manda", product: "Serum", total: "Rp 41.000", status: "Completed" },
  { id: "#005", date: "2026-01-26", customer: "Andrian", product: "Liblam", total: "Rp 30.000", status: "Completed" },
  { id: "#006", date: "2026-01-26", customer: "Daffa", product: "Cleanser", total: "Rp 20.000", status: "Pending" },
  { id: "#007", date: "2026-01-26", customer: "Enggar", product: "Facewash", total: "Rp 50.000", status: "Completed" },
  { id: "#008", date: "2026-01-26", customer: "Eric", product: "Moisturaizer", total: "Rp 60.000", status: "Pending" },
  { id: "#009", date: "2026-01-26", customer: "Cindy", product: "BodySerum", total: "Rp 70.000", status: "Completed" },
  { id: "#010", date: "2026-01-26", customer: "Ebit", product: "FaceWash", total: "Rp 30.000", status: "Paid" },
];


function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-r from-pink-100 to-pink-50 shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-pink-500 font-bold text-2xl">🔐 Admin</h2>
            <button onClick={() => setOpen(false)} className="md:hidden">
              <FiX size={20} />
            </button>
          </div>

          <ul className="space-y-3 text-gray-600    ">
            <li className="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg flex items-center gap-3">
              <FiHome /> <a href="http:/dashboard"> Dashboard </a>
            </li>
            <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
              <FiBox /><a href="http:/product"> Products </a>
            </li>
            <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
              <FiShoppingCart /> <a href="http:/order">Orders</a> 
            </li>
          </ul>

          <div className="pt-4">
            <div className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3 text-gray-600">
              <FiLogOut /> Logout
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 p-4 sm:p-6 md:p-8 md:ml-64">
        <button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 bg-pink-500 text-white p-2 rounded-lg"
        >
          <FiMenu />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r hover:scale-105 from-pink-100 to-pink-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-pink-600 mb-3 hover:scale-105">Total Sales</p>
                <p className="text-xl font-bold hover:scale-105">Rp 55.000</p>
              </div>
              <div className="bg-pink-300 hover:bg-pink-400 hover:scale-105 rounded-full text-white p-3">
                <FiDollarSign />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r hover:scale-105 from-purple-100 to-purple-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-600 mb-3 hover:scale-105">Product</p>
                <p className="text-xl font-bold hover:scale-105">120</p>
              </div>
              <div className="bg-purple-300  hover:bg-purple-400 rounded-full hover:scale-105 text-white p-3">
                <FiBox />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r hover:scale-105 from-amber-100 to-amber-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-amber-600 mb-3 hover:scale-105">Orders</p>
                <p className="text-xl font-bold hover:scale-105">1,568</p>
              </div>
              <div className="bg-amber-300  hover:bg-amber-400 rounded-full hover:scale-105 text-white p-3">
                <FiShoppingCart />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 hover:scale-105 to-green-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-green-600 mb-3 hover:scale-105">Customers</p>
                <p className="text-xl font-bold hover:scale-105">55</p>
              </div>
              <div className="bg-green-300  hover:bg-green-400 rounded-full hover:scale-105 text-white p-3">
                <FiUsers />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow mt-8 p-4">
          <h2 className="font-bold mb-4">Sales Overview</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name)=> {
                                if(name === "revenue"){
                                    return `Rp ${value}`
                                } return value;
                            }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="orders" stroke="#a855f7" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow mt-8 p-6 overflow-x-hidden">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>

            <table className="w-full text-sm table-fixed">
                <thead>
                <tr className="text-gray-400 border-b">
                    <th className="text-left py-2">Order Id</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left">Customer</th>
                    <th className="text-left">Product</th>
                    <th className="text-left">Total</th>
                    <th className="text-left">Status</th>
                </tr>
                </thead>

                <tbody>
                {orders.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-pink-50">
                    <td className="py-3 truncate">{item.id}</td>
                    <td className="py-3 truncate">{item.date}</td>
                    <td className="py-3 truncate">{item.customer}</td>
                    <td className="py-3 truncate">{item.product}</td>
                    <td className="py-3 truncate">{item.total}</td>
                    <td>
                        <span
                        className={`px-3 py-1 rounded-full text-xs ${
                            item.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                        >
                        {item.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;