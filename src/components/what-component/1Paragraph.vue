<template>
  <p>Hello I'm a paragraph!</p>
  <input type="checkbox" disabled value>
</template>
<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onErrorCaptured,
} from 'vue'

console.log('Hi from setup!')

onBeforeMount(() => {
  console.log('before mount')
})

onMounted(() => {
  console.log('mounted!')
})
onBeforeUnmount(() => {
  console.log('before unmount')
})
onBeforeUpdate(() => {
  console.log('before update')
})

onErrorCaptured(() => {
  console.log('error, panic??')
})
</script>
