// sanity/schemaTypes/prestasi.ts

// Hapus atau biarkan jika tidak dipakai, kita gunakan vanilla object agar aman dari build error SSR
export const prestasi = {
  name: 'prestasi',
  title: 'Prestasi Siswa',
  type: 'document',
  fields: [
    {
      name: 'jenisLomba',
      title: 'Jenis Lomba / Nama Kejuaraan',
      type: 'string',
      description: 'Contoh: Lomba FLS2N Tingkat Kabupaten',
      validation: (Rule: any) => Rule.required().error('Nama atau jenis lomba wajib diisi.'),
    },
    {
      name: 'juaraLomba',
      title: 'Juara Lomba',
      type: 'string',
      description: 'Contoh: Juara 1, Juara Harapan 2',
      validation: (Rule: any) => Rule.required().error('Tingkat juara wajib diisi.'),
    },
    {
      name: 'namaSiswa',
      title: 'Nama Siswa yang Juara',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Nama siswa wajib diisi.'),
    },
    {
      name: 'tanggalLomba',
      title: 'Waktu / Tanggal Lomba',
      type: 'date',
      validation: (Rule: any) => Rule.required().error('Tanggal lomba wajib diisi.'),
    },
    {
      name: 'foto',
      title: 'Foto Penghargaan / Dokumentasi',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'deskripsi',
      title: 'Keterangan / Deskripsi',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'jenisLomba',
      subtitle: 'namaSiswa',
      media: 'foto',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: `Pemenang: ${subtitle}`,
        media: media,
      };
    },
  },
};