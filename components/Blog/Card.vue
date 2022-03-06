<template>
  <Card class="border-0 h-100" hover shadow body-classes="pt-0 px-0" footer-classes="pt-0">
    <img
      style="width: 100%; height: 200px; object-fit: cover"
      class="card-pic card-img-top"
      :data-src="content.image"
      :alt="content.title"
    >
    <div class="px-3 pt-4">
      <h6 class="text-primary mb-1">
        {{ content.title }}
        <Badge type="primary" class="text-uppercase ml-2">
          {{ content.category }}
        </Badge>
      </h6>
      <div class="text-muted" style="font-size: 9pt">
        <span>
          {{ formatPostDate(content.date) }}
        </span>
        &nbsp;•&nbsp;
        <span>
          {{ content.readingtime }}
        </span>
      </div>
      <p class="description mt-3">
        {{ wrapText(content.description, 300) }}
      </p>
      <div>
        <Badge
          v-for="(tag, iTag) in content.tags"
          :key="iTag"
          type="info"
          rounded
        >
          #{{ tag }}
        </Badge>
      </div>
    </div>
    <template #footer>
      <nuxt-link :to="`/blog/${content.slug}`">
        <Button type="primary" class="d-inline-flex mt-4" style="float: right">
          <client-only>
            <ios-book-icon w="20px" h="20px" />
          </client-only>
          &nbsp;Read
        </Button>
      </nuxt-link>
    </template>
  </Card>
</template>

<script>
import IosBookIcon from 'vue-ionicons/dist/ios-book.vue';
import Card from '~/components/Argon/Card';
import Badge from '~/components/Argon/Badge';
import Button from '~/components/Argon/Button';
import { wrapText, formatPostDate } from '~/utils/helpers';

export default {
  components: {
    Card,
    Badge,
    Button,
    IosBookIcon
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    formatPostDate,
    wrapText
  })
};
</script>
