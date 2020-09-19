<template>
  <div class="container">
    <h1 class="title">UNLOCK BANK</h1>
    <form
      class="w-full max-w-sm p-4 mx-auto bg-opacity-25 bg-gray-600 rounded-b-md"
    >
      <p class="p-1 text-xs text-white font-bold">
        Please input your account number and password.
      </p>
      <p class="mt-2 text-sm text-green-600 font-bold">Account Number</p>
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
      <p class="mt-2 text-sm text-green-600 font-bold">PASSWORD</p>
      <div class="w-full flex justify-center items-center">
        <input
          v-model="password"
          class="form-input p-0 block w-40 text-4xl text-green-100 bg-black text-center tracking-widest"
          type="text"
          maxlength="4"
          placeholder="0000"
        />
      </div>
      <div class="w-full flex flex-wrap justify-center items-center">
        <input
          v-if="!locked"
          class="mt-6 mx-auto p-0 block w-40 rounded-md text-white text-2xl bg-green-700 text-center"
          type="submit"
          value="Enter"
          @click.stop.prevent="enter()"
        />
        <input
          v-else
          class="mt-6 mx-auto p-0 block w-40 rounded-md text-white text-2xl bg-red-700 text-center"
          type="submit"
          value="LOCKED"
          disabled
          @click.stop.prevent
        />
        <template v-if="errors.length">
          <p
            v-for="e in errors"
            :key="e"
            class="w-full text-center text-xs text-red-700 font-bold"
          >
            {{ e }}
          </p>
        </template>
        <p
          v-if="incorrectCount > 0"
          class="w-full text-center text-red-700 font-bold"
        >
          {{ incorrectLabel }}
        </p>
      </div>
    </form>
    <div
      class="flex flex-wrap w-full max-w-sm pt-4 px-4 mt-4 bg-opacity-25 bg-orange-300 rounded-md"
    >
      <div class="w-full">
        <h2 class="explain-title">UNLOCK BANKへようこそ！</h2>
        <p class="mt-2 text-white text-sm text-left">
          当行では<span class="font-bold text-red-500">厳重なセキュリティ</span
          >のもと、お客さまの資産を管理させていただいております。
        </p>
        <ul class="mt-1 px-4 list-disc text-white text-sm text-left">
          <li>口座番号と暗証番号による認証システム</li>
          <li>暗証番号を3回間違えるとロックされる徹底したセキュリティ</li>
        </ul>
      </div>
      <div class="relative w-1/2 transform -translate-x-10">
        <img class="object-contain" src="/reception_man.png" alt="説明する男" />
      </div>
      <div class="w-1/2">
        <p class="mt-2 text-white text-sm text-left">
          お陰様で口座数は<span class="text-lg font-bold text-orange-500"
            >100,000,000口</span
          >に到達し、新規開設の受付は現在停止しております。
        </p>
        <p class="mt-2 text-white text-sm text-left">
          安心してご利用ください。
        </p>
      </div>
    </div>
    <p class="w-full text-xs text-white">※ という設定のパズルゲームです。</p>
    <p class="w-full mt-2 text-sm text-white font-bold">
      ©︎
      <a class="text-blue-500 underline" href="https://twitter.com/_kinmi"
        >kinmi</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Seedrandom } from '../types/seedrandom'
const seedrandom = require('seedrandom') as Seedrandom

export default Vue.extend({
  data(): {
    accountNumbers: number[]
    password: string | undefined
    beforeAccountNumber: string
    incorrectCount: number
    errors: string[]
    locked: boolean
  } {
    return {
      accountNumbers: Array(8).fill(0),
      password: undefined,
      beforeAccountNumber: '',
      incorrectCount: 0,
      errors: [],
      locked: false,
    }
  },
  computed: {
    faCaretUp() {
      return faCaretUp
    },
    faCaretDown() {
      return faCaretDown
    },
    incorrectLabel(): string {
      return [...Array(3).keys()]
        .map((cnt) => {
          return cnt + 1 <= this.incorrectCount ? '× ' : '- '
        })
        .join('')
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
      if (this.accountNumbers[idx] <= 0) {
        this.accountNumbers.splice(idx, 1, 9)
      } else {
        this.accountNumbers.splice(idx, 1, this.accountNumbers[idx] - 1)
      }
    },
    enter(): void {
      this.errors.splice(0, this.errors.length)
      if (!this.formValidate()) return
      if (this.beforeAccountNumber !== this.accountNumbers.join('')) {
        this.incorrectCount = 0
      }

      // eslint-disable-next-line no-console
      console.log('account number', this.accountNumbers.join(''))
      // eslint-disable-next-line no-console
      console.log('password', this.getPassword(this.accountNumbers.join('')))
      if (this.getPassword(this.accountNumbers.join('')) !== this.password) {
        this.beforeAccountNumber = this.accountNumbers.join('')
        this.incorrectCount = this.incorrectCount + 1
        if (this.incorrectCount >= 3) {
          this.locked = true
        } else {
          this.errors.push('Password is incorrect.')
        }
      }
    },
    formValidate(): boolean {
      // check account numbers
      if (
        this.accountNumbers.length !== 8 ||
        this.accountNumbers.find((n) => !/[0-9]{1}$/.test(String(n))) !==
          undefined
      ) {
        this.errors.push('Please input Account Number.')
      }

      // check password
      if (!this.password || this.password.length !== 4) {
        this.errors.push('Please input Password.')
      }

      return !this.errors.length
    },
    getPassword(seed: String | Number): String {
      const seedkey = seedrandom('yatottekudasai')
      const rng = seedrandom(`${seedkey}${seed}`)
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

.links {
  padding-top: 15px;
}

.hyphen {
  @apply my-auto text-white text-2xl font-bold;
}

.explain-title {
  @apply text-2xl font-bold text-gray-200;
  background: linear-gradient(transparent 60%, theme('colors.orange.600') 60%);
}
</style>
