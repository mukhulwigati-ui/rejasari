// sanity/schemaTypes/index.ts

import { post } from './post';
import { category } from './category';
import { iklan } from './iklan';
import { prestasi } from './prestasi'; // Mengimpor skema prestasi dari file prestasi.ts
import { slideshow } from './sidebarslideshow'; // Mengimpor skema slideshow

export const schema = {
  // Mendaftarkan seluruh koleksi jenis dokumen ke dalam core array studio Sanity
  types: [post, category, iklan, slideshow, prestasi],
};