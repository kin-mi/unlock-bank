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
      <p class="mt-4 mx-auto text-center text-xl text-green-500 font-bold">
        BALANCE
      </p>
      <p id="balance" class="mx-auto text-center text-xl text-white">
        <span class="px-4 py-1 bg-gray-800 rounded-lg">
          ¥{{ balance.toLocaleString() }}
        </span>
      </p>
      <div class="w-full mt-2 flex flex-wrap justify-center items-center">
        <p class="w-full mt-4 mb-2 text-center text-sm text-red-500 font-bold">
          ▼ 口座番号と残高をTwitterでシェア ▼
        </p>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          class="twitter-share-button"
          :data-text="`UNLOCKED!!
口座番号: ${$auth.accountNumber.replace(/(\d)(?=(\d\d\d\d)+(?!\d))/g, '$1-')}
預金残高: ¥${balance.toLocaleString()}

ハッカー専用パズルゲーム「UNLOCK BANK」`"
          data-hashtags="UNLOCK_BANK"
          data-size="large"
          data-url="https://unlock-bank.vercel.app/"
          data-lang="ja"
          >Tweet</a
        >
        <component
          :is="'script'"
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        />
      </div>
    </div>

    <p class="w-full mt-4 text-sm text-white font-bold">
      ©︎
      <a
        target="_blank"
        rel="nofollow"
        class="text-blue-500 underline"
        href="https://twitter.com/_kinmi"
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
      const base = Math.round(rng() * 100000000) // 1 ~ 99,999,999
      const coef = Math.round(rng() * 10) / 10 // 0 ~ 1.0
      return Math.round(base * coef)
    },
  },
})
</script>
