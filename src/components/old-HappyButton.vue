<template>
  <button>{{ props.text }} 😀</button>
</template>

<script setup>

const props = defineProps({
  text: String,
})

</script>
