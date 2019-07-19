<template>
  <div class="profile-page">
    <Banner />
    <section class="section section-skew">
      <div class="container">
        <Card shadow class="card-profile" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="'/assets/img/collections/sutan_new.jpeg'" class="rounded-circle">
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <Button
                    style="background-color: #0073B1; border: none"
                    size="sm"
                    class="mr-4"
                  >
                    <no-ssr>
                      <logo-linkedin-icon w="14px" h="14px" />
                    </no-ssr>
                    Connect
                  </Button>
                  <Button type="default" size="sm" class="float-right">
                    <no-ssr>
                      <md-mail-icon w="14px" h="14px" />
                    </no-ssr>
                    Contact
                  </Button>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{ github.contributions }}</span>
                    <span class="description">Total Contributions</span>
                  </div>
                  <div>
                    <span class="heading">{{ github.publicRepos }}</span>
                    <span class="description">Public Repositories</span>
                  </div>
                  <div>
                    <span class="heading">{{ github.publicGists }}</span>
                    <span class="description">Public Gists</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                Sutan Nasution.,
                <span class="font-weight-light">&nbsp;20</span>
              </h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2" />
                Palembang, Indonesia
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2" />
                Software Engineer
              </div>
              <div>
                <i class="ni education_hat mr-2" />
                State of Polytechnic Sriwijaya
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>
                    <no-ssr>
                      <md-quote-icon w="14px" h="14px" />
                    </no-ssr>
                    My name is Sutan Gading Fadhillah Nasution. My age is approaching 20 years. Now, i'm lives in Palembang, Indonesia. I still lives with my parents and currently studying at the State of Polytechnic Sriwijaya.
                  </p>
                  <p>
                    I am very interested in Programming, especially in building a website applications. Actually, I'm not very experienced in programming, but I will continue to learn and aspiring to become a Professional Developer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script>
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'
import MdQuoteIcon from 'vue-ionicons/dist/md-quote.vue'
import Card from '~/components/Argon/Card'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'

export default {
  components: {
    Banner, Card, Button, MdMailIcon, MdQuoteIcon
  },
  data: () => ({
    github: {
      contributions: 0,
      publicRepos: 0,
      publicGists: 0
    }
  }),
  mounted() {
    Promise.all([
      this.$axios.get('https://api.github.com/users/sutanlab')
        .then(({ data }) => data),
      this.$axios.get('https://github-contributions-api.now.sh/v1/sutanlab')
        .then(({ data }) => {
          let contributions = 0
          for (const contribution of data.years) {
            contributions += contribution.total
          }
          return contributions
        })
    ]).then(result => {
      this.github.publicRepos = result[0].public_repos
      this.github.publicGists = result[0].public_gists
      this.github.contributions = result[1]
    })
  }
}
</script>
