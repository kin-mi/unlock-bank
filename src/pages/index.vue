<template>
  <div class="container">
    <h1 class="title">UNLOCK BANK</h1>
    <form class="w-full max-w-sm p-4 bg-opacity-25 bg-gray-600 rounded-md">
      <p class="p-1 text-xs text-white font-bold">
        Please input your account number and password.
      </p>
      <p class="mt-2 text-sm text-red-500 font-bold">Account Number</p>
      <div class="w-full flex justify-between items-center">
        <template v-for="(num, idx) in accountNumbers">
          <p v-if="idx === 4" :key="'hyphen' + idx" class="hyphen">-</p>
          <div :key="idx" class="flex flex-col items-center">
            <fa
              :icon="faCaretUp"
              class="text-lg text-green-200"
              @click="upNumber(idx)"
            />
            <input
              v-model="accountNumbers[idx]"
              class="form-input number-input m-0 block w-10 text-2xl text-black bg-white"
              min="0"
              max="9"
              maxlength="1"
              type="number"
              placeholder="0"
              :tabindex="idx + 1"
            />
            <fa
              :icon="faCaretDown"
              class="text-lg text-green-200"
              @click="downNumber(idx)"
            />
          </div>
        </template>
      </div>
      <p class="mt-2 text-sm text-red-500 font-bold">PASSWORD</p>
      <div class="w-full flex justify-center items-center">
        <input
          v-model="password"
          class="form-input p-0 block w-40 text-4xl text-green-100 bg-black text-center tracking-widest"
          type="text"
          maxlength="4"
          placeholder="0000"
        />
      </div>
      <div class="w-full flex justify-center items-center">
        <input
          class="mt-6 p-0 block w-40 rounded-md text-white text-2xl bg-green-700 text-center"
          type="submit"
          value="Enter"
          @click.stop.prevent="enter()"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Seedrandom } from '../types/seedrandom'
const seedrandom = require('seedrandom') as Seedrandom

export default Vue.extend({
  data(): { accountNumbers: number[]; password: string | undefined } {
    return {
      accountNumbers: Array(8).fill(0) as number[],
      password: undefined,
    }
  },
  computed: {
    faCaretUp() {
      return faCaretUp
    },
    faCaretDown() {
      return faCaretDown
    },
  },
  methods: {
    upNumber(idx: number): void {
      if (this.accountNumbers[idx] >= 9) {
        this.accountNumbers.splice(idx, 1, 0)
      } else {
        this.accountNumbers.splice(idx, 1, this.accountNumbers[idx] + 1)
      }
    },
    downNumber(idx: number): void {
      if (this.accountNumbers[idx] >= 0) {
        this.accountNumbers.splice(idx, 1, 9)
      } else {
        this.accountNumbers.splice(idx, 1, this.accountNumbers[idx] - 1)
      }
    },
    enter(): void {
      // eslint-disable-next-line no-console
      console.log('account number', this.accountNumbers.join(''))
      // eslint-disable-next-line no-console
      console.log('password', this.getPassword(this.accountNumbers.join('')))
    },
    getPassword(seed: String | Number): String {
      const rng = seedrandom(seed)
      return String(Math.round(rng() * 10000)).padStart(4, '0')
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
  @apply w-full max-w-sm min-h-screen flex flex-wrap justify-end items-start mx-auto text-center;
}

.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.number-input {
  -moz-appearance: textfield;
}

.title {
  @apply block w-full h-16 text-white text-4xl bg-green-700;
  font-family: 'Candal', 'Quicksand', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  /* text-shadow: white 2px 0px, white -2px 0px, white 0px -2px, white 0px 2px,
    white 2px 2px, white -2px 2px, white 2px -2px, white -2px -2px,
    white 1px 2px, white -1px 2px, white 1px -2px, white -1px -2px,
    white 2px 1px, white -2px 1px, white 2px -1px, white -2px -1px; */
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

.hyphen {
  @apply my-auto text-white text-2xl font-bold;
}
</style>
