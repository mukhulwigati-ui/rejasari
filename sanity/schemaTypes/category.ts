import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Kategori & Topik Pilihan',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nama Kategori', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'isHighlight', title: 'Jadikan Topik Pilihan (Slider Highlight)?', type: 'boolean', initialValue: false }),
  ],
});