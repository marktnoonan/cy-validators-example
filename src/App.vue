<template>
  <HeaderBar />
  <main>
    <p v-if="loading">Pretending to load...</p>
    <ErrorMessage v-else-if="error" message="No query params, please!" />
    <div v-else>
      <img alt="Vue logo" src="./assets/logo.png" />
      <router-view title="Welcome to Your Vue.js App"/>
      <HelloWorld />
    </div>
  </main>
</template>

<script>
import ErrorMessage from './components/ErrorMessage.vue'
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'App',
  components: {
    ErrorMessage,
    HeaderBar
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
    console.log(window.location)
    if (window.location.search) {
      this.error = true
    }
  }
}
</script>

<style>
@import "./global.css";

#app {
  margin: 0;
}

main {
  padding-top: 20px;
}
</style>
