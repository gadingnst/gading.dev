---
title: 'Mengenal higher-order function di JavaScript part 2'
slug: 'mengenal-higher-order-function-di-javascript-part-2'
date: 2019-11-16
description: 'Menggunakan higher-order function di JavaScript dapat mempersingkat kode serta mengubah cara berfikir dan gaya pemrograman kita.'
tags: ['javascript', 'coding', 'higherorderfunction']
category: 'Engineering'
keywords: 'higher-order function, fungsi, javascript, array, tutorial, sort, find, findIndex'
image: '/assets/img/collections/desks/desk3.jpg'
caption: 'Menggunakan higher-order function di JavaScript dapat mempersingkat kode serta mengubah cara berfikir dan gaya pemrograman kita.'
css_source: []
js_source: ['/media/blog/mengenal-higher-order-function-di-javascript-part-2/case.js']
---

Sesuai janji, seri **higher-order function** di JavaScript bakal ada kelanjutannya. Kali ini kita bakal coba mengutik `find()`, `findIndex()`, dan `sort()`. Sebelumnya mohon maaf, aku agak lama update, dikarenakan satu atau hal lainnya yang tidak perlu dijelaskan, intinya kurang sempat aja dah haha 😆. Udah gausah basa-basi, ga penting juga.. Sekarang kita langsung masuk aja. 

> Note: Yang belum baca part 1 nya, silahkan baca dulu [disini](http://sutanlab.id/blog/mengenal-higher-order-function-di-javascript).

---

#### Array.find()
Method `find()` ini berfungsi untuk mencari sebuah nilai dalam suatu *array*. Nah disini ada perbedaan antara `find()` dan `filter()`. Jika kita sebelumnya menggunakan ***filter***, program akan melakukan proses pencarian sampai *index array* yang terakhir. Jadi, ***filter*** ini akan mengumpulkan nilai-nilai yang didapat menjadi sebuah *array* baru. Sedangkan kalau kita menggunakan ***find***, artinya proses pencarian akan stop ketika program sudah mendapatkan satu nilai saja. Masih bingung? intinya jika kalian familiar dengan SQL, anggap saja ketika kita menggunakan method ***find*** , kita menambahkan query `LIMIT 1`, nah kalau ***filter*** berarti tanpa limit.

Untuk penggunaan `find()` sebenarnya sama persis seperti `filter()`, parameternya adalah sebuah fungsi *callback* yang memiliki argumen *value* dan *index*. Untuk melihat perbedaan ***find*** dan ***filter*** mari kita coba kasus berikut:

```js
const students = [
  {
    id: 1,
    name: 'Sutan',
    major: 'Computer Engineering'
  },
  {
    id: 2,
    name: 'Rina',
    major: 'Computer Engineering'
  },
  {
    id: 3,
    name: 'Alexander',
    major: 'Management'
  },
  {
    id: 4,
    name: 'Alexandra',
    major: 'Accounting'
  }
]

const filtering = students.filter(student =>
  student.name.toLowerCase().includes('alex')
)

const finding = students.find(student =>
  student.name.toLowerCase().includes('alex')
)

console.log(filtering)
console.log(finding)
```
<button onclick="kasus1()">Lihat Hasil</button>
<p style="white-space: pre; font-weight: bold" id="filter">Hasil filter: ...</p>
<p style="white-space: pre; font-weight: bold" id="find">Hasil find: ...</p>

Dari contoh diatas, `filter()` menghasilkan *array of object* yang baru yaitu *Alexander* dan *Alexandra*, Sedangkan `find()` hanya menghasilkan satu *object* yaitu *Alexander*. Kenapa bisa begitu? Padahal kondisi yang kita set keduanya sama-sama mencari nilai dengan nama yang mengandung kata *'alex'*. Nah ini terjadi karena `find()` memberhentikan proses pencariannya ketika sudah mendapatkan satu nilai yang dicari, sedangkan `filter()` akan terus menjalankan proses pencariannya sampai *array* terakhir walaupun sudah mendapatkan nilai yang dicari. So, biasanya ***find*** ini lebih sering digunakan untuk mencari *single-data* dengan parameter yang unik, seperti *id*, *email*, *username* dsb, Sedangkan ***filter*** digunakan untuk mencari *multi-data* dengan parameter yang non-unik.

Contoh kasus yang lain, anggaplah kita ingin mengecek apakah produk ada di ***whitelist***, kita asumsikan mempunyai data ***whitelist*** sebagai berikut:

```js
const whiteList = [
  {
    id: 1,
    name: 'Sepatu'
  },
  {
    id: 2,
    name: 'Sandal'
  },
  {
    id: 3,
    name: 'Indomie'
  },
  {
    id: 4,
    name: 'Telor Bebek'
  },
  {
    id: 5,
    name: 'Aqua'
  }
]

const isInWhiteList = productId => whiteList.find(item => item.id === productId)

console.log(isInWhiteList(5))
console.log(isInWhiteList(9))
```

<button onclick="kasus2()">Lihat Hasil</button>
<p style="white-space: pre; font-weight: bold" id="whitelist1">Hasil pertama: ...</p>
<p style="white-space: pre; font-weight: bold" id="whitelist2">Hasil kedua: ...</p>

Dilihat dari contoh tersebut, diketahui produk dengan id **9** tidak ada di ***whitelist***. Dari hasilnya bisa kita simpulkan bahwa ketika `find()` tidak dapat menemukan hasil pencariannya, maka dia akan me-*return* `undefined`. Nah, jadi ini sangat berguna untuk dimasukkan kedalam *if-else* statement guna untuk mengecek data yang dicari tersedia atau tidak.

---

#### Array.findIndex()
`findIndex()` ini sama saja seperti `find()`, namun perbedaannya ada di *return* nilainya, kalau kita menggunakan ***find*** maka yang di-*return* adalah nilai atau **value**-nya, sedangkan ***findIndex*** yang di-*return* adalah **index**-nya. Untuk melihat perbedaannya lebih jelas, kita coba saja contoh seperti ini dengan data ***whitelist*** seperti di atas:

```js
const find = whiteList.find(item => item.id === 4)
const findIndex = whiteList.findIndex(item => item.id === 4)

console.log(find)
console.log(findIndex)
```

<button onclick="kasus3()">Lihat Hasil</button>
<p style="white-space: pre; font-weight: bold" id="case3-find">Hasil find: ...</p>
<p style="white-space: pre; font-weight: bold" id="case3-findIndex">Hasil findIndex: ...</p>

Bisa kita lihat hasilnya diatas, `find()` menghasilkan sebuah *object*, sedangkan `findIndex` hanya menghasilkan angka yaitu *index* dari data tersebut. Eh, kenapa hasilnya kok 3 ya? Padahal kan data ke-4? **Ingat ya, *array* dimulai dari 0 😠**.

---

#### Array.sort()
Nah, kita masuk ke `sort()`. ***sort*** adalah salah satu ***higher-order function*** di JavaScript yang berfungsi untuk mengurutkan suatu *array*. Parameternya adalah fungsi *callback comparer* yang memiliki argumen nilai yang akan di-*compare*, biasanya *variable* nilai yang di-*compare* itu dinamakan `a` dan `b`. `sort()` ini hanya bisa mengurutkan string `A-Z` jika tidak ada parameter *callback* yang dimasukan. Lihat contoh dibawah ini:

```js
let fruits = ['Mango', 'Apple', 'Banana', 'Orange', 'Grape']
fruits = fruits.sort()

console.log(fruits)
```
<button onclick="kasus4()">Lihat Hasil</button>
<p style="font-weight: bold" id="case4-result">Hasil urut: ...</p>

Hasil diatas sudah benar, hasilnya adalah nama buah yang sudah diurutkan dari `A-Z`.
Nah, bagaimana dengan angka? Apakah kita bisa mengurutkannya dari angka yang terkecil sampai ke yang terbesar? Mari kita coba lagi.

```js
let amounts = [1000, 100, 200, 10000, 6000, 800, 200000]
amounts = amounts.sort()

console.log(amounts)
```
<button onclick="kasus5()">Lihat Hasil</button>
<p style="font-weight: bold" id="case5-result">Hasil urut: ...</p>

"Loh loh, kok hasilnya gitu? yang duluan malah **1000** dan **10000** daripada **200** 😕". Yah emang gitu, karena `sort()` *default*-nya hanya mengurutkan nilai *string* jika tidak ada parameter *callback* *comparer*-nya. Jadi, dia otomatis meng-*convert* angka-angka tersebut menjadi *string* terlebih dahulu sebelum diurutkan. Ya jelas hasil urutnya jadi begitu, karena kalau didalam *string*, **100000000** aja lebih kecil daripada **2** 😆.

Coba kita tes seperti ini:

```js
amounts = amounts.sort((a, b) => a > b ? 1 : -1)

console.log(amounts)
```
<button onclick="kasus6()">Lihat Hasil</button>
<p style="font-weight: bold" id="case6-result">Hasil urut: ...</p>

"Wah iya hasilnya bener sesuai urutan angka yang terkecil sampai ke yang terbesar. Tapi coba, apaan itu maksudnya? ga jelas banget 😕". Okay, mari kita bongkar, sebenernya didalem dia ngapain aja, wkwkw.

```js
amounts = amounts.sort((a, b) => {
  console.log(`Log: a(${a}) > b(${b}) ? ${a > b ? 1 : -1}`)
  return a > b ? 1 : -1
})

console.log('Hasil urut:', amounts)
```
<button onclick="kasus7()">Lihat Hasil</button>
<p style="font-weight: bold">Sebelum diurut: [1000,100,200,10000,6000,200000]</p>
<p style="font-weight: bold;" id="case7-log">...</p>
<p style="font-weight: bold" id="case7-result">Hasil urut: ...</p>

Untuk penjelasan singkatnya, anggap aja `a` dan `b` itu adalah nilai yang akan dibandingkan. Jika hasil *return*-nya `1`, berarti kita menaruh nilai `a` dikanan setelah `b`. Sebaliknya jika hasil *return*-nya `-1`, berarti kita menaruh nilai `a` dikiri sebelum `b`. Dan.. seperti itulah hasil urutan yang sebenarnya, bukan kayak yang kita coba tadi `1000 < 200` 😠.

---

#### Penutup
Nah, keuntungan yang kita dapat dengan menggunakan ***higher-order function*** ini kita tidak perlu lagi pusing-pusing untuk mikirin algoritmanya, kita juga tidak perlu menggunakan *looping* lagi ketika berurusan dengan *array*. Kita hanya butuh menaruh kondisi-kondisi yang mau kita *return*. Selebihnya, biarkan JavaScript yang bekerja 😆. Tapi walaupun seperti itu, setidaknya kita harus tahu sedikit apa yang sebenarnya terjadi di dalam prosesnya, supaya kita tahu apa yang harus kita *return*.

Contohnya saja untuk sorting, sebenarnya algoritma sorting banyak, mulai dari *bubble*, *quick*, *insertion*, *selection* dsb. Dan btw, aku tidak menjamin dengan menggunakan ***higher-order function*** ini kita mendapatkan *best performance*, tapi setidaknya daripada pake algoritma sendiri juga lebih lambat, lebih baik pake ***higher-order function*** deh, wkwkw. Yang kita lihat disini juga bukan tingkat performanya, melainkan tingkat praktisnya atau biasa disebut *best practice*. Bisa dilihat, kode yang kita tulis dari awal sampai akhir tadi tidak ada yang panjang dan bertele-tele, semuanya singkat serta mudah dibaca dan dijelaskan.

---

JavaScript itu termasuk salah satu bahasa pemrograman tingkat tinggi yang menganut paham ***functional (simple, practical and cool)***, beda dengan kakaknya Java yang menganut paham ***object oriented (strict, strong and tough)***. <del>Eh btw, JavaScript dan Java gada hubungan kalee hahaha</del>. Dan sebagai anak *functional*, kita harus paham dan menguasai ***higher-order function*** dong, percuma ngaku anak *functional* tapi ketika berurusan dengan *array* aja masih pake *looping*, oops hahaha 😆😆.

Oke sip, udah mungkin sampai sini aja. Semoga apa yang aku tulis disini bisa bermanfaat buat temen-temen yang membaca. Sekian dariku, sampai jumpa lagi. Jangan lupa share ya 😊
