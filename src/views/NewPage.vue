<template>
  <div class="wrapper">
    <FancyText content="hello" />
  </div>
</template>

<script>
import FancyText from '../components/FancyText.vue'

export default {
  name: 'NewPage',
  components: {
    FancyText
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
