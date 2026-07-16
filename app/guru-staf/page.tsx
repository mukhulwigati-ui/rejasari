// app/guru-staf/page.tsx
import React from 'react';

export default function GuruStafPage() {
  // Contoh mockup data pendidik. Nanti bisa kamu hubungkan ke Sanity CMS jika perlu.
  const team = [
    { name: "Nama Kepala Sekolah, S.Pd.", role: "Kepala Sekolah", image: "/images/placeholder-avatar.png" },
    { name: "Guru Kelas 1, S.Pd.", role: "Wali Kelas 1", image: "/images/placeholder-avatar.png" },
    { name: "Guru Kelas 2, S.Pd.", role: "Wali Kelas 2", image: "/images/placeholder-avatar.png" },
    { name: "Guru Kelas 3, S.Pd.", role: "Wali Kelas 3", image: "/images/placeholder-avatar.png" },
  ];

  return (
    // PERBAIKAN: Mengunci induk kontainer dengan max-w-[1200px] mx-auto agar sejajar dengan batas web & navbar
    <div className="w-full max-w-[1200px] mx-auto px-4 font-sans text-gray-800 mt-6 min-h-screen">
      
      {/* =========================================================
         HERO HEADER: DIKUNCI PAS DI DALAM LAYOUT WEB
         ========================================================= */}
      {/* PERBAIKAN: Ditambahkan rounded-xl agar gradasi biru tidak meluber tak berbatas */}
      <div className="w-full bg-gradient-to-r from-[#0066ad] to-[#004b80] py-12 text-white text-center rounded-xl shadow-xs">
        <div className="w-full px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Dewan Guru & Staf</h1>
          <p className="text-xs md:text-sm text-gray-200 mt-2 max-w-[600px] mx-auto font-medium">
            Tenaga pendidik profesional dan berdedikasi tinggi di SD Negeri 1 Rejasari Purwokerto Barat.
          </p>
        </div>
      </div>

      {/* GRID DAFTAR GURU & STAF */}
      <div className="w-full py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full overflow-hidden border-2 border-gray-100 mb-3">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-1">{member.name}</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}