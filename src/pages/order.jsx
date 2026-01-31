    import { useState } from "react";
    import {
    FiHome,
    FiBox,
    FiShoppingCart,
    FiLogOut,
    FiMenu,
    FiX,
    FiSearch,
    } from "react-icons/fi";

    export default function Order() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const orders = [
        { id: "#001", date: "2026-01-26", customer: "Della", product: "FaceWash", total: 40000, status: "Pending" },
        { id: "#002", date: "2026-01-26", customer: "Adhisti", product: "Moisturizer", total: 48000, status: "Paid" },
        { id: "#003", date: "2026-01-26", customer: "Natalie", product: "Serum", total: 40500, status: "Completed" },
        { id: "#004", date: "2026-01-26", customer: "Manda", product: "Serum", total: 41000, status: "Completed" },
        { id: "#005", date: "2026-01-26", customer: "Andrian", product: "Lipbalm", total: 30000, status: "Pending" },
        { id: "#006", date: "2026-01-26", customer: "Daffa", product: "Cleanser", total: 20000, status: "Paid" },
        { id: "#007", date: "2026-01-26", customer: "Enggar", product: "Facewash", total: 50000, status: "Completed" },
        { id: "#008", date: "2026-01-26", customer: "Eric", product: "Moisturizer", total: 50000, status: "Completed" },
        { id: "#009", date: "2026-01-26", customer: "Cindy", product: "BodySerum", total: 70000, status: "Pending" },
        { id: "#010", date: "2026-01-26", customer: "Ebit", product: "FaceWash", total: 30000, status: "Paid" },
    ];

    const filtered = orders.filter((o) => {
        const matchSearch =
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.product.toLowerCase().includes(search.toLowerCase());

        const matchStatus = status === "All" || o.status === status;
        const matchFilter = filter === "All" || o.product === filter;

        return matchSearch && matchStatus && matchFilter;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = filtered.slice(startIndex, endIndex);

    const statusStyle = {
        Pending: "bg-yellow-100 text-yellow-700",
        Paid: "bg-blue-100 text-blue-700",
        Completed: "bg-green-100 text-green-700",
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
        
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
                <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
                    <FiHome /> <a href="http:/dashboard"> Dashboard </a>
                </li>
                <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
                    <FiBox /><a href="http:/product"> Products </a>
                </li>
                <li className=" bg-pink-100 text-pink-500 px-4 py-2 rounded-lg flex items-center gap-3">
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


        <main className="flex-1 md:ml-64 p-4 md:p-8 space-y-6">
            <button
            onClick={() => setOpen(true)}
            className="md:hidden bg-pink-500 text-white p-2 rounded-lg"
            >
            <FiMenu />
            </button>

            <div>
            <h1 className="text-2xl font-bold">Orders</h1>
            <p className="text-gray-400">Manage your customer orders</p>
            </div>

            
            <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 border px-3 py-2 rounded-xl w-64">
                <FiSearch className="text-gray-400" />
                <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                placeholder="Search order"
                className="outline-none w-full"
                />
            </div>

            <select
                value={filter}
                onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
                }}
                className="border px-4 py-2 rounded-xl text-sm"
            >
                <option value="All">All Products</option>
                <option value="FaceWash">FaceWash</option>
                <option value="Moisturizer">Moisturizer</option>
                <option value="Serum">Serum</option>
                <option value="Lipbalm">Lipbalm</option>
                <option value="Cleanser">Cleanser</option>
                <option value="BodySerum">BodySerum</option>
            </select>

            {["All", "Pending", "Paid", "Completed"].map((s) => (
                <button
                key={s}
                onClick={() => {
                    setStatus(s);
                    setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-sm ${
                    status === s
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                >
                {s}
                </button>
            ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
                <thead className="bg-gray-50 text-gray-500">
                <tr>
                    <th className="p-4 text-left">Order ID</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-left">Total</th>
                    <th className="p-4 text-left">Status</th>
                </tr>
                </thead>

                <tbody>
                {paginatedOrders.map((o) => (
                    <tr key={o.id} className="border-t hover:bg-pink-50/40">
                    <td className="p-4">{o.id}</td>
                    <td className="p-4">{o.date}</td>
                    <td className="p-4">{o.customer}</td>
                    <td className="p-4">{o.product}</td>
                    <td className="p-4">Rp {o.total.toLocaleString()}</td>
                    <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>
                        {o.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

        
            <div className="flex flex-wrap gap-4 justify-between items-center p-4 border-t text-sm">
                <span className="text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)} of{" "}
                {filtered.length} entries
                </span>

                <div className="flex items-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className={`px-3 py-1 border rounded-lg ${
                    currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-pink-50"
                    }`}
                >
                    Prev
                </button>

                <button className="px-3 py-1 rounded-lg bg-pink-500 text-white">
                    {currentPage}
                </button>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className={`px-3 py-1 border rounded-lg ${
                    currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-pink-50"
                    }`}
                >
                    Next
                </button>

                <select
                    value={itemsPerPage}
                    onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                    }}
                    className="ml-3 border px-2 py-1 rounded-lg"
                >
                    {[5, 10, 15, 20, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>
                        {n}
                    </option>
                    ))}
                </select>

                <span className="text-gray-500">per page</span>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
    }
