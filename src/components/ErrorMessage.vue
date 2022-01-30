<template>
  <p :data-cy-component="$options.name">
    {{message}}
  </p>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
      message: String
  }
}
</script>

<style scoped>
p {
    color: darkred
}
</style>