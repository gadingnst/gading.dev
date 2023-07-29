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

JavaScript semakin populer, banyak tim yang memanfaatkannhya di berbagai bidang, seperti *front-end*, *back-end*, aplikasi *hybrid*, perangkat *embedded* dan masih banyak lagi. Dalam artikel ini, kita akan menggali JavaScript lebih dalam dan bagaimana cara kerjanya.

### Overview
Hampir semua orang telah mendengar konsep *V8 Engine*, dan juga banyak orang tahu bahwa JavaScript adalah bahasa *single-threaded* atau menggunakan *callback queue*.

Di postingan ini, kita akan go through ke semua konsep itu dengan detail, dan menjelaskan bagaimana program JavaScript berjalan. Dengan mengetahui detail tersebut, kita bisa menulis program dengan baik, memanfaatkan API yang di-*provide* untuk sebuah aplikasi *non-blocking*

Jika kamu baru di JavaScript, tulisan ini dapat membantu untuk memahami kenapa JavaScript begitu "aneh" jika dibandingkan dengan bahasa lain. Dan jika kamu adalah JavaScript Developer yang berpengalaman, semoga tulisan ini bisa memberi *insight* baru dalam bagaimana JavaScript Runtime yang kamu pakai sehari-hari bekerja.

Pada artikel ini, kita akan membahas cara kerja internal JavaScript di *run-time environment* dan browser. Ini akan menjadi gambaran *walk-through* dari semua komponen inti yang terlibat dalam eksekusi kode JavaScript. Kita akan membahas komponen-komponen berikut:

- *JavaScript Engine*
- *JavaScript Runtime Environment* atau JRE
- *Callstack*
- *Concurrency* dan *Event Loop*

Mari kita mulai dari ***JavaScript Engine***.

---

#### Javascript Engine
Seperti yang mungkin kamu dengar sebelumnya, JavaScript adalah bahasa pemrograman *interpreted*. Artinya, source-codenya tidak di-*compile* ke kode biner untuk dieksekusi.

Bagaimana komputer bisa memahami perintah yang ditulis dengan teks skrip mentah?

Itulah apa yang dilakukan dengan ***JavaScript Engine***. *JavaScript Engine* simplenya adalah program komputer yang mengeksekusi kode JavaScript. *JavaScript Engine* sudah menjadi bawaan di kebanyakan browser modern sekarang. Ketika file JavaScript diload di browser, *JavaScript Engine* akan mengeksekusi setiap baris kode dari atas ke bawah. *JavaScript Engine* akan memparsing kode setiap baris, mengkonversikan kode tersebut ke dalam kode mesin dan mengeksekusinya.

![JS Engine](/media/blog/understanding-javascript-engine/js-engine.png)

Setiap browser mempunyai *JavaScript Engine* miliknya sendiri, tapi yang *JS Engine* paling dikenal adalah ***Google V8***. *V8 Engine* dipersembahkan oleh *Google Chrome*, dan juga digunakan oleh *JavaScript Runtime* seperti *Node.js* yang kita kenal. Beberapa *JS Engine* dalam setiap browser modern bisa kita lihat dalam tabel di bawah ini:

JS Engine             | Browser
--------------------- | -------------------
V8                    | Google Chrome and NodeJS
Spider Monkey         | Mozilla Firefox
JavaScriptCore        | Safari
Chakra                | Microsoft Edge Browser

---

#### Browser Engine
*Browser Engine* terdiri atas dua komponen utama:
- *Memory Heap* — di sinilah alokasi memori terjadi.
- *Callstack* — di sinilah *stack frame* saat kode dijalankan. Anggaplah setiap baris kode itu adalah *stack* (tumpukan).

![Heap dan Callstack](/media/blog/understanding-javascript-engine/heap-callstack.png)

Setiap mesin JavaScript pasti berisi *callstack* dan *heap*. *Callstack* bisa dianggap seperti suatu kontainer yang akan dijadikan tempat utk mengeksekusi kode. Kemudian *heap* adalah kumpulan memori tidak terstruktur yang menyimpan semua objek yang dibutuhkan aplikasi kita.

---

#### Runtime
Sejauh kita berdiskusi tentang *JavaScript Engine*, tapi *JS Engine* tidak berjalan secara terisolasi. *JS Engine* berjalan di dalam lingkungan yang disebut *JavaScript Runtime Environment* (atau biasa disingkat dengan JRE) bersama dengan banyak komponen lainnya. JRE bertanggung jawab untuk membuat JavaScript berjalan secara asinkron. Inilah alasan JavaScript dapat menambahkan *Event Listener* dan membuat *HTTP request* secara asinkron.

JRE seperti kontainer yang terdiri dari beberapa komponen:
- *JS Engine*
- *Web API*
- *Callback Queue* atau *Message Queue*
- *Event Table*
- *Event loop*

![Mekanisme JS Runtime](/media/blog/understanding-javascript-engine/runtime-mechanics.png)

Disini kita dapat melihat *Event Loop* dan *Callback Queue* yang sering dibicarakan oleh orang-orang.

---

#### Callstack
JavaScript adalah bahasa pemrograman *single-threaded*, yang artinya dia mempunyai *Callstack* tunggal. Oleh karena itu, dia hanya dapat melakukan satu hal pada satu waktu.

*Callstack* adalah struktur data yang pada dasarnya merekam "di dalam proses apa kita sedang berada". Misal, jika kita masuk ke suatu fungsi, kita meletakkannya di atas tumpukan atau *stack*. Jika kita me-*return* suatu fungsi, kita keluar dari bagian atas *stack*.

Mari kita melihat contoh potongan kode berikut:
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

Ketika *JS Engine* mulai mengeksekusi kode tersebut, *Callstack* akan kosong, Setelah itu, langkah-langkahnya adalah seperti pada gambar di bawah ini:

![Langkah-langkah Callstack](/media/blog/understanding-javascript-engine/callstack-steps.png)

Setiap entri yang berada di dalam *Callstack* disebut *Stack Frame*

Menjalankan kode dalam *single-thread* dapat sangat mudah, kareka kita tidak harus berurusan dengan skenario rumit seperti di lingkungan *multi-threaded*, seperti *deadlocks*, dsb.

Akan tetapi, menjalankan *single-thread* juga cukup mempunyai limitasi.

---

#### Concurrency & Event Loop
Apa yang terjadi ketika kamu memiliki panggilan fungsi dalam *Callstack* yang membutuhkan banyak waktu untuk diproses? Misal, bayangkan kamu ingin melakukan transformasi gambar yang kompleks dengan JavaScript di browser.

Kamu mungkin bertanya, kenapa hal ini menjadi masalah? Masalahnya adalah meskipun *Callstack* memiliki fungsi untuk dijalankan, browser sebenarnya tidak dapat melakukan suatu tugas yang lain, karena dia akan memblokir sebuah tugas selanjutnya sebelum tugas yang sedang dalam proses dieksekusi belum selesai. Ini berarti bahwa browser tidak dapat merender, dan tidak dapat menjalan kode lain, dia akan *stuck*. Dan ini akan menimbulkan masalah jika kamu menginginkan UI yang berjalan secara lancar atau *smooth* di aplikasimu.

Dan itu bukan satu-satunya masalah. Setelah browser kamu mulai memproses begitu banyak tugas dalam *Callstack*, browser mungkin berhenti merespon untuk waktu yang cukup lama. Dan sebagian besar browser akan mengambil tindakan dengan memunculkan tampilan *error*, atau menanyakan apakah kamu ingin menghentikan laman web. Kamu mungkin pernah mengalami hal ini.

---

Untuk pembahasan tentang ***Concurrency dan Event Loop***, mungkin akan kita bahas di artikel berikutnya. Stay Tuned ya!
