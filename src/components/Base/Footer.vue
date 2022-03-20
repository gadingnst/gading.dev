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
            :aria-label="social.class.split('-')[1].toUpperCase()"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            data-original-title="Contact me"
          >
            <client-only>
              <component :is="social.icon" />
            </client-only>
          </a>
        </div>
      </div>
      <hr>
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }}
            <a :href="env.site" target="_blank" rel="noopener">{{ env.siteName }}</a>
            &nbsp;•&nbsp;
            <a :href="`https://github.com/${env.githubUsername}/sutanlab.id`" target="_blank" rel="noopener">Built</a>
            with <span style="text-decoration: underline dotted">Bullshit</span> by
            <a :href="`https://github.com/${env.githubUsername}`" target="_blank" rel="noopener">
              {{ env.author }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import LogoOctocatIcon from 'vue-ionicons/dist/logo-octocat.vue';
import LogoLinkedinIcon from 'vue-ionicons/dist/logo-linkedin.vue';
import LogoInstagramIcon from 'vue-ionicons/dist/logo-instagram.vue';
import LogoFacebookIcon from 'vue-ionicons/dist/logo-facebook.vue';
import LogoTwitterIcon from 'vue-ionicons/dist/logo-twitter.vue';
import {
  PRODUCTION_URL,
  SITE_NAME,
  AUTHOR_NAME,
  GITHUB_USERNAME,
  LINKEDIN_USERNAME,
  INSTAGRAM_USERNAME,
  FACEBOOK_USERNAME,
  TWITTER_USERNAME
} from '~/utils/config';

export default {
  components: {
    LogoOctocatIcon,
    LogoLinkedinIcon,
    LogoInstagramIcon,
    LogoFacebookIcon,
    LogoTwitterIcon
  },
  data: () => ({
    env: {
      site: PRODUCTION_URL,
      siteName: SITE_NAME,
      author: AUTHOR_NAME,
      githubUsername: GITHUB_USERNAME
    },
    socials: [
      { icon: 'logo-octocat-icon', link: `https://github.com/${GITHUB_USERNAME}`, class: 'btn-github' },
      { icon: 'logo-linkedin-icon', link: `https://www.linkedin.com/in/${LINKEDIN_USERNAME}`, class: 'btn-linkedin' },
      { icon: 'logo-instagram-icon', link: `https://www.instagram.com/${INSTAGRAM_USERNAME}`, class: 'btn-instagram' },
      { icon: 'logo-facebook-icon', link: `https://www.facebook.com/${FACEBOOK_USERNAME}`, class: 'btn-facebook' },
      { icon: 'logo-twitter-icon', link: `https://www.twitter.com/${TWITTER_USERNAME}`, class: 'btn-twitter' }
    ]
  })
};
</script>
