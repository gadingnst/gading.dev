---
title: 'Mengenal higher-order function di JavaScript part 2'
slug: 'mengenal-higher-order-function-di-javascript-part-2'
date: 2019-11-13
description: 'Menggunakan higher-order function di JavaScript dapat mempersingkat kode serta mengubah cara berfikir dan gaya pemrograman kita'
tags: ['javascript', 'coding', 'higherorderfunction']
category: 'Engineering'
keywords: ''
image: '/assets/img/collections/desks/desk3.jpg'
caption: 'Menggunakan higher-order function di JavaScript dapat mempersingkat kode serta mengubah cara berfikir dan gaya pemrograman kita'
css_source: []
js_source: []
---

Sesuai janji, seri **higher-order function** di JavaScript bakal ada kelanjutannya. Kali ini kita bakal coba mengutik `find()`, `findIndex()`, dan `sort()`. Sebelumnya mohon maaf, aku agak lama update, dikarenakan satu atau hal lainnya yang tidak perlu dijelaskan, intinya kurang sempat aja dah haha 😆. Well, udah gausah basa-basi, ga penting juga.. Sekarang kita langsung masuk aja. Yang belum baca part 1 nya, silahkan baca dulu [disini](http://sutanlab.id/blog/mengenal-higher-order-function-di-javascript).

---

#### Array.find()
Method `find()` ini berfungsi untuk mencari sebuah *value* dalam suatu array. Nah disini ada perbedaan antara `find()` dan `filter()`. Jika kita sebelumnya menggunakan ***filter***, program akan melakukan proses pengulangan dan pencarian *value*-nya sampai *index* array yang terakhir. Jadi, ***filter*** ini akan mengumpulkan *value-value* yang didapat menjadi sebuah array baru. Sedangkan kalau kita menggunakan ***find***, artinya proses pengulangan dan pencarian *value* akan stop ketika program sudah mendapatkan satu saja *value*. Masih bingung? intinya jika kalian familiar dengan SQL, anggap saja ketika kita menggunakan method ***find*** , kita menambahkan query `LIMIT 1`, nah kalau ***filter*** berarti tanpa limit. Terus contoh satu lagi, ketika kita fetch rows dari database menggunakan PHP, ada yang namanya method di PDO itu `fetch()` dan `fetchAll()` kan ? nah anggap aja ***find*** ini seperti ***fetch***, dan ***filter*** seperti ***fetchAll***.

Untuk penggunaannya sama saja seperti `filter()`, parameter method `find()` adalah sebuah *callback* function yang memiliki argumen *value* dan *index*. 
