<template>
  <div :data-cy-component="$options.name">
    <form class="login" @submit.prevent="handleLogin" v-if="!isLoggedIn" autocomplete="off">
      <label for="username">Name</label>
      <input type="text" id="username" v-model="username" />
      <button>Log In</button>
    </form>
    <div v-else>
      Hi {{username}}! 
      <button @click="handleLogout">Log Out</button>
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
    },
    handleLogout() {
      this.isLoggedIn = false
      this.username = ''
    }
  },
}
</script>

<style scoped>
.login {
  display: flex;
  gap: 8px;
}
</style>
