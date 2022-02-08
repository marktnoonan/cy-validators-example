<template>
    <div :data-cy-component="$options.name">
        <form v-if="!isLoggedIn" @submit.prevent="handleLogin">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="name" />
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
            name: '',
            isLoggedIn: false
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