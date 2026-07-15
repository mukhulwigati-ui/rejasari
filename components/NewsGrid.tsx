export default function NewsGrid() {
  return (
    // Gunakan shadow yang lebih gelap dan luas:
    // shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] 
    // Menambahkan p-8 untuk memberi ruang shadow "bernapas"
    <section className="bg-white p-8 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
      
      {/* BERITA UTAMA */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1">
          <p className="text-red-700 font-bold text-xs uppercase mb-2">KASUS KORUPSI DI KEJAKSAAN AGUNG</p>
          <h1 className="text-2xl font-bold leading-tight">Ramai-ramai Polri Disebut Langgar KUHAP usai Limpahkan Perkara Febrie Adriansyah ke Kejagung</h1>
        </div>
        <div className="md:w-1/2 h-64 bg-gray-300 rounded-xl"></div>
      </div>

      {/* BERITA PENDUKUNG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex gap-4 items-start">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div>
              <p className="text-red-700 font-bold text-[10px] uppercase mb-1">KATEGORI</p>
              <h3 className="text-sm font-bold leading-snug">Judul berita pendukung muncul di sini...</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}