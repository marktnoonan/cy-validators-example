<template>
  <div
    aria-label="Increase count"
    @click="count++"
  >
    +
  </div>

  <p>{{ count }}</p>
</template>
<script setup>
import {ref} from 'vue'

const count = ref(0)

</script>