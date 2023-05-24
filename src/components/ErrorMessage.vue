<template>
  <p :data-cy-component="$options.name">
    {{ message }}
  </p>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      required: true 
    },
  },
}
</script>

<style scoped>
p {
  color: darkred;
}
</style>
