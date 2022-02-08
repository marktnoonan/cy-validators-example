<template>
  <div :data-cy-component="$options.name">
    <form v-if="!isLoggedIn" @submit.prevent="handleLogin">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" />
      <button>Log In</button>
    </form>
    <div v-else>
      Hi {{name}}!
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      isLoggedIn: false,
      name: ''
    }
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true
    }
  }
}
</script>

<style scoped>
</style>