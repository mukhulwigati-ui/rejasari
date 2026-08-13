// app/api/donate/route.ts
import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';
import { createClient } from '@sanity/client';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xqggeww8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Inisialisasi Midtrans Snap API Client
const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_ENV === 'production' || true,
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'Mid-server-nqWkSxj9WZjDbgAhlb9tlb0w',
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || 'Mid-client-NVjY5ccbH7M47czA',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { donorName, amount, programId, phone, email, fundraiserPhone, programTitle, category } = body;

    const cleanAmount = Number(String(amount || '').replace(/[^0-9]/g, ''));

    if (!cleanAmount || cleanAmount <= 0) {
      return NextResponse.json({ success: false, message: 'Nominal donasi tidak valid.' }, { status: 400 });
    }

    const orderId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 🚀 Gunakan await pada cookies() agar sesuai dengan tipe data Next.js terbaru
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Buat parameter transaksi untuk Midtrans Snap
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: cleanAmount,
      },
      customer_details: {
        first_name: donorName || 'Hamba Allah',
        email: email || 'support@islami.or.id',
        phone: phone || '081225147373',
      },
      item_details: [
        {
          id: programId || 'DONASI-UMUM',
          price: cleanAmount,
          quantity: 1,
          name: (programTitle || 'Sedekah / Infaq Online').substring(0, 50),
        },
      ],
    };

    // Minta Snap Token dari Midtrans
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;
    const redirectUrl = transaction.redirect_url;

    // 2. Simpan record transaksi awal berstatus pending ke Sanity CMS
    await serverClient.create({
      _type: 'donationTransaction',
      orderId,
      donorName: donorName || 'Hamba Allah',
      donorPhone: phone || '',
      donorEmail: email || '',
      amount: cleanAmount,
      fundraiserPhone: fundraiserPhone || '',
      programName: programId ? {
        _type: 'reference',
        _ref: programId,
      } : undefined,
      status: 'pending',
      paymentUrl: redirectUrl,
      transactionId: orderId,
    });

    // 3. Simpan ke tabel Supabase `donations` agar tampil di "Donasi Saya" (Pending)
    if (user) {
      await supabase.from('donations').insert([
        {
          user_id: user.id,
          program_name: programTitle || 'Sedekah Umum',
          category: category || 'Kemanusiaan',
          amount: cleanAmount,
          status: 'pending',
          payment_url: redirectUrl,
          invoice_id: orderId,
        },
      ]);
    }

    // 4. Kembalikan respons sukses beserta token Midtrans ke frontend
    return NextResponse.json({
      success: true,
      token: token,
      paymentUrl: redirectUrl,
      orderId,
    });

  } catch (error: any) {
    console.error('🔥 Gagal membuat transaksi donasi Midtrans:', error);
    return NextResponse.json({ success: false, message: error.message || 'Terjadi kesalahan server.' }, { status: 500 });
  }
}