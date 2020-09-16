<template>
  <div class="container">
    <h1 class="title">UNLOCK BANK</h1>
    <form class="flex justify-between w-full max-w-sm p-4">
      <input
        class="form-input appearance-none m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        type="number"
        placeholder="0"
      />
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
      <p class="align-middle leading-loose m-0 text-white text-2xl font-bold">
        -
      </p>
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
      <input
        class="form-input m-0 block w-10 text-2xl text-black bg-white shadow-inner"
        maxlength="1"
        placeholder="0"
      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Seedrandom } from '../types/seedrandom'
const seedrandom = require('seedrandom') as Seedrandom

export default Vue.extend({
  mounted() {
    console.log(this.getPassword('hello'))
    console.log(this.getPassword('hello'))
  },
  methods: {
    getPassword(seed: String | Number): String {
      const rng = seedrandom(seed)
      return String(Math.round(rng() * 100)).padStart(4, '0')
    },
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  @apply min-h-screen flex flex-wrap justify-around items-start text-center mx-auto;
}

.title {
  @apply block text-yellow-200 text-6xl;
  font-family: 'Candal', 'Quicksand', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  /* display: block;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px; */
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
