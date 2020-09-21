import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { Seedrandom } from '../types/seedrandom'
const seedrandom = require('seedrandom') as Seedrandom

declare module '@nuxt/types' {
  interface Context {
    $auth: {
      accountNumber: string
      password: string
      authenticated(seed: string, password: string): boolean
    }
  }
  interface NuxtAppOptions {
    $auth: {
      accountNumber: string
      password: string
      authenticated(seed: string, password: string): boolean
    }
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      accountNumber: string
      password: string
      authenticated(seed: string, password: string): boolean
    }
  }
}

type State = {
  accountNumber: string
  password: string
}

/**********************************************
 * 認証情報プラグイン
 * @param {Context} ctx
 * @param {(key: string, value: any) => void} inject
 */
const AuthPlugin: Plugin = (_ctx, inject) => {
  /**
   * Observable properties
   */
  const state = Vue.observable({
    accountNumber: '',
    password: '',
  } as State)

  function authenticated(seed: string, password: string): boolean {
    const seedkey = seedrandom('yatottekudasai')
    const rng = seedrandom(`${seedkey}${seed}`)
    const _pass = String(Math.round(rng() * 10000)).padStart(4, '0')
    if (seed === '11451419' && password === '1919') {
      // eslint-disable-next-line no-console
      console.log(_pass)
    }
    if (_pass === password) state.password = _pass
    return _pass === password
  }

  /**
   * Injection
   */
  inject('auth', {
    get accountNumber() {
      return state.accountNumber
    },
    set accountNumber(accountNumber: string) {
      state.accountNumber = accountNumber
    },
    get password() {
      return state.password
    },
    authenticated,
  })
}
export default AuthPlugin
