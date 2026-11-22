---
title: 'Implementing the "Function as children" component pattern in React'
slug: {
  en: 'implementing-function-as-children-component-pattern-in-react',
  id: 'implementasi-component-pattern-function-as-children-di-react'
}
date: 2020-03-28
description: 'Function as Children is one of the component patterns we can use in React. What is it for?'
keywords: 'react, component, komponen, facc, function, javascript, component composition'
tags: ['javascript', 'react', 'callback', 'closure']
image: '/media/blog/implementasi-function-as-children-di-react/bg-facc.png'
---

**React** is a popular JavaScript *library*, and quite a lot of companies use React for their *frontend*. Since React is built around components, there are a lot of *component patterns* we can use to build components in React. For example: ***Stateless/Stateful Component, HOC (Higher-Order Component), Proxy Component, FaCC (Function as Child Component)*** *(which we'll cover in this piece)*, and plenty of other *component patterns* that even I probably don't know about yet haha. Okay, let's get into it...

---

***Function as Child Component (FaCC)***, also called ***Function as Children***, actually has another name: ***Render Callback***. Why is it called *Render Callback*? We'll get to that at the end (*For more on ***callbacks***, see my earlier piece on concepts in the functional paradigm [here](/blog/konsep-pada-paradigma-pemrograman-fungsional)*). Interesting, right? So here I'll just call it ***FaCC***, okay? Keeps it short hehe.

So ***FaCC*** is a *component* pattern in React that turns the *children props* into a function. Usually we use *children props* like this:

Let's say this is in the file `components/MainLayout.js`

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

So what's the type of that `children`? It depends: if there's more than one *child element*, the type is `array of element`; if there's only one, the type is just `element`.

And we'd usually use that `MainLayout` component like this:

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

***So what if we turn that `children` into a function?***

It's pretty simple: we change `children` to `children()`, like this:

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

***Hmm, but then why turn `children` into a function?***

Here's the thing: once `children` is a function, it's not rigid anymore. *Children* that could only hold *elements* before can now do anything inside the `children()` function, even pass data or the *state* in that component to another component.

To make it click faster, let's go straight to an example. Say we want to make a `DataList` component as a *wrapper* component. This component also takes care of *fetching* an API, but we want the *endpoint* and the *result* data to be *flexible*, so the *child* component can work with it and the data inside it. Something like this:

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

Then we just use that `DataList` component like this:

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

So what's the takeaway? The `DataList` component becomes *reusable*: it can be used for any data because the component stays *flexible*.

This also answers why ***FaCC*** is called a *Render Callback*. Yep, simply because we use a *callback* when *rendering* the `DataList` component.

---

***Wait, but you could do that kind of render callback with a regular prop, so why does it have to be `children props`?***

Hmm, that's really up to personal taste. It's just a matter of *pattern*. If `this.props.children(this.state)` in `DataList` were changed to a regular *prop*, say `this.props.render(this.state)`, we'd use the `DataList` component like this:

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

Hmm.. looking at it, I actually think passing through *children props* is more *readable* than passing through a regular *prop*. React's docs even recommend using *children props*, you can read it [here](https://reactjs.org/docs/composition-vs-inheritance.html). But it comes down to which *pattern* fits you better.

---

I think that's all for ***FaCC***, since the implementation really is very simple. Okay, if anything is unclear and you want to ask, go ahead, or if you want to suggest a revision to this piece, that's fine too. Comment below or reach me on my social media, hehe.

Cheers. Stay healthy 😃
