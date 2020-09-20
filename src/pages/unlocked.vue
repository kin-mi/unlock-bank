<template>
  <div class="container">
    <h1 class="title">UNLOCK BANK</h1>
    <h2 class="w-full text-center text-6xl text-red-600 font-bold">UNLOCKED</h2>
    <div class="w-10/12 mx-auto p-4 bg-gray-500 bg-opacity-25 rounded-md">
      <p class="mx-auto text-center text-lg text-green-500 font-bold">
        Account Number
      </p>
      <p id="accountNumber" class="mx-auto text-center text-2xl text-white">
        <span class="px-4 py-1 text-xl bg-gray-800 rounded-lg">
          {{ $auth.accountNumber.replace(/(\d)(?=(\d\d\d\d)+(?!\d))/g, '$1-') }}
        </span>
      </p>
      <p class="mt-4 mx-auto text-center text-2xl text-green-500 font-bold">
        BALANCE
      </p>
      <p id="balance" class="mx-auto text-center text-xl text-white">
        <span class="px-4 py-1 bg-gray-800 rounded-lg">
          ¥{{ balance.toLocaleString() }}
        </span>
      </p>
    </div>

    <p class="w-full mt-4 text-sm text-white font-bold">
      ©︎
      <a class="text-blue-500 underline" href="https://twitter.com/_kinmi"
        >kinmi</a
      >
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Seedrandom } from '../types/seedrandom'
const seedrandom = require('seedrandom') as Seedrandom

export default Vue.extend({
  validate({ app }) {
    if (
      !app.$auth ||
      !app.$auth.accountNumber ||
      !app.$auth.password ||
      !app.$auth.authenticated(app.$auth.accountNumber, app.$auth.password)
    ) {
      return false
    } else {
      return true
    }
  },
  computed: {
    balance(): number {
      if (!this.$auth.accountNumber) return 0
      const rng = seedrandom(this.$auth.accountNumber)
      const base = rng() * 1000000
      const coef = rng() * 100
      return Math.round(Math.round(base) * (Math.round(coef) / 10))
    },
  },
})
</script>
