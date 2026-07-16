// app/kontak/page.tsx
import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function KontakPage() {
  return (
    // Mengubah pembungkus utama menggunakan max-w-[1200px] mx-auto agar seluruh halaman terkunci rapi sejajar navbar
    <div className="w-full max-w-[1200px] mx-auto px-4 font-sans text-gray-800 mt-6">
      
      {/* =========================================================
         HERO HEADER: DIBUAT PAS DI DALAM BATAS KORIDOR WEB
         ========================================================= */}
      {/* PERBAIKAN: Ditambahkan rounded-xl agar terlihat modern, elegan, dan profesional di dalam batas web */}
      <div className="w-full bg-gradient-to-r from-[#0066ad] to-[#004b80] py-12 text-white text-center rounded-xl shadow-xs">
        <div className="w-full px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Hubungi Kami</h1>
          <p className="text-xs md:text-sm text-gray-200 mt-2 max-w-[600px] mx-auto font-medium">
            Ada pertanyaan atau butuh informasi lebih lanjut? Kontak admin resmi kami di bawah ini.
          </p>
        </div>
      </div>

      {/* AREA KONTEN UTAMA */}
      <div className="w-full py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Info Detail */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-[#0066ad] rounded-lg text-lg shrink-0"><FaMapMarkerAlt /></div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">Alamat Sekolah</h4>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 leading-relaxed">
                Jalan Jendral Sudirman Barat RT.09/RW01, Kelurahan Rejasari, Kecamatan Purwokerto Barat.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-[#0066ad] rounded-lg text-lg shrink-0"><FaEnvelope /></div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">Email Resmi</h4>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 font-semibold">sdnegeri1rejasari@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-blue-50 text-[#0066ad] rounded-lg text-lg shrink-0"><FaPhoneAlt /></div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base">Telepon / WhatsApp</h4>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 font-semibold">+62 8xx-xxxx-xxxx</p>
            </div>
          </div>
        </div>

        {/* Peta Google Maps Terintegrasi */}
        <div className="md:col-span-7 h-[300px] md:h-[350px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-2xs">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2731557088927!2d109.2132578!3d-7.4349944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1zU0ROIDEgUmVqYXNhcmk!2sSDTiDEUkZWphc2FyaQ!5e0!3m2!1sid!2sid!4v1700000000000" 
            className="w-full h-full border-0" 
            allowFullScreen={false} 
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
}