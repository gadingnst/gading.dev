---
title: "Bikin Gmail Alias Domain Sendiri + Lolos SPF & DMARC"
slug: {
  en: "configure-gmail-alias-spf-dmarc",
  id: "gmail-alias-domain-sendiri-spf-dmarc"
}
date: 2025-05-11
description: "Panduan praktis kirim email dari alamat domain sendiri via Gmail tanpa nyangkut di spam—pakai SPF & DMARC biar legit."
keywords: "gmail alias, smtp gmail, spf, dmarc, email domain, forwarding, dns, app password, gading.dev"
tags: ["email", "dev tools", "security"]
image: "/media/blog/gmail-alias-setup/alias-flow.png"
---

Pengen ngirim email dari `xxx@gading.dev` langsung via Gmail biar keliatan pro, tapi gak mau ribet?
Tenang bro, asal DNS lu bener, SPF & DMARC beres, email lu bisa jalan lancar tanpa ditolak Gmail atau nyangkut spam.

Di sini gw jelasin langkah demi langkah: mulai dari setup alias di Gmail, bikin *App Password*, sampe setup DNS buat SPF & DMARC.

![Alias email flow diagram](/media/blog/gmail-alias-setup/alias-flow.png)

---

## 1. Yang Perlu Disiapin

| Apa                          | Penjelasan                                                                 |
|-----------------------------|----------------------------------------------------------------------------|
| Akun Gmail                   | Gmail biasa, bukan Google Workspace.                                       |
| Domain pribadi + akses DNS  | Misal `gading.dev`, bisa edit DNS-nya (di Cloudflare, Niagahoster, dll).   |
| Forwarding email aktif      | Contoh: `xxx@gading.dev → youraccount@gmail.com`, dan udah masuk.         |
| 2FA aktif di Gmail          | Soalnya nanti kita bikin *App Password*.                                  |

---

## 2. Setting di Gmail

### 2.1 Bikin *App Password*

1. Buka [App Password Google](https://myaccount.google.com/apppasswords)
2. Pilih _Mail_, lalu _Other (Custom name)_ → kasih nama (contoh: "SMTP Alias Gmail") → klik **Generate**
3. Copy kode 16-digit yang muncul (jangan hilang)

![App Password UI](/media/blog/gmail-alias-setup/app-password.png)

### 2.2 Tambahin Alias di Gmail

1. Masuk Gmail → ⚙ → **See all settings** → tab **Accounts and Import**
2. Di bagian **Send mail as**, klik **Add another email address**
3. Isi:
   - **Name**: Nama pengirim yang mau ditampilin
   - **Email address**: `xxx@gading.dev`
   - Centang **Treat as an alias**, klik **Next Step**

4. Di halaman SMTP, isi kayak gini:

   | Field         | Isi                                               |
   |---------------|----------------------------------------------------|
   | SMTP Server   | `smtp.gmail.com`                                   |
   | Port          | `587` (TLS)                                        |
   | Username      | Gmail utama lu (contoh: `youraccount@gmail.com`)   |
   | Password      | App Password 16-digit tadi                         |
   | Connection    | TLS (recommended)                                  |

5. Klik **Add Account**
   Gmail bakal kirim kode verifikasi ke `xxx@gading.dev`. Karena email udah diforward ke Gmail, kode itu masuk ke inbox lu → tinggal copy dan verifikasi.

---

## 3. Tambah SPF & DMARC di DNS Domain

Agar Gmail dianggap sah kirim dari domain `gading.dev`, kita harus buktiin ke server lain (kayak Gmail, Outlook, dll) lewat SPF dan DMARC.

Ini dilakukan via **DNS records** domain lu.

### 3.1 Tambah SPF Record

1. Masuk ke panel DNS domain (`gading.dev`)
2. Tambahkan record:

   - **Type**: `TXT`
   - **Name**: `@`
   - **Value**:
     ```txt
     v=spf1 include:_spf.google.com ~all
     ```

> ⚠️ Kalau udah ada record SPF, **gabungin** aja — domain cuma boleh punya **1 SPF record**.

### 3.2 Tambah DMARC Record

1. Tambahkan record lagi:

   - **Type**: `TXT`
   - **Name**: `_dmarc`
   - **Value**:
     ```txt
     v=DMARC1; p=none; rua=mailto:postmaster@gading.dev; aspf=r; adkim=r
     ```

> `p=none` artinya cuma monitor doang, gak langsung nolak. Nanti kalau udah yakin setupnya bener, bisa diubah ke `quarantine` atau `reject`.

![Contoh DNS](/media/blog/gmail-alias-setup/dns-records.png)

---

## 4. Coba Kirim & Cek Hasilnya

1. Tunggu propagasi DNS dulu (15–30 menit).
2. Coba kirim email dari Gmail pakai `xxx@gading.dev` sebagai **From**
3. Kirim ke Gmail lain atau Outlook, lalu buka emailnya, klik **Show original**
4. Cek hasilnya:
   - **SPF**: `PASS`
   - **DKIM**: `PASS` (dari gmail.com)
   - **DMARC**: `PASS` atau minimal gak ditolak

5. Biar makin yakin, lu bisa cek juga lewat:
   - [MXToolbox](https://mxtoolbox.com)
   - [Google Admin Toolbox](https://toolbox.googleapps.com/apps/checkmx/)
   - [Mail-tester.com](https://www.mail-tester.com)

![Pilih alamat alias](/media/blog/gmail-alias-setup/selecting-alias.png)

---

## 5. Biar Lebih Aman & Profesional

| Opsi                                  | Manfaat                                                               |
|--------------------------------------|------------------------------------------------------------------------|
| Ubah DMARC ke `quarantine` / `reject`| Nolak email palsu yang ngaku-ngaku domain lu.                         |
| Pakai SMTP eksternal (SendGrid, dll) | Biar DKIM bisa align sama domain `gading.dev` → DMARC makin kuat.     |
| Aktifin Google Postmaster Tools      | Bisa pantau reputasi domain & performa pengiriman email lu.           |

---

## Penutup

Kalau udah ngikutin ini semua, lu bisa dengan santai ngirim email dari `xxx@gading.dev` lewat Gmail, tanpa takut ditolak server penerima.

Gak nyangkut spam, gak di-flag spoofing, dan tetep nikmatin UI Gmail.

![Sukses kirim](/media/blog/gmail-alias-setup/success.png)

Gas terus, email-an makin proper ✌️
