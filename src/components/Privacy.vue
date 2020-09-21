<template>
  <div>
    <div class="outline-none">
      <div
        class="bg-gray-900 flex justify-between px-4 items-center text-gray-500 transition ease duration-500 cursor-pointer"
        @click="opened = !opened"
      >
        <div
          class="transition ease duration-500 w-full"
          :class="opened ? 'text-white' : ''"
        >
          <p class="text-center text-xs" :class="opened ? '' : 'underline'">
            プライバシーポリシー
          </p>
        </div>
      </div>
      <div
        class="bg-gray-800 px-4 overflow-hidden transition-all ease duration-500"
        style="transition-property: height"
        :class="opened ? 'h-60' : 'h-0'"
      >
        <p class="p-2 text-sm text-gray-400 text-justify">
          当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p class="p-2 text-sm text-gray-400 text-justify">
          この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
          <a
            target="_blank"
            class="text-blue-500 underline"
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            >Googleアナリティクスサービス利用規約<fa :icon="faExternalLinkAlt"
          /></a>
          のページや
          <a
            target="_blank"
            class="text-blue-500 underline"
            href="https://policies.google.com/?hl=ja"
            >Googleポリシーと規約<fa :icon="faExternalLinkAlt"
          /></a>
          ページをご覧ください。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  data() {
    return {
      opened: false,
    }
  },
  computed: {
    faExternalLinkAlt() {
      return faExternalLinkAlt
    },
  },
})
</script>
