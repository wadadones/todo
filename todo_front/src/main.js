import Vue from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify'
// import router from './router'

Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   vuetify,
//   router,
//   render: h => h(App)
// })

const app = new Vue({
  el: '#app',
  render: h => h(App)
})

// el: '#app'と.$mount("#app")は等価
