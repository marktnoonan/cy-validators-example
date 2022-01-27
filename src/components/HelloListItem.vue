<template>
  <li v-if="content" data-cy-component="HelloListItem">
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

