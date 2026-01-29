import { useState } from "react";
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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Brightening Serum",
      category: "Skincare",
      price: 150000,
      stock: 120,
      images: ["https://picsum.photos/60?1"],
      date: "2026-01-26",
    },
    {
      id: 2,
      name: "Hydrating Moisturizer",
      category: "Skincare",
      price: 120000,
      stock: 30,
      images: ["https://picsum.photos/60?2"],
      date: "2026-01-26",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    images: [],
    date: "",
  });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ name: "", category: "", price: "", stock: "", images: [], date: "" });
    setEditId(null);
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });
  };

  const handleSave = () => {
    if (!form.name || !form.category) return;
    if (editId) {
      setProducts(
        products.map((p) =>
          p.id === editId
            ? { ...p, ...form, price: +form.price, stock: +form.stock }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...form,
          price: +form.price,
          stock: +form.stock,
        },
      ]);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      images: item.images,
      date: item.date,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
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

          <ul className="space-y-3 text-gray-600">
            <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
              <FiHome /> <a href="/dashboard">Dashboard</a>
            </li>
            <li className="bg-pink-100 text-pink-500 px-4 py-2 rounded-lg flex items-center gap-3">
              <FiBox /> <a href="/product">Products</a>
            </li>
            <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
              <FiShoppingCart /> <a href="/order">Orders</a>
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
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
        />
      )}

      <main className="flex-1 p-4 md:p-8 md:ml-64 space-y-6">
        <button
          onClick={() => setOpen(true)}
          className="md:hidden bg-pink-500 text-white p-2 rounded-lg"
        >
          <FiMenu />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-400">Manage your product</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:justify-between bg-white p-5 rounded-2xl shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="border rounded-xl px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-5 py-2 rounded-xl flex gap-2 items-center shadow"
          >
            <FiPlus /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-pink-50">
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide">
                <th className="p-4">Date</th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-pink-50/40 transition">
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.images}
                      className="w-10 h-10 rounded-xl object-cover border"
                    />
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </td>

                  <td className="p-4">{item.category}</td>
                  <td className="p-4">Rp {item.price.toLocaleString()}</td>
                  <td className="p-4">{item.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.stock > 50
                          ? "bg-green-100 text-green-700"
                          : item.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.stock > 50
                        ? "Available"
                        : item.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-gray-800">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="w-full text-sm"
              />
              {form.images && form.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {form.images.map((img, i) => (
                    <img
                      key={i}
                      src={
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      }
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4 py-2 rounded-xl border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-pink-500 hover:bg-pink-600 transition text-white px-5 py-2 rounded-xl shadow"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
