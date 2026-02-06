import { useEffect, useState } from "react";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiPlus,
  FiEdit,
  FiTrash,
} from "react-icons/fi";
import api from "../api/api";

export default function Product() {
const [open, setOpen] = useState(false);
const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);
const [editId, setEditId] = useState(null);
const [products, setProducts] = useState([]);
const [confirmDelete, setConfirmDelete] = useState(null);
const [notif, setNotif] = useState({ show: false, message: "" });
const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);
const [showLogoutModal, setShowLogoutModal] = useState(false);

const [form, setForm] = useState({
  date: "",
  name: "",
  category: "",
  price: "",
  stock: "",
  image: null,
});

const imagePreview = form.image
  ? form.image instanceof File
    ? URL.createObjectURL(form.image)
    : form.image
  : null;
  const fetchProducts = async (pageParam = page) => {
  try {
    const res = await api.get("/products", { params: { page: pageParam } });
    setProducts(res.data?.data || []);
    setLastPage(res.data?.meta?.last_page || res.data?.last_page || 1);
  } catch (err) {
    console.error(err);
    setProducts([]);
  }
};

useEffect(() => {
  fetchProducts();
}, [page]);

const handleSave = async () => {

  if (!form.date || !form.name || !form.category || !form.price || !form.stock) {
    setNotif({ show: true, message: "Semua field wajib diisi " });
    return;
  }

  try {
    const fd = new FormData();
    fd.append("date", form.date);
    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("price", form.price);
    fd.append("stock", form.stock);
    if (form.image instanceof File) fd.append("image", form.image);

    if (editId) {
      await api.post(`/products/${editId}`, fd);
      setNotif({ show: true, message: "Produk berhasil diperbarui 💖" });
    } else {
      await api.post("/products", fd);
      setNotif({ show: true, message: "Produk berhasil ditambahkan 🎉" });
    }

    await fetchProducts();
    setShowModal(false);
    setEditId(null);
  } catch (err) {
    console.error(err);
    setNotif({ show: true, message: "Gagal menyimpan produk ❌" });
  }
};



const handleEdit = (p) => {
  setEditId(p.id);
  setForm({
    date: p.date,
    name: p.name,
    category: p.category,
    price: p.price,
    stock: p.stock,
    image: p.image ? `http://127.0.0.1:8000/storage/${p.image}` : null,
  });
  setShowModal(true);
};

const handleDelete = async () => {
  try {
    await api.delete(`/products/${confirmDelete}`);
    setConfirmDelete(null);
    await fetchProducts();
    setNotif({ show: true, message: "Produk berhasil dihapus 🗑️" });
  } catch (err) {
    console.error(err);
    setNotif({ show: true, message: "Gagal menghapus produk ❌" });
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");


  localStorage.setItem("logout_success", "true");

  window.location.href = "/login";
};



const filtered = products.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

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
              <a href="/dashboard" className="flex gap-3 px-4 py-2 rounded-lg hover:bg-pink-50">
                <FiHome /> Dashboard
              </a>
            </li>
            <li>
              <a href="/product" className="flex gap-3 px-4 py-2 rounded-lg bg-pink-200 text-pink-600">
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
      <main className="flex-1 md:ml-64 p-6 space-y-6">
        <button onClick={() => setOpen(true)} className="md:hidden bg-pink-500 text-white p-2 rounded">
          <FiMenu />
        </button>

        <div className="flex justify-between">
          <input
            className="border px-4 py-2 rounded-xl"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setEditId(null);
              setForm({
                date: "",
                name: "",
                category: "",
                price: "",
                stock: "",
                image: null,
              });
              setShowModal(true);
            }}
            className="bg-pink-500 text-white px-4 py-2 rounded-xl flex gap-2"
          >
            <FiPlus /> Add Product
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-pink-100 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="odd:bg-white even:bg-pink-50 hover:bg-pink-100 transition">
                  <td className="px-6 py-4">
                    {p.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${p.image}`}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt=""
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{p.date}</td>
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    Rp {Number(p.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">{p.stock}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEdit(p)} className="p-2 bg-blue-50 text-blue-600 rounded-full">
                        <FiEdit />
                      </button>
                      <button onClick={() => setConfirmDelete(p.id)} className="p-2 bg-red-50 text-red-600 rounded-full">
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
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

            <h2 className="text-lg font-semibold text-center">
              {editId ? "Edit Product" : "Tambah Product"}
            </h2>

            {imagePreview && (
              <div className="flex justify-center">
                <img
                  src={imagePreview}
                  className="w-28 h-28 object-cover rounded-xl border"
                />
              </div>
            )}

            {["date", "Fw Centella G2G ", "Skincare, Makeup", "Bodycare", "10"].map((f) => (
              <input
                key={f}
                type={f === "date" ? "date" : f === "price" || f === "stock" ? "number" : "text"}
                placeholder={f}
                className="border p-2 w-full rounded-lg"
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              />
            ))}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
            />

            <div className="flex justify-end gap-2">
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
          <div className="bg-white rounded-xl p-6 text-center space-y-4">
            <p>Yakin ingin menghapus produk?</p>
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
