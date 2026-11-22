---
title: "Memahami JavaScript Engine"
slug: {
	en: "understanding-javascript-engine",
	id: "memahami-javascript-engine"
}
date: 2022-09-25
description: "Bagaimana JavaScript bekerja di belakang layar?"
keywords: "javascript, understanding javascript, javascript works, browser, frontend development, sutanlab, gadingnst, nodejs, event loop, js engine, callstack, asynchronous"
tags: ["javascript", "engineering"]
image: "/media/blog/understanding-javascript-engine/js-banner.png"
---

JavaScript makin populer, dan banyak tim yang make dia di macem-macem tempat: *front-end*, *back-end*, aplikasi *hybrid*, perangkat *embedded*, dan masih banyak lagi. Di artikel ini gw mau ngulik JavaScript lebih dalem, gimana sebenernya dia jalan.

### Overview
Hampir semua orang udah pernah denger soal *V8 Engine*, dan banyak juga yang tau kalau JavaScript itu bahasa *single-threaded* atau pake *callback queue*.

Di postingan ini kita bakal go through semua konsep itu satu-satu, dan ngejelasin gimana program JavaScript jalan. Kalau udah paham detailnya, lu bisa nulis program yang lebih bener dan manfaatin API yang di-*provide* buat bikin aplikasi yang *non-blocking*.

Kalau lu baru di JavaScript, tulisan ini bisa bantu lu paham kenapa JavaScript kerasa "aneh" dibanding bahasa lain. Kalau lu udah lama jadi JavaScript Developer, semoga tulisan ini ngasih *insight* baru soal gimana JavaScript Runtime yang lu pake tiap hari itu kerja.

Di artikel ini kita bahas cara kerja internal JavaScript di *run-time environment* dan browser. Anggep aja ini *walk-through* singkat dari semua komponen inti yang kepake waktu kode JavaScript dieksekusi. Komponen yang bakal kita bahas:

- *JavaScript Engine*
- *JavaScript Runtime Environment* atau JRE
- *Callstack*
- *Concurrency* dan *Event Loop*

Kita mulai dari ***JavaScript Engine*** dulu.

---

#### Javascript Engine
Mungkin lu udah pernah denger kalau JavaScript itu bahasa pemrograman *interpreted*. Artinya source code-nya nggak di-*compile* ke kode biner dulu sebelum dieksekusi.

Terus gimana komputer bisa ngerti perintah yang ditulis sebagai teks skrip mentah?

Nah, itu kerjaannya ***JavaScript Engine***. Simpelnya, *JavaScript Engine* itu program komputer yang ngeksekusi kode JavaScript. Kebanyakan browser modern sekarang udah bawa *JavaScript Engine* sendiri. Waktu file JavaScript di-load di browser, *JavaScript Engine* bakal ngeksekusi tiap baris kode dari atas ke bawah. Tiap baris di-parsing, dikonversi ke kode mesin, terus dieksekusi.

![JS Engine](/media/blog/understanding-javascript-engine/js-engine.png)

Tiap browser punya *JavaScript Engine* sendiri, tapi *JS Engine* yang paling dikenal itu ***Google V8***. *V8 Engine* dipake di *Google Chrome*, dan juga dipake sama *JavaScript Runtime* kayak *Node.js* yang kita kenal. Beberapa *JS Engine* di browser modern bisa lu liat di tabel ini:

JS Engine             | Browser
--------------------- | -------------------
V8                    | Google Chrome and NodeJS
Spider Monkey         | Mozilla Firefox
JavaScriptCore        | Safari
Chakra                | Microsoft Edge Browser

---

#### Browser Engine
*Browser Engine* punya dua komponen utama:
- *Memory Heap*: tempat alokasi memori terjadi.
- *Callstack*: tempat *stack frame* waktu kode dijalanin. Anggep aja tiap baris kode itu *stack* (tumpukan).

![Heap dan Callstack](/media/blog/understanding-javascript-engine/heap-callstack.png)

Tiap mesin JavaScript pasti punya *callstack* dan *heap*. *Callstack* bisa dianggep kayak kontainer, tempat kode dieksekusi. Sedangkan *heap* itu kumpulan memori nggak terstruktur yang nyimpen semua objek yang dibutuhin aplikasi kita.

---

#### Runtime
Dari tadi kita ngomongin *JavaScript Engine*, tapi *JS Engine* itu nggak jalan sendirian. Dia jalan di dalem lingkungan yang namanya *JavaScript Runtime Environment* (biasa disingkat JRE), bareng banyak komponen lain. JRE inilah yang bikin JavaScript bisa jalan secara asinkron. Gara-gara JRE, JavaScript bisa nambahin *Event Listener* dan bikin *HTTP request* secara asinkron.

JRE itu kayak kontainer yang isinya beberapa komponen:
- *JS Engine*
- *Web API*
- *Callback Queue* atau *Message Queue*
- *Event Table*
- *Event loop*

![Mekanisme JS Runtime](/media/blog/understanding-javascript-engine/runtime-mechanics.png)

Di sini kita bisa liat *Event Loop* dan *Callback Queue* yang sering diomongin orang-orang.

---

#### Callstack
JavaScript itu bahasa pemrograman *single-threaded*, artinya dia cuma punya satu *Callstack*. Makanya dia cuma bisa ngerjain satu hal dalam satu waktu.

*Callstack* itu struktur data yang pada dasarnya nyatet "kita lagi ada di proses mana". Misal kita masuk ke suatu fungsi, fungsi itu ditaruh di atas tumpukan atau *stack*. Kalau fungsi itu di-*return*, dia keluar dari bagian atas *stack*.

Coba liat potongan kode ini:
```js
function multiply(x, y) {
  return x * y;
}

function printSquare(x) {
  var s = multiply(x, x);
  console.log(s);
}

printSquare(5);
```

Waktu *JS Engine* mulai ngeksekusi kode di atas, *Callstack* masih kosong. Abis itu langkah-langkahnya kayak di gambar ini:

![Langkah-langkah Callstack](/media/blog/understanding-javascript-engine/callstack-steps.png)

Tiap entri di dalem *Callstack* disebut *Stack Frame*.

Jalanin kode di *single-thread* itu bisa gampang banget, karena kita nggak perlu ngurusin skenario ribet yang ada di lingkungan *multi-threaded*, kayak *deadlocks* dan sejenisnya.

Tapi jalan di *single-thread* juga ada batasannya.

---

#### Concurrency & Event Loop
Apa yang terjadi kalau ada panggilan fungsi di *Callstack* yang butuh waktu lama buat diproses? Misal, bayangin lu mau ngelakuin transformasi gambar yang kompleks pake JavaScript di browser.

Mungkin lu nanya, emang masalahnya di mana? Masalahnya, selama *Callstack* masih punya fungsi yang harus dijalanin, browser nggak bisa ngerjain hal lain, karena tugas berikutnya keblokir sampai tugas yang lagi jalan selesai. Browser nggak bisa render, nggak bisa jalanin kode lain, dia *stuck*. Ini jadi masalah kalau lu pengen UI aplikasi lu jalan lancar atau *smooth*.

Dan itu bukan satu-satunya masalah. Begitu browser mulai ngeproses banyak banget tugas di *Callstack*, browser bisa berhenti ngerespon dalam waktu yang cukup lama. Kebanyakan browser bakal nampilin *error*, atau nanya apakah lu mau ngehentiin laman web-nya. Mungkin lu pernah ngalamin ini.

---

Soal ***Concurrency dan Event Loop***, kayaknya bakal gw bahas di artikel berikutnya. Stay tuned ya!
