---
title: 'A Deeper Look at the Promise Concept in JavaScript'
slug: {
  en: 'understanding-promises-in-javascript',
  id: 'memahami-konsep-promise-di-javascript'
}
date: 2020-02-08
description: 'Promises exist to solve the problems of asynchronous processes in JavaScript. Understanding the promise concept is one of the most important parts of JavaScript.'
tags: ['javascript', 'promise', 'callback', 'asynchronous']
keywords: 'javascript, konsep promise, callback hell, callback, proses asynchronous, promise'
image: '/media/blog/memahami-konsep-promise-di-javascript/promise.png'
---

JavaScript is an *interpreted* programming language known for its *asynchronous* style. This is one of the things that makes JavaScript a fast language, even the fastest compared to other *interpreted* languages like ***Perl, PHP, Python, Ruby, etc*** (Remember, we're not talking about *compiled languages* here!).

---

Understanding *asynchronous* code is one of the important things in the JavaScript world. The concept often gets skipped while people are still learning the fundamentals, maybe because it's too complicated to explain, or for other reasons. Plenty of people who have used javascript for years still don't fully understand the *asynchronous* concept, even if in practice they use it all the time.

The *asynchronous* concept is one of the fundamentals, but it's not that easy to understand. There's the saying "*practice makes perfect*": the more you practice, the better you understand. But practice without understanding the concept is blind, with too much *trial and error* and wasted time. In my opinion, the ideal way to understand *asynchronous* code is to learn the concept step by step and practice it. Remember, the key is step by step, not all at once.

> Note: Before reading this article about ***Promise***, you should at least understand a bit about ***asynchronous*** code and ***callbacks***, because this article basically covers the next level of the fundamentals. It's better to read up on those two topics first. Okay?

---

*Since this blog is pretty long, with an estimated reading time of around 20 minutes 😄, I made a ***table of contents*** so it's easy to jump between sections. I suggest grabbing some snacks and a cup of coffee to enjoy the read.*

---

## Getting to know Promise

***Promise*** is a concept introduced in ES6 (ES2015). It came to change the *style* of solving problems in *asynchronous* processes, which used to be long-winded. Before that, we used *callbacks* to handle *asynchronous* processes, but over time it gets hard as more and more *callbacks* are used, until there are *callbacks* inside *callbacks* and so on. This problem is often called ***callback hell***. Here's an example of *callback hell*. (Assume we want to read 4 files, then merge their contents into 1 file).

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

Hurts your eyes to look at the code above, right? Haha. The code above is not *maintainable* at all. And that's only 5 *callbacks*, what if there were more? Sigh.

## The basic concept of promise

Before we dive deeper into ***promise***, it's good to understand the concept first so we don't get confused halfway. With the ***Promise*** concept, in human terms we can use a simple analogy like this:

> *We make a promise with a friend to hang out at a cafe tomorrow night.*

Then we can take the important aspects of that promise and put together a plan like this:
1. Deadline: Tomorrow night.
2. Plan: Hang out at a cafe.

From that plan, the questions come up:
1. *What should we do if the promise reaches its deadline and doesn't go as planned?*
2. *What else should we do once the promise reaches its deadline, whether it went as planned or not?*

Well, it's the future, nobody knows what might get in the way of the plan. Say tomorrow night there's rain and a storm, then we'll just meet up and play an online game with our friend instead. So our final plan looks like this:

1. Deadline: Tomorrow night.
2. Main Plan: Hang out at a cafe.
3. Other Plan: Play online together.
4. Afterwards: Sleep

Now we can break the final plan into 4 *states*:
1. ***Pending*** (The promise is still in progress before the deadline and the result isn't known yet)
2. ***Fulfilled*** (Success: the promise is completed and went as planned before or at the deadline)
3. ***Rejected*** (Failure: the promise is completed but something went wrong before or at the deadline)
4. ***Settled*** (Completed: the promise enters this *state* once it has been carried out or reached its deadline, whether it succeeded or failed)

So here are the *states* of the actual ***Promise*** flow in JavaScript:

![Promise states](/media/blog/memahami-konsep-promise-di-javascript/promise-state.jpg)

---

If we translate it into code, we can map the aspects of the plan like this:
1. **Tomorrow night** is the process that runs based on time.
2. **Hanging out at a cafe** is our main plan if tomorrow night goes the way we want (nothing goes wrong to stop it).
3. **Playing online together** is the other plan if our main plan doesn't happen (something goes wrong).
4. **Sleeping** is our plan after hanging out at the cafe or playing online.

And the code looks like this:
```js
besokMalam()
	.then(nongkrongDiKafe)
	.catch(mabar)
	.finally(tidur)
```

So the code above says: if the promise `besokMalam()` (tomorrow night) goes as planned, we'll `nongkrongDiKafe` (hang out at the cafe). If something goes wrong (rain/storm) during the `besokMalam()` promise, we'll `mabar` (play online together). Then once `nongkrongDiKafe` or `mabar` is done, finally we'll `tidur` (sleep).

Just like in the real world, in programming we also have to plan and identify what might happen in our application. Only then does our application run properly. Ever used an app that suddenly gets stuck, hangs, doesn't work, force closes or shows confusing error messages? That's because the app wasn't built with a well-planned procedure. In other words, the app doesn't know what to do when something outside the plan happens.

---

## Promise in practice

Okay, we've covered the basic concept of *promises*. At least now we understand how a promise runs and what *states* a promise goes through, with the analogy I explained above. In this section we'll do the basic practice.

### Creating a promise object
In the previous *section*, we saw examples of using a *promise* with `.then()`, `.catch()` and `.finally()`. The problem is, not every function we use is a ***Promise*** object. The `fs.readFile()` function in the *callback hell* example above isn't a *promise* object, so if we use `fs.readFile().then()` it will of course throw an error. So how do we create a ***Promise*** object and get rid of those messy *callbacks*?

```js
const readFile = (file, options) => new Promise((fulfill, reject) => {
  fs.readFile(file, options, (err, content) => {
    if (err) return reject(err)
    return fulfill(content)
  })
})
```

That's how you create a *promise* object for a *non-promise* *asynchronous* process. So what are `fulfill` and `reject`? Read the part above again, about the *states* of a *promise* :) Then we can use the *promise* we created like this:

```js
readFile('content.txt', 'utf-8')
  .then(content => {
    // file read succeeded
    console.log('File read succeeded, contents:', content)
  })
  .catch(err => {
    console.log('An error occurred while reading the file:', err)
  })
```

Oh, so it's the same as a ***try-catch*** block, like in programming languages in general. Hold on bro, *try-catch* is for *synchronous* processes, while *promise* is for *asynchronous* processes. Let's change it like this:

```js
readFile('content.txt', 'utf-8')
  .then(content => {
    // file read succeeded
    console.log('File read succeeded, contents:', content)
  })
  .catch(err => {
    console.log('An error occurred while reading the file:', err)
  })

console.log('Hello world')
```

Guess which one shows up first? If you answered `File read succeeded ...` or `An error occurred...`, congrats, you're wrong hehe. The one that shows up first is `Hello world`. Why? Because `readFile()` is an *asynchronous* process, so the code below it doesn't wait for the process above it. It's different with a *synchronous* process like the ones we usually use, where the code below waits until the process above it finishes.

### Promise chaining

Earlier we talked about *callback hell* and saw examples of creating & using a *promise*. The *callback hell* case above can actually be turned into *promises* so the code is cleaner and easier to read. Let's try it.

First, we turn the `fs.readfile()` and `fs.writeFile()` functions into *promises*, like this:

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

Wait a second, why is the way we create the *promise* object different from the earlier example? The first one is `const readFile = (file, options) => ...` while the second one is `const readFile = options => file => ...`?

Here's the thing: the new example uses the ***currying*** technique. I explained *currying* in an earlier blog post, you can read it [here](https://gading.dev/blog/konsep-pada-paradigma-pemrograman-fungsional). Okay, let's skip that and move on. After creating the *promise* objects above, let's use them to solve the *callback hell* case from before.

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

So, how is it? At least the code is a bit cleaner and not messy anymore, right haha. Although it could actually be made even simpler. Okay, let's keep going.

### Promise with best practice

Speaking of *best practice*, it's a big no for a *software engineer* to leave their code sloppy, just as long as it runs or whatever. The result is that the app ends up "*have a large size and heavy because its so many ***libraries*** or ***node_modules*** installed*".

A good *software engineer* will put all the *built-in* features first instead of rushing to use a *library* or *third-party apps*, and will think about how to make the code more *readable* and optimal in terms of performance and algorithm, and usable in the long term. On top of that, in this part we'll look at what can make *promise* code more *readable* and *optimized*.

#### Async - Await
If you're still confused or not used to *promises*, `async - await` is the right way to make *promise* code more *readable* and easy to read like regular *synchronous* code. The rule is that the `await` keyword has to be inside an `async` function. For an example, we'll use the `readFile` case from above:

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

As we can see, the code above is very easy to read, like a regular *synchronous* process. We can use a `try-catch` block as usual to *handle* the *error*. But why does `mergeContent()` still have `.then()`? Well, you can see we *return* the ***Promise*** `writeFile` at the end of the function. And this is the best practice: we should *return* a promise from an *async* function. Let's look at an example of using an *async function* that isn't *best practice*:

```js
async function mergedContent() {
  const read = readFile('utf-8')
  try {
    const content1 = await read('content1.txt')
    const content2 = await read('content2.txt')
    const content3 = await read('content3.txt')
    const content4 = await read('content4.txt')
    await writeFile('result.txt', content1 + content2 + content3 + content4)

    // this is where it stops being best practice.
    // returning the result value of the promise
    const result = await read('result.txt')
    return result
  } catch (err) {
    throw err
  }

  // Even if you do this, it's still wrong
  return await read('result.txt')
}

console.log(mergedContent()) // Promise<Pending>
```

What? We already used `await` and *returned* the value directly, why is it still pending? Well, an *async function* actually *forces* a ***Promise*** *return*. So even if we *return* a value directly inside an *async function*, we still have to call it like this:

```js
mergedContent()
  .then(result => {
    console.log(result)
  })

// or make a new async function
async function printContent() {
  const content = await mergedContent()
  console.log(result)
}

printContent()
```

Yup, in the end it all comes back to *promises*, right? So using an *async function* the ***best practice*** way means we either *return* a promise or don't *return* a value at all. Don't expect to get a value *instantly* if you *return* a value inside an *async function*. Here's the *best practice* example:

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
  // Return the promise directly, not the value the promise resolves to
  // and not by returning it with await
  return read('result.txt')
}

console.log(mergedContent()) // Promise<Pending>

mergedContent()
  .then(result => {
    console.log(result) // contents of result.txt
  })
  .catch(err => {
    console.log('Failed to read the merged content:', err)
  })
```

---

So if you still think *async-await* and *promise* are different things, you're wrong. As explained above, `async - await` itself is a way or technique to make *promise* code easy to read like regular *synchronous* code. So the conclusion is:

> ***The value of an async function will always be a Promise, even if what we return is not a Promise***. So, `async function() = Promise`

Because no matter what, an *async function* isn't a regular function that can *return* a *value* directly. It still runs *asynchronously* and will "*forcibly*" *return* a ***Promise***.

Once you run into these cases often and read the theory often, you'll get it ^^

#### Promise superpowers

There are actually a lot of features in the *promise* object, but very few people notice or use them, even though these features are real *superpowers* and help a lot with *promise* cases, especially for handling an ***array of promises***. The features are:

1. ***Promise.race***
2. ***Promise.all***
3. ***Promise.allSettled*** (Just released, *ES2020*)
4. ***Promise.any*** (Still a proposal)

We'll go through these features one by one along with case studies. But since `Promise.any` hasn't been *released* yet, we'll only go up to `Promise.allSettled`.

##### 1. Promise.race

`Promise.race` is a *promise* feature that gives you the *promise* from an *array of promises* that enters the ***fulfilled*** *state* first. The rules are:
1. `Promise.race` enters the *fulfilled state* if one *promise* in the *array of promises* enters the *fulfilled state* first (its *return* value is the value of the first *promise* that's *fulfilled*). Basically it's like a race: whoever wins is the one that counts, and the *promises* after it are ignored.
2. `Promise.race` will *short-circuit*, or enter the *rejected* state, if one *promise* enters the *rejected* state first.

So what's a case study for using `Promise.race`? I once used `Promise.race` to build a ***request timeout*** system. The case was like this:

> We want to add a *timeout* to our app's requests so users don't wait too long for something uncertain and can act quickly. (well, it's a promise, of course it's uncertain. Haha).

The code looks roughly like this:

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

const request = getJSON('https://api.quran.gading.dev/surah')

request(1500)() // run the request with a 1.5 second timeout

document.getElementById('try-again')
  .addEventListener('click', request(5000)) // 5 second timeout for the next request.
```

There's another interesting case I've implemented with `Promise.race`: building a *request cancel* system. The case goes like this:

> We want to build a *live search* that *requests* data from the server right as the user types a *keyword* into the form. The problem is that as the user keeps typing, every change to the *keyword* gets *requested* to the server. If the user keeps typing, the requests pile up, and that also makes the app heavy. So our job here is to build a system that *cancels* the previous *request* while the user is still typing, so the only *request* that runs is for the user's last *keyword*.

Here's an example implementation:

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

That's roughly how you can use `Promise.race` to build a *request cancel* system. By the way, this isn't only for *live search*. We can also use it for a *cancel button* on a form input, so the user can click *cancel* after they *submit*. Pretty cool, right? Without needing any *library*, maybe just *babel* to transpile modern JS into old JS so it works in old browsers, haha.

##### 2. Promise.all

`Promise.all` is a *promise* feature that gives you the values of all the *fulfilled promises* it processes. The rules are:

1. `Promise.all` enters the *fulfilled state* if all the *promises* in the *array of promises* enter the *fulfilled state* (its *return* value is an array of the values of the *fulfilled promises*). Unlike `Promise.race`, `Promise.all` waits for the other *promises* that are still *pending* until they all enter the *fulfilled state*.
2. `Promise.all` will *short-circuit*, or enter the *rejected* state, if any *promise* enters the *rejected* state. (So if just one *promise* in `Promise.all` enters the *rejected state*, it fails all the *promises*, whether they're still *pending* or already *fulfilled*)

So what's a case study for `Promise.all`? I actually use this feature a lot, in many cases. Basically it's good when we have several *promises* that don't depend on each other, but we want the results of those *promises* together. For an example, no need to look far, we'll just use the case from the *async-await* part above.

Before, we wrote the *async-await* code above like this:

```js
async function mergeContent() {
  const read = readFile('utf-8')

  try {
    // the four awaited reads below are not best practice at all
    // these promises don't actually depend on each other.
    // so we can combine all four promises into one Promise.all
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

So we change the function like this to get better performance:

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

Why do I say performance is better with `Promise.all`? First, let's assume this:

1. `read('content1.txt')` we'll call ***p1***, which takes 1000ms.
2. `read('content2.txt')` we'll call ***p2***, which takes 400ms.
3. `read('content3.txt')` we'll call ***p3***, which takes 100ms.
4. `read('content4.txt')` we'll call ***p4***, which takes 1500ms

If we use the 4 *awaits* in sequence like before, it means we've spent time waiting for nothing. Why? Because running ***p2*** doesn't need the value of ***p1***, likewise ***p3*** doesn't need the value of ***p1*** or ***p2***, and ***p4*** doesn't need the value of ***p1***, ***p2*** or ***p3*** either.

So why wait? If we do it that way, we've wasted **1500ms**, or **1.5 seconds**. Why? To run ***p2*** we wait for ***p1*** to finish, to run ***p3*** we wait for ***p2*** to finish. Same with ***p4***, we have to wait for ***p3*** to finish. Not to mention the `writeFile`, ugh.

> So, ***1000ms + 400ms + 100ms + 1500ms = 3000ms (3 seconds!)***

But if we use `Promise.all`, the four processes don't wait for each other, they run at the same time. When one process finishes, it waits for the others to finish. Based on the assumptions above:

> All four processes run at the same time, but ***p3*** finishes first, followed by ***p2***, then ***p1***, and finally ***p4***. ***So the time spent running all four processes is the time of the longest one: ***p4*** = 1500ms (1.5 seconds!)***

If you're still confused, let's look at the comparison in this chart:

![Async & Sync load time comparison](/media/blog/memahami-konsep-promise-di-javascript/async.png)

Got it now? So we can save ***1.5 seconds*** by using `Promise.all`. Sure, 1.5 seconds sounds trivial, but that's only 4 processes. What if there are more? Say we have to read every file in a folder, or something more complex like dealing with queries. That's why we should know when and where to use `Promise.all`, and when we really do have to wait for processes to run one by one.

##### 3. Promise.allSettled

`Promise.allSettled` is a feature that just came out in ***ES2020***. It's here to cover a weakness of `Promise.all`. All the *promises* in `Promise.all` get *rejected* when just one *promise* enters the *rejected state*. Not with `Promise.allSettled`: it has no *rejected* state unless we make one ourselves. To keep it clear, here are the rules for `Promise.allSettled`:

1. `Promise.allSettled` enters the *fulfilled state* once all the *pending promises* enter the *settled state*, whether *fulfilled* or *rejected*. (Its *return* value is an *array of objects* holding the status and value of the *promises* that *settled*. If *fulfilled*, there's a ***value*** *key*; if *rejected*, there's a ***reason*** key explaining why it failed).
2. `Promise.allSettled` has no *short-circuit* or *rejected state* like the other *promises*.

So how do you use `Promise.allSettled`? Well, I haven't actually used `Promise.allSettled` myself, since it's still pretty new. The cases and usage are the same as `Promise.all`, but if we don't want to cancel everything just because one *promise* failed, `Promise.allSettled` is the answer.

For example, maybe we've had a case where we read files whose *file paths* come from an array or a database. Instead of checking them one by one and only then reading them, we can just read them all right away, since the ones that error out get skipped anyway. The code looks roughly like this:

```js
const read = readFile('utf-8')
const files = ['content-1.md', 'content-2.md', 'content-3.md', 'content-4.md', 'content-5.md']

// assume content-5.md doesn't exist in the folder
Promise.allSettled(files.map(file => read(`contents/${file}`)))
  .then(results => {
    const existsContent = results.filter(result => result.status === 'fulfilled')
    // existsContent holds: [{ status: 'fulfilled', value: 'content 1 text' }, ...]
    // and so on, except content 5
    console.log(existsContent)
  })
```

Nice, right? If we used `Promise.all`, the *promise* we made above clearly would never enter the *fulfilled state*, because `content-5.md` would fail everything.

---

## Wrapping up

Okay, I think that's it for our ***Promise*** discussion this time. So we can conclude that *promises* are a real *superpower* once we understand them and know when to use them. All the *built-in* features of *promises* really help with solving *asynchronous* problems and cases. If the way we implement *promises* is already right, that's great, because very few people pay attention to this. Yup, and one more thing, maybe it's because most people hate *asynchronous* programming. Here's the proof:

![NodeJS](/media/blog/memahami-konsep-promise-di-javascript/nodejs.jpg)

As you can see above, a lot of people hate or dislike *NodeJS*, or think *NodeJS* is hard because they think *asynchronous programming* is "***so hard to get right***". Well, it is hard if you don't know the concept in depth haha, so I hope that by reading this blog you understand the concept of *asynchronous programming* better, especially ***Promise*** in NodeJS. Hope it's useful, don't forget to share 😃
