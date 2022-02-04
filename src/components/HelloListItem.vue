<template>
  <li v-if="content" :data-cy-component="$options.name">
    <a :href="content.href">{{ content.name }}</a>
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

