<template>
    <div :data-cy-component="$options.name">
        <h1>Some Other Place</h1>
        <DisclosureWidget>
            <template #title>
                <h2>Outer Disclosure Title</h2>Outer body
            </template>

            <DisclosureWidget>
                <template #title>
                    <h3>Inner Disclosure Title</h3>Inner Disclosure Body
                </template>
            </DisclosureWidget>
        </DisclosureWidget>
    </div>
</template>

<script>

import DisclosureWidget from "../components/DisclosureWidget.vue"

export default {
    name: "OtherPlace",
    components: {
        DisclosureWidget
    }
}
</script>