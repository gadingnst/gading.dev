---
title: 'Implementasi component pattern "Function as children" di React'
slug: {
  en: null,
  id: 'implementasi-component-pattern-function-as-children-di-react'
}
date: 2020-03-28
description: 'Function as Children adalah salah satu component pattern di React yang bisa kita gunakan, buat apa?'
keywords: 'react, component, komponen, facc, function, javascript, component composition'
tags: ['javascript', 'react', 'callback', 'closure']
image: '/media/blog/implementasi-function-as-children-di-react/bg-facc.png'
---

**React** adalah salah satu *library* JavaScript yang populer, cukup banyak perusahaan-perusahaan yang menggunakan React pada teknologi *frontend*-nya. Karena terminologi dari react ini adalah berbasis komponen, banyak sekali *component pattern* yang bisa kita gunakan untuk membangun komponen di React. Seperti contohnya: ***Stateless/Stateful Component, HOC (Higher-Order Component), Proxy Component, FaCC (Function as Child Component)*** *(yang akan kita bahas di tulisan ini)*, dan masih banyak lagi *component pattern* lainnya yang mungkin penulis juga belum mengetahuinya haha. Oke, langsung aja kita bahas...

---

***Function as Child Component (FaCC)*** atau bisa juga disebut ***Function as Children*** sebenarnya memiliki nama lain, yaitu ***Render Callback***. Kenapa bisa dinamain *Render Callback*? Nanti akan kita bahas di akhir tulisan (*Untuk bahasan ***callback*** lebih lanjut, bisa lihat di tulisan gua sebelumnya tentang konsep pada paradigma fungsional [disini](/blog/konsep-pada-paradigma-pemrograman-fungsional)*).  Hmm menarik ya, so disini gua nyebutnya sebagai ***FaCC*** aja oke? Biar ga kepanjangan hehe.

Jadi, ***FaCC*** ini adalah salah satu *pattern* pada *component* di react yang menjadikan *children props* sebagai fungsi. Biasanya kita menggunakan *children props* seperti ini:

Anggap saja di dalam file `components/MainLayout.js`

```jsx
import React, { Component } from 'react'

export default class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="main-layout">
        {children}
      </div>
    )
  }
}
```

Sebenarnya apakah tipe dari `children` tersebut? Ya tergantung, jika *child element*-nya lebih dari satu, maka tipenya adalah `array of element`, jika hanya satu maka tipenya hanya `element`.

Dan biasanya kita menggunakan komponent `MainLayout` tersebut seperti ini:

```jsx
import React, { Component } from 'react'
import MainLayout from './components/MainLayout'

export default class App extends Component {
  render() {
    return (
      <MainLayout>
        <p>My Contents</p>
        <p>My other Contents</p>
        <p>Lorem ipsum</p>
      </MainLayout>
    )
  }
}
```

***Lalu bagaimana jika kita jadikan `children` tersebut sebagai fungsi?***

Cukup sederhana, kata `children` itu kita ganti menjadi `children()`, contohnya seperti ini:

```jsx
import React, { Component } from 'react'

export default class MainLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="main-layout">
        {children()}
      </div>
    )
  }
}
```

***Hmm, terus kalau begitu buat apa menjadikan `children` tersebut sebagai fungsi?***

Nah Jadi gini, ketika kita sudah menjadikan `children` tersebut sebagai fungsi, berarti `children` nya sudah tidak kaku lagi. *Children* yang selama ini cuma bisa diisi dengan *element* doang, sekarang kita bisa melakukan apa saja didalam fungsi `children()` tersebut, bahkan melempar data atau *state-state* yang ada pada komponen tersebut dengan komponen lain pun bisa.

Supaya cepet mudeng, kita langsung coba aja contohnya. Asumsikan kita ingin membuat komponen `DataList` sebagai komponen *wrapper*. Lalu komponen ini juga bertugas sebagai tukang nge-*fetch* API, namun *endpoint* serta *result* datanya ingin kita buat *flexible* supaya bisa diolah lagi komponen *child* dan data yang ada didalamnya. Kira-kira seperti ini:

```jsx
import React, { Component } from 'react'

export default class DataList extends Component {
  contructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      data: []
    }
  }

  componentDidMount() {
    const { endpoint } = this.props
    window.fetch(endpoint)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    return (
      <div className="container">
        <ul className="data-list">
          {this.props.children(this.state)}
        </ul>
      </div>
    )
  }
}
```

Lalu kita tinggal menggunakan komponen `DataList` tersebut seperti ini:

```jsx
import React, { Component } from 'react'
import DataList from './components/DataList'

export default class App extends Component {
  render() {
    return (
      <DataList endpoint="https://api.example.id/articles">
        {state => {
          if (state.loading) {
            return (
              <h3>Loading...</h3>
            )
          }

          if (state.error) {
            return (
              <h3>An error occured during fetch data, try again.</h3>
            )
          }

          return state.data.map((article, idx) => (
            <li key={idx}>
              <a href={article.link}>
                {article.title}
              </a>
            </li>
          ))
        }}
      </DataList>
    )
  }
}
```

Jadi apa kesimpulannya? Komponen `DataList` menjadi komponen yang *reusable*, bisa di pakai untuk data apa saja karena komponennya masih bersifat *flexible*.

Sampai disini juga udah bisa terjawab kenapa ***FaCC*** bisa disebut sebagai *Render Callback*. Yap, simplenya karena kita menggunakan *callback* pada saat me-*render* komponen `DataList`.

---

***Eh, tapi kan bisa lewat props biasa buat render callback gituan, kenapa harus dari `children props`?***

Hmm, tergantung selera masing-masing juga sih. Ini cuma masalah *pattern* doang. Ya mungkin jika `this.props.children(this.state)` pada `DataList` tersebut diganti jadi *props* biasa, misal menjadi `this.props.render(this.state)`. Kita bakalan pake komponen `DataList` nya seperti ini:

```jsx
import React, { Component } from 'react'
import DataList from './components/DataList'

export default class App extends Component {
  render() {
    return (
      <DataList
        endpoint="https://api.example.id/articles"
        render={state => {
          if (state.loading) {
            return (
              <h3>Loading...</h3>
            )
          }

          if (state.error) {
            return (
              <h3>An error occured during fetch data, try again.</h3>
            )
          }

          return state.data.map((article, idx) => (
            <li key={idx}>
              <a href={article.link}>
                {article.title}
              </a>
            </li>
          ))
        }}
      />
    )
  }
}
```

Hmm.. kalo diliat-liat sih, menurut gua malahan lebih *readable* passing lewat *children props* ketimbang passing lewat *props* biasa. Di dokumentasi React nya juga malahan nyaranin pake *children props*, bisa baca [disini](https://reactjs.org/docs/composition-vs-inheritance.html). But, itu tergantung selera masing-masing sih lebih klop pake *pattern* yang mana.

---

Mungkin sampai sini aja bahasan kita tentang ***FaCC***, karena ya memang implementasinya sangat simple sekali. Okey, jika ada yang belum jelas dan ingin bertanya boleh, atau mau revisi tulisan ini juga boleh kok. Bisa komen dibawah atau langsung hubungin sosmed gua ya, hehe.

Salam. Semoga sehat selalu 😃
