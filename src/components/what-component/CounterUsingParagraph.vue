<template>
<div class="counter">
    <button @click="count++" aria-label="Increase count">+</button>
    <ParagraphWithSlotAndProp
    size="large"
    >
        {{count}}
    </ParagraphWithSlotAndProp>
</div>

</template>
<script setup>
import { onBeforeMount, onActivated, onBeforeUnmount, onBeforeUpdate, onMounted, onErrorCaptured } from 'vue';
import {ref, watchEffect} from 'vue'
import ParagraphWithSlotAndProp from './ParagraphWithSlotAndProp.vue';

const count = ref(0)

watchEffect(() => {
    // let's introduce a bug
    if (count.value === 3) {
        count.value = 5
    }
    console.log('watchEffect', count.value)
})

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

<style scoped>

button {
    background-color: aqua;
    border: 2px solid salmon;
    padding: 0 40px;
}

.counter {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
    font-size: 2rem;
}

</style>