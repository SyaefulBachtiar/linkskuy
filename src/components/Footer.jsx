export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="font-montserrat">
          <h2 className="text-xl font-bold mb-4">LinkSkuy</h2>
          <p className="text-sm text-gray-400">
            Solusi katering sehat dan praktis untuk kebutuhan harian dan acara
            spesial Anda.
          </p>
        </div>

        {/* Layanan */}
        <div className="font-montserrat">
          <h3 className="text-lg font-semibold mb-3">Layanan</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Template
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Metode Pembayaran
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Integrasi
              </a>
            </li>
          </ul>
        </div>

        {/* Bantuan */}
        <div className="font-montserrat">
          <h3 className="text-lg font-semibold mb-3">Bantuan</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div className="font-montserrat">
          <h3 className="text-lg font-semibold mb-3">Hubungi Kami</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>Email: info@linkskuy.com</li>
            <li>Telepon: +62 812 3456 7890</li>
            <li>Alamat: Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 font-montserrat">
        &copy; {new Date().getFullYear()} LinkSkuy. All rights reserved.
      </div>
    </footer>
  );
}
