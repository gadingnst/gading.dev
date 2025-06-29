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

As JavaScript is getting more and more popular, teams are leveraging its support on many levels in their stack — *front-end*, *back-end*, *hybrid* apps, *embedded* devices and much more. This article is meant to be aimed at digging deeper into JavaScript and how it really works.

### Overview
Almost everyone has already heard of the *V8 Engine* as a concept, and most people know that JavaScript is *single-threaded* or that it is using a *callback queue*.

In this post, we’ll go through all these concepts in detail and explain how JavaScript actually runs. By knowing these details, you’ll be able to write better, *non-blocking* apps that are properly leveraging the provided APIs.

If you’re relatively new to JavaScript, this blog post will help you understand why JavaScript is so "weird" compared to other languages. And if you’re an experienced JavaScript developer, hopefully, it will give you some fresh insights on how the JavaScript Runtime you’re using every day actually works.

In this article, we will discuss the internal working of JavaScript in the *run-time environment* and the browser. This will be an overview walk-through of all the core components that are involved in the execution of JavaScript code. We will discuss the following components:

- *JavaScript Engine*
- *JavaScript Runtime Environment*
- *The Callstack*
- *Concurrency* and *Event Loop*

Let’s begin with the ***JavaScript engine***.

---

#### Javascript Engine
As you may heard before, JavaScript is an *interpreted* programming language. It means that source code isn’t *compiled* into binary code prior to execution.

How your computer can understand what to do with a plain text script?

That’s the job for a JavaScript engine. JavaScript engine is simply a computer program that execute JavaScript code. JavaScript engines are inbuilt in all the modern browsers today. When the JavaScript file is loaded in the browser, JavaScript engine will execute each line of the file from top to bottom (to simplify the explanation we are avoiding *hoisting* in JS). JavaScript engine will parse the code line by line, convert it into machine code and then execute it.

![JS Engine](/media/blog/understanding-javascript-engine/js-engine.png)

Every browser has its own JavaScript engine, but the most well known engine is *Google’s V8*. The V8 engine powers Google Chrome but also Node.js which is that JavaScript Runtime. Some *JS Engine* in every modern browser we can see in the table below:

JS Engine             | Browser
--------------------- | -------------------
V8                    | Google Chrome and NodeJS
Spider Monkey         | Mozilla Firefox
JavaScriptCore        | Safari
Chakra                | Microsoft Edge Browser

---

#### Browser engines
The Engine consists of two main components:
- *Memory Heap* — this is where the memory allocation happens.
- *Callstack* — this is where your stack frames are as your code executes.

![Heap & Callstack](/media/blog/understanding-javascript-engine/heap-callstack.png)

Any JavaScript engine always contains a *callstack* and a *heap*. The *callstack* is where our code is actually executed. Then the *heap* is an unstructured memory pool which stores all the objects that our application needs.

---

#### The Runtime
So far we have discussed JavaScript engine, but the JavaScript engine doesn’t run in isolation. It runs inside an environment called *JavaScript Runtime Environment* along with many other components. JRE is responsible for making JavaScript asynchronous. It is the reason JavaScript is able to add event listeners and make *HTTP* requests asynchronously.

JRE is just like a container which consists of the following components:
- JS Engine
- Web API
- Callback Queue or message queue
- Event Table
- Event loop

![JS Runtime Mechanics](/media/blog/understanding-javascript-engine/runtime-mechanics.png)

And then, we have the so popular event loop and the *callback queue*.

---

#### The Callstack
JavaScript is a *single-threaded* programming language , which means it has a single *callstack*. Therefore it can do one thing at a time.

The *callstack* is a data structure which records basically where in the program we are. If we step into a function, we put it on the top of the stack. If we return from a function, we pop off the top of the stack. That’s all the stack can do.

Let’s see an example. Take a look at the following code:
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

When the engine starts executing this code, the *callstack* will be empty. Afterwards, the steps will be the following:

![Callstack Steps](/media/blog/understanding-javascript-engine/callstack-steps.png)

Each entry in the *callstack* is called a *Stack Frame*.

Running code on a single thread can be quite easy since you don’t have to deal with complicated scenarios that are arising in *multi-threaded* environments — for example, deadlocks.

But running on a single thread is quite limiting as well. Since JavaScript has a single *callstack*.

---

#### Concurrency & the Event Loop
What happens when you have function calls in the *callstack* that take a huge amount of time in order to be processed? For example, imagine that you want to do some complex image transformation with JavaScript in the browser.

You may ask — why is this even a problem? The problem is that while the *callstack* has functions to execute, the browser can’t actually do anything else — it’s getting blocked. This means that the browser can’t render, it can’t run any other code, it’s just stuck. And this creates problems if you want nice fluid UIs in your app.

And that’s not the only problem. Once your browser starts processing so many tasks in the *callstack*, it may stop being responsive for quite a long time. And most browsers take action by raising an error, asking you whether you want to terminate the web page.

---

About ***Concurrency and Event Loop***, maybe we will discuss it in the next article. Stay Tuned!

---

*Modified: September, 25 2022*
