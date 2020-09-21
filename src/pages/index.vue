<template>
  <div class="container">
    <h1 class="title">UNLOCK BANK</h1>
    <form
      class="w-full max-w-sm px-2 py-4 select-none bg-opacity-25 bg-gray-600 rounded-b-md"
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
              :id="`up${8 - idx}`"
              :icon="faCaretUp"
              class="text-lg text-green-200"
              @click="upNumber(idx)"
            />
            <div class="relative m-0 block w-10" style="height: 3.4rem">
              <input
                :id="`digit${8 - idx}`"
                v-model="accountNumbers[idx]"
                class="form-input number-input absolute top-0 left-0 m-0 block w-10 text-2xl text-black bg-white"
                min="0"
                max="9"
                maxlength="1"
                type="number"
                placeholder="0"
                :tabindex="idx + 1"
              />

              <p
                class="absolute top-0 left-0 m-0 block w-10 text-2xl text-black bg-white border-opacity-100 border rounded py-2 px-3 pointer-events-none cursor-text overflow-hidden transform -translate-x-px"
                style="height: 3.4rem"
              >
                <transition :name="fadeName" mode="out-in">
                  <span
                    :key="accountNumbers[idx]"
                    class="block w-full h-full"
                    >{{ accountNumbers[idx] }}</span
                  >
                </transition>
              </p>
            </div>
            <fa
              :id="`down${8 - idx}`"
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
          id="password"
          v-model="password"
          class="form-input p-0 block w-40 text-4xl text-gray-200 bg-black text-center tracking-widest"
          type="text"
          maxlength="4"
          placeholder="0000"
        />
      </div>
      <div class="w-full flex flex-wrap justify-center items-center">
        <input
          v-if="!locked"
          id="submit"
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
      class="relative w-full max-w-sm mt-4 bg-opacity-25 bg-orange-300 rounded-md"
      style="height: 22rem"
    >
      <div class="absolute top-0 left-0 w-full pt-4 px-4">
        <h2 class="explain-title">UNLOCK BANKへようこそ！</h2>
        <p class="mt-2 text-white text-sm text-left">
          当行では<span class="font-bold text-red-600">厳重なセキュリティ</span
          >のもと、お客さまの資産を管理させていただいております。
        </p>
        <ul class="mt-1 px-4 list-disc text-white text-sm text-left">
          <li>口座番号と暗証番号による認証システム</li>
          <li>
            暗証番号を<span class="marker text-gray-400"
              >3回間違えるとロック</span
            >される、徹底したセキュリティ
          </li>
        </ul>
      </div>
      <div
        class="absolute bottom-0 left-0 w-1/2 mt-2 transform -translate-x-10"
      >
        <img class="object-contain" src="/reception_man.png" alt="説明する男" />
      </div>
      <div class="absolute bottom-0 right-0 w-3/5 h-48 pr-2">
        <p class="mt-2 text-white text-sm text-left">お陰様で口座数は</p>
        <p class="text-2xl font-bold text-orange-500">100,000,000口</p>
        <p class="mt-2 text-white text-sm text-left">
          に到達し、新規口座開設の受付は現在停止しております。
        </p>
        <p class="mt-2 text-white text-lg text-left font-bold">
          安心してご利用ください。
        </p>
      </div>
    </div>
    <p class="w-full text-xs text-gray-600">※ という設定のパズルゲームです。</p>
    <p class="w-full px-4 text-xs text-gray-600">
      サーバー通信を用いた制御は行っていないので負荷等は気にせず、お好きにUNLOCKしてください。
    </p>
    <div
      class="w-full mt-2 py-3 flex flex-wrap justify-center items-center bg-blue-700 bg-opacity-25 rounded-md"
    >
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        class="twitter-share-button mx-auto"
        data-text="ハッカー専用パズルゲーム「UNLOCK BANK」"
        data-hashtags="UNLOCK_BANK"
        data-size="default"
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
      <a
        target="_blank"
        rel="nofollow"
        class="w-full mt-1 text-sm text-blue-600 font-bold underline"
        href="https://twitter.com/search?q=%23UNLOCK_BANK&src=typed_query"
        >#UNLOCK_BANK</a
      >
    </div>
    <privacy class="mt-5" />
    <p class="w-full text-sm text-white font-bold">
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
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  data(): {
    accountNumbers: number[]
    password: string | undefined
    beforeAccountNumber: string
    incorrectCount: number
    errors: string[]
    locked: boolean
    fadeName: string
  } {
    return {
      accountNumbers: Array(8).fill(0),
      password: undefined,
      beforeAccountNumber: '',
      incorrectCount: 0,
      errors: [],
      locked: false,
      fadeName: '',
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
    accountNumbersCopy(): number[] {
      return JSON.parse(JSON.stringify(this.accountNumbers))
    },
  },
  watch: {
    accountNumbersCopy(n: number[], o: number[]) {
      n.forEach((num, idx) => {
        if (num && num !== o[idx]) {
          const splitNum = String(num).split('')
          if (isNaN(splitNum[0] as any)) {
            this.accountNumbers.splice(idx, 1, Number(splitNum[1]))
          } else if (isNaN(splitNum[1] as any)) {
            this.accountNumbers.splice(idx, 1, Number(splitNum[0]))
          } else if (splitNum[0] !== splitNum[1]) {
            this.accountNumbers.splice(
              idx,
              1,
              splitNum[0] !== String(o[idx])
                ? Number(splitNum[0])
                : Number(splitNum[1])
            )
          } else {
            this.accountNumbers.splice(idx, 1, Number(splitNum[0]))
          }
        }
      })
    },
  },
  methods: {
    upNumber(idx: number): void {
      this.fadeName = 'up-down-fade'
      if (this.accountNumbers[idx] >= 9) {
        this.accountNumbers.splice(idx, 1, 0)
      } else {
        this.accountNumbers.splice(idx, 1, this.accountNumbers[idx] + 1)
      }
      setTimeout(() => {
        this.fadeName = ''
      }, 400)
    },
    downNumber(idx: number): void {
      this.fadeName = 'down-up-fade'
      if (this.accountNumbers[idx] <= 0) {
        this.accountNumbers.splice(idx, 1, 9)
      } else {
        this.accountNumbers.splice(idx, 1, this.accountNumbers[idx] - 1)
      }
      setTimeout(() => {
        this.fadeName = ''
      }, 400)
    },
    enter(): void {
      this.errors.splice(0, this.errors.length)
      if (!this.formValidate()) return
      if (this.beforeAccountNumber !== this.accountNumbers.join('')) {
        this.incorrectCount = 0
      }

      if (
        this.$auth.authenticated(this.accountNumbers.join(''), this.password!)
      ) {
        // passed
        this.$auth.accountNumber = this.accountNumbers.join('')
        this.$router.push('/unlocked')
      } else {
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
  },
})
</script>

<style>
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.number-input {
  -moz-appearance: textfield;
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
.marker {
  @apply font-bold;
  background: linear-gradient(transparent 60%, theme('colors.red.600') 60%);
}

.up-down-fade-leave-active,
.down-up-fade-leave-active {
  transition: transform 0.3s ease;
}

.up-down-fade-enter-active,
.down-up-fade-enter-active {
  transition: transform 0.15s ease;
}

.up-down-fade-leave-to,
.down-up-fade-enter {
  transform: translateY(-35px);
}
.up-down-fade-enter,
.down-up-fade-leave-to {
  transform: translateY(35px);
}
</style>
