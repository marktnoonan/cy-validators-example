<template>
  <p v-if="loading">Pretending to load...</p>
  <ErrorMessage v-else-if="error" message="No query params, please!" />
  <div v-else>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld title="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ErrorMessage from './components/ErrorMessage.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ErrorMessage
  },
  data() {
    return {
      loading: true,
      error: false
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    if (window.location.search) {
      this.error = true
    }
  }
}
</script>

<style>
@import "./global.css";
</style>
