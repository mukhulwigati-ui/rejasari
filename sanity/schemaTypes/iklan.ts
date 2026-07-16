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
          /* PERBAIKAN: Menambahkan keterangan Banner Atas agar jelas di Sanity Studio */
          { title: 'Banner Atas / Tengah Utama (Di bawah Logo)', value: 'mid-banner' },
          { title: 'Sidebar Kiri (LeftIklan - 160px)', value: 'left-sidebar' },
          { title: 'Sidebar Kanan Kotak (SidebarIklan)', value: 'right-sidebar' },
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