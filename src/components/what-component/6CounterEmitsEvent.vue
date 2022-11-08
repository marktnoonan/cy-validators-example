<template>
<div class="counter">
    <button @click="handleClick" aria-label="Increase count">+</button>
    <ParagraphWithSlotAndProp
    size="large"
    >
        {{count}}
    </ParagraphWithSlotAndProp>
</div>

</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onErrorCaptured, defineEmits } from 'vue';
import {ref} from 'vue'
import ParagraphWithSlotAndProp from './4ParagraphWithSlotAndProp.vue';

const emit = defineEmits(['countedToFive'])

const count = ref(0)

const handleClick = () => {
    count.value++
    if (count.value === 5) {
        emit('countedToFive')
    }
    if (count.value === 11) {
        throw new Error('This one goes up to 11!')
    }
}

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