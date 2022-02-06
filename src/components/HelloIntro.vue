<template>
  <div :data-cy-component="$options.name">
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>

   <DisclosureWidget>
     <template #title>For some interactivity, check this out</template>
     I am a details element being awesome.
   </DisclosureWidget>
  </div>
</template>

<script>
import DisclosureWidget from "./DisclosureWidget.vue"
export default {
  name: 'HelloIntro',
  components: {
    DisclosureWidget
  }
}
</script>
