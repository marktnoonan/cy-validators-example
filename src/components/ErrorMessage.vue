<template>
  <div :data-cy-component="$options.name">
    <p>{{ message }}</p>

    <p>Custom thing: {{ customThing }}</p>

    <button @click="customThing = 'good'">Make custom thing good</button>
    <button @click="customThing = 'bad'">Make custom thing bad</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: String
  },
  data() {
    return {
      customThing: ''
    }
  }
}
</script>

<style scoped>
p {
  color: darkred;
}
</style>