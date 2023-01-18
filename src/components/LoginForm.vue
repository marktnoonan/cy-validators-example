<template>
  <div :data-cy-component="$options.name">
    <form class="login" @submit.prevent="handleLogin" v-if="!isLoggedIn" autocomplete="off">
      <label for="username">Name</label>
      <input type="text" id="username" v-model="username" />
      <HappyButton text="Log In" />
    </form>
    <div v-else>
      Hi {{username}}! 
      <HappyButton @click="handleLogout" text="Log Out" />
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
