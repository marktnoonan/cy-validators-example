<template>
  <li v-if="content">
    <a :href="content.href" target="_blank" rel="noopener">{{ content.name }}</a>
  </li>
</template>

<script>
export default {
  name: 'HelloListItem',
  props: {
    content: Object
  },
}
</script>

