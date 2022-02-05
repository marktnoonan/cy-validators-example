<template>
    <details>
        <summary><slot name="title">Untitled Disclosure 😱</slot></summary>
        <slot>Details with no details 😬</slot>
    </details>
</template>

<script>
export default {
    name: 'DisclosureParent'
}
</script>