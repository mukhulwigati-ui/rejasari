// schema/slideshow.ts
import { defineField, defineType } from 'sanity';

export const slideshow = defineType({
  name: 'slideshow',
  title: 'Slideshow Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Banner / Slide',
      type: 'string',
      description: 'Nama atau caption penanda untuk banner ini',
      validation: (Rule) => Rule.required().error('Judul banner wajib diisi.'),
    }),
    defineField({
      name: 'image',
      title: 'File Gambar Slide',
      type: 'image',
      options: {
        hotspot: true, // Mengaktifkan fitur crop/focus gambar secara visual di Sanity Studio
      },
      validation: (Rule) => Rule.required().error('Gambar banner wajib diunggah.'),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL Tujuan',
      type: 'url',
      description: 'URL halaman yang dituju ketika banner diklik (misal: /blog/judul-slug atau url eksternal)',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan (Sort Order)',
      type: 'number',
      description: 'Angka urutan tampil di web (misal: 1 untuk pertama, 2 untuk kedua, dst)',
      initialValue: 1,
    }),
    defineField({
      name: 'isActive',
      title: 'Status Aktif',
      type: 'boolean',
      description: 'Matikan ini jika slide tidak ingin dimunculkan sementara di halaman web',
      initialValue: true,
    }),
  ],
  // Mengatur tampilan ringkasan (preview) item di list Sanity Studio agar rapi
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'linkUrl',
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title,
        subtitle: subtitle ? `Link: ${subtitle}` : 'Tanpa Link',
        media: media,
      };
    },
  },
});