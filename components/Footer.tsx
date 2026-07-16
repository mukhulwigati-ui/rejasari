// components/Footer.tsx
import { FaYoutube, FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  // Mengubah jaringan daerah Tribun menjadi tautan menu cepat / layanan sekolah yang berguna
  const quickLinks = [
    "Profil Sekolah", "Visi & Misi", "Data Guru & Staf", "Galeri Kegiatan", 
    "Pengumuman", "Agenda Sekolah", "Prestasi Siswa", "Kontak Hubungi Kami"
  ];

  return (
    <footer className="border-t border-gray-200 bg-white mt-12">
      {/* Kontainer Atas: Konten Utama Footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Kolom Kiri: Logo & Deskripsi Instansi Sekolah */}
        <div className="md:col-span-5 space-y-4">
          <img src="/images/logo-sdn.png" alt="Logo SDN 1 Rejasari" className="h-8 md:h-10" />
          <p className="text-xs text-gray-500 leading-relaxed max-w-[400px]">
            Portal berita dan informasi resmi SD Negeri 1 Rejasari, Kecamatan Purwokerto Barat. Menyajikan kabar terkini seputar kegiatan sekolah, prestasi siswa, program edukasi, dan pengumuman penting secara akurat.
          </p>
          {/* Sosial Media Resmi Sekolah */}
          <div className="flex gap-4 text-gray-400 text-lg pt-2">
            <a href="#" className="hover:text-red-600 transition-colors"><FaYoutube /></a>
            <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-600 transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-800 transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-black transition-colors"><FaTiktok /></a>
          </div>
        </div>

        {/* Kolom Tengah: Tautan Cepat / Jelajah Portal */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
            Jelajahi Situs
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            {quickLinks.map((link, idx) => (
              <a key={idx} href="#" className="hover:text-[#0066ad] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Informasi Tambahan & Kebijakan */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
            Informasi
          </h4>
          <div className="flex flex-col space-y-2 text-xs text-gray-500">
            <a href="#" className="hover:text-[#0066ad] transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-[#0066ad] transition-colors">Susunan Redaksi</a>
            <a href="#" className="hover:text-[#0066ad] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#0066ad] transition-colors">Peta Situs</a>
          </div>
        </div>

      </div>

      {/* Kontainer Bawah: Hak Cipta Resmi */}
      <div className="bg-gray-50 border-t border-gray-100 py-4">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <p>© 2026 SDN 1 Rejasari Purwokerto Barat. All Rights Reserved.</p>
          <p>Portal Informasi & Kabar Edukasi Lingkungan Sekolah.</p>
        </div>
      </div>
    </footer>
  );
}