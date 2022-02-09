<template>
<div class="nav-layout">  
  <nav :data-cy-component="$options.name" class="nav">
    <img
      class="logo"
      alt="Vue logo"
      src="../assets/logo.png"
      height="40"
      width="40"
    />
    <HelloList
      :items="[
        {
          name: 'Home',
          href: '#/',
          active: $route.path === '/',
        },
        {
          name: 'Some other place',
          href: '#/other-place',
          active: $route.path === '/other-place',
        },
      ]"
    />
  </nav>
 <LoginForm />
</div>

</template>

<script>
import HelloList from './HelloList.vue'
import LoginForm from './LoginForm.vue'
export default {
  name: 'HeaderBar',
  components: {
    HelloList,
    LoginForm
  },
  props: {
    content: Object,
  },
}
</script>

<style scoped>

.nav-layout {
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #ddd;
}
.nav {
  display: flex;
  align-items: center;
}

.nav >>> [data-cy-component='HelloListItem'] a {
  text-decoration: none;
  font-weight: bold;
}

.logo {
  margin-right: 20px;
}
</style>
