// sanity/schemaTypes/index.ts
import { post } from './post';
import { category } from './category';
import { iklan } from './iklan';
import { prestasi } from './prestasi'; // PERBAIKAN: Mengimpor skema prestasi yang baru dibuat

// PERBAIKAN: Mengarahkan ke nama file fisik yang ada di folder Anda yaitu 'sidebarslideshow'
import { slideshow } from './sidebarslideshow'; 

export const schema = {
  // Memasukkan variabel 'prestasi' ke dalam array types agar muncul di dashboard Sanity Studio
  types: [post, category, iklan, slideshow, prestasi],
};