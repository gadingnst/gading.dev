---
title: "Belajar PDO di PHP"
slug: {
	en: null,
	id: "belajar-pdo-di-php"
}
date: 2018-10-26
description: "Mengenal apa itu PDO dan bagaimana cara mengimplementasikannya"
keywords: "php, pdo, belajar php, belajar PDO, PDO di PHP"
tags: ["php", "pdo"]
image: "/media/banners/2.jpg"
---

### Apa itu PDO ?
> "***PDO - PHP Data Object*** *adalah lapisan akses database yang menyediakan metode akses yang seragam ke beberapa database.*"

PDO (PHP Data Object) adalah interface universal yang disediakan PHP untuk “berkomunikasi” dengan database server. Maksud istilah “interface universal” disini adalah bahwa PDO tidak terikat dengan aplikasi database tertentu. Apabila saat ini kita menggunakan database MySQL dan dikemudian hari ingin bermigrasi menggunakan PostgreSQL, kita hanya tinggal mengganti cara pemanggilan awal PDO dan seluruh kode program yang ada bisa langsung digunakan untuk database baru.

Kondisi ini berbeda jika menggunakan mysql extension atau mysqli extension. Kedua extension ini hanya bisa bekerja dengan database MySQL. Karena alasan inilah banyak sebaiknya kita mulai beralih menggunakan PDO dibandingkan mysqli.

Secara teknis, apabila menggunakan mysql atau mysqli extension, PHP langsung berhubungan dengan MySQL Server, tetapi jika menggunakan PDO, ia tidak berhubungan langsung dengan database, tetapi hanya sebagai “interface”. Konsep PDO ini dapat digambarkan sebagai berikut:

![PDO mengakses Database dengan DB Driver](https://www.phptutorial.net/wp-content/uploads/2021/04/php-pdo.svg)

PDO bekerja dengan metode yang disebut “data-access abstraction layer”. Artinya, apapun jenis database server yang digunakan, kode PHP yang ditulis akan tetap sama. PDO menyediakan “abstraction layer” untuk berkomunikasi dengan database server.

Untuk menggunakan PDO, kita harus mengaksesnya menggunakan object. PDO tidak menyediakan cara penulisan procedural style seperti mysqli atau mysql extension. Oleh karena itu, sebelum belajar menggunakan PDO kita harus paham tentang istilah pemrograman *Object Oriented* seperti class, method, property dan istilah OOP lainnya.

### Dukungan Database
Hingga saat penulisan artikel ini (PHP versi 7.2) PDO mendukung setidaknya 12 jenis Interface/Database Server yaitu:

- PDO_CUBRID (Cubrid)
- PDO_DBLIB	(FreeTDS / Microsoft SQL Server / Sybase)
- PDO_FIREBIRD (Firebird)
- PDO_IBM	(IBM DB2)
- PDO_INFORMIX (IBM Informix Dynamic Server)
- PDO_MYSQL	(MySQL)
- PDO_OCI	(Oracle Call Interface)
- PDO_ODBC (ODBC)
- PDO_PGSQL	(PostgreSQL)
- PDO_SQLITE (SQLite 3 dan SQLite 2)
- PDO_SQLSRV (Microsoft SQL Server / SQL Azure)
- PDO_4D (4D)

List ini dapat kamu lihat di [PHP Manual](http://php.net/manual/en/pdo.drivers.php).

Dapat dilihat bahwa PDO mendukung banyak aplikasi database populer seperti: Oracle, Microsoft SQL Server, dan PostgreSQL. Dengan membuat kode PHP menggunakan PDO, secara tidak langsung kita juga membuka kemungkinan untuk menggunakan database server selain MySQL, sehingga menjadi lebih fleksibel.

Akan tetapi, semua driver ini belum tentu tersedia di sistem kamu. Inilah cara untuk mengetahui driver yang sudah terinstall di sistem kamu :

```php
<?php
  print_r(PDO::getAvailableDrivers());
?>
```

Jika Database Driver yang kamu inginkan belum terinstall di sistem kamu, maka kamu harus menginstallnya terlebih dahulu.

### Membuat Koneksi dengan PDO
Database yang berbeda memiliki metode koneksi yang sedikit berbeda. Di bawah ini adalah contoh dari beberapa metode untuk terhubung ke database.

```php
<?php
  try {
    # MS SQL Server
    $dbh = new PDO("sqlsrv:server={$host};database={$dbname}", $user, $pass);

    # MySQL
    $dbh = new PDO("mysql:host={$host};dbname={$dbname}", $user, $pass);

    # SQLite
    $dbh = new PDO("sqlite:path/database/database.db");

    # Menampilan pesan error jika terjadi exception saat mengakses Database.
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(PDOException $e) {
    die($e->getMessage());
  }
?>
```

Kamu harus selalu membungkus operasi PDO di dalam blok **try - catch**, dan gunakan mekanisme exception untuk menampilkan error saat terjadi kesalahan pada mengakses database. [Pelajari lebih lanjut tentang PDO Exception](http://php.net/manual/en/class.pdoexception.php)

Variabel **`$dbh`** adalah variabel yang akan menjadi object PDO. Object ini biasa disebut sebagai *“Database Handler”*. Object inilah yang nantinya akan kita gunakan untuk menjalankan perintah-perintah PDO. Nama variabel boleh bebas, dan tidak harus **`$dbh`**.

Argumen dari constructor PDO terdiri dari 3 bagian, bagian pertama berisi nama database server (misalnya:**mysql**) kemudian diikuti dengan alamat server dan nama database, semuanya di dalam 1 string. Untuk argumen kedua diisi dengan nama user, dan argumen ketiga berisi password user.

Setelah membuat koneksi PDO, untuk menghapus koneksi kita tinggal memberikan nilai *“null”* kepada variabel *“Database Handler”* sebagai berikut:

```php
<?php
  $dbh = null;
?>
```

Kita harus selalu menutup / menghapus koneksi Database setiap sudah menjalankan query.

### Penutup
Demikian dari artikel ini saya tutup, mungkin lain kali saya akan memposting tentang **CRUD Database pada PDO**. Dan saya harap pembaca agar segera mulai bermigrasi dari Exntensi mysqli ke PDO untuk membuat project kamu lebih produktif.

### Referensi
- [code.tutsplus.com](https://code.tutsplus.com/id/tutorials/why-you-should-be-using-phps-pdo-for-database-access--net-12059)
- [duniailkom.com](https://www.duniailkom.com/tutorial-php-mysql-pengertian-pdo-dan-cara-mengaktifkan-pdo-php-data-objects/)
