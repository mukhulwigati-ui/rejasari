// app/studio/[[...index]]/page.tsx
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config'; // Arahkan ke file sanity.config.ts di root

export default function StudioPage() {
  // Komponen ini akan otomatis merender seluruh dashboard Sanity Studio secara visual
  return <NextStudio config={config} />;
}