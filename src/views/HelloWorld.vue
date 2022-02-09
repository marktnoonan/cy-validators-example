<template>
  <div class="hello" :data-cy-component="$options.name">
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
import HelloList from '../components/HelloList.vue'
import HelloIntro from '../components/HelloIntro.vue'
import { listItems } from '../components/list-items'

export default {
  name: 'HelloWorld',
  components: { HelloList, HelloIntro },
  props: {
    title: String,
  },
  data() {
    return {
      listItems: listItems,
    }
  },
}
</script>
