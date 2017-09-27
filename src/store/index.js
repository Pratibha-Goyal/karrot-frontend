import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from './plugins/persistedState'
import i18nPlugin from './plugins/i18n'
import router from './plugins/router'

import * as auth from './modules/auth'
import * as conversations from './modules/conversations'
import * as groups from './modules/groups'
import * as stores from './modules/stores'
import * as users from './modules/users'
import * as pickups from './modules/pickups'
import * as i18n from './modules/i18n'
import * as sidenav from './modules/sidenav'
import * as about from './modules/about'
import * as breadcrumbs from './modules/breadcrumbs'
import * as verifymail from './modules/verifymail'
import * as route from './modules/route'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const options = ({
  modules: {
    auth,
    conversations,
    groups,
    stores,
    users,
    pickups,
    i18n,
    sidenav,
    about,
    breadcrumbs,
    verifymail,
    route,
  },
  plugins: [
    i18nPlugin,
    persistedState,
    router,
  ],
  strict: debug,
})

// Set all modules to be namespaces

for (let k of Object.keys(options.modules)) {
  let m = options.modules[k]

  // Enforce use of namespaced modules
  m.namespaced = true
}

export default new Vuex.Store(options)
