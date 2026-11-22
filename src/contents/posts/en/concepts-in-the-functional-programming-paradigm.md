---
title: 'Concepts and techniques you should know in the functional programming paradigm'
slug: {
  en: 'concepts-in-the-functional-programming-paradigm',
  id: 'konsep-pada-paradigma-pemrograman-fungsional'
}
date: 2020-01-18
description: 'It is not just OOP: the functional paradigm also has interesting concepts and rules of use. What are they?'
keywords: 'functional paradigm, paradigma fungsional, pure function, curried function, recursive function, currying, recursive, callback, closure, fungsi'
tags: ['functional', 'purefunction', 'recursive', 'currying', 'closure', 'higherorderfunction']
image: '/media/default-banners/5.jpg'
---

In the previous articles we covered the different *higher-order functions* in JavaScript. So the question is, do *higher-order functions* only exist in JavaScript? The answer is **no**. *Higher-order functions* are *built-in* in a lot of modern programming languages, especially ones with a functional paradigm, and we can even write our own in any programming language. So what actually is a *higher-order function*? Well, the *Higher-order function* is one of the concepts or techniques of the functional paradigm. In this article I'll go over the concepts usually used in the functional paradigm. Okay, no need for a long intro, let's get started.

---

###### There are at least a few concepts that are *common* in the functional paradigm:
1. Transformation and Immutability
2. Pure Function
3. Recursion/Recursive Function
4. Callback and Closure
5. Higher-order Function
6. Currying/Curried Function

### 1. Transformation and Immutability
Before getting into the 5 points that are truly specific to functional programming, first we'll go over what *transformation* and *immutability* are, because they're the foundation and the main trait of the functional paradigm. Why did I put *transformation* and *immutability* in one point? Because the *transformation* concept is usually backed by the concept of data *immutability*, so they're related to each other hehe.

Immutable data means data whose value can't change after it's created. So why make every piece of data immutable? Yep, we use the *immutability* concept to avoid *side-effects*. In the OOP paradigm, all data is usually *mutable*, because OOP lets us mutate data through a *setter* on a *class*. For example, we'd usually do this in Java:

```java
Product product = new Product("Sepatu");
product.setDiscount("10%");
product.setPrice(90000);

System.out.println(product.getSalePrice()); // 81000

product.setDiscount("50%");

System.out.println(product.getSalePrice()); // 45000
```

That's roughly what it looks like when we write a program in Java, which uses the OOP paradigm. There we can see that we've mutated the discount value from `10%` to `50%`. "So what?" Nothing really, it's perfectly fine if that's what we want, but here I want to show what a *side-effect* is. Look at this:

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

Right, we mutated the discount *property* on the product object and that caused the `price1` variable to change too, because the `getSalePrice()` method refers to the discount *property* on the product object. That's a simple example of a *side-effect*: the `price1` *variable* we declared at the start also gets hit by the side effect when we mutate the discount on the product object.

Every object of a *class* has a *state* made of its *properties*, and has specific operations or *behaviors* that can be performed on that *state* through *methods*. Our program runs by creating *instances* of those objects and modifying their *state* through the provided *methods*, usually called *setters*. Once our project gets big enough and we have a lot of objects, it gets hard to understand what *state* exists in our program and how it changes over time, especially if the objects' *classes* depend on other *classes*. This can lead to mistakes by *engineers* and makes the program hard to maintain.

So the concept of data *immutability* in code is important for avoiding those *side-effects*. Java actually has an *immutability* concept too, for example with the String data type, like this:

```java
String string1 = "Halo.";
String string2 = string1.toUpperCase();

System.out.println(string2);  // => HALO.
System.out.println(string1);  // => Halo.

string1 = string1 + " Saya Gading";
System.out.println(string1);  // => Halo. Saya Gading
```

We can see that the value of `string1` doesn't change from calling `string1.toUpperCase()`. The String data type in Java is *immutable*: we can't change its value after *assignment*. Even so, we can *reassign* a String *variable* with another value. Operations like *concatenation* with `+`, `.toUpperCase()`, and so on return a new value and don't change the original value.

On the last line, it looks like we're changing the value of `string1`, but what we're actually doing is changing the *reference* held by `string1` to a new string produced by the concatenation. It's clearer in this snippet:

```java
String string1 = "Halo.";
String string2 = string1;
string1 = string1 + " Saya Rina!";

System.out.println(string1);  // => Halo. Saya Rina!
System.out.println(string2);  // => Halo.
```

You can see that `string2` doesn't change, because it still refers to the same string object as before. But that's as far as *immutability* goes in Java. Object-oriented programming with Java strongly supports mutating data on a *class* through its *setters*, so there's a very high chance of producing *side-effects* like the one we made at the start.

---

In the functional programming paradigm, *state* and *behavior* are separate. *State* is represented by a data structure, and *behavior* is the functions that can operate on that data. **In the functional paradigm, our program is a sequence of data transformations from one shape to another.**

So how do we solidify the *transformation* and *immutability* concepts in the functional paradigm? That ties into the 4 points below, so read to the end^^

### 2. Pure function
After covering *transformation*, *immutability* and *side-effects*, we can easily understand what a *Pure Function* is. Literally, a ***Pure Function*** is a **pure function**. So what does that mean? Why is it called pure? To put it more clearly, a pure function is a function that operates to *transform* data and doesn't cause *side-effects* when you call it. If we want to write a pure function, the rules are: first, we can't change a *variable* outside the function's *scope*. Second, the function has to *return* a new value or argument as the result of its operation. And finally, given the same input parameters, a pure function should consistently *return* the same value. To make it clearer, let's look at the functions in the following snippets.

**Impure Function example**
```js
// IMPURE Function 1
let result = 0
const sum = number => {
  result += number // => accesses and changes a variable outside the scope. (Causes a side-effect!)
  return result
}

// The return value for the same input is not consistent
console.log(sum(2)) // => 2
console.log(sum(2)) // => 4
console.log(sum(2)) // => 6

// IMPURE Function 2
const save = data => {
  doSomethingElse()
  saveToDatabase(data)
  // => doesn't return any value.
}

const data = { id: 1, name: 'Coca-Cola' }
console.log(save(data)) // => undefined
```

**Pure Function example**
```js
// PURE Function
const getSalePrice = (discount, price) =>
  price - ((parseInt(discount.match(/\d+/)) / 100) * price) // => doesn't access or change any variable outside the scope, so it won't cause a side-effect

// The return value for the same input is consistent
console.log(getSalePrice('80%', 10000)) // => 2000
console.log(getSalePrice('80%', 10000)) // => 2000
console.log(getSalePrice('50%', 100000)) // => 50000
console.log(getSalePrice('50%', 100000)) // => 50000
```

### 3. Recursive
After *Pure Function*, we'll cover *Recursive*. A ***Recursive*** function is a function that calls itself, directly or indirectly. Recursion is a useful problem-solving technique. When solving a problem recursively, we generally break a big problem into many smaller problems and solve those small problems with a recursive function. So what's the advantage of recursion over iteration like *for-loop*, *do-while* etc? As far as I know, at a glance iteration is faster than recursion, but recursion can be optimized further using *tail-recursion*. So what's *tail-recursion*? I won't cover that here; here I'm focusing on comparing recursion in terms of how it's used. Besides, the deeper theory is beyond what I know, and I don't want to explain things beyond what I know. Okay, let's go straight to an example comparing recursion and iteration, assuming I want to write a `range()` function like Python's in JavaScript.

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

// Usage
console.log(rangeWithIteration(1, 5)) // => [1, 2, 3, 4, 5]
console.log(rangeWithRecursion(1, 5)) // => [1, 2, 3, 4, 5]
```

Inside the `reangeWithRecursion` function there's a call to the `rangeWithRecursion` function itself, and that's what's called recursion. A recursive function must have a *conditional* as the limit on its calls. Otherwise it causes a ***maximum callstack size exceed***, where the function never stops calling itself, exactly like an *infinite loop*. But there's a difference between *maximum callstack* and *infinite looping*: with an *infinite loop*, the program usually keeps running but produces a bug where over time the program freezes/hangs until it crashes, or even the OS restarts itself because it eats too much memory. A *maximum callstack*, on the other hand, throws an error right away without freezing/hanging or causing a bug in the program. Maybe this is one of the advantages of using a *recursive* function over *looping*.

In terms of the result, it's clearly the same, but in terms of how concise the code is, the recursive way is clearly simpler, more elegant, and really shows the functional style.

### 4. Callback and Closure
A *callback* is actually a regular function. The difference from other functions is how it's executed. Where a regular function runs in order from top to bottom, a *callback* runs at a certain point, which is why it's called a *callback*.

One trait of a *callback* is a function as a parameter. In JavaScript, *callbacks* are an everyday thing. If you spend a lot of time in JavaScript, there's no way you won't run into *callbacks*. Let's look at an example of a *callback* commonly found in JavaScript.

```js
const btn = document.querySelector('#my-btn')

const onClick = () => {
  window.alert('How dare you touch me !?')
}

btn.addEventListener('click', onClick) // => the onClick function as a callback

// or we can write the callback inline like this (anonymous callback)
btn.addEventListener('mouseenter', () => {
  window.alert('Get away from me!!')
})
```

We've seen a *callback* example, so what about a *closure*? Look at this:

```js
const input = document.getElementById('my-input')

// Closure example
input.addEventListener('input', event => {
  console.log(event.target.value)
})
```

So what's the difference? Yes, at its core a *closure* is a *callback*, just more specific. The simple definition: a *Closure* is a *callback* that has a variable context it will use. Here you can see it in the **event** variable in that *callback*.

Even though I've pointed out the difference between a *callback* and a *closure* here, most people don't distinguish them, because the difference is really small haha. So it's really up to us whether we call them all *callbacks* or *closures*.

*Callbacks* and *closures* are generally used to implement *event listeners*, *asynchronous processes*, and so on.

### 5. Higher-order function
We covered *Higher-order functions* in JavaScript in a previous article, in 2 parts. But what we covered back then was only the outside. So what's inside? Let's practice it further here, hehe.

Let me repeat the definition: a ***Higher-Order function*** (in Indonesian, **fungsi tingkat tinggi**) is a function that takes a *callback* function as an argument or as a *value* for the *output*. Here, let's just generalize *callbacks* and *closures* as *callbacks*, to keep it simple haha. Even though in point 4 we distinguished between *callback* and *closure*, what matters is that we know the difference.

For an example: where JavaScript's `Array.map()` and `Array.filter()` functions come separately, let's say we want to map and filter in a single function so it's more optimal, haha.

```js
const mappedFilter = ([item, ...remaining], cbMap, cbFilter) => (
  typeof item === 'undefined'
    ? []
    : cbFilter(item)
      ? [cbMap(item), ...mappedFilter(remaining, cbMap, cbFilter)]
      : mappedFilter(remaining, cbMap, cbFilter)
)

// USAGE

const data = [
  { id: 1, name: 'Product 1', price: 75000 },
  { id: 2, name: 'Product 2', price: 5000 },
  { id: 3, name: 'Product 3', price: 25000 },
  { id: 4, name: 'Product 4', price: 56000 },
  { id: 5, name: 'Product 5', price: 30000 }
]

// find the names of products priced above 50000
const result = mappedFilter(data,
  product => product.name, // => callback as the output
  product => product.price > 50000 // => callback as the logic argument
)

console.log(result) // output => ['Product 1', 'Product 4']
```

You can see that the `cbFilter` function called inside `mappedFilter` plays the role of the logic argument, while `cbMap` plays the role of the *output value*. The two functions passed as parameters are called *callbacks*, and the `mappedFilter` function itself is called a *higher-order function*. But a *callback* doesn't always meet the requirements of a *higher-order function*, because a *callback* might only be called to finish a process without *returning* an argument or a *value* as *output*. The requirement for a function to be called a *higher-order function* is that it takes a *callback* parameter that *returns* an argument or a *value* as *output*.

---

But here's what you should know: a *callback* is a function called inside another function, while a *higher-order function* is the opposite, a function that calls another function inside it. Still, most people call it a *higher-order function* even when the *callback* called inside it doesn't meet the *higher-order function* requirement (*returning* a *value*).

By the way, the code above uses recursion. If you want to use iteration, there's nothing wrong with that.

### 6. Currying
The last one is ***Currying***, also called a ***Curried Function***. Literally, *curry* means spice/curry. In layman's terms, a *Curried Function* is a function that's been sprinkled with spice/curry.

Technically, though, *Currying* is the technique of turning a function with *multiple* parameters/arguments into a chain of functions, where each function takes one of the parameters. Let's look at this snippet.

**Function without *currying***
```js
const getSalePrice = (discount, price) =>
  price - ((parseInt(discount.match(/\d+/)) / 100) * price)

const price = getSalePrice('50%', 100000)
console.log(price) // => 50000
```

That's probably how we usually write a function. Now let's split up the parameters and turn the function into a *curried* one.

**Function with *currying***
```js
const getSalePrice = discount => price =>
  price - ((parseInt(discount.match(/\d+/)) / 100) * price)

const price = getSalePrice('50%')(100000)
console.log(price) // => 50000
```

***The result is the same, so what's the point of doing that?***

Okay, let's look at the benefit of *currying*. Say we have the same discount but different product prices. Without *currying*, we'd probably write something like this.

```js
const price1 = getSalePrice('50%', 10000)
const price2 = getSalePrice('50%', 750000)
const price3 = getSalePrice('50%', 40000)
// and so on

// or like this
const discount = '50%'
const price1 = getSalePrice(discount, 10000)
const price2 = getSalePrice(discount, 750000)
const price3 = getSalePrice(discount, 40000)
// and so on
```

At a glance there's nothing wrong with the code above, and there really isn't. It's just that the discount parameter gets repeated a lot.

Compared to the code above, let's use the *curried* `getSalePrice` function from before.

```js
const discount = getSalePrice('50%')

const price1 = discount(10000)
const price2 = discount(750000)
const price3 = discount(40000)
```

Yep, that's right. With *currying*, we can *hold* a parameter that might be used over and over, which makes the parameters of our function *reusable*. We run into the *currying* technique a lot. Common examples are in the React framework, like *react hooks*, *higher-order components*, etc. *Currying* also shows up a lot in configuration *modules*.

---

### Wrapping up
To sum up, the concepts and techniques of the functional paradigm are just as interesting as those of the OOP paradigm we usually know. Unlike the OOP paradigm, which is a collection of objects that communicate with and depend on each other, the functional paradigm's approach is a collection of small functions that operate on data independently.

So, **instead of thinking of our program as a collection of objects whose data communicates with and depends on each other, it's better to think of our program as a collection of small functions that each operate on their own data independently.** Especially now that *Microservices* are the *trend*. Simple examples: *AWS lambda function*, *Google Cloud function*, *Firebase function* and so on. In terms of *flow*, *microservice* architecture is exactly like the flow of the functional paradigm, because in *microservices* each *service* is *independent* and doesn't depend on other *services*.

And actually we don't always have to pick and use only one of these two paradigms. We're totally free to combine the OOP paradigm with the functional paradigm in our project, as long as the programming language we use supports *multiple paradigms*. Some programming languages don't support *multiple paradigms* and are built specifically for one particular paradigm.

---

That's about all the concepts of the functional paradigm I can cover in this article. If there's a mistake in my explanation or the code above, feel free to call it out. Honestly, I still have a lot to learn. That's all from me, I hope it's useful, and thank you. 😄
