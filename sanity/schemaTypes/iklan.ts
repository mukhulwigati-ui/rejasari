// sanity/schemaTypes/iklan.ts
import { defineField, defineType } from 'sanity';

export const iklan = defineType({
  name: 'iklan',
  title: 'Manajemen Iklan (Ads)',
  type: 'document',
  fields: [
    defineField({
      name: 'placement',
      title: 'Posisi Penempatan Iklan',
      type: 'string',
      options: {
        list: [
          { title: 'Sidebar Kiri (LeftIklan - 160px)', value: 'left-sidebar' },
          { title: 'Banner Tengah Artikel', value: 'mid-banner' },
          { title: 'Sidebar Kanan Kotak (SidebarIklan)', value: 'right-sidebar' },
          // PERBAIKAN: Menambahkan slot iklan baru berukuran 300 x 600 px
          { title: 'Sidebar Kanan Panjang (SidebarIklan - 300x600)', value: 'right-sidebar-large' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Nama / Keterangan Iklan', type: 'string' }),
    defineField({ name: 'image', title: 'Gambar Banner Iklan', type: 'image', validation: (Rule) => Rule.required() }),
    defineField({ name: 'linkUrl', title: 'URL Tujuan Klik Iklan', type: 'url' }),
  ],
});