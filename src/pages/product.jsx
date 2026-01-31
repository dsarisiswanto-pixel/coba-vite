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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      images: [],
      date: "",
    });
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

    setCurrentPage(1);
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
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

                <ul className="space-y-3 text-gray-600    ">
                <li className="hover:bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-3">
                    <FiHome /> <a href="http:/dashboard"> Dashboard </a>
                </li>
                <li className=" bg-pink-100 text-pink-500 px-4 py-2 rounded-lg flex items-center gap-3">
                    <FiBox /><a href="http:/product"> Products </a>
                </li>
                <li className="hover:bg-pink-50  px-4 py-2 rounded-lg flex items-center gap-3">
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
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
        />
      )}


      <main className="flex-1 md:ml-64 p-4 md:p-8 space-y-6">
        <button
          className="md:hidden bg-pink-500 text-white p-2 rounded-lg"
          onClick={() => setOpen(true)}
        >
          <FiMenu />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-400">Manage your product</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-5 rounded-2xl shadow-sm">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search product..."
            className="border rounded-xl px-4 py-2 w-full md:w-72"
          />

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-pink-500 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <FiPlus /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-pink-50">
              <tr>
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
              {paginatedProducts.map((item) => (
                <tr key={item.id} className="hover:bg-pink-50">
                  <td className="p-4">{item.date}</td>
                  <td className="p-4 flex items-center gap-3">
                    <img src={item.images[0]} className="w-10 h-10 rounded-xl" />
                    {item.name}
                  </td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">Rp {item.price.toLocaleString()}</td>
                  <td className="p-4">{item.stock}</td>
                  <td className="p-4">
                    {item.stock > 50 ? "Available" : "Low Stock"}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-500">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500">
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-wrap gap-4 justify-between items-center p-4 border-t text-sm">
            <span className="text-gray-500">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filtered.length)} of {filtered.length} entries
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

   
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl"
            />
            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border px-4 py-2 rounded-xl"
            />

            <input type="file" multiple onChange={handleImages} />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="border px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-pink-500 text-white px-5 py-2 rounded-xl"
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
