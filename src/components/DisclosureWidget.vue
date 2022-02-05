<template>
    <details :data-cy-component="$options.name">
        <summary><slot name="title">Untitled Disclosure 😱</slot></summary>
        <slot>Details with no details 😬</slot>
    </details>
</template>

<script>
export default {
    name: 'DisclosureWidget'
}
</script>