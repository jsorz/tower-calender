import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const req = require.context('./modules', false, /.*\.js$/)
const modules = {}

req.keys().forEach(path => {
  const [, name] = path.match(/\.\/(.*)\.js$/)
  if (name) {
    modules[name] = req(path).default
    // todo fuck
    modules[name]['namespaced'] = true
  }
})

export default new Vuex.Store({
  modules,
  strict: debug,
  pluigns: [
    debug ? [createLogger()] : []
  ]
})
