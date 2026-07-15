// sanity/schemaTypes/index.ts
import { post } from './post';
import { category } from './category';
import { iklan } from './iklan';

// PERBAIKAN: Mengarahkan ke nama file fisik yang ada di folder Anda yaitu 'sidebarslideshow'
import { slideshow } from './sidebarslideshow'; 

export const schema = {
  // Memasukkan variabel 'slideshow' yang diexport dari file sidebarslideshow.ts
  types: [post, category, iklan, slideshow],
};