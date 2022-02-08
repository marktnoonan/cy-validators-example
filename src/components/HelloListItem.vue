<template>
  <li
    v-if="content"
    :data-cy-component="$options.name"
    :data-cy="content.name"
    :class="content.active ? 'active' : ''"
  >
    <a :href="content.href">
      {{ content.name }}
    </a>
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

<style scoped>
.active {
  text-decoration: underline;
}
</style>
