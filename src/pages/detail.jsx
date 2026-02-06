import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Detail() {
  const [featured, setFeatured] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/featured-products");
        setFeatured(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setFeatured([]);
      }
    };
    fetchFeatured();
  }, []);


  const getImage = (item) =>
    item?.product?.image
      ? `http://127.0.0.1:8000/storage/${item.product.image}`
      : "https://via.placeholder.com/300x200?text=No+Image";

  const getPrice = (item) =>
    Number(
      item?.total ??                
      item?.total_price ??
      item?.product?.price ??
      item?.product?.harga ??
      0
    ).toLocaleString("id-ID");

  const buttonPrimary =
    "inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold \
     bg-gradient-to-r from-pink-500 to-rose-400 text-white \
     shadow-lg shadow-pink-300/40 hover:scale-105 transition";

  const buttonOutline =
    "inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold \
     border-2 border-pink-400 text-pink-500 hover:bg-pink-100 transition";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-gray-100">
      <nav className="bg-gradient-to-bl from-pink-200 to-pink-500 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <img
          src="/Logo_desain_Brana_dengan_daun_dan_tetesan-removebg-preview.png"
          className="h-20 hover:scale-110 transition duration-300"
        />
      </nav>
      <div className="px-6 md:px-12 py-20">
        <h2 className="text-4xl font-extrabold text-center text-pink-700 mb-14">
          Completed Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {featured.map((item, i) => (
            <div
              key={item?.id || i}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl ring-1 ring-pink-200/50 overflow-hidden hover:-translate-y-2 transition"
            >
              <div className="overflow-hidden">
                <img
                  src={getImage(item)}
                  alt={item?.product?.name || "Product"}
                  className="w-full h-56 object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl text-gray-800">
                  {item?.product?.name || "Unnamed Product"}
                </h3>

                <p className="text-lg font-semibold text-pink-600 mt-1">
                  Rp {getPrice(item)}
                </p>

                <button
                  onClick={() => setSelected(item)}
                  className={`${buttonPrimary} mt-6`}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link to="/" className={buttonPrimary}>
            Kembali ke Landing Page
          </Link>
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-pink-50 rounded-t-3xl">
              <img
                src={getImage(selected)}
                alt={selected?.product?.name || "Product"}
                className="h-64 mx-auto p-6 object-contain"
              />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-pink-700">
                {selected?.product?.name || "Unnamed Product"}
              </h3>

              <p className="text-xl font-semibold text-gray-700 mt-2">
                Rp {getPrice(selected)}
              </p>

              <button
                onClick={() => setSelected(null)}
                className={`${buttonOutline} mt-8`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="bg-gradient-to-bl from-pink-200 to-pink-500 text-white flex justify-between px-6 py-6 mt-24">
        <div>© 2024 Skincare Brand</div>
        <div>All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default Detail;
