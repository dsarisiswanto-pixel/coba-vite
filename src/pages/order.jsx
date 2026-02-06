import { useEffect, useState } from "react";
import api from "../api/api";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiX,
  FiPlus,
  FiEdit,
  FiTrash,
} from "react-icons/fi";

export default function Order() { 
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [notif, setNotif] = useState({ show: false, message: "" });

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [form, setForm] = useState({
    user_id: "",
    product_id: "",
    total: "",
    status: "Pending",
  });


useEffect(() => {
 const fetchProducts = async () => {
  try {
    const res = await api.get("/products-all"); // ✅ SEMUA PRODUK
    setProducts(res.data || []);
  } catch {
    setProducts([]);
  }
};


  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders", {
        params: {
          page,
          status: statusFilter !== "All" ? statusFilter : undefined,
        },
      });

      setOrders(res.data?.data || []);

      setLastPage(
        res.data?.meta?.last_page ||
        res.data?.last_page ||
        1
      );
    } catch {
      setOrders([]);
    }
  };

  fetchProducts();
  fetchOrders();
}, [page, statusFilter]);

  const handleSave = async () => {
    try {
      if (!form.user_id || !form.product_id || !form.total) {
        setNotif({ show: true, message: "Semua field wajib diisi " });
        return;
      }

      if (editId) {
        await api.put(`/orders/${editId}`, { status: form.status });
        setNotif({ show: true, message: "Order berhasil diperbarui ✅" });
      } else {
        await api.post("/orders", form);
        setNotif({ show: true, message: "Order berhasil ditambahkan 🎉" });
      }

      const res = await api.get("/orders", { params: { page } });

const last =
  res.data?.meta?.last_page ||
  res.data?.last_page ||
  1;

setOrders(res.data?.data || []);
setLastPage(last);
setPage(last);


      setShowModal(false);
      setEditId(null);
      setForm({ user_id: "", product_id: "", total: "", status: "Pending" });

    } catch {
      setNotif({ show: true, message: "Terjadi kesalahan" });
    }
  };

  const handleEdit = (o) => {
    setEditId(o.id);
    setForm({
      user_id: o.user_id,
      product_id: o.product_id,
      total: o.total,
      status: o.status,
    });
    setShowModal(true);
  };

  
  const handleDelete = async () => {
    try {
      await api.delete(`/orders/${confirmDelete}`);
      setConfirmDelete(null);

      const res = await api.get("/orders", { params: { page } });

      setOrders(res.data?.data || []);
      setLastPage(
        res.data?.meta?.last_page ||
        res.data?.last_page ||
        1
      );

      setNotif({ show: true, message: "Order berhasil dihapus 🗑️" });
    } catch {
      setNotif({ show: true, message: "Gagal menghapus order ❌" });
    }
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("token");

  localStorage.setItem("logout_success", "true");

  window.location.href = "/login";
};



 const filteredOrders = orders.filter((o) => {
  const matchSearch = search
    ? o.user?.name?.toLowerCase().includes(search.toLowerCase())
    : true;

  const matchCategory =
    categoryFilter === "All"
      ? true
      : o.product?.category?.toLowerCase() === categoryFilter.toLowerCase();

  return matchSearch && matchCategory;
  
});


  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

          <div
            className={`fixed inset-y-0 left-0 z-40 w-64 bg-pink-100 shadow
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          >
            <div className="p-4">
              <h2 className="text-3xl font-bold text-pink-500 mb-6">🔐 Admin</h2>

              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="/dashboard"
                    className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50"
                  >
                    <FiHome /> Dashboard
                  </a>
                </li>

                <li>
                  <a
                    href="/product"
                    className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50"
                  >
                    <FiBox /> Products
                  </a>
                </li>

                <li>
                  <a
                    href="/order"
                    className="flex gap-3 px-4 py-2 rounded-lg bg-pink-200 text-pink-600"
                  >
                    <FiShoppingCart /> Orders
                  </a>
                </li>

                <li>
                <button
            onClick={() => setShowLogoutModal(true)}
            className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50"
          >

                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
      </div>

      <main className="flex-1 md:ml-64 p-6 space-y-6">
        <button onClick={() => setOpen(true)} className="md:hidden bg-pink-500 text-white p-2 rounded">
          <FiMenu />
        </button>

        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Search customer..."
            className="border px-4 py-2 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="All">All Status</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Completed</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="All">All Category</option>
            <option>Skincare</option>
            <option>MakeUp</option>
            <option>BodyCare</option>
          </select>

          <button
            onClick={() => {
              setEditId(null);
              setForm({ user_id: "", product_id: "", total: "", status: "Pending" });
              setShowModal(true);
            }}
            className="bg-pink-500 text-white px-4 py-2 rounded-xl flex gap-2"
          >
            <FiPlus /> Add Order
          </button>
        </div>


        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody >
              {filteredOrders.map((o) => (
                <tr key={o.id} className="odd:bg-white even:bg-pink-50 hover:bg-pink-100 transition">
                  <td className="px-6 py-4">{o.date || "-"}</td>
                  <td className="px-6 py-4">{o.user?.name || "-"}</td>
                  <td className="px-6 py-4">{o.product?.name || "-"}</td>
                  <td className="px-6 py-4">{o.product?.category || "-"}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    Rp {Number(o.total || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEdit(o)} className="text-blue-500">
                        <FiEdit />
                      </button>
                      <button onClick={() => setConfirmDelete(o.id)} className="text-red-500">
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end items-center gap-4 px-6 py-4 border-t">
              <span className="text-sm text-gray-500">
                Page <b>{page}</b> / {lastPage}
              </span>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Prev
                </button>

                <button
                  disabled={page === lastPage}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
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
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-3">
            <h2 className="text-lg font-semibold text-center">
              {editId ? "Edit Order" : "Tambah Order"}
            </h2>

            <input
              placeholder="User ID"
              className="border p-2 w-full rounded"
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: e.target.value })}
            />

            <select
              className="border p-2 w-full rounded"
              value={form.product_id}
              onChange={(e) => setForm({ ...form, product_id: e.target.value })}
            >
              <option value="">Pilih Produk</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Total"
              className="border p-2 w-full rounded"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
            />

            <select
              className="border p-2 w-full rounded"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Completed</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSave} className="bg-pink-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center space-y-4">
            <p>Yakin ingin menghapus order?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setConfirmDelete(null)}>Batal</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {notif.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-xl text-center space-y-3">
            <p>{notif.message}</p>
            <button
              onClick={() => setNotif({ show: false, message: "" })}
              className="bg-pink-500 text-white px-4 py-1 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
