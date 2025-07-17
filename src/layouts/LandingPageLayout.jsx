
import { useState } from "react";
import LandingPage from "../pages/LandingPage";
import { useNavigate } from "react-router-dom";

export default function LandingPageLayout(){
const [activeTab, setActiveTab] = useState("creator");
const navigate = useNavigate();
// const [email, setEmail] = useState("");

// const handleSubmit = (e) => {
//   e.preventDefault();
//   alert(`Terima kasih! Kami akan mengirim info ke ${email}`);
//   setEmail("");
// };

    return (
      <>
        <LandingPage>
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white my-10">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-16 md:py-24 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Satu Tautan,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE] ">
                  Banyak Cerita
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
                Bangun profil online yang kuat dengan LinkSkuy. Simpan link
                sosial, katalog produk, dan semua yang penting dalam satu
                halaman keren.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-8 py-4 bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE] text-white rounded-lg hover:bg-blue-700 text-lg font-medium"
                >
                  Buat Halaman Link Kamu
                </button>
                <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-lg font-medium">
                  Lihat Contoh Halaman
                </button>
              </div>
              <div className="max-w-4xl mx-auto bg-white p-2 rounded-xl shadow-lg">
                <img
                  src="https://placehold.co/800x450?text=LinkSkuy+Dashboard+Preview"
                  alt="LinkSkuy Preview"
                  className="rounded-lg w-full"
                />
              </div>
            </section>

            {/* Logo Cloud */}
            {/* <section className="bg-gray-50 py-12">
              <div className="container mx-auto px-6">
                <p className="text-center text-gray-500 mb-8">
                  Digunakan oleh berbagai kreator dan UMKM
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {[
                    "Instagram",
                    "TikTok",
                    "Shopee",
                    "Tokopedia",
                    "WhatsApp",
                    "YouTube",
                  ].map((logo) => (
                    <div
                      key={logo}
                      className="text-gray-700 font-medium text-xl flex items-center"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </section> */}

            {/* Description */}
            <section className="container mx-auto px-6 py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bio Link Untuk Semua{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE]">
                  Link kamu
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                LinkSkuy adalah platform bio link lokal yang memungkinkan kamu
                menampilkan semua link sosial media dan katalog produkmu. Cocok
                buat kreator, pelaku UMKM, influencer, atau siapa saja yang
                ingin tampil profesional dan terhubung!
              </p>
            </section>

            {/* Features */}
            <section id="features" className="bg-gray-50 py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
                  Fitur{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE]">
                    Unggulan
                  </span>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: "🔗",
                      title: "Semua Link dalam Satu Tempat",
                      desc: "Satukan Instagram, TikTok, YouTube, website, dan lainnya dalam satu tautan praktis.",
                    },
                    {
                      icon: "🛒",
                      title: "Tampilkan Produk seperti E-Commerce",
                      desc: "Upload foto, nama produk, dan harga. Saat diklik, pengunjung langsung diarahkan ke WhatsApp, Shopee, Tokopedia, atau marketplace pilihanmu.",
                    },
                    {
                      icon: "📱",
                      title: "Tampilan Ringan & Responsif",
                      desc: "Desain simple, mobile friendly, dan bisa dikustom sesuai gayamu.",
                    },
                    {
                      icon: "📌",
                      title: "Gratis & Mudah Digunakan",
                      desc: "Cukup daftar dan buat halaman kamu sendiri. Tanpa ribet, tanpa coding.",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tabs */}
            <section className="container mx-auto px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                  LinkSkuy Cocok Untuk{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE]">
                    Semua Kebutuhan
                  </span>
                </h2>

                <div className="flex justify-center mb-10">
                  <div className="inline-flex bg-gray-100 rounded-lg p-1">
                    {["creator", "business", "influencer"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-md font-medium ${
                          activeTab === tab
                            ? "bg-white shadow text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {tab === "creator" && "Kreator Konten"}
                        {tab === "business" && "Pelaku UMKM"}
                        {tab === "influencer" && "Influencer"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                  {activeTab === "creator" && (
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                          Untuk Kreator Konten
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Tampilkan semua platform kreatormu dalam satu link.
                          Pengikut bisa dengan mudah menemukan semua kontenmu di
                          berbagai platform.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Tautkan ke semua platform sosial media",
                            "Promosikan merchandise atau produk",
                            "Tampilkan portfolio karya terbaik",
                            "Kustomisasi sesuai brand pribadi",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          src="https://placehold.co/500x350?text=Creator+Example"
                          alt="Creator Example"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "business" && (
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                          Untuk Pelaku UMKM
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Jadikan LinkSkuy sebagai etalase online untuk
                          produk-produkmu. Pelanggan bisa langsung terhubung ke
                          marketplace atau WhatsApp bisnismu.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Tampilkan katalog produk lengkap",
                            "Link langsung ke marketplace",
                            "Integrasi dengan WhatsApp bisnis",
                            "Analitik pengunjung",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          src="https://placehold.co/500x350?text=Business+Example"
                          alt="Business Example"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "influencer" && (
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                          Untuk Influencer
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Tingkatkan engagement dengan menautkan semua platform
                          dan kolaborasi bisnismu dalam satu halaman
                          profesional.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Tampilkan semua platform sosial media",
                            "Link ke sponsor dan kolaborasi",
                            "Promosikan merchandise",
                            "Statistik klik pengunjung",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:w-1/2">
                        <img
                          src="https://placehold.co/500x350?text=Influencer+Example"
                          alt="Influencer Example"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="bg-gray-50 py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                  Contoh{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#383c8a] via-[#686fcc] to-[#4A94AE]">
                    Halaman LinkSkuy
                  </span>
                </h2>
                <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                  Lihat bagaimana kreator dan bisnis menggunakan LinkSkuy untuk
                  menghubungkan semua konten mereka.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Budi Creative",
                      type: "Content Creator",
                      img: "https://placehold.co/400x600?text=Budi+Creative",
                    },
                    {
                      name: "Toko Maju Jaya",
                      type: "UMKM Fashion",
                      img: "https://placehold.co/400x600?text=Toko+Maju+Jaya",
                    },
                    {
                      name: "Sarah Influencer",
                      type: "Beauty Influencer",
                      img: "https://placehold.co/400x600?text=Sarah+Influencer",
                    },
                  ].map((example, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img
                        src={example.img}
                        alt={example.name}
                        className="w-full"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          {example.name}
                        </h3>
                        <p className="text-gray-600">{example.type}</p>
                        <button className="mt-4 text-blue-600 font-medium hover:text-blue-700">
                          Lihat Halaman →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="text-center mt-12">
                  <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                    Lihat Lebih Banyak Contoh
                  </button>
                </div> */}
              </div>
            </section>

            {/* Pricing */}
            {/* <section id="pricing" className="py-20">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                  Harga <span className="text-blue-600">Sesuai Kebutuhan</span>
                </h2>
                <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                  Mulai gratis dan tingkatkan sesuai kebutuhan bisnismu.
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {[
                    {
                      name: "Gratis",
                      price: "0",
                      desc: "Cocok untuk memulai",
                      features: [
                        "1 Halaman Link",
                        "5 Link Sosial Media",
                        "5 Produk",
                        "Analitik Dasar",
                        "Template Dasar",
                      ],
                      cta: "Mulai Gratis",
                    },
                    {
                      name: "Pro",
                      price: "49.000",
                      desc: "Cocok untuk profesional",
                      popular: true,
                      features: [
                        "3 Halaman Link",
                        "Link Tak Terbatas",
                        "50 Produk",
                        "Analitik Lengkap",
                        "Kustom Domain",
                        "Template Premium",
                      ],
                      cta: "Mulai 7 Hari Gratis",
                    },
                    {
                      name: "Bisnis",
                      price: "99.000",
                      desc: "Cocok untuk UMKM",
                      features: [
                        "10 Halaman Link",
                        "Link Tak Terbatas",
                        "Produk Tak Terbatas",
                        "Analitik Lengkap",
                        "Kustom Domain",
                        "Template Premium",
                        "Prioritas Support",
                      ],
                      cta: "Mulai Sekarang",
                    },
                  ].map((plan, index) => (
                    <div
                      key={index}
                      className={`rounded-xl border-2 ${
                        plan.popular
                          ? "border-blue-600 shadow-lg"
                          : "border-gray-200 shadow-sm"
                      } overflow-hidden`}
                    >
                      {plan.popular && (
                        <div className="bg-blue-600 text-white text-center py-1 font-medium">
                          Paling Populer
                        </div>
                      )}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600 mb-6">{plan.desc}</p>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-gray-900">
                            Rp{plan.price}
                          </span>
                          <span className="text-gray-600">/bulan</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          className={`w-full py-3 rounded-lg font-medium ${
                            plan.popular
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {plan.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section> */}

            {/* CTA */}
            {/* <section className="bg-blue-600 py-20">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Siap Membuat Halaman Link Kamu?
                </h2>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                  Bergabung dengan ribuan kreator dan bisnis yang menggunakan
                  LinkSkuy untuk menghubungkan semua konten mereka.
                </p>
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 text-lg font-medium shadow-lg">
                  Mulai Sekarang, Gratis!
                </button>
              </div>
            </section> */}

            {/* Newsletter */}
            {/* <section className="py-20">
              <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Dapatkan Tips & Update Terbaru
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Daftar newsletter kami untuk mendapatkan tips memaksimalkan
                    LinkSkuy dan update fitur terbaru.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Alamat email kamu"
                      className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Daftar
                    </button>
                  </form>
                </div>
              </div>
            </section> */}

            {/* Footer */}
            {/* <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4">LinkSkuy</h4>
                    <p className="text-gray-400">
                      Satu link untuk semua kebutuhan online-mu. Sosial media,
                      produk, portfolio, dan lebih banyak lagi.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4">Produk</h4>
                    <ul className="space-y-2">
                      {["Fitur", "Harga", "Contoh", "Integrasi"].map(
                        (item, i) => (
                          <li key={i}>
                            <a
                              href="#"
                              className="text-gray-400 hover:text-white"
                            >
                              {item}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4">Perusahaan</h4>
                    <ul className="space-y-2">
                      {["Tentang", "Blog", "Karir", "Kontak"].map((item, i) => (
                        <li key={i}>
                          <a
                            href="#"
                            className="text-gray-400 hover:text-white"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-4">Sosial Media</h4>
                    <div className="flex space-x-4">
                      {["Instagram", "Facebook", "Twitter", "LinkedIn"].map(
                        (social, i) => (
                          <a
                            key={i}
                            href="#"
                            className="text-gray-400 hover:text-white"
                          >
                            {social}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 mb-4 md:mb-0">
                    © 2023 LinkSkuy. All rights reserved.
                  </p>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white">
                      Syarat
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privasi
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Cookies
                    </a>
                  </div>
                </div>
              </div>
            </footer> */}
          </div>
        </LandingPage>
      </>
    );
}