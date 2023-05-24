<template>
  <div
    v-if="apiError"
    class="error"
    aria-live="assertive"
  >
    ERROR!

    {{ apiError }}
  </div>

  <CounterEmitsEvent
    v-if="state !== 'tufnel'"
    @counted-to-five="handleCountedToFive"
  />

  <div v-if="starWarsPerson">
    <ul>
      <li>Name: {{ starWarsPerson.name }}</li>
    </ul>
  </div>
  <div v-if="state === 'loading'">
    Loading...
  </div>
</template>
<script setup>
import {  onErrorCaptured, ref } from 'vue'
import CounterEmitsEvent from './6CounterEmitsEvent.vue'

const starWarsPerson = ref()
const state = ref('initial')
const apiError = ref('')

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

onErrorCaptured((error) => {
  console.log(
    "error captured in child component, will return false so the application doesn't throw"
  )
  starWarsPerson.value = { name: 'Nigel Tufnel' }
  state.value = 'tufnel'
  console.log('captured error', error)
  apiError.value = error
  return false
})

</script>

<style>
.error {
    font-size: 2rem;
    color: darkred;
    text-align: center;
    max-width: 90vw;
    margin: 0 auto;
}

</style>
