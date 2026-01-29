import { useEffect, useRef, useState } from "react";

function Landingpage(){
      const [open, setOpen] = useState(false);
      const [active, setActive] = useState("home");
      const revealRefs = useRef([]);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.remove("opacity-0", "translate-y-10");
                entry.target.classList.add("opacity-100", "translate-y-0");
              }
            });
          },
          { threshold: 0.2 }
        );
        revealRefs.current.forEach((el) => el && observer.observe(el));
      }, []);
    
      const scrollTo = (id) => {
        setActive(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      };
    
      const buyAlert = (name) => {
        alert(`${name} ditambahkan ke keranjang 🛒`);
      };
    return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <nav className="bg-gradient-to-bl from-pink-200 to-pink-500 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <img src="/Logo_desain_Brana_dengan_daun_dan_tetesan-removebg-preview.png" className="h-20 hover:scale-110 transition duration-300" />
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {["home", "shop", "faq", "contact"].map((item) => (
            <li
              key={item}
              onClick={() => scrollTo(item)}
              className={`cursor-pointer transition duration-300 hover:scale-110 hover:text-pink-800 ${
                active === item ? "text-pink-900 font-bold drop-shadow-lg" : ""
              }`}
            >
              {item.toUpperCase()}
            </li>
          ))}
        </ul>
        {open && (
          <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-bl from-pink-200 to-pink-500">
            <ul className="flex flex-col px-6 py-6 gap-6 text-white font-medium">
              {["home", "shop", "faq", "contact"].map((item) => (
                <li key={item} onClick={() => scrollTo(item)} className="hover:text-pink-800 transition">
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-3xl">☰</button>
      </nav>

      <section id="home" className="bg-gradient-to-r from-pink-100 to-purple-100 px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-bold text-pink-900 hover:scale-105 transition drop-shadow-lg">
            Reveal Your <br /> Natural Glow
          </h2>
          <p className="mt-4 text-gray-700 hover:text-pink-600 transition">
            Achieve radiant, healthy skin with our best-selling skincare.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 hover:scale-105 transition shadow-lg shadow-pink-300">
              Shop Now
            </button>
            <button className="border border-pink-500 text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-50 hover:scale-105 transition"><a href="">
              Learn More
              </a>
            </button>
          </div>
        </div>
        <img src="/ChatGPT_Image_22_Jan_2026__10.12.41-removebg-preview.png" className="mx-auto max-w-full hover:scale-110 transition duration-300" />
      </section>

      <section id="faq" className="px-6 md:px-12 py-16 bg-white">
        <h3 className="text-center text-3xl font-bold text-pink-600 drop-shadow-lg mb-10">
          Trusted by Many
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Dermatologist Tested","BPOM Approved","Natural Ingredients","Visible Results"].map((item, i) => (
            <div
              key={i}
              ref={(el) => (revealRefs.current[i] = el)}
              className="opacity-0 translate-y-10 transition-all duration-700 p-6 rounded-xl text-center bg-pink-100 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-pink-400 border-2 border-pink-300 text-pink-800"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="px-6 md:px-12 py-20 bg-gray-50">
        <h3 className="text-center text-3xl font-bold text-pink-700 drop-shadow-lg mb-12">
          Best Sellers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[{name:"Purifying Cleanse",img:"/3-removebg-preview.png"},{name:"Radiance Serum",img:"/1-removebg-preview.png"},{name:"Hydra Glow Cream",img:"/2-removebg-preview.png"}].map((product, i) => (
            <div
              key={i}
              ref={(el) => (revealRefs.current[i + 10] = el)}
              className="opacity-0 translate-y-10 transition-all duration-700 bg-pink-50 p-6 rounded-xl text-center hover:scale-105 hover:shadow-2xl hover:shadow-pink-500"
            >
              <img src={product.img} className="mx-auto hover:scale-110 transition" />
              <p className="mt-4 text-lg font-bold text-pink-700 drop-shadow">{product.name}</p>
              <p className="font-semibold mt-2">Rp 190.000</p>
              <button onClick={() => buyAlert(product.name)} className="mt-4 bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 hover:scale-105 transition shadow-lg shadow-pink-400">
                🛒
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        ref={(el) => (revealRefs.current[20] = el)}
        className="opacity-0 translate-y-10 transition-all duration-700 relative px-6 md:px-12 py-24 bg-gradient-to-r from-pink-100 to-purple-100 overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"></div>

        <h3 className="text-center text-4xl font-bold text-pink-700 drop-shadow-lg mb-14">
          Let’s Glow Together ✨
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            {[
              {t:"💬 Chat With Us",d:"Punya pertanyaan tentang produk atau skincare routine? Tim kami siap bantu."},
              {t:"📍 Visit Our Store",d:"Blitar, Indonesia\nOpen Everyday 09.00 – 21.00"},
              {t:"📞 Customer Care",d:"+62 812-3456-7890\nsupport@skincare.com"},
            ].map((c,i)=>(
              <div
                key={i}
                ref={(el) => (revealRefs.current[21 + i] = el)}
                className="opacity-0 translate-y-10 transition-all duration-700 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:shadow-pink-400 hover:scale-105"
              >
                <h4 className="text-xl font-bold text-pink-700 drop-shadow mb-2">{c.t}</h4>
                <p className="text-gray-600 whitespace-pre-line">{c.d}</p>
              </div>
            ))}
          </div>

          <div
            ref={(el) => (revealRefs.current[30] = el)}
            className="opacity-0 translate-y-10 transition-all duration-700 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-2 border-pink-400 hover:shadow-pink-500"
          >
            <form className="flex flex-col gap-6">
              <input required className="border border-pink-300 px-5 py-4 rounded-xl focus:ring-2 focus:ring-pink-400" placeholder="Nama" />
              <input required className="border border-pink-300 px-5 py-4 rounded-xl focus:ring-2 focus:ring-pink-400" placeholder="Email" />
              <textarea rows="4" className="border border-pink-300 px-5 py-4 rounded-xl focus:ring-2 focus:ring-pink-400" placeholder="Pesan" />
              <button
                type="button"
                onClick={() => alert("Pesananmu sudah terkirim 💟 Terima kasih sudah memesan 🫰🏻")}
                className="bg-pink-500 text-white py-4 rounded-xl hover:bg-pink-600 hover:scale-105 transition shadow-lg shadow-pink-400"
              >
                Send Message ✨
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-bl from-pink-200 to-pink-500 text-white flex justify-between px-6 py-6">
        <div>© 2024 Skincare Brand</div>
        <div>All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default Landingpage;