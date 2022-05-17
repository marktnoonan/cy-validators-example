<template>
  <p>
   ~{{ message }}~
  </p>
</template>

<script>
export default {
  name: 'FancyMessage',
  props: {
    message: {
        type: String,
        default: 'no message'
    },
  },
}
</script>

<style scoped>
p {
    color: rebeccapurple;
    font-size: 3em;
}
</style>
