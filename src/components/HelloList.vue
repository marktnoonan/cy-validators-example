<template>
  <ul v-if="items?.length" data-cy-component="HelloList">
    <HelloListItem v-for="item in items" :key="item.name" :content="item" />
  </ul>
</template>

<script>
import HelloListItem from "./HelloListItem"
export default {
  name: 'HelloList',
  props: {
    items: Array
  },
  components: {
    HelloListItem
  }
}
</script>
