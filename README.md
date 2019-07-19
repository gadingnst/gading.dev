## 👨‍💻 Sutan Nst. Personal Homepage

[![Netlify Status](https://api.netlify.com/api/v1/badges/ffce38a5-4643-42bf-a88b-337a90a5e02d/deploy-status)](https://app.netlify.com/sites/sutanlab/deploys) [![Build Status](https://travis-ci.com/sutanlab/sutanlab.id.svg?token=rVJR4zFkoUEPzoxQdccG&branch=master)](https://travis-ci.com/sutanlab/sutanlab.id) [![Website](https://img.shields.io/website/https/sutanlab.id.svg)](https://sutanlab.id) [![David](https://img.shields.io/david/sutanlab/sutanlab.id.svg)](https://github.com/sutanlab/sutanlab.id) [![Performance](test/lh-scores/lighthouse_performance.svg)](https://sutanlab.id) [![Accessibility](test/lh-scores/lighthouse_accessibility.svg)](https://sutanlab.id) [![Best Practice](test/lh-scores/lighthouse_best-practices.svg)](https://sutanlab.id) [![SEO](test/lh-scores/lighthouse_seo.svg)](https://sutanlab.id) [![PWA](test/lh-scores/lighthouse_pwa.svg)](https://sutanlab.id)

> My Personal Homepage & Blog site with NuxtJS : https://sutanlab.id

### Required in System

- [NodeJS](https://nodejs.org/en/download/)

### Build setup

``` bash
$ yarn install # install dependencies

$ yarn start # serve with hot reload at local server

$ yarn build # build for production

$ yarn test # test with jest environment

$ yarn score # generate lighthouse badges for deployed site with (if has lighthouse-badges cli)
```

This site use Nuxt.js Framework. [Read Nuxt.js Documentation](https://nuxtjs.org).

### Use make post template

``` bash
$ ./post -h # output instructions

$ ./post -c {POST_TITLE} # create post

$ ./post -d {POST_TITLE} # create draft post

$ ./post -p {POST_TITLE} # publish/promote a draft to a post
```

#### Note: How to resolve System limit for number of file watchers reached

```bash
$ sudo echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Special Thanks to :

- [Marina Aisa](https://marinaaisa.com/blog/blog-using-vue-nuxt-markdown)
- [Vitor Britto](https://github.com/vitorbritto/forcefiles/blob/master/scripts/initpost.sh)

* * *

Copyright © 2019 by Sutan Gading Fadhillah Nasution
