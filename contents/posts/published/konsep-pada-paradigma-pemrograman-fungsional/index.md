---
title: 'Konsep-konsep yang harus diketahui pada paradigma pemrograman fungsional'
slug: 'konsep-pada-paradigma-pemrograman-fungsional'
date: 2019-12-05
description: 'Tidak hanya OOP, paradigma fungsional juga memiliki konsep dan aturan penggunaan, apa saja itu ?'
tags: ['functional', 'purefunction', 'recursive', 'currying', 'higherorderfunction']
category: 'Engineering'
keywords: 'functional paradigm, paradigma fungsional, pure function, curried function, recursive function, currying, recursive, fungsi'
image: '/assets/img/collections/desks/desk5.jpg'
caption: 'Paradigma fungsional sudah muncul sejak lama, lalu meningkat penggunaannya pada akhir-akhir dekade ini, dibuktikan banyak bahasa pemrograman baru bermunculan yang menggunakan paradigma ini. Apa saja konsep-konsep yang harus dipelajari ketika ingin menggunakan paradigma fungsional ?'
css_source: []
js_source: []
---

Pada artikel sebelumnya kita sudah membahas macam-macam *higher-order function* di JavaScript. Nah pertanyaannya, apakah *higher-order function* hanya ada pada JavaScript ? Jawabannya, **tidak**. *Higher-order function* tersedia di banyak bahasa pemrograman modern yang khususnya memiliki paradigma ***functional***. Untuk lebih jelasnya tentang paradigma fungsional silahkan cari-cari di google terlebih dahulu, karena pada artikel ini tidak akan menjelaskan tentang paradigma fungsional melainkan frasa-frasa apa saja yang *common* digunakan pada paradigma fungsional ini. Oke, langsung aja kita mulai.

---

###### Setidaknya ada 5 konsep yang *common* pada paradigma fungsional. yaitu:
1. Transformation dan Immutability
2. Pure Function
3. Recursive Function
4. Higher-order Function (HOF)
5. Currying/Curried Function

### 1. Transformation dan Immutability
Sebelum masuk ke 4 point yang memang benar-benar khusus fungsional, pertama-tama kita akan bahas dulu apa itu *transformation* dan *immutability*. Kenapa *transformation* dan *immutability* gua gabung jadi satu point? Karena konsep *transformation* ini biasanya didukung dengan konsep data *immutability* atau kekekalan data, jadi mereka berhubungan satu sama lain hehe. Data yang kekal artinya data yang tidak akan bisa berubah nilainya setelah dibuat. Terus, untuk apa membuat setiap data menjadi immutable/kekal? Yap kita menggunakan konsep *immutability* ini untuk menghindari terjadinya peristiwa *side-effect*. Pada paradigma OOP semua data biasanya bersifat *mutable*. Karena biasanya pada paradigma OOP mengizinkan kita untuk mutasi data melalui sebuah *setter* pada suatu *class*. Sebagai contoh, biasanya kita ngelakuin ini di Java:

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

Benar, Kita sudah memutasi *property* diskon pada objek produk dan menyebabkan variable `price1` ikut berubah. Itulah yang disebut *side-effect*, *variable* `price1` yang sudah kita deklarasi di awal juga terkena efek sampingnya ketika kita memutasi diskon pada objek produk tersebut. Nah di beberapa kasus, hal sepele ini kadang menyebabkan kesalahan dan menghasilkan bug. Dengan begitu, konsep *immutability* data pada sebuah kode juga bisa dikatakan penting. Di Java, sebenarnya ada juga konsep *immutability*, contohnya pada tipe data String seperti ini:

```java
String string1 = "Halo.";
String string2 = string1.toUpperCase();

System.out.println(string2);  // => HALO.
System.out.println(string1);  // => Halo.

string1 = string1 + " Saya Gading";
System.out.println(string1);  // => Halo. Saya Gading
```

Kita lihat bahwa nilai `string1` tidak berubah karena pemanggilan `string1.toUpperCase()`. Tipe data String pada bahasa Java bersifat *immutable*, kita tidak dapat mengubah nilainya setelah melakukan *assignment*. Meskipun demikian, Kita dapat meng-*assign* ulang *variable* tipe data String dengan nilai lain. Operasi-operasi seperti konkatenasi dengan `+`, `.toUpperCase()`, dan sebagainya untuk mengembalikan nilai baru dan tidak mengubah nilai awalnya.

Pada baris terakhir, kelihatannya kita mengganti nilai `string1`, tapi sebenarnya yang kita lakukan adalah mengubah *reference* yang dimiliki `string1` ke sebuah string baru hasil konkatenasi. Lebih jelasnya pada potongan kode berikut:

```java
String string1 = "Halo.";
String string2 = string1;
string1 = string1 + " Saya Rina!";

System.out.println(string1);  // => Halo. Saya Rina!
System.out.println(string2);  // => Halo.
```

Terlihat bahwa `string2` tidak berubah, karena ia masih me-refer objek string yang sama seperti sebelumnya. Tapi hanya sejauh itulah konsep *immutability* di Java. Pemrograman berorientasi objek dengan Java sangat mendukung pendekatan mutasi data pada sebuah *class*, melalui *setter*-nya sehingga menghasilkan peristiwa *side-effect* seperti yang kita lakukan di awal tadi.

Dalam paradigma fungsional, kita harus menghindari peristiwa *side-effect* ini dengan menggunakan konsep *immutability*. Terus, bagaimana cara mengimplementasi konsep *immutability* tersebut pada paradigma fungsional? Nah nanti akan ada hubungannya dengan 4 point yang di bawah, simak sampai abis ya^^

### 2. Pure function
Setelah membahas konsep *immutability* dan peristiwa *side-effect*, kita bisa dengan mudah memahami apa itu *Pure Function*. Secara bahasa, *Pure Function* dapat kita artikan sebagai **fungsi murni**. Terus, apa artinya? kenapa bisa dikatakan fungsi murni? Nah, fungsi murni ini adalah fungsi yang tidak menimbulkan efek samping (*side-effect*). Ketika kita ingin menulis sebuah fungsi murni, aturannya adalah: kita tidak boleh merubah *variable* yang diluar *scope*-nya, lalu pada fungsi tersebut kita harus me-*return* nilai baru sebagai hasil olahnya untuk menghindari terjadinya *side-effect*.

> TODO

### 3. Recursive
Lorem ipsum

### 4. Higher-order function
Lorem ipsum

### 5. Currying
Lorem ipsum
