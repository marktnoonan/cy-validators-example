<template>
    <p :class="props.size"><slot/></p>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, defineProps } from 'vue';

const props = defineProps({
    size: String
})

console.log('>>> Hi from setup!')

onBeforeMount(() => {
    console.log('>>> before mount')
})

onMounted(() => {
    console.log('>>> mounted!')
})
onBeforeUnmount(() => {
    console.log('>>> before unmount')
})
onBeforeUpdate(() => {
    console.log('>>> before update')
})

</script>

<style scoped>
.large {
    font-size: 3rem;
}
</style>