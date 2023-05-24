<template>
  <div :data-cy-component="$options.name">
    <form
      v-if="!isLoggedIn"
      class="login"
      autocomplete="off"
      @submit.prevent="handleLogin"
    >
      <label for="username">Name</label>
      <input
        id="username"
        v-model="username"
        type="text"
      >
      <HappyButton text="Log In" />
    </form>
    <div v-else>
      Hi {{ username }}! 
      <HappyButton
        text="Log Out"
        @click="handleLogout"
      />
    </div>
  </div>
</template>

<script>
import HappyButton from './HappyButton.vue'
export default {
  name: 'LoginForm',
  components: {HappyButton},
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
