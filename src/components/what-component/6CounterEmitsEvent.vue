<template>
  <div class="counter">
    <button
      aria-label="Increase count"
      @click="handleClick"
    >
      +
    </button>
    <ParagraphWithSlotAndProp size="large">
      {{ count }}
    </ParagraphWithSlotAndProp>
  </div>
</template>
<script setup>
import { ref } from 'vue'
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

</script>

<style scoped>
button {
    background-color: aqua;
    border: 2px solid salmon;
    padding: 0 40px;
    font-size: 6rem;
}

.counter {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
    font-size: 2rem;
}
</style>