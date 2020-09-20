<template>
  <div class="container">
    <h1 class="title">UNLOCK BANK</h1>
    <h2 class="w-full text-center text-6xl text-red-600 font-bold">ERROR</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    setTimeout(() => {
      this.$router.replace('/')
    }, 1500)
  },
})
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  @apply bg-gray-900;
}

.container {
  @apply w-full max-w-sm min-h-screen;
  @apply flex flex-col flex-wrap items-start;
  @apply mx-auto text-center;
}

.title {
  @apply block w-full h-16 text-white text-4xl bg-green-700;
  font-family: 'Candal', 'Quicksand', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
