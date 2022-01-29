<template>
  <div class="hello" data-cy-component="HelloWorld">
    <h1>{{ title }}</h1>
    <HelloIntro />
    <h2>Installed CLI Plugins</h2>
    <HelloList :items="listItems.CLI" />
    <h2>Essential Links</h2>
    <HelloList :items="listItems.essentialLinks" />
    <h2>Ecosystem</h2>
    <HelloList :items="listItems.ecosystem" />
    <h2>An empty list</h2>
    <HelloList data-cy="no-content-list" :items="[]" />
  </div>
</template>

<script>
import HelloList from "./HelloList.vue"
import HelloIntro from "./HelloIntro.vue"
import { listItems } from "./list-items"

export default {
  name: 'HelloWorld',
  components: { HelloList, HelloIntro },
  props: {
    title: String
  },
  data() {
    return {
      listItems: listItems
    }
  }
}
</script>
