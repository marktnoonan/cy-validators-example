<template>
  <div :data-cy-component="$options.name">
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>

    <details>
      <summary>For some interactivity, check this out</summary>I am a details element being awesome.
    </details>
  </div>
</template>

<script>
export default {
  name: 'HelloIntro',
}
</script>
