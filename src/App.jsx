function App() {

  return (
    <>
     
      <nav className="bg-linear-65 from-purple-500 to-pink-500 text-white sticky top-0 z-50 ">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 container mx-auto">
            <span className="font-bold text-2xl">🧼 Beauty</span>
         </div>
          <ul className="hidden md:flex space-x-6 font-bold">
            <li><a href="#home" className="hover:text-gray-200">Home</a></li>
            <li><a href="#about" className="hover:text-gray-200">About</a></li>
            <li><a href="#contact" className="hover:text-gray-200">Galery</a></li>
            <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="bg-linear-65 from-pink-500 to-purple-500">
         <section className="container mx-auto p-6 flex flex-col md:flex-row items-center gap-8">
  <div className="w-full md:w-1/2 border-white  border-4 rounded-2xl shadow-lg shadow-pink-300">
    <iframe 
      className="aspect-video w-full rounded-lg shadow-lg" 
      src="https://www.youtube.com/embed/cfc_QUVU00Q"
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowFullScreen>
    </iframe>
  </div>


  <div className="w-full md:w-1/2">
    <h2 className="font-bold text-3xl hover:opacity-80 transition shadow-lg py-2 shadow-pink-300 rounded-2xl ">Unlock Your Natural Glow 🍂</h2>
    <p className="text-sm mt-5 text-justify leading-relaxed">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius in nesciunt accusamus aut, ea molestias corrupti aliquid earum dolores maiores blanditiis minus neque eligendi! Vitae corrupti quia mollitia excepturi consequuntur.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sit reiciendis fugiat quos sunt repudiandae, facere blanditiis expedita necessitatibus, recusandae cumque odio maxime in, at molestias enim error maiores cum.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi magni reprehenderit quaerat modi dicta nostrum excepturi tenetur, beatae possimus, assumenda quae perferendis repudiandae ducimus corrupti ipsam voluptates velit? Possimus, numquam!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit a alias delectus libero esse perspiciatis nostrum fugit quam suscipit voluptas architecto ex doloremque magnam numquam, sint assumenda officia consectetur qui?Lorem ipsum dolor sit amet consectetur adipisicing elit.

    </p>
  </div>
</section>

<section className="p-6 ">
  <h2 className="font-bold text-3xl hover:opacity-80 transition shadow-lg py-2 shadow-pink-300 rounded-2xl w-1/2">
      Galeryy 🌸
  </h2>
  <div className=" flex flex-col md:flex-row items-start gap-8 container mx-auto">
    <p className="text-justify mt-3 text-sm md:w-1/2 w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Nulla maxime in minus possimus libero architecto quibusdam assumenda ab animi, quo 
       eum similique quis nihil tempore ea vitae. Pariatur, suscipit ad! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab unde temporibus possimus! Quod reiciendis, dolor 
       laborum temporibus adipisci cum veniam a iusto soluta unde necessitatibus eius commodi quaerat distinctio tempore.
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod suscipit maxime itaque pariatur molestias rerum, officiis eveniet possimus in ullam expedita asperiores, 
       quibusdam cupiditate! Dicta minima perspiciatis veniam laborum suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus autem quaerat quis, itaque incidunt ab officia esse soluta ad doloremque blanditiis nulla at quidem laudantium, voluptatem minus deleniti dolorum excepturi!
       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est at neque facilis mollitia ut necessitatibus officia error sint omnis, aspernatur a odio hic, minus nostrum ipsum maiores eius libero explicabo?
       Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Nulla maxime in minus possimus libero architecto quibusdam assumenda ab animi, quo 
       eum similique quis nihil tempore ea vitae. Pariatur, suscipit ad! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab unde temporibus possimus! Quod reiciendis, dolor 
       laborum temporibus adipisci cum veniam a iusto soluta unde necessitatibus eius commodi quaerat distinctio tempore.
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod suscipit maxime itaque pariatur molestias rerum, officiis eveniet possimus in ullam expedita asperiores, 
       quibusdam cupiditate! Dicta minima perspiciatis veniam laborum suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus autem quaerat quis, itaque incidunt ab officia esse soluta ad doloremque blanditiis nulla at quidem laudantium, voluptatem minus deleniti dolorum excepturi!
       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est at neque facilis mollitia ut necessitatibus officia error sint omnis, aspernatur a odio hic, minus nostrum ipsum maiores eius libero explicabo?
       </p>

       <div className="grid grid-cols-2 h-100 gap-8 w-full md:w-1/2">
          <div><img src="public/skincare1.jpg" className="border-white border-4 rounded-2xl shadow-lg shadow-pink-300 " alt="" /></div>
          <div><img src="public/skincare2.jpg" className="border-white border-4 rounded-2xl shadow-lg shadow-pink-300 " alt="" /></div>
          <div><img src="public/skincare2.jpg" className="border-white border-4 rounded-2xl shadow-lg shadow-pink-300 " alt="" /></div>
          <div><img src="public/skincare1.jpg" className="border-white border-4 rounded-2xl shadow-lg shadow-pink-300 " alt="" /></div>
      </div>
  </div>
</section>

<section id="contact" className="py-20 bg-linear-65 from-pink-500 to-purple-500 text-gray-800">
  <div className="container mx-auto p-6 items-end flex flex-col gap-8">
    <h2 className="font-bold text-3xl hover:opacity-80 transition shadow-lg py-2 shadow-pink-300 rounded-2xl w-1/2">
      Contact Us
    </h2>
  </div>
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row gap-16 items-center">
      
      {/* Kolom Kiri: Info Kontak */}
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold text-pink-600 mb-6 hover:text-white hover:scale-100">Get in Touch ✨</h2>
        <p className="text-lg mb-8 opacity-80  hover:text-white hover:scale-100">
          Punya pertanyaan tentang produk atau ingin konsultasi kulit gratis? Jangan ragu untuk menghubungi kami.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-pink-100 p-3 rounded-full text-pink-600 ">📍</div>
            <p className="font-medium  hover:text-white hover:scale-100">Jl. Kecantikan No. 123, Jakarta Selatan</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-pink-100 p-3 rounded-full text-pink-600">📧</div>
            <p className="font-medium hover:text-white hover:scale-100" >hello@beautyglow.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">💬</div>
            <p className="font-medium  hover:text-white hover:scale-100">+62 812-3456-7890 (WhatsApp Only)</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-10 flex space-x-4">
          <a href="#" className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition">IG</a>
          <a href="#" className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition">TIK</a>
        </div>
      </div>

      {/* Kolom Kanan: Form Pesan */}
      <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama Anda" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Email@anda.com" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Pesan</label>
            <textarea 
              rows="4" 
              placeholder="Apa yang bisa kami bantu?" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            ></textarea>
          </div>
          <button className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-pink-700 transition transform hover:-translate-y-1">
            Kirim Pesan Sekarang
          </button>
        </form>
      </div>

    </div>
  </div>
</section>
      </div>
   

 <nav className="bg-linear-65 from-purple-500 to-pink-500 text-white ">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-2xl">Lorem</span>
         </div>
          <div className="hidden md:flex space-x-6 font-bold">
           &copy; 2026 All rights 
          </div>
        </div>
      </nav>
   
      
    </>
  )
}

export default App
