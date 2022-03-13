<template>
  <div>
    <Banner height="70vh" image="/assets/img/collections/default-banners/5.jpg">
      <div class="text-center">
        <SlideRight :duration="1500" :delay="200">
          <h1 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            <b>Blog</b>
          </h1>
        </SlideRight>
        <SlideLeft :duration="1500" :delay="200">
          <h5 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            <span id="desc-blog" />”
          </h5>
        </SlideLeft>
      </div>
    </Banner>
    <section id="content-section" class="section section-lg py-3">
      <div class="container">
        <div class="row justify-content-right">
          <div class="col-sm-6" style="text-align: right">
            <h5 v-if="$store.getters.searching">
              Loading ...
            </h5>
          </div>
          <div class="col-sm-6">
            <Input
              id="search-form"
              v-model="inputSearch"
              placeholder="🔍 Search ..."
              @input="onSearch"
            />
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div
              v-lazy-container="{
                selector: 'img',
                loading: '/assets/img/placeholders/loading.svg',
                error: '/assets/img/placeholders/error.png'
              }"
              class="row row-grid"
            >
              <div
                v-for="(content, i) in (inputSearch.length > 0 ? posts : contents)"
                :key="i"
                class="col-lg-6 my-3"
              >
                <BlogCard :content="content" />
              </div>
              <div v-if="posts.length === 0 && inputSearch.length > 0" class="col-sm-12 my-3">
                <h2>🙁 Oops, no matching posts found!</h2>
              </div>
            </div>
          </div>
        </div>
        <div v-if="inputSearch.length === 0" class="container mt-4">
          <h4 class="text-center">
            Page {{ page }} of {{ Math.ceil(total / pagination.limit) }}
          </h4>
          <Pagination
            v-model="pg"
            align="center"
            class="mt-3"
            :page-count="Math.ceil(total / pagination.limit)"
            @input="onPageChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { SlideXLeftTransition as SlideLeft, SlideXRightTransition as SlideRight } from 'vue2-transitions';
import MountedAnimation from '~/mixins/mounted-animation';
import { wrapText, formatPostDate, metaGenerator } from '~/utils/helpers';
import Input from '~/components/Argon/Input';
import Pagination from '~/components/Argon/Pagination';
import Banner from '~/components/Base/Banner';
import BlogCard from '~/components/Blog/Card';
import {
  AUTHOR_NAME,
  BLOG_PAGINATION_LIMIT
} from '~/utils/config';
import { type } from '~/utils/typical';

export default {
  components: {
    SlideLeft,
    SlideRight,
    Banner,
    Pagination,
    Input,
    BlogCard
  },
  mixins: [MountedAnimation],
  props: {
    contents: {
      type: Array,
      default: () => [{}]
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    formatPostDate,
    wrapText,
    inputSearch: '',
    posts: [],
    pagination: {
      limit: BLOG_PAGINATION_LIMIT
    }
  }),
  head: () => ({
    title: `Blog | ${AUTHOR_NAME}`,
    meta: metaGenerator('blog', {
      title: 'Blog',
      description: `A Journal about ${AUTHOR_NAME}`,
      keywords: 'blogs, posts, articles',
      image: '/assets/img/collections/default-banners/5.jpg',
      url: '/blog'
    })
  }),
  computed: {
    pg: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      const desc = document.getElementById('desc-blog');
      type(desc, 'Coding,', 100, 'Coding, work,', 100, 'Coding, work, life,', 250, 'Coding, work, life, and whatever i want.');
    }, 250);
  },
  methods: {
    onPageChange(val) {
      if (val === 1) {
        this.$router.push('/blog');
      } else {
        this.$router.push(`/blog/page/${val}`);
      }
    },
    onSearch() {
      this.posts = this.$store.getters.posts
        .filter(({ title, keywords }) => {
          const key = this.inputSearch.toLowerCase();
          title = title.toLowerCase();
          keywords = keywords.toLowerCase().replace(',', '');
          return title.includes(key) || keywords.includes(key);
        });
    }
  }
};
</script>

<style lang="scss">
#search-form {
  border-color: #5e72e4 !important;
  &::placeholder {
    color: #5e72e4;
  }
}
</style>
