<template>
  <div :data-cy-component="$options.name">
    <form v-if="!isLoggedIn" class="form" @submit.prevent="handleLogin">
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username">
      <button>Log In</button>
    </form>
    <div v-else>
      Hi {{username}}!
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      isLoggedIn: false,
      username: ''
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
.form {
  display: flex;
  gap: 8px;
}
</style>
