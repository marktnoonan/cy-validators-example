<template>
  <button>
    {{ props.text }} 😀
  </button>
</template>

<script setup>

// eslint-disable-next-line no-undef
const props = defineProps({
  text: String,
})

</script>