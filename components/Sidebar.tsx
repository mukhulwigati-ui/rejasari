export default function Sidebar() {
  return (
    <div className="w-[300px] flex-shrink-0 space-y-6">
      {/* 1. Komponen Skor (Pindah ke sini) */}
      <div className="bg-[#003466] text-white p-5 rounded-xl text-center flex flex-col h-[180px] shadow-sm">
        <h3 className="font-bold text-[13px] tracking-wide mt-2">UPDATE JADWAL & SKOR</h3>
        <div className="mt-auto mb-auto">
          <div className="flex justify-center items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white mb-1"></div>
              <span className="text-[9px] font-bold">PRANCIS</span>
            </div>
            <span className="text-[#00b4d8] font-black italic text-sm">VS</span>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 mb-1"></div>
              <span className="text-[9px] font-bold">SPANYOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Iklan 300x600 */}
      <div className="bg-gray-100 border border-gray-300 h-[600px] flex items-center justify-center text-gray-400 rounded-lg">
        Iklan 300x600
      </div>
      
      {/* 3. Komponen lain (Berita Populer, dll) bisa ditambah di sini */}
    </div>
  );
}