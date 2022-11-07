<template>
<CounterEmitsEvent @counted-to-five="handleCountedToFive" />

<div v-if="starWarsPerson">
    <ul>
        <li>Name: {{starWarsPerson.name}}</li>
    </ul>
</div>
<div v-if="loading">
    Loading...
</div>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onErrorCaptured, ref } from 'vue';
import CounterEmitsEvent from './CounterEmitsEvent.vue'


const starWarsPerson = ref()
const loading = ref(false)

const handleCountedToFive = async () => {
    loading.value = true
    fetch('https://swapi.dev/api/people/1/')
    .then(function (res) {
        return res.json();
      })
    .then((data) => {
        loading.value = false
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
    console.log('error, panic??')
})

</script>