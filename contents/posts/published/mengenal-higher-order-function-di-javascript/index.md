---
title: 'Mengenal higher-order function di JavaScript'
slug: 'mengenal-higher-order-function-di-javascript'
date: 2019-08-19
description: 'Mengenal higher-order function di JavaScript, seperti: map(), filter() dan reduce()'
tags: ['javascript', 'coding', 'higher-order function']
category: 'Tutorial'
keywords: 'higher-order function, fungsi, javascript, array, tutorial'
image: '/assets/img/collections/desks/desk7.jpg'
caption: 'Menggunakan higher-order function di JavaScript dapat mempersingkat kode dan mengubah gaya pemrograman kita'
css_source: []
js_source: ['/media/blog/mengenal-higher-order-function-di-javascript/test.js']
---

Jika kamu mempelajari bahasa pemrograman JavaScript, kamu akan menemukan istilah *higher-order function*. Meskipun awalnya akan terdengar rumit, namun sebenarnya mudah jika dipelajari dan dipahami. Yang membuat JavaScript cocok untuk bahasa pemrograman fungsional adalah karena JavaScript memiliki *higher-order function*. Sebenarnya *Higher-Order function* adalah fungsi yang *common* di JavaScript, jika kamu sudah pernah memprogram dengan bahasa JavaScript mungkin kamu pernah menggunakan tanpa menyadarinya.

### Mengenal Higher-Order Function
*Higher-Order function* adalah fungsi yang beroperasi didalam fungsi lain, baik menggunakannya sebagai argumen atau mengembalikan nilainya. Secara sederhana, *higher-order function* adalah fungsi yang menerima fungsi sebagai argumen atau mengembalikan nilai fungsi sebagai *output*.

Dalam tulisan ini, kita akan membahas beberapa *higher-order function*, antara lain yaitu: `map()`, `filter()` dan `reduce()`.

#### Array.map()
`Array.map()` adalah salah satu metode dari *higher-order function* bawaan yang berfungsi membuat *array* baru dengan memanggil fungsi callback yang disediakan sebagai argumen pada setiap elemen dalam *array*. Metode `map()` akan mengambil setiap nilai yang dikembalikan dari fungsi *callback*, lalu membuat array baru dengan menggunakan nilai-nilai yang baru.

**Berikut ilustrasinya**
![Ilustrasi Array.map()](/media/blog/mengenal-higher-order-function-di-javascript/map.gif)

Untuk lebih jelasnya mari kita praktekkan saja, katakanlah kita memiliki *array* yang berisi *number* dengan nilai tahun lahir. Kita ingin membuat *array* baru yang menghitung umur dari tahun lahir tersebut dengan tahun **2019**.

**Menggunakan *for-loop* tradisional**
```js
const tahunLahir = [1998, 1999, 2000, 2001, 2002]
const umur = []

for (let i = 0; i < tahunLahir.length; i++) {
  umur.push(new Date().getFullYear() - tahunLahir[i])
}

alert(umur) // hasil: [21,20,19,18,17]
```
Berikut hasilnya:
<button onclick="withoutMap()">Click here!</button>

**Menggunakan *Array.map()***
```js
const tahunLahir = [1998, 1999, 2000, 2001, 2002]
const umur = tahunLahir.map(tahun => new Date().getFullYear() - tahun)

alert(umur) // hasil: [21,20,19,18,17]
```
Berikut hasilnya:
<button onclick="withMap()">Click here!</button>

Bisa dilihat kode akan lebih singkat jika kita menggunakan `Array.map()`. Fungsi *callback* `tahun => 2019 - tahun` dipanggil pada setiap anggota array yang ada di *variabel* **tahunLahir**

### Array.filter()

`Array.filter()` adalah salah satu metode dari *higher-order function* bawaan yang berfungsi untuk membuat *array* baru dengan mengoperasikan fungsi *callback* pada setiap anggota dengan mem-*filter* nilai-nilai didalam *array* yang sudah ada. Adapun argumen yang ada pada *callback* `filter()` adalah: *value*, *index* dan *array*.

**Berikut ilustrasinya**
![Ilustrasi Array.filter()](/media/blog/mengenal-higher-order-function-di-javascript/filter.gif)

Untuk lebih jelasnya, mari kita coba actionnya. Katakanlah kita memiliki *array* yang berisi *object* dengan properti nama dan umur. Kita ingin membuat *array* yang hanya berisi orang-orang dengan usia yang lebih dari atau sama dengan 18 tahun.

**Menggunakan *for-loop* tradisional dengan statement *if***
```js
const orang = [
  { nama: 'Sutan', umur: 16 },
  { nama: 'Joni', umur: 18 },
  { nama: 'Mark', umur: 27 },
  { nama: 'Back', umur: 14 },
  { nama: 'Toni', umur: 24},
]

const orangDiizinkan = []

for (let i = 0; i < orang.length; i++) {
  if (orang[i].umur >= 18) {
    orangDiizinkan.push(orang[i].nama);
  }
}

alert(orangDiizinkan) // ['Joni','Mark','Toni']
```
Berikut hasilnya: 
<button onclick="withoutFilter()">Click here!</button>

**Menggunakan *Array.filter()* dan *Array.map()***
```js
let orang = [
  { nama: 'Sutan', umur: 16 },
  { nama: 'Joni', umur: 18 },
  { nama: 'Mark', umur: 27 },
  { nama: 'Back', umur: 14 },
  { nama: 'Toni', umur: 24},
]

orang = orang.filter(orang => orang.umur >= 18)
alert(orang.map(orang => orang.nama)) // ['Joni','Mark','Toni']
```
Berikut hasilnya:
<button onclick="withFilter()">Click here!</button>

### Array.reduce()

`Array.reduce()` adalah salah satu metode dari *higher-order function* bawaan yang berfungsi untuk menjalankan fungsi *callback* pada setiap anggota dari *array* yang dipanggil dengan menghasilkan *single output*. Metode `reduce()` menerima 2 parameter, yaitu fungsi *callback* dan *initialValue* (opsional). Sedangkan fungsi *callback*-nya menerima 4 parameter, yaitu: *accumulator*, *currentValue*, *currentIndex* (opsional), *sourceArray* (opsional).

Jika tidak ada *initialValue* yang disediakan, maka *accumulator* akan sama dengan elemen pertama dalam *array* dan *currentValue* akan sama dengan elemen kedua dalam *array*.

**Berikut ilustrasinya**
![Ilustrasi Array.reduce()](/media/blog/mengenal-higher-order-function-di-javascript/reduce.gif)

Memang agak rumit jika mendengar penjelasan `reduce()` ini. Untuk contoh sederhananya, anggaplah kita mempunyai data seperti ini:

```js
const keranjang = [
  {
    produk: 'Indomie Mie Goreng',
    harga: 2500
  },
  {
    produk: 'Aqua Gelas',
    harga: 500
  },
  {
    produk: 'Sepatu Sport',
    harga: 75000
  }
]
```

Lalu, kita ingin menjumlahkan total harga dari properti harga yang ada pada data keranjang tersebut.

**Dengan Menggunakan *for-loop* tradisional**
```js
let totalHarga = 0
for (let i = 0; i < keranjang.length; i++) {
  totalHarga += keranjang[i].harga
}
alert('Rp.' + totalHarga) // Hasil: Rp.78000
```
Berikut hasilnya: 
<button onclick="withoutReduce()">Click here!</button>

**Menggunakan *Array.reduce()***
```js
const totalHarga = keranjang.reduce((acc, cur) => acc + cur.harga, 0)
alert('Rp.' + totalHarga) // Hasil: Rp.78000
```
Berikut hasilnya:
<button onclick="withReduce()">Click here!</button>

### Kesimpulan
Sampai disini kita telah mengenal apa itu *higher-order function*. Singkatnya, *higher-order function* adalah fungsi yang dapat menerima fungsi sebagai argumen dan bahkan dapat mengembalikan nilai dari fungsi. *Higher-Order function* sama seperti fungsi biasa dengan kemampuan tambahan untuk menerima dan mengembalikan fungsi lainnya dengan argumen dan output yang ditentukan. Sebenarnya masih ada lagi *Higher-Order function* bawaan yang ada pada bahasa pemrograman JavaScript, seperti: find(), sort() dan lainnya. Mungkin lain kali kita akan bahas lagi. Jangan lupa share ya 😄
