// sanity/schemaTypes/post.ts
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Artikel Berita / Video',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Judul Berita', 
      type: 'string', 
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'slug', 
      title: 'Slug (URL)', 
      type: 'slug', 
      options: { source: 'title', maxLength: 96 }, 
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: 'category', 
      title: 'Kategori / Topik', 
      type: 'reference', 
      to: [{ type: 'category' }], 
      validation: (Rule) => Rule.required() 
    }),
    
    // =========================================================
    // FITUR BARU: LINK UTAMA VIDEO YOUTUBE
    // =========================================================
    defineField({
      name: 'youtubeUrl',
      title: 'Link URL Video YouTube',
      type: 'url',
      description: 'Masukkan URL YouTube lengkap (contoh: https://www.youtube.com/watch?v=xxxxxx atau https://youtu.be/xxxxxx). Jika diisi, sistem web otomatis akan menggunakan thumbnail dari YouTube.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({ 
      name: 'author', 
      title: 'Nama Penulis', 
      type: 'string' 
    }),
    defineField({ 
      name: 'editor', 
      title: 'Nama Editor', 
      type: 'string' 
    }),
    defineField({ 
      name: 'publishedAt', 
      title: 'Tanggal Tayang', 
      type: 'datetime', 
      validation: (Rule) => Rule.required() 
    }),
    
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama (Thumbnail Manual)',
      type: 'image',
      options: { hotspot: true },
      // PERBAIKAN LOGIKA: Jika field youtubeUrl diisi, field gambar ini bersifat opsional (tidak wajib diisi)
      description: 'Kosongkan jika Anda mengisi Link URL YouTube di atas (karena thumbnail akan di-generate otomatis).',
      fields: [{ name: 'caption', type: 'string', title: 'Keterangan Gambar (Caption)' }],
    }),
    
    defineField({ 
      name: 'summary', 
      title: 'Ringkasan Berita (Poin-Poin)', 
      type: 'array', 
      of: [{ type: 'string' }] 
    }),
    defineField({ 
      name: 'body', 
      title: 'Isi Paragraf Berita', 
      type: 'array', 
      of: [{ type: 'block' }] 
    }),
  ],
  
  // Mengatur preview di panel Sanity Studio agar editor tahu ini postingan video atau artikel biasa
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      youtubeUrl: 'youtubeUrl',
    },
    prepare({ title, author, media, youtubeUrl }) {
      return {
        title: title,
        subtitle: `${author || 'Anonim'} | ${youtubeUrl ? '🎥 VIDEO YOUTUBE' : '📝 ARTIKEL'}`,
        media: media,
      };
    },
  },
});