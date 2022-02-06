<template>
    <div :data-cy-component="$options.name">
        <!-- based on https://adrianroselli.com/2020/05/disclosure-widgets.html -->
        <button
            type="button"
            :aria-expanded="expanded"
            @click="toggleDisclosure"
            :aria-controls="id"
        >
            <span>
                <svg viewBox="0 0 80 80" focusable="false">
                    <path d="M70.3 13.8L40 66.3 9.7 13.8z" />
                </svg>
            </span>
            <slot name="title">Untitled Disclosure 😱</slot>
        </button>
        <div :id="id" class="disclosee">
            <p>
                <slot>Panel with no details 😬</slot>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DisclosureWidget',
    data() {
        return {
            id: 'widget-' + Math.floor(100000 + Math.random() * 900000),
            expanded: false
        }
    },
    methods: {
        toggleDisclosure() {
            this.expanded = !this.expanded
        }
    }
}
</script>

<style scoped>
button[aria-expanded="false"] + div {
    display: none;
}

button[aria-expanded] {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    gap: 1rem;
    border-color: transparent;
    font: inherit;
    border-radius: 6px;
}

button[aria-expanded] span {
    display: inline-block;
    font-size: 60%;
    color: #000;
    background-color: #42b983;
    padding: 0.3em 0.2em 0 0.2em;
    border: 0.2em solid #42b983;
    border-radius: 50%;
    line-height: 1;
    text-align: center;
    text-indent: 0;
    transform: rotate(270deg);
}

button[aria-expanded] svg {
    width: 1.25em;
    height: 1.25em;
    fill: #fff;
    transition: transform 0.25s ease-in;
    transform-origin: center 45%;
}

button[aria-expanded]:hover,
button[aria-expanded]:focus {
    outline: none;
    border-color: #666;
}

button[aria-expanded]:hover span,
button[aria-expanded]:focus span {
    background-color: #fff;
    outline: none;
}

button[aria-expanded]:hover svg,
button[aria-expanded]:focus svg {
    fill: #42b983;
}

/* Lean on programmatic state for styling */
button[aria-expanded="true"] svg {
    transform: rotate(90deg);
}

.disclosee {
    text-align: left;
}
</style>