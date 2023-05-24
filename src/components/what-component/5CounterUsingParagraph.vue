<template>
  <div class="counter">
    <button @click="count++">
      +
    </button>
    <!-- <button @click="count++" aria-label="Increase count">+</button> -->
    <ParagraphWithSlotAndProp size="large">
      {{ count }}
    </ParagraphWithSlotAndProp>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ParagraphWithSlotAndProp from './4ParagraphWithSlotAndProp.vue'

const count = ref(0)

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
