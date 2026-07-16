// schemas/prestasi.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'prestasi',
  title: 'Prestasi Siswa',
  type: 'document',
  fields: [
    defineField({
      name: 'jenisLomba',
      title: 'Jenis Lomba / Nama Kejuaraan',
      type: 'string',
      description: 'Contoh: Lomba FLS2N Tingkat Kabupaten, Turnamen Sepak Bola U-12',
      validation: (Rule) => Rule.required().error('Nama atau jenis lomba wajib diisi.'),
    }),
    defineField({
      name: 'juaraLomba',
      title: 'Juara Lomba',
      type: 'string',
      description: 'Contoh: Juara 1, Juara Harapan 2, Medali Emas',
      validation: (Rule) => Rule.required().error('Tingkat juara wajib diisi.'),
    }),
    defineField({
      name: 'namaSiswa',
      title: 'Nama Siswa yang Juara',
      type: 'string',
      description: 'Tulis nama siswa atau nama tim/kelompok yang meraih juara.',
      validation: (Rule) => Rule.required().error('Nama siswa peraih prestasi wajib diisi.'),
    }),
    defineField({
      name: 'tanggalLomba',
      title: 'Waktu / Tanggal Lomba',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      description: 'Pilih tanggal pelaksanaan atau saat diterimanya penghargaan.',
      validation: (Rule) => Rule.required().error('Tanggal pelaksanaan lomba wajib diisi.'),
    }),
    defineField({
      name: 'foto',
      title: 'Foto Penghargaan / Dokumentasi',
      type: 'image',
      options: {
        hotspot: true, // Mengaktifkan fitur crop/focus gambar secara visual di Sanity Studio
      },
      description: 'Unggah foto siswa saat menerima piala atau dokumentasi kegiatan lomba.',
    }),
    defineField({
      name: 'deskripsi',
      title: 'Keterangan / Deskripsi',
      type: 'text',
      description: 'Ceritakan singkat mengenai detail jalannya lomba atau pencapaian yang diraih.',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'jenisLomba',
      subtitle: 'namaSiswa',
      media: 'foto',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: `Pemenang: ${subtitle}`,
        media: media,
      };
    },
  },
});