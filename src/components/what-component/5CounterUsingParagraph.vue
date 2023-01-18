<template>
  <div class="counter">
    <button @click="count++" aria-label="Increase count">+</button>
    <ParagraphWithSlotAndProp size="large">
      {{ count }}
    </ParagraphWithSlotAndProp>
  </div>
</template>
<script setup>
import {
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
} from 'vue'
import { ref } from 'vue'
import ParagraphWithSlotAndProp from './4ParagraphWithSlotAndProp.vue'

const count = ref(0)

console.log('Setup!')

onBeforeMount(() => {
  console.log('before mount')
})

onMounted(() => {
  console.log('mounted!')
})

onBeforeUpdate(() => {
  console.log(`before update, count has changed to ${count.value}`)
})

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
