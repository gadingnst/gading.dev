---
title: 'Memahami lebih dalam konsep Promise di JavaScript'
slug: {
  en: null,
  id: 'memahami-konsep-promise-di-javascript'
}
date: 2020-02-08
description: 'Promise hadir untuk menyelesaikan kasus-kasus pada proses asynchronous di JavaScript. Memahami konsep promise adalah bagian terpenting dalam JavaScript.'
tags: ['javascript', 'promise', 'callback', 'asynchronous']
keywords: 'javascript, konsep promise, callback hell, callback, proses asynchronous, promise'
image: '/media/blog/memahami-konsep-promise-di-javascript/promise.png'
---

JavaScript adalah bahasa pemrograman *interpreted* yang terkenal dengan gaya *asynchronous*-nya. Hal inilah menjadi salah satu faktor yang membuat JavaScript termasuk bahasa dengan performa yang cepat bahkan yang paling cepat jika dibandingkan dengan bahasa *interpreted* lainnya, seperti ***Perl, PHP, Python, Ruby, etc*** (Ingat, ini bukan bicara tentang *compiled language* ya!).

---

Memahami *asynchronus* adalah salah satu hal penting dalam dunia Javascript. Konsep ini sering dilewatkan ketika masih di tahap belajar fundamental mungkin karena konsepnya terlalu ribet dijelaskan atau alasan lain. Bahkan banyak yang sudah bertahun-tahun menggunakan javascript ternyata masih banyak yang masih kurang paham dengan konsep *asynchronous*. Walaupun secara praktek mungkin sudah sering digunakan.

Konsep *asynchronous* memang termasuk salah satu konsep fundamental, namun tidak terlalu mudah untuk dipahami, tapi ada istilah "*practice makes perfect*". Semakin sering di praktekkan semakin paham. Tapi praktek tanpa memahami konsep juga buta, terlalu banyak *trial and error* dan makan waktu. Menurut gua, cara ideal untuk memahami *asynchronous* dengan memahami konsepnya adalah secara bertahap dan mempraktekkannya. Ingat kuncinya adalah bertahap bukan borongan.

> Note: Sebelum membaca artikel tentang ***Promise*** ini, setidaknya kalian harus paham sedikit tentang ***asynchronous*** dan ***callback***. Karena artikel ini pada dasarnya membahas materi fundamental lanjutan. Lebih baiknya kalian baca-baca artikel yang membahas dua materi yang gua sebutkan diatas dulu. Oke?

---

*Dikarenakan blog ini cukup panjang, estimasi bacaannya sampai 20 menitan 😄. Jadi gua buatin ***table of contents*** nya biar mudah untuk pindah-pindah section. Disarankan sediain cemilan dan secangkir kopi supaya bisa lebih enjoy untuk menikmati bacaan ini.*

---

## Mengenal Promise

***Promise*** adalah salah satu konsep yang hadir di ES6 (ES2015). Konsep ini hadir untuk mengubah *style* dalam pemecahan masalah untuk proses *asynchronous* yang sebelumnya bertele-tele. Sebelumnya, kita menggunakan *callback* untuk menghandle proses *asynchronous*, namun lama-kelamaan kita akan merasa kesulitan ketika *callback* yang digunakan semakin banyak, bahkan, bakalan ada *callback* didalam *callback* dan seterusnya. Masalah ini sering disebut ***callback hell*** . Berikut adalah contoh *callback hell*. (Asumsikan kita ingin membaca 4 file, lalu ingin manggabungkan isi file tersebut kedalam 1 file).

```js
fs.readFile('content1.txt', 'utf-8', (err, content1) => {
  if (err) throw err
  fs.readFile('content2.txt', 'utf-8', (err, content2) => {
    if (err) throw err
    fs.readFile('content3.txt', 'utf-8', (err, content3) => {
      if (err) throw err
      fs.readFile('content4.txt', 'utf-8', (err, content4) => {
        if (err) throw err
        fs.writeFile('result.txt', content1 + content2 + content3 + content4, err => {
          if (err) throw err
          console.log('Writing done!')
        })
      })
    })
  })
})
```

Mata kita sakit ketika melihat kode diatas kan? Haha. Kode diatas sangatlah tidak *maintenable*. Itu baru 5 *callback* loh, bagaimana jika lebih? Huftt.

## Konsep dasar promise

Sebelum kita menyemplung lebih dalam tentang ***promise***, ada baiknya kita memahami konsepnya terlebih dahulu agar ditengah-tengah kita tidak kebingungan. Dengan konsep ***Promise***, secara manusiawi kita dapat ber-analogi sederhana seperti ini:

> *Kita janjian dengan teman untuk nongkrong di kafe besok malam.*

Kemudian kita dapat mengambil aspek-aspek penting dari janji tersebut, dan dapat menyusun rencana seperti ini:
1. Batas waktu: Besok malam.
2. Rencana: Nongkrong di kafe.

Dari susunan tersebut, barulah muncul pertanyaan:
1. *Apa yang harus kita lakukan jika janji tersebut sudah mencapai batas waktu dan tidak berjalan sesuai rencana?*
2. *Apa yang harus kita lakukan lagi jika janji tersebut sudah mencapai batas waktu dan berjalan sesuai rencana maupun tidak sesuai rencana?*

Ya namanya juga masa depan, tidak ada yang tahu peristiwa-peristiwa yang akan menghalangi rencana tersebut. Anggap saja jika besok malam hujan dan badai, yaudah berarti kita mabar aja ketemuan di game sama temen. Jadi, kita mendapatkan rencana akhirnya seperti ini:

1. Batas waktu: Besok malam.
2. Rencana Utama: Nongkrong di kafe.
3. Rencana Lain: Mabar online.
4. Setelahnya: Tidur

Nah, sekarang kita dapat memecah susunan rencana akhir tersebut menjadi 4 *state* (keadaan):
1. ***Pending*** (Janji masih dalam keadaan proses dibawah batas waktu dan belum tau hasilnya)
2. ***Fulfilled*** (Berhasil, janji diselesaikan dan berjalan sesuai rencana sebelum atau mencapai batas waktu)
3. ***Rejected*** (Gagal, janji diselesaikan namun ada kecelakaan yang terjadi sebelum atau mencapai batas waktu)
4. ***Settled*** (Diselesaikan, artinya janji akan masuk kedalam *state* ini jika sudah dilaksanakan atau mencapai batas waktu, berhasil atau gagal)

So, berikut adalah *state* dari alur ***Promise*** yang ada di JavaScript sebenarnya:

![Promise states](/media/blog/memahami-konsep-promise-di-javascript/promise-state.jpg)

---

Jika di translate kedalam kodingan, kita dapat menyimpulkan aspek-aspek dari susunan rencana tersebut seperti ini:
1. **Besok malam** adalah proses yang akan berjalan berdasarkan waktu.
2. **Nongkrong di kafe** adalah rencana utama kita jika besok malam berjalan sesuai keinginan (tidak ada kecelakaan yang menghalangi).
3. **Mabar** adalah rencana lain jika rencana utama kita tidak tercapai (ada kecelakaan yang menghalangi).
4. **Tidur** adalah rencana kita setelah nongkrong di kafe maupun mabar.

Kemudian jadilah kodingan seperti ini:
```js
besokMalam()
	.then(nongkrongDiKafe)
	.catch(mabar)
	.finally(tidur)
```

Jadi penjelasan dari kodingan diatas adalah jika janji `besokMalam()` berjalan sesuai rencana, maka kita akan `nongkrongDiKafe`. Jika ada kecelakaan (hujan/badai) yang terjadi ditengah janji `besokMalam()` tersebut maka kita akan `mabar`. Nah, ketika `nongkrongDiKafe` atau `mabar` sudah terlaksanakan maka yang terakhir kita akan `tidur`.

Seperti di dunia nyata, di dunia pemrograman juga kita harus menyusun rencana dan mengidentifikasi kemungkinan-kemungkinan yang akan terjadi pada aplikasi kita. Barulah aplikasi kita berjalan dengan sempurna. Pernah memakai aplikasi yang tiba-tiba stuck, pending, ga jalan, force close atau muncul pesan-pesan error yang ga jelas? Itu disebabkan aplikasi yang dibuat tidak tersusun prosedur rencananya dengan baik. Jadi ibaratnya, aplikasi yang dibuat itu gatau harus ngapain ketika peristiwa yang diluar rencana terjadi.

---

## Promise in practice

Okey kita sudah membahas konsep dasar *promise*, setidaknya kita udah paham bagaimana promise itu berjalan, apa saja *state-state* yang terjadi pada promise dengan analogi yang gua jelasin diatas. Dan pada section ini kita akan melakukan praktek dasarnya.

### Membuat objek promise
Pada *section* sebelumnya, kita udah melihat contoh penggunaan *promise* dengan `.then()`, `.catch()` dan `.finally()`. Nah masalahnya, tidak semua fungsi yang kita gunakan termasuk dalam objek ***Promise***. Fungsi `fs.readFile()` pada contoh *callback hell* diatas saja sebenarnya bukan objek *promise*, jika kita menggunakan `fs.readFile().then()` tentu saja akan menghasilkan error. Lalu, bagaimana cara membuat objek ***Promise*** dan mengilangkan *callback* yang kotor tersebut?

```js
const readFile = (file, options) => new Promise((fulfill, reject) => {
  fs.readFile(file, options, (err, content) => {
    if (err) return reject(err)
    return fulfill(content)
  })
})
```

Nah begitulah caranya membuat objek *promise* pada proses *asynchronous* yang *non-promise*. Terus, apa itu `fulfill` dan `reject`? Baca lagi di atas yah, *state-state* yang ada di *promise* :) Kemudian kita dapat menggunakan *promise* yang sudah kita buat tersebut seperti ini:

```js
readFile('content.txt', 'utf-8')
  .then(content => {
    // baca file berhasil
    console.log('Baca file berhasil, isinya:', content)
  })
  .catch(err => {
    console.log('Terjadi error saat membaca file:', err)
  })
```

Oalah, kalau begitu sama aja kayak blok ***try-catch*** dong, seperti pada bahasa pemrograman umumnya. Tunggu dulu bro, *try-catch* itu untuk proses *synchronous*, sedangkan *promise* untuk proses *asynchronous*. Coba kita ubah gini deh:

```js
readFile('content.txt', 'utf-8')
  .then(content => {
    // baca file berhasil
    console.log('Baca file berhasil, isinya:', content)
  })
  .catch(err => {
    console.log('Terjadi error saat membaca file:', err)
  })

console.log('Hello world')
```

Coba tebak, yang mana muncul duluan? Jika kalian menjawab yang muncul duluan adalah `Baca file berhasil ...` atau `Terjadi error...` selamat, kalian salah hehe. Yang muncul duluan adalah `Hello world`. Karena apa? Ya karena `readFile()` itu adalah proses *asynchronous*, jadi proses yang ada dibawahnya tidak dibuat menunggu sama proses diatasnya. Beda lagi halnya jika kita menggunakan proses *synchronous* seperti yang kita gunakan pada umumnya, maka proses dibawahnya akan dibuat menunggu sampai proses yang diatasnya selesai.

### Promise chaining

Sebelumnya kita sudah membahas *callback hell* serta melihat contoh pembuatan & penggunaan *promise*. Nah, pada kasus *callbach hell* diatas sebenarnya dapat kita ubah menjadi *promise* supaya kodenya lebih rapi dan mudah dibaca. Yok kita coba.

Pertama-tama, kita rubah fungsi `fs.readfile()` dan `fs.writeFile()` menjadi *promise* terlebih dahulu, seperti ini:

```js
const fs = require('fs')

const readFile = options => file => new Promise((resolve, reject) => {
  fs.readFile(file, options, (err, content) => {
    if (err) return reject(err)
    return resolve(content)
  })
})

const writeFile = (file, content) => new Promise((resolve, reject) => {
  fs.writeFile(file, content, err => {
    if (err) return reject(err)
    return resolve()
  })
})
```

Eh sebentar, tapi kok cara membuat objek *promise*-nya beda dari contoh yang pernah dibuat? Kalo yang pertama `const readFile = (file, options) => ...` sedangkan yang kedua `const readFile = options => file => ...`?

Jadi gini, contoh yang baru itu kita menggunakan teknik ***currying***, di blog sebelumnya gua udah menjelaskan tentang *currying*, nanti kalian bisa baca [disini](https://sutanlab.id/blog/konsep-pada-paradigma-pemrograman-fungsional). Oke skip ya, kita lanjut dulu. Nah, setelah membuat objek *promise* seperti diatas, mari kita pake *promise* tersebut untuk menyelesaikan kasus seperti *callback hell* tadi.

```js
const
  read = readFile('utf-8'),
  result = ''

read('content1.txt')
  .then(content1 => {
    result += content1
    return read('content2.txt')
  })
  .then(content2 => {
    result += content2
    return read('content3.txt')
  })
  .then(content3 => {
    result += content3
    return read('content4.txt')
  })
  .then(content4 => {
    result += content4
    return writeFile('result.txt', result)
  })
  .then(() => {
    console.log('writing done!')
  })
  .catch(err => {
    throw err
  })
```

Nah, bagaimana? Setidaknya uudah agak rapi dan ga messy lagi kan kodenya haha. Ya walaupun sebenernya masih bisa dibikin simple lagi sih. Oke, kita lanjut aja.

### Promise with best practice

Bicara tentang *best practice*, sangat pantang bagi seorang *software engineer* jika membiarkan kodenya asal jadi, yang penting jalan atau sebagainya. Jatuhnya, aplikasi bakal "*have a large size and heavy because its so many ***libraries*** or ***node_modules*** installed*".

Seorang *software engineer* yang baik pasti akan mengutamakan semua fitur *built-in* terlebih dahulu daripada harus terburu-buru menggunakan *library* atau *third-party apps*, serta berfikir bagaimana membuat kode lebih *readable* dan optimal dari segi performa maupun algoritma, dan dapat digunakan dalam jangka panjang. Nah terlebih dari itu, pada point ini kita akan membahas apa aja sih yang bisa membuat kode *promise* bisa lebih menjadi *readable* dan *optimize*?

#### Async - Await
Jika kalian masih bingung atau tidak terbiasa dengan *promise*, `async - await` adalah cara yang tepat untuk membuat kode *promise* lebih *readable* dan mudah dibaca seperti kode *synchronous* pada umumnya. Namun ketentuannya adalah keyword `await` harus berada didalam fungsi `async`. Untuk contohnya kita pakai kasus `readFile` seperti diatas:

```js
async function mergeContent() {
  const read = readFile('utf-8')

  try {
    const content1 = await read('content1.txt')
    const content2 = await read('content2.txt')
    const content3 = await read('content3.txt')
    const content4 = await read('content4.txt')
    return writeFile('result.txt', content1 + content2 + content3 + content4)
  } catch (err) {
    throw err
  }
}

mergeContent()
  .then(() => {
    console.log('Writing done!')
  })
```

Seperti yang kita lihat, kode diatas sangat mudah dibaca seperti proses *synchronous* pada umumnya. Kita dapat menggunakan blok `try-catch` seperti biasa untuk meng-*handle* *error*-nya. Tapi, mengapa pada `mergeContent()` masih terdapat `.then()`? Ya bisa kita lihat sendiri kita me-*return* ***Promise*** `writeFile` diakhir fungsi. Dan memang inilah best practicenya, sebaiknya kita me-*return* promise pada fungsi *async*. Coba kita lihat contoh dari penggunaan *async function* yang tidak *best practice* ini:

```js
async function mergedContent() {
  const read = readFile('utf-8')
  try {
    const content1 = await read('content1.txt')
    const content2 = await read('content2.txt')
    const content3 = await read('content3.txt')
    const content4 = await read('content4.txt')
    await writeFile('result.txt', content1 + content2 + content3 + content4)

    // letak tidak best practicenya ada disini.
    // mereturn nilai result dari promisenya
    const result = await read('result.txt')
    return result
  } catch (err) {
    throw err
  }

  // Walaupun kalian melakukan ini, tetep salah juga
  return await read('result.txt')
}

console.log(mergedContent()) // Promise<Pending>
```

What? padahal kita sudah menggunakan `await` dan me-*return* nilainya secara langsung, kenapa isinya masih pending? Well, sebenarnya *async function* itu bakal secara *force* me-*return* ***Promise***. Jadi, walaupun kita sudah langsung me-*return* nilai didalam *async function*, tetap saja kita harus memanggilnya seperti ini:

```js
mergedContent()
  .then(result => {
    console.log(result)
  })

// atau buat fungsi async baru
async function printContent() {
  const content = await mergedContent()
  console.log(result)
}

printContent()
```

Yup, ujung-ujungnya tetap balik lagi ke *promise* kan? Jadi, menggunakan *async function* secara ***best practice*** adalah kita harus me-*return* promise atau tidak me-*return* nilai sama sekali. Jangan harap kalian bisa mendapatkan nilai secara *instant* jika kalian me-*return* suatu nilai atau *value* didalam *async function*. Adapun contoh *best practice*-nya adalah:

```js
async function mergedContent() {
  const read = readFile('utf-8')

  try {
    const content1 = await read('content1.txt')
    const content2 = await read('content2.txt')
    const content3 = await read('content3.txt')
    const content4 = await read('content4.txt')
    await writeFile('result.txt', content1 + content2 + content3 + content4)
  } catch (err) {
    throw err
  }

  // The best practice is:
  // Mereturn promise secara langsung, bukan mereturn nilai dari hasil promisenya
  // bukan juga mereturn-nya dengan menggunakan await
  return read('result.txt')
}

console.log(mergedContent()) // Promise<Pending>

mergedContent()
  .then(result => {
    console.log(result) // isi dari result.txt
  })
  .catch(err => {
    console.log('Gagal membaca gabungan kontent:', err)
  })
```

---

So, jika kalian masih menganggap *async-await* dan *promise* itu adalah hal yang berbeda, kalian salah. Karena sudah dijelaskan diatas bahwa `async - await` sendiri adalah suatu cara atau teknik untuk membuat kode *promise* mudah dibaca seperti kode *synchronous* pada umumnya. Lalu, kesimpulannya adalah:

> ***Value dari async function akan selalu berisi Promise walaupun yang kita return adalah nilai yang bukan Promise***. Jadi, `async function() = Promise`

Karena mau bagaimanapun *async function* bukanlah fungsi seperti biasa yang langsung bisa me-*return* suatu *value* atau nilai, melainkan dia akan tetap berjalan secara *asynchronous* dan secara "*paksa*" akan me-*return* ***Promise***.

Nanti kalau sering ketemu kasus-kasusnya dan sering baca teorinya, kalian akan paham sendiri deh ^^

#### Promise superpowers

Sebenarnya terdapat banyak fitur didalam objek *promise* namun sangat jarang orang yang melirik dan menggunakannya, padahal fitur-fitur tersebut sangatlah *superpower* dan membantu dalam menyelesaikan kasus *promise*, khususnya untuk menghandle ***array of promise***. Fitur-fitur yang dimaksud adalah:

1. ***Promise.race***
2. ***Promise.all***
3. ***Promise.allSettled*** (Baru release, *ES2020*)
4. ***Promise.any*** (Masih dalam proposal)

Nah, kita akan bahas satu persatu dari fitur-fitur tersebut beserta studi kasusnya. Namun, karena `Promise.any` belum *release*, kita bahas sampai `Promise.allSettled` aja ya.

##### 1. Promise.race

`Promise.race` adalah salah satu fitur dari *promise* yang menghasilkan *promise* yang lebih dulu masuk dalam *state* ***fulfilled*** dari *array of promise*. Adapun ketentuannya sebagai berikut:
1. `Promise.race` akan masuk ke *state fulfilled* jika salah satu *promise* dari *array of promise* lebih duluan masuk ke *state fulfilled* (Hasil *return*-nya menghasilkan nilai dari *promise* pertama yang *fulfilled*). Intinya kaya balapanlah, siapa yang menang dia yang diakui, *promise-promise* setelahnya akan diabaikan.
2. `Promise.race` akan *short-circuit* atau masuk kedalam state *rejected* jika ada salah satu *promise* masuk ke state *rejected* lebih dulu.

Lalu, apa studi kasusnya jika ingin mengimplementasikan `Promise.race` ini? Nah gua pernah menggunakan `Promise.race` ini untuk membuat sistem ***request timeout***. Jadi untuk kasusnya seperti ini:

> Kita ingin membuat *timeout* pada request aplikasi kita supaya user tidak kelamaan menunggu hal yang tidak pasti dan cepat untuk mengambil tindakan. (ya namanya juga janji, sudah jelas tidak pasti lah. Haha).

Nah, kira-kira implementasi kodenya seperti ini:

```js
const timeout = delay => new Promise((_, reject) => {
  setTimeout(() => {
    reject({ timeout: true })
  }, delay)
})

const getJSON = url => delay => () =>
  Promise.race([fetch(url), timeout(delay)])
    .then(response => response.json())
    .then(result => {
      console.log(result)
      // or do anything else with result
    }).catch(err => {
      if (err.timeout) {
        console.log('Request was timeout because your internet is very slow! you can trigger request again by clicking the try again button')
        // or do anything else if request was timeout
      } else {
        console.log(err)
        // if other errors occured
      }
    })

const request = getJSON('https://sutanlab.id/posts.published.json')

request(1500)() // jalankan request dengan timeout 1,5 detik

document.getElementById('try-again')
  .addEventListener('click', request(5000)) // timeout 5 detik untuk request selanjutnya.
```

Ada lagi kasus menarik yang pernah gua implementasiin pake `Promise.race` ini, yaitu membuat sistem *request cancel*. Untuk kasusnya gini:

> Kita ingin membuat *live search* yang langsung me-*request* data ke server ketika user mengetik *keyword* di form. Namun, masalahnya adalah ketika user terus mengetik, setiap perubahan dari *keyword* yang diketik itu akan di-*request* ke server, jika user terus mengetik maka proses requestnya jadi bertambah banyak, hal ini juga membuat aplikasi menjadi berat. Jadi disini tugas kita akan membuat sistem yang akan men-*cancel* *request* sebelumnya ketika user masih mengetik dan *request* yang berjalan hanya *keyword* terakhir dari ketikan user tersebut.

Adapun contoh implementasinya sebagai berikut:

```js
const HttpRequest = (requestInit = {}) => ({
  cancel: () => false,
  make(url) {
    const cancelToken = new Promise((_, reject) => {
      this.cancel = () => reject({ cancelled: true })
    })
    return Promise.race([cancelToken, fetch(url, requestInit)])
  }
})

const request = HttpRequest({
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})

const search = event => {
  const keyword = event.target.value
  console.log(`Searching for ${keyword}..`)

  request.cancel()
  request.make(`https://api.github.com/search/users?q=${keyword}`)
    .then(response => response.json())
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      if (!err.cancelled) {
        console.log('an error occured', err)
      }
    })
}

document.getElementById('form-search')
  .addEventListener('input', search)
```

Nah, kira-kira begitulah contoh implementasi `Promise.race` untuk membuat sistem *request cancel*. By the way, ini tidak hanya berlaku untuk kasus *live search* saja, melainkan kita juga bisa mengimplementasikannya pada *button cancel* di input form. Jadi user bisa klik *cancel* gitu ketika sudah melakukan *submit*. Keren juga kan? Tanpa butuh *library* apapun loh, mungkin hanya perlu *babel* doang untuk transpile kode JS modern ke JS kuno supaya support di browser jadul, haha.

##### 2. Promise.all

`Promise.all` adalah fitur *promise* yang menghasilkan nilai dari semua *fulfilled promise* yang diproses. Adapun ketentuannya sebagai berikut:

1. `Promise.all` akan masuk ke *state fulfilled* jika semua *promise* dari *array of promise* masuk ke *state fulfilled* (Hasil *return*-nya menghasilkan array dari nilai *promise-promise* yang sudah *fulfilled*). Beda dengan `Promise.race`, `Promise.all` ini akan menunggu *promise* lain yang masih *pending* hingga semuanya masuk kedalam *state fulfilled*.
2. `Promise.all` akan *short-circuit* atau masuk kedalam state *rejected* jika ada salah satu *promise* masuk ke state *rejected*. (Jadi, jika salah satu saja *promise* dari `Promise.all` yang masuk kedalam *state rejected*, maka akan menggagalkan semua *promise* yang masih dalam keadaan *pending* maupun sudah dalam keadaan *fulfilled*)

Lalu, apa studi kasus untuk mengimplementasi `Promise.all` ini? Sebenarnya gua sendiri sering memakai fitur ini di banyak kasus. Intinya fitur ini bagus dipakai ketika kita dihadapkan oleh beberapa *promise* yang tidak saling bergantungan, namun kita ingin mendapatkan hasil dari *promise-promise* tersebut secara bersamaan. Untuk contohnya, tidak usah jauh-jauh, kita pakai saja contoh kasus dari point *async-await* diatas.

Sebelumnya, kita menulis kode *async-await* diatas seperti ini:

```js
async function mergeContent() {
  const read = readFile('utf-8')

  try {
    // keempat await read content dibawah ini sangatlah tidak best-practice
    // sebenarnya promise ini tidak bergantungan satu sama lain.
    // jadi kita bisa menggabungkan keempat promise ini dalam satu Promise.all
    const content1 = await read('content1.txt')
    const content2 = await read('content2.txt')
    const content3 = await read('content3.txt')
    const content4 = await read('content4.txt')

    await writeFile('result.txt', content1 + content2 + content3 + content4)
  } catch (err) {
    throw err
  }

  return read('result.txt')
}
```

Jadi, kita modifikasi fungsinya seperti ini untuk mendapatkan performa yang lebih optimal:

```js
async function mergeContent() {
  const read = readFile('utf-8')

  try {
    const result = await Promise.all([
      read('content1.txt'),
      read('content2.txt'),
      read('content3.txt'),
      read('content4.txt')
    ])
    await writeFile('result.txt', result.join(''))
  } catch (err) {
    throw err
  }

  return read('result.txt')
}
```

Kenapa gua bilang lebih optimal performanya ketika menggunakan `Promise.all`? Pertama-tama, kita asumsikan dulu seperti ini:

1. `read('content1.txt')` kita sebut sebagai ***p1*** yang memakan waktu 1000ms.
2. `read('content2.txt')` kita sebut sebagai ***p2*** yang memakan waktu 400ms.
3. `read('content3.txt')` kita sebut sebagai ***p3*** yang memakan waktu 100ms.
4. `read('content4.txt')` kita sebut sebagai ***p4*** yang memakan waktu 1500ms

Nah, jika kita menggunakan 4 *await* secara berurutan tadi artinya kita sudah menghabiskan waktu untuk menunggu hal yang tidak penting. Kenapa? Karena, untuk menjalankan ***p2*** tidaklah butuh nilai dari ***p1***, begitupun dengan ***p3*** tidak membutuhkan nilai dari ***p1*** atau ***p2***, dan ***p4*** juga tidak membutuhkan nilai dari ***p1***, ***p2*** ataupun ***p3***.

So, kenapa harus ditunggu? Kalau kita seperti itu artinya kita sudah membuang waktu sebesar **1500ms** atau setara **1,5 detik**. Kenapa? Untuk menjalankan ***p2*** kita menunggu ***p1*** selesai, untuk menjalankan ***p3***, kita menunggu ***p2*** selesai. Begitupun dengan ***p4***, kita juga harus menunggu ***p3*** selesai. Belum lagi `writeFile` nya, hadeeh.

> Jadi, ***1000ms + 400ms + 100ms + 1500ms = 3000ms (3 detik!)***

Tapi, jika kita menggunakan `Promise.all`, keempat proses itu tidak saling menunggu, melainkan langsung berjalan secara bersamaan. Namun jika satu proses sudah selesai, maka proses tersebut menunggu proses yang lainnya selesai. Jika berdasarkan asumsi diatas, maka:

> Keempat proses tersebut berjalan secara bersamaan, namun ***p3*** lebih dulu selesai, disusul oleh ***p2*** lalu ***p1*** kemudian terakhir ***p4***. ***Jadi waktu yang dihabiskan untuk menjalankan keempat proses tersebut adalah waktu yang paling lama dari keempat proses tersebut, yaitu: ***p4*** = 1500ms (1.5 detik!)***

Jika masih bingung, mari kita lihat contoh perbandingannya pada grafik ini:

![Async & Sync load time comparison](/media/blog/memahami-konsep-promise-di-javascript/async.png)

Nah, sampai sini sudah paham kan? Jadi kita bisa menghemat ***1,5 detik*** dengan menggunakan `Promise.all`. Ya walaupun sepeleh cuma beda 1,5 detik doang, itu baru 4 proses, bagaimana jika prosesnya lebih banyak? Misal ada kasus kita harus membaca semua file yang ada dalam satu folder atau kasus lain yang lebih komplex seperti berurusan dengan query. Maka dari itu sebaiknya kita tahu kapan dan dimana harus memakai `Promise.all` atau memang harus menunggu proses yang berjalan satu persatu.

##### 3. Promise.allSettled

`Promise.allSettled` ini adalah fitur yang baru keluar pada ***ES2020***, fitur ini hadir untuk mengatasi kekurangan dari `Promise.all`. Semua *promise* pada `Promise.all` akan *rejected* ketika salah satu *promise* saja yang masuk kedalam *state rejected*. Namun tidak dengan `Promise.allSettled`, `Promise.allSettled` ini tidak ada state *rejected* kecuali kita membuatnya sendiri. Supaya tidak bingung, berikut ketentuan dari `Promise.allSettled`:

1. `Promise.allSettled` ini akan masuk kedalam *state fulfilled* jika semua *promise* yang masih *pending* masuk kedalam *state settled*, tidak peduli *fulfilled* atau *rejected*. (Hasil *return*-nya adalah *array of object* yang berisi status dan value dari *promise-promise* yang masuk kedalam *settled*. Jika *fulfilled* maka akan ada *key* ***value***, namun jika *rejected* maka akan ada key ***reason*** yang berisi alasan kenapa gagal).
2. `Promise.allSettled` tidak ada status *short-circuit* atau *state rejected* seperti *promise* lainnya.

Terus, apa implementasinya untuk `Promise.allSettled` ini? Well, sebenarnya gua belum pernah mengimplementasikan `Promise.allSettled` ini, ya karena memang tergolong baru juga. Untuk kasus dan penggunaanya sama saja seperti `Promise.all` namun jika kita tidak ingin membatalkan semuanya hanya karena satu *promise* yang gagal, `Promise.allSettled` inilah solusinya.

Sebagai contoh, mungkin kita pernah ketemu kasus untuk membaca file yang *path file*-nya dari array ataupun database, nah dari pada kita ngecek satu persatu lalu kemudian baru di read, mending kita langsung read aja, toh walaupun error nanti ke skip juga. Potongan kodenya kira-kira seperti ini:

```js
const read = readFile('utf-8')
const files = ['content-1.md', 'content-2.md', 'content-3.md', 'content-4.md', 'content-5.md']

// asumsikan content-5.md tidak exists di dalam folder
Promise.allSettled(files.map(file => read(`contents/${file}`)))
  .then(results => {
    const existsContent = results.filter(result => result.status === 'fulfilled')
    // isi dari existsContent: [{ status: 'fulfilled', value: 'isi content 1' }, ...]
    // dan seterusnya kecuali content 5
    console.log(existsContent)
  })
```

Nah, jadi enak kan? Jika kita menggunakan `Promise.all`, maka sudah jelas *promise* yang kita buat diatas tidak akan masuk kedalam *state fulfilled* karena `content-5.md` yang menggagalkan semuanya.

---

## Penutup

Okay, mungkin sampe sini aja dulu bahasan ***Promise*** kita kali ini. Jadi bisa disimpulkan kan? Bahwa sebenarnya *promise* itu *superpower* banget kalo kita paham dan tau kapan harus menggunakannya. Semua fitur *built-in* dari *promise* benar-benar sangat membantu untuk menyelesaikan masalah dan kasus-kasus *asynchronous*. Jika cara kita sudah benar dalam mengimplementasikan *promise* itu sudah bagus banget, karena memang sangat jarang orang yang memperhatikan ini. Yupp ya satu lagi mungkin karena kebanyakan orang membenci pemrograman *asynchronous*, buktinya ini:

![NodeJS](/media/blog/memahami-konsep-promise-di-javascript/nodejs.jpg)

Bisa dilihat diatas, banyak orang yang membenci, tidak suka dengan *NodeJS*, atau menganggap *NodeJS* itu sulit karena mereka menganggap *asynchronous programming* itu "***so hard to get right***". Ya emang bener sulit sih kalau belum tau dalem konsepnya haha, jadi gua harap sih dengan membaca blog ini kalian semakin paham dengan konsep *asynchronous programming* terutama ***Promise*** pada NodeJS. Semoga bermanfaat, jangan lupa share ya 😃
