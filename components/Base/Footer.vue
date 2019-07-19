<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h4 class="mb-0 font-weight-light">
            Let's get in touch on my social.
          </h4>
        </div>
        <div class="col-lg-6 text-lg-center btn-wrapper">
          <a
            v-for="(social, i) in socials"
            :key="i"
            :href="social.link"
            :class="`btn btn-neutral btn-icon-only btn-round btn-lg ${social.class}`"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            data-original-title="Contact me"
          >
            <no-ssr>
              <component :is="social.icon" />
            </no-ssr>
          </a>
        </div>
      </div>
      <hr>
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }}
            <a :href="env.site" target="_blank" rel="noopener">Sutanlab</a>
            &nbsp;•&nbsp;
            <a href="https://github.com/sutanlab/sutanlab.id" target="_blank" rel="noopener">Built</a>
            with <span style="text-decoration: underline dotted">Bullshit</span> by
            <a href="https://github.com/sutanlab" target="_blank" rel="noopener">
              {{ env.author }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    env: {
      site: process.env.PRODUCTION_URL,
      author: process.env.AUTHOR
    },
    socials: [
      { icon: 'logo-octocat-icon', link: 'https://github.com/sutanlab', class: 'btn-github' },
      { icon: 'logo-linkedin-icon', link: 'https://www.linkedin.com/in/sutan-nasution', class: 'btn-linkedin' },
      { icon: 'logo-instagram-icon', link: 'https://www.instagram.com/sutan_gnst', class: 'btn-instagram' },
      { icon: 'logo-facebook-icon', link: 'https://www.facebook.com/sgnzst', class: 'btn-facebook' },
      { icon: 'logo-twitter-icon', link: 'https://www.twitter.com/sutan_gnst', class: 'btn-twitter' }
    ]
  })
}
</script>
