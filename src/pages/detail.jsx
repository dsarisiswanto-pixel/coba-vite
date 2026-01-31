import { useState } from "react";

const products = [
 {id:1,name:"Facial Treatment",img:"/1-removebg-preview.png",desc:"Perawatan wajah profesional"},
 {id:2,name:"Skin Care Set",img:"/2-removebg-preview.png",desc:"Paket skincare lengkap"},
 {id:3,name:"Glow Package",img:"/3-removebg-preview.png",desc:"Paket glowing"},
 {id:4,name:"Acne Care",img:"/1-removebg-preview.png",desc:"Perawatan jerawat"},
 {id:5,name:"Brightening",img:"/2-removebg-preview.png",desc:"Mencerahkan wajah"},
 {id:6,name:"Premium Glow",img:"/3-removebg-preview.png",desc:"Perawatan premium"},
];

function Detail(){

const [selected,setSelected] = useState(null);

    return(

        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gradient-to-bl from-pink-200 to-pink-500 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <img src="/Logo_desain_Brana_dengan_daun_dan_tetesan-removebg-preview.png" className="h-20 hover:scale-110 transition duration-300" />
            </nav>

            <div className="p-10">
                {!selected && (
                    <section>
                        <h2 className="text-3xl font-bold text-center text-pink-700 mb-12">
                            Featured Products
                        </h2>
                        <div className="grid md:grid-cols-3 gap-10">
                            {products.map(p=>(
                        <div key={p.id} className="bg-white rounded-xl shadow hover:scale-105 transition">
                            <img src={p.img} className="h-40 mx-auto p-4"/>
                            <div className="p-5 text-center">
                                <h3 className="font-bold">{p.name}</h3>
                                <button onClick={()=>setSelected(p)} className="mt-4 border border-pink-500 text-pink-500 px-4 py-2 rounded hover:bg-pink-500 hover:text-white">
                                    Detail
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                    </section>
                )}
                {selected && (
                    <section className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow text-center">
                        <img src={selected.img} className="h-48 mx-auto"/>
                        <h1 className="text-3xl font-bold mt-5 text-pink-600">
                            {selected.name}
                        </h1>
                        <p className="mt-3 text-gray-600">
                            {selected.desc}
                        </p>
                        <button onClick={()=>setSelected(null)} className="mt-6 bg-pink-500 text-white px-6 py-2 rounded">
                            Kembali
                        </button>
                    </section>
                )}
                
                <div className="mt-10">
                    <button className="bg-pink-300 py-2 p-2 rounded-lg hover:bg-pink-400 hover:scale-105">
                        <a href="http:/">
                            Kembali
                        </a> 
                    </button>
                </div>
                </div>
                <footer className="bg-gradient-to-bl from-pink-200 to-pink-500 text-white flex justify-between px-6 py-6">
                    <div>© 2024 Skincare Brand</div>
                    <div>All Rights Reserved</div>
                </footer>
                </div>
                );
            }

export default Detail;
