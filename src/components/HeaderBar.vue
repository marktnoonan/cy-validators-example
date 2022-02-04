<template>
  <nav :data-cy-component="$options.name" class="nav">
  <img class="logo" alt="Vue logo" src="../assets/logo.png" height="40" width="40" />
    <HelloList
      :items="[{
        name: 'Home',
        href: '/'
      },
      {
        name: 'Some other place',
        href: '/other-place'
      }
      ]"
    />
  </nav>
</template>

<script>
import HelloList from "./HelloList.vue"
export default {
  name: 'HeaderBar',
  components: {
    HelloList,
  },
  props: {
    content: Object
  },
}
</script>

<style scoped>
.nav {
  padding: 0 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  display: flex;
  align-items: center;
}

.nav >>> [data-cy-component=HelloListItem] a {
  text-decoration: none;
  font-weight: bold;
}

.logo {
  margin-right: 20px;
}

</style>

