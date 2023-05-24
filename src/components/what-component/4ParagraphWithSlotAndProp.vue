<template>
  <p :class="props.size">
    <slot />
  </p>
</template>
<script setup>

const props = defineProps({
  size: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>
.large {
  font-size: 3rem;
}
</style>
