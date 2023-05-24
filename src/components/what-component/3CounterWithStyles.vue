<template>
  <div class="counter">
    <button
      aria-label="Increase count"
      @click="count++"
    >
      +
    </button>
    <p>{{ count }}</p>
  </div>
  <div class="button-interferer" />
</template>
<script setup>
import {ref } from 'vue'

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

.button-interferer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

</style>