// app/api/midtrans/notification/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Inisialisasi Sanity Client (Server-side dengan token write)
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xqggeww8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Inisialisasi Supabase Admin Client (Menggunakan Service Role Key agar bisa update data global jika diperlukan, atau Anon Key)
const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const notification = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = notification;

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return NextResponse.json({ success: false, message: 'Invalid notification payload' }, { status: 400 });
    }

    // 1. Validasi Signature Key untuk keamanan (Security Check standar Midtrans)
    const serverKey = process.env.MIDTRANS_SERVER_KEY || 'Mid-server-nqWkSxj9WZjDbgAhlb9tlb0w';
    const computedSignature = crypto
      .createHash('sha512')
      .update(order_id + status_code + gross_amount + serverKey)
      .digest('hex');

    if (computedSignature !== signature_key) {
      console.warn(`⚠️ Invalid Midtrans signature for order: ${order_id}`);
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 403 });
    }

    // 2. Tentukan status transaksi berdasarkan aturan Midtrans
    let newStatus = 'pending';
    if (transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        newStatus = 'success';
      }
    } else if (transaction_status === 'settlement') {
      newStatus = 'success';
    } else if (
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'
    ) {
      newStatus = 'failed';
    } else if (transaction_status === 'pending') {
      newStatus = 'pending';
    }

    console.log(`🔔 Midtrans Webhook diterima untuk Order ID: ${order_id}, Status: ${newStatus}`);

    // 3. Perbarui status di Sanity CMS (mencari berdasarkan orderId)
    const sanityQuery = `*[_type == "donationTransaction" && orderId == $orderId][0]`;
    const existingTx = await serverClient.fetch(sanityQuery, { orderId: order_id });

    if (existingTx && existingTx._id) {
      await serverClient.patch(existingTx._id).set({ status: newStatus }).commit();
      console.log(`✅ Sanity transaction ${order_id} berhasil diperbarui ke status: ${newStatus}`);
    }

    // 4. Perbarui status di Supabase tabel `donations` (mencari berdasarkan invoice_id)
    const { error: supabaseError } = await supabaseAdmin
      .from('donations')
      .update({ status: newStatus })
      .eq('invoice_id', order_id);

    if (supabaseError) {
      console.error(`🔥 Gagal memperbarui Supabase untuk ${order_id}:`, supabaseError.message);
    } else {
      console.log(`✅ Supabase donation ${order_id} berhasil diperbarui ke status: ${newStatus}`);
    }

    return NextResponse.json({ success: true, message: 'Notification successfully processed' });
  } catch (error: any) {
    console.error('🔥 Error pada Midtrans Notification Webhook:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}