import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


Vue.component('product', {
  template:`
    <p>from main.js</p>
  `
  ,
  
})