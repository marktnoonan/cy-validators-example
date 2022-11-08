<template>
  <CounterEmitsEvent
    v-if="state !== 'tufnel'"
    @counted-to-five="handleCountedToFive"
  />

  <div v-if="starWarsPerson">
    <ul>
      <li>Name: {{ starWarsPerson.name }}</li>
    </ul>
  </div>
  <div v-if="loading">Loading...</div>
</template>
<script setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onErrorCaptured,
  ref,
} from 'vue'
import CounterEmitsEvent from './6CounterEmitsEvent.vue'

const starWarsPerson = ref()
const state = ref('initial')

const handleCountedToFive = async () => {
  state.value = 'loading'
  fetch('https://swapi.dev/api/people/1/')
    .then(function (res) {
      return res.json()
    })
    .then((data) => {
      state.value = 'initial'
      starWarsPerson.value = data
    })
}

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
  console.log(
    "error captured in child component, will return false so the application doesn't throw"
  )
  starWarsPerson.value = { name: 'Nigel Tufnel' }
  state.value = 'tufnel'
  return false
})
</script>
