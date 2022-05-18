<template>
  <h1>~{{content}}~</h1>
</template>

<script>
export default {
  name: 'FancyText',
  props: {
    content: {
      type: String,
      default: 'default contentdf'
    }
  }
}
</script>

<style scoped>

</style>
