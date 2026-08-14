// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '<your-project-id>',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  deployment: {
    /**
     * Dapatkan appId untuk Studio yang dideploy melalui tab "Studio" di sanity.io/manage
     * (Diperlukan jika kamu menggunakan fitur pemilih versi spesifik Sanity)
     */
    appId: process.env.SANITY_STUDIO_APP_ID || '<your-studio-app-id>',

    /**
     * Mengaktifkan pembaruan otomatis (Auto-Updates)
     * Dokumentasi resmi: https://www.sanity.io/docs/studio/latest-version-of-sanity
     */
    autoUpdates: true,
  },
})