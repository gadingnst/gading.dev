---
title: "Understanding JavaScript Engine"
slug: {
	en: "understanding-javascript-engine",
	id: "memahami-javascript-engine"
}
date: 2022-09-07
description: "How JavaScript really works behind the scenes?"
keywords: "javascript, understanding javascript, javascript works, browser, frontend development, sutanlab, gadingnst, nodejs, event loop, js engine, callstack, asynchronous"
tags: ["javascript", "engineering"]
image: "/media/blog/understanding-javascript-engine/js-banner.png"
---

JavaScript keeps getting more popular, and teams use it all over their stack: *front-end*, *back-end*, *hybrid* apps, *embedded* devices and more. In this article I want to dig deeper into JavaScript and how it actually runs.

### Overview
Almost everyone has heard of the *V8 Engine*, and most people know that JavaScript is *single-threaded* or that it uses a *callback queue*.

In this post we'll go through these concepts one by one and explain how a JavaScript program runs. Once you know the details, you can write better *non-blocking* apps that use the provided APIs properly.

If you're new to JavaScript, this post should help you see why JavaScript feels so "weird" compared to other languages. If you've been writing JavaScript for a while, I hope it gives you something new about how the JavaScript Runtime you use every day works.

We'll look at how JavaScript works internally in the *run-time environment* and the browser. Think of it as a short walk-through of the core components involved in running JavaScript code. The components:

- *JavaScript Engine*
- *JavaScript Runtime Environment*
- *The Callstack*
- *Concurrency* and *Event Loop*

We'll start with the ***JavaScript engine***.

---

#### Javascript Engine
You may have heard that JavaScript is an *interpreted* programming language. That means the source code isn't *compiled* into binary code before it runs.

So how does your computer know what to do with a plain text script?

That's the JavaScript engine's job. A JavaScript engine is a computer program that executes JavaScript code. Most modern browsers ship with one built in. When a JavaScript file is loaded in the browser, the engine executes each line of the file from top to bottom (to keep this simple I'm leaving out *hoisting* in JS). It parses the code line by line, converts it into machine code and then executes it.

![JS Engine](/media/blog/understanding-javascript-engine/js-engine.png)

Every browser has its own JavaScript engine, but the best known one is *Google's V8*. V8 runs in Google Chrome, and it's also the engine behind Node.js, the JavaScript Runtime. Here are the *JS Engines* in the major modern browsers:

JS Engine             | Browser
--------------------- | -------------------
V8                    | Google Chrome and NodeJS
Spider Monkey         | Mozilla Firefox
JavaScriptCore        | Safari
Chakra                | Microsoft Edge Browser

---

#### Browser engines
The engine has two main components:
- *Memory Heap*: where memory allocation happens.
- *Callstack*: where your stack frames live as your code executes.

![Heap & Callstack](/media/blog/understanding-javascript-engine/heap-callstack.png)

Every JavaScript engine has a *callstack* and a *heap*. The *callstack* is where our code actually runs. The *heap* is an unstructured pool of memory that stores all the objects our application needs.

---

#### The Runtime
So far we've talked about the JavaScript engine, but the engine doesn't run on its own. It runs inside an environment called the *JavaScript Runtime Environment* (JRE), along with a bunch of other components. The JRE is what makes JavaScript asynchronous. It's why JavaScript can add event listeners and make *HTTP* requests asynchronously.

The JRE is like a container holding these components:
- JS Engine
- Web API
- Callback Queue or message queue
- Event Table
- Event loop

![JS Runtime Mechanics](/media/blog/understanding-javascript-engine/runtime-mechanics.png)

Here you can see the event loop and the *callback queue* people talk about so much.

---

#### The Callstack
JavaScript is a *single-threaded* programming language, which means it has a single *callstack*. So it can only do one thing at a time.

The *callstack* is a data structure that basically records where in the program we are. Step into a function and it goes on top of the stack. Return from a function and it gets popped off the top. That's all the stack does.

Here's an example:
```js
function multiply(x, y) {
  return x * y;
}

function printSquare(x) {
  var s = multiply(x, x);
  console.log(s);
}

printSquare(5);
```

When the engine starts running this code, the *callstack* is empty. After that, the steps look like this:

![Callstack Steps](/media/blog/understanding-javascript-engine/callstack-steps.png)

Each entry in the *callstack* is called a *Stack Frame*.

Running code on a single thread can be pretty easy, since you don't have to deal with the messy scenarios that come up in *multi-threaded* environments, like deadlocks.

But a single thread has its limits too, since JavaScript only has one *callstack*.

---

#### Concurrency & the Event Loop
What happens when a function call in the *callstack* takes a long time to process? Say you want to do a complex image transformation with JavaScript in the browser.

Why is that a problem? Because while the *callstack* has functions to execute, the browser can't do anything else. It's blocked. It can't render, it can't run any other code, it's just stuck. That's a problem if you want a smooth UI in your app.

And that's not the only problem. Once your browser is processing a lot of tasks in the *callstack*, it can stop responding for quite a while. Most browsers then show an error asking whether you want to close the page. You've probably seen this.

---

I'll probably cover ***Concurrency and Event Loop*** in the next article. Stay tuned!

---

*Modified: September, 25 2022*
