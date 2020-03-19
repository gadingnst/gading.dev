---
title: 'Teknik Memoization pada JavaScript'
slug: 'teknik-memoization-pada-javascript'
date: 2020-03-09
description: 'Memoization adalah salah satu teknik dynamic programming yang berguna sebagai optimization pada function-level dengan menyimpan hasil output dari function call sebagai cache. Bagaimana tekniknya?'
tags: ['memoization', 'javascript', 'dynamic programming']
category: 'Engineering'
keywords: 'memoization, javascript, dynamic programming'
image: '/assets/img/collections/desks/desk2.jpg'
caption: 'Memoization adalah salah satu teknik dynamic programming yang berguna sebagai optimization pada function-level dengan menyimpan hasil output dari function call sebagai cache untuk digunakan jika ada lagi pemanggilan fungsi dengan argumen yang sama. Bagaimana tekniknya?'
css_source: []
js_source: []
---

***Memoization*** adalah salah satu teknik *dynamic programming* yang berguna sebagai optimization pada level *function* dengan menyimpan hasil output dari *function call* sebagai *cache*, untuk digunakan jika ada lagi pemanggilan fungsi dengan argumen yang sama.

Masih belum jelas? Okay kita anggap ada sebuah fungsi untuk menyelesaikan bilangan faktorial seperti ini.

```js
const withMemoize = fn => {
    const results = {}
    return (...args) => {
        const argsKey = JSON.stringify(args)
        return !results[argsKey]
            ? results[argsKey] = fn(...args)
            : results[argsKey]
    }
}
```


![Memoization](/media/blog/teknik-memoization-pada-javascript/memoization.png)