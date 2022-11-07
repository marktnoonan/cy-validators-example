<template>

<button @click="count++" aria-label="Increase count">+</button>

<p>{{ count }}</p>
</template>
<script setup>
import { onBeforeMount, onActivated, onBeforeUnmount, onBeforeUpdate, onMounted, onErrorCaptured } from 'vue';
import {ref} from 'vue'

const count = ref(0)



console.log('Setup!')

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
    console.log(`before update, count has changed to ${count.value}`, )
})

onErrorCaptured(() => {
    console.log('error, panic??')
})

</script>