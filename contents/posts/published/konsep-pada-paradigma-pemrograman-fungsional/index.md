---
title: 'Konsep dan teknik yang harus diketahui pada paradigma pemrograman fungsional'
slug: 'konsep-pada-paradigma-pemrograman-fungsional'
date: 2019-12-05
description: 'Tidak hanya OOP, paradigma fungsional juga memiliki konsep dan aturan penggunaan yang menarik, apa saja itu ?'
tags: ['functional', 'purefunction', 'recursive', 'currying', 'higherorderfunction']
category: 'Engineering'
keywords: 'functional paradigm, paradigma fungsional, pure function, curried function, recursive function, currying, recursive, fungsi'
image: '/assets/img/collections/desks/desk5.jpg'
caption: 'Paradigma fungsional sudah muncul sejak lama, lalu meningkat penggunaannya pada akhir-akhir dekade ini, dibuktikan banyak bahasa pemrograman baru bermunculan yang menggunakan paradigma ini. Apa saja konsep-konsep yang harus dipelajari ketika ingin menggunakan paradigma fungsional ?'
css_source: []
js_source: []
---

Pada artikel sebelumnya kita sudah membahas macam-macam *higher-order function* di JavaScript. Nah pertanyaannya, apakah *higher-order function* hanya ada pada JavaScript ? Jawabannya, **tidak**. *Higher-order function* tersedia *built-in* di banyak bahasa pemrograman modern yang khususnya memiliki paradigma fungsional, bahkan kita bisa membuatnya sendiri pada bahasa pemrograman apapun. Lalu apakah sebenarnya *higher-order function* itu? Nah, *Higher-order function* sendiri termasuk salah satu dari konsep atau teknik yang ada pada paradigma fungsional. Pada artikel ini gua akan membahas apa saja konsep yang biasanya digunakan pada paradigma fungsional. Oke, tidak perlu panjang lebar langsung aja kita mulai.

---

###### Setidaknya ada 5 konsep yang *common* pada paradigma fungsional. yaitu:
1. Transformation dan Immutability (Transformasi dan Kekekalan)
2. Pure Function (Fungsi Murni)
3. Recursion/Recursive Function (Fungsi Rekursif)
4. Higher-order Function (Fungsi Tingkat Tinggi)
5. Currying/Curried Function (Fungsi Kari)

### 1. Transformation dan Immutability
Sebelum masuk ke 4 point yang memang benar-benar khusus fungsional, pertama-tama kita akan bahas dulu apa itu *transformation* dan *immutability*, karena inilah dasar dan ciri khas utama dari paradigma fungsional. Kenapa *transformation* dan *immutability* gua gabung jadi satu point? Karena konsep *transformation* ini biasanya didukung dengan konsep data *immutability* atau kekekalan data, jadi mereka berhubungan satu sama lain hehe.

Data yang kekal artinya data tidak akan bisa berubah nilainya setelah dibuat. Terus, untuk apa membuat setiap data menjadi immutable/kekal? Yap kita menggunakan konsep *immutability* ini untuk menghindari terjadinya peristiwa *side-effect*. Pada paradigma OOP semua data biasanya bersifat *mutable*. Karena paradigma OOP mengizinkan kita untuk melakukan mutasi data melalui sebuah *setter* pada suatu *class*. Sebagai contoh, biasanya kita ngelakuin ini di Java:

```java
Product product = new Product("Sepatu");
product.setDiscount("10%");
product.setPrice(90000);

System.out.println(product.getSalePrice()); // 81000

product.setDiscount("50%");

System.out.println(product.getSalePrice()); // 45000
```

Nah, mungkin kurang lebih seperti itu kalau kita mengetik program di Java yang paradigmanya menggunakan OOP. Disitu dapat kita lihat bahwa kita sudah memutasi nilai diskonnya dari `10%` menjadi `50%`. "Lah terus, emang kenapa?" Ga ada apa-apa sih, sebenarnya sah-sah aja kalau kita ingin seperti itu, namun disini saya ingin menunjukkan apa itu peristiwa *side-effect*, coba kita lihat ini: 

```java
Product product = new Product("Sepatu");
product.setDiscount("10%");
product.setPrice(90000);

double price1 = product.getSalePrice();
System.out.println(price1); // => 81000

product.setDiscount("50%");

double price2 = product.getSalePrice();
System.out.println(price2); // => 45000
System.out.println(price1); // => 45000
```

Benar, Kita sudah memutasi *property* diskon pada objek produk dan menyebabkan variable `price1` ikut berubah, karena pada method `getSalePrice()` tsb mengacu terhadap *property* diskon pada objek produk. Nah, itulah contoh sederhana dari peristiwa *side-effect*, *variable* `price1` yang sudah kita deklarasi di awal juga terkena efek sampingnya ketika kita melakukan mutasi diskon pada objek produk tersebut.

Setiap objek dari *class* memiliki sebuah *state* dari *property*-nya, dan memiliki operasi-operasi khusus atau *behavior* yang dapat dilakukan pada *state* tersebut melalui *method*. Program kita berjalan dengan membuat *instance* dari objek-objek tersebut dan memodifikasi *state*-nya melalui *method* yang disediakan, biasanya disebut *setter*. Ketika proyek kita sudah cukup besar dan objek yang dibuat cukup banyak, akan sulit untuk memahami *state* apa saja yang ada pada program kita, dan bagaimana perubahannya dari waktu ke waktu, apalagi jika *class* dari objeknya saling bergantungan dengan *class-class* yang lain. Hal ini dapat menyebabkan kesalahan dari *engineer* dan membuat program sulit di maintain.

Dengan begitu, konsep *immutability* data pada sebuah kode juga bisa dikatakan penting untuk menghindari peristiwa *side-effect* tsb. Di Java, sebenarnya ada juga konsep *immutability*, contohnya pada tipe data String seperti ini:

```java
String string1 = "Halo.";
String string2 = string1.toUpperCase();

System.out.println(string2);  // => HALO.
System.out.println(string1);  // => Halo.

string1 = string1 + " Saya Gading";
System.out.println(string1);  // => Halo. Saya Gading
```

Kita lihat bahwa nilai `string1` tidak berubah karena pemanggilan `string1.toUpperCase()`. Tipe data String pada bahasa Java bersifat *immutable*, kita tidak dapat mengubah nilainya setelah melakukan *assignment*. Meskipun demikian, Kita dapat meng-*assign* ulang *variable* tipe data String dengan nilai lain. Operasi-operasi seperti *concatenation* dengan `+`, `.toUpperCase()`, dan sebagainya untuk mengembalikan nilai baru dan tidak mengubah nilai awalnya.

Pada baris terakhir, kelihatannya kita mengganti nilai `string1`, tapi sebenarnya yang kita lakukan adalah mengubah *reference* yang dimiliki `string1` ke sebuah string baru hasil konkatenasi. Lebih jelasnya pada potongan kode berikut:

```java
String string1 = "Halo.";
String string2 = string1;
string1 = string1 + " Saya Rina!";

System.out.println(string1);  // => Halo. Saya Rina!
System.out.println(string2);  // => Halo.
```

Terlihat bahwa `string2` tidak berubah, karena ia masih me-refer objek string yang sama seperti sebelumnya. Tapi hanya sejauh itulah konsep *immutability* di Java. Pemrograman berorientasi objek dengan Java sangat mendukung pendekatan mutasi data pada sebuah *class*, melalui *setter*-nya sehingga sangat besar kemungkinannya untuk menghasilkan peristiwa *side-effect* seperti yang kita lakukan di awal tadi.

---

Pada paradigma pemrograman fungsional, *state* dan *behavior* merupakan sesuatu yang terpisah. *State* direpresentasikan oleh sebuah struktur data, dan *behavior* merupakan fungsi-fungsi yang mampu beroperasi pada data tersebut. **Dalam paradigma fungsional, program kita merupakan sebuah urutan transformasi data dari suatu bentuk ke bentuk yang lain.**

Terus, bagaimana cara memantapkan konsep *transformation* dan *immutability* tersebut pada paradigma fungsional? Nah nanti akan ada hubungannya dengan 4 point yang di bawah, simak sampai abis ya^^

### 2. Pure function
Setelah membahas konsep *transformation* dan *immutability* serta peristiwa *side-effect*, kita bisa dengan mudah memahami apa itu *Pure Function*. Secara bahasa, ***Pure Function*** dapat kita artikan sebagai **fungsi murni**. Terus, apa artinya? kenapa bisa dikatakan fungsi murni? Lebih jelasnya, fungsi murni ini adalah fungsi yang beroperasi untuk *transformation* data serta tidak menimbulkan *side-effect* ketika memanggilnya. Jika kita ingin menulis sebuah fungsi murni, aturannya adalah: pertama, kita tidak boleh merubah *variable* diluar *scope* fungsi tersebut. Kedua, pada fungsi tersebut kita harus me-*return* nilai atau argumen baru sebagai hasil operasinya, dan yang terakhir, jika menggunakan input parameter yang sama, fungsi yang murni seharusnya konsisten dalam me-*return* nilainya. Supaya lebih jelas, mari kita lihat contoh fungsi dari potongan kode berikut.

**Contoh Impure Function (Fungsi tidak murni)**
```js
// IMPURE Function 1
let result = 0
const sum = number => {
  result += number // => mengakses dan mengubah variable diluar scope. (Akan menimbulkan side-effect!)
  return result
}

// Hasil return dengan input yang sama tidak konsisten
console.log(sum(2)) // => 2
console.log(sum(2)) // => 4
console.log(sum(2)) // => 6

// IMPURE Function 2
const save = data => {
  doSomethingElse()
  saveToDatabase(data)
  // => tidak mereturn nilai apapun.
}

const data = { id: 1, name: 'Coca-Cola' }
console.log(save(data)) // => undefined
```

**Contoh Pure Function (Fungsi Murni)**
```js
// PURE Function
const getSalePrice = (discount, price) =>
  price - ((parseInt(discount.match(/\d+/)) / 100) * price) // => tidak mengakses maupun mengubah variable diluar scope sehingga tidak akan menimbulkan side-effect

// Hasil return dengan input yang sama konsisten
console.log(getSalePrice('80%', 10000)) // => 2000
console.log(getSalePrice('80%', 10000)) // => 2000
console.log(getSalePrice('50%', 100000)) // => 50000
console.log(getSalePrice('50%', 100000)) // => 50000
```

### 3. Recursive
Setelah *Pure Function*, kita akan membahas *Recursive*. ***Recursive*** sendiri adalah sebuah fungsi yang memanggil dirinya sendiri, baik secara langsung maupun tidak langsung. Rekursif merupakan salah satu teknik penyelesaian masalah yang berguna. Ketika menyelesaikan masalah secara rekursif, umumnya kita memecah-mecah masalah besar menjadi banyak masalah yang lebih kecil, dan menyelesaikan masalah kecil tersebut dengan fungsi rekursif. Lalu apa kelebihan rekursif dari iterasi seperti *for-loop*, *do-while* dsb? Yang gua tau, Secara kasat iterasi lebih cepat dari rekursif, akan tetapi rekursif dapat dioptimasi lagi dengan menggunakan metode *tail-recursion*. Lalu apa itu *tail-recursion*? Nah kalo itu sih gua ga bahas disini, disini gua lebih fokus membahas perbandingan rekursif dari cara penggunaannya saja. Lagian, kalo masalah teori lebih dalemnya itu diluar kapasitas gua, gua gamau ngejelasin apa yang diluar dari kapasitas gua. Oke langsung aja kita lihat contoh perbandingan penggunaan rekursif dengan iterasi, dengan asumsi gua ingin membuat fungsi `range()` seperti di Python pada JavaScript.

```js
// Iteration
const rangeWithIteration = (start, end) => {
  const result = []
  for (start; start <= end; start++) {
    result.push(start)
  }
  return result
}

// Recursion
const rangeWithRecursion = (start, end) =>
  start < end
    ? [start, ...rangeWithRecursion(start + 1, end)]
    : [start]

// Penggunaan
console.log(rangeWithIteration(1, 5)) // => [1, 2, 3, 4, 5]
console.log(rangeWithRecursion(1, 5)) // => [1, 2, 3, 4, 5]
```

Kalau dilihat dari hasil udah jelas sama saja, namun dari segi keringkasan kode jelas menggunakan cara rekursif lebih simple, elegan dan kelihatan banget ciri khas fungsionalnya.

### 4. Higher-order function
Kita sudah membahas tentang *Higher-order function* di JavaScript pada artikel sebelumnya sebanyak 2 part. Namun yang kita bahas kemarin-kemarin itu hanya dari luarnya saja. Lalu bagaimana isi dalamnya? Mari kita praktekkan lebih lanjut disini, hehe.

Namun saya ulangi lagi pengertiannya, ***Higher-Order function*** atau bahasa Indonesianya **fungsi tingkat tinggi** adalah yang menerima fungsi  *callback* sebagai argumen atau mengembalikan nilai fungsi *callback* tsb sebagai *output*. Nah untuk contoh, kalau sebelumnya fungsi `Array.map()` dan `Array.filter()` di JavaScript hadir secara terpisah, asumsikan saja kita ingin membuat fungsi map dan filter sekaligus dalam satu fungsi supaya lebih optimal, haha.

```js
const mappedFilter = ([item, ...remaining], cbMap, cbFilter) => (
  typeof item === 'undefined'
  ? []
  : cbFilter(item)
    ? [cbMap(item), ...mappedFilter(remaining, cbMap, cbFilter)]
    : mappedFilter(remaining, cbMap, cbFilter)
)

// PENGGUNAAN

const data = [
  { id: 1, name: 'Product 1', price: 75000 },
  { id: 2, name: 'Product 2', price: 5000 },
  { id: 3, name: 'Product 3', price: 25000 },
  { id: 4, name: 'Product 4', price: 56000 },
  { id: 5, name: 'Product 5', price: 30000 }
]

// mencari nama produk dengan harga diatas 50000
const result = mappedFilter(data,
  product => product.name, // => callback sebagai output
  product => product.price > 50000 // => callback sebagai argumen logika
)

console.log(result) // output => ['Product 1', 'Product 4']
```

Bisa dilihat kalau peran *callback* `cbFilter` pada fungsi `mappedFilter` tsb sebagai argumen operator logika sedangkan `cbMap` sebagai *output*. Nah, kedua *callback* itulah yang disebut *higher-order function*. *Callback* perannya tidak selalu menjadi *higher-order function*, karena bisa saja *callback* hanya dipanggil untuk menyelesaikan proses tanpa me-*return* sebuah argumen atau *output*. Namun *higher-order function* sudah pasti menggunakan fungsi *callback*.

Jadi intinya, jika kita menggunakan *callback*, belum tentu *callback* itu adalah *higher-order function*, namun jika kita menggunakan *higher-order function* sudah dipastikan yang kita gunakan itu adalah *callback*. By the way, itu yang praktekkan menggunakan rekursif, jika ingin menggunakan iterasi tidak ada salahnya kok

### 5. Currying
Yang terakhir adalah ***Currying*** atau bisa juga disebut ***Curried Function***. Secara bahasa, *curry* artinya bumbu/kari. Jika kita istilahkan secara awam *Curried Function* adalah fungsi yang sudah ditaburi bumbu/kari.

Namun secara teknis, *Currying* adalah teknik mengubah fungsi dengan *multiple* parameter/argumen menjadi pecahan banyak fungsi, tiap fungsi harus mengambil setiap parameter yang ada. Mari kita lihat contoh potongan kode ini.

**Fungsi tanpa *currying***
```js
const getSalePrice = (discount, price) =>
  price - ((parseInt(discount.match(/\d+/)) / 100) * price)

const price = getSalePrice('50%', 100000)
console.log(price) // => 50000
```

Mungkin seperti itu fungsi yang kita tulis biasanya, nah coba kita pecah parameternya dan membuat fungsi tersebut menjadi *currying*.

**Fungsi dengan *currying***
```js
const getSalePrice = discount => price =>
  price - ((parseInt(discount.match(/\d+/)) / 100) * price)

const price = getSalePrice('50%')(100000)
console.log(price) // => 50000
```

***Lah dari hasilnya sama aja, terus apa untungnya bikin gituan?***

Oke, kita lihat untungnya menggunakan *currying*. Asumsikan bahwa kita kita memiliki diskon yang sama namun harga produk yang berbeda. Jika tanpa teknik *currying* mungkin kita akan menulis seperti ini.

```js
const price1 = getSalePrice('50%', 10000)
const price2 = getSalePrice('50%', 750000)
const price3 = getSalePrice('50%', 40000)
// dan seterusnya

// atau seperti ini
const discount = '50%'
const price1 = getSalePrice(discount, 10000)
const price2 = getSalePrice(discount, 750000)
const price3 = getSalePrice(discount, 40000)
// dan seterusnya
```

Sekilas tidak ada yang salah dengan kode di atas, dan memang tidak ada yang salah. Hanya saja ada banyak pengulangan parameter untuk diskonnya.

Nah dibandingkan dengan kode diatas coba kita gunakan fungsi `getSalePrice` yang menggunakan *currying* tadi.

```js
const discount = getSalePrice('50%')

const price1 = discount(10000)
const price2 = discount(750000)
const price3 = discount(40000)
```

Yap benar. Dengan *currying*, kita dapat menahan atau meng-*hold* sebuah parameter yang mungkin akan digunakan berulang kali, hal ini membuat parameter pada fungsi kita menjadi *reusable*. Implementasi teknik *currying* ini sering kita jumpai. Contoh umumnya pada framework React, seperti: *react hooks*, *higher-order component*, dsb. Selain itu implementasi *currying* banyak juga ditemukan pada *module-module* konfigurasi.

---

### Penutup
Kita simpulkan bahwa konsep dan teknik pada paradigma fungsional tidak kalah menarik dengan konsep dan teknik pada paradigma OOP seperti yang kita ketahui pada umumnya. Tidak seperti paradigma OOP yang merupakan kumpulan objek yang dapat berkomunikasi dan bergantungan satu sama lain, pendekatan pada paradigma fungsional merupakan kumpulan fungsi kecil yang beroperasi terhadap data secara independen.

Jadi, **dibanding berpikir bahwa program kita adalah kumpulan objek yang datanya dapat berkomunikasi dan bergantungan satu sama lain, lebih baik berpikir bahwa program kita adalah kumpulan fungsi kecil yang beroperasi dengan datanya masing-masing secara independen.** Apalagi sekarang sedang *trend*-nya *Microservice*. Contoh sederhanya seperti: *AWS lambda function*, *Google Cloud function*, *Firebase function* dan sebagainya. Secara *flow*, sebenarnya arsitektur *microservice* itu sama persis dengan alur paradigma fungsional. Karena pada *microservice*, *service-service* yang dibangun bersifat *independent* dan tidak bergantung dengan *service* yang lain.

Dan sebenarnya sih kita tidak harus selalu memilih dan hanya menggunakan salah satu dari kedua paradigma tersebut. Kita sangat boleh sekali jika ingin menggabungkan paradigma OOP dengan paradigma fungsional dalam proyek kita dengan catatan bahasa pemrograman yang kita gunakan mendukung untuk *multiple paradigm*. Karena ada beberapa bahasa pemrograman yang tidak mendukung untuk *multiple paradigm* dan memang dibuat khusus untuk menggunakan salah satu paradigma tertentu saja.

---

Nah, mungkin itu saja konsep-konsep pada paradigma fungsional yang bisa gua bahas di artikel ini. Jika ada kesalahan dalam penjelasan dan praktek yang gua lakuin diatas boleh di interupsi kok. Sesungguhnya gua juga masih banyak perlu belajar. Sekian dari gua semoga bermanfaat, dan terima kasih. 😄
