<template>
  <div :data-cy-component="$options.name" class="wrapper">
    <h1>Some Other Place</h1>
    <FancyMessage :message="message" />
    <DisclosureWidget class="widget">
      <template #title>
        <h2>Outer Disclosure Title</h2>
      </template>
      Outer body
      <DisclosureWidget class="widget">
        <template #title>
          <h3>Inner Disclosure Title</h3>
        </template>
        Inner Disclosure Body
        <DisclosureWidget class="widget">
          <template #title>
            <h4>Inner INNER Disclosure Title</h4>
          </template>
          Inner INNER Disclosure Body
        </DisclosureWidget>
      </DisclosureWidget>
    </DisclosureWidget>
  </div>
</template>

<script>
import DisclosureWidget from '../components/DisclosureWidget.vue'
import FancyMessage from '../components/FancyMessage.vue'

export default {
  name: 'OtherPlace',
  components: {
    DisclosureWidget,
    FancyMessage,
  },
  computed: {
    message() {
      return this.$route?.query?.message || 'Some other place message'
    },
  },
}
</script>

<style scoped>
h2,
h3,
h4 {
  margin: 0;
  font-size: 1.5rem;
}

.wrapper {
  max-width: 600px;
  margin: 0 auto;
}
.widget {
  background-color: #fff;
  width: auto;
  margin: 12px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
