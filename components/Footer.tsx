// components/Footer.tsx
import { FaYoutube, FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  const networkLinks = [
    "Tribunnews.com", "Tribun Jabar", "Tribun Jateng", "Tribun Jatim", 
    "Tribun Medan", "Tribun Bali", "Tribun Manado", "Tribun Jogja"
  ];

  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      {/* Kontainer Atas: Konten Utama Footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Logo & Deskripsi */}
        <div className="md:col-span-4 space-y-4">
          <img src="/images/logo-sdn.png" alt="Logo Tribun" className="h-8 md:h-10" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Portal Berita Terkini, Menyajikan Berita Hari Ini dan Kabar Terbaru dari Seluruh Indonesia. Update Informasi Nasional, Regional, Olahraga, dan Hiburan secara Akurat.
          </p>
          {/* Sosial Media Mobile & Desktop */}
          <div className="flex gap-4 text-gray-600 text-lg pt-2">
            <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-600 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-black transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-800 transition-colors"><FaTiktok /></a>
          </div>
        </div>

        {/* Kolom Tengah: Jaringan Regional */}
        <div className="md:col-span-5 space-y-3">
          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
            Jaringan Daerah
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            {networkLinks.map((link, idx) => (
              <a key={idx} href="#" className="hover:text-[#0b74b6] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Bantuan & Kebijakan */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
            Informasi
          </h4>
          <div className="flex flex-col space-y-2 text-xs text-gray-500">
            <a href="#" className="hover:text-[#0b74b6] transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-[#0b74b6] transition-colors">Redaksi</a>
            <a href="#" className="hover:text-[#0b74b6] transition-colors">Pedoman Media Siber</a>
            <a href="#" className="hover:text-[#0b74b6] transition-colors">Kebijakan Privasi</a>
          </div>
        </div>

      </div>

      {/* Kontainer Bawah: Hak Cipta */}
      <div className="bg-gray-50 border-t border-gray-100 py-4">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <p>© 2026 Tribunnews. All Rights Reserved.</p>
          <p>Dibuat untuk keperluaran rancangan tata letak responsif.</p>
        </div>
      </div>
    </footer>
  );
}