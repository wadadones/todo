// import Vue from 'vue'
// import App from './App.vue'
// import vuetify from './plugins/vuetify'
// import router from './router'

Vue.config.productionTip = false

// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// new Vue({
//   el: '#app',
//   vuetify,
//   router,
//   render: h => h(App)
// })

const app = new Vue({
  el: '#app',
  // render: h => h(App),
  data: {
    // 使用するデータ
    todos: [],
    options: [
      { value: -1, label: 'all' },
      { value: 0, label: 'WIP' },
      { value: 1, label: 'done' },
    ],

    current: -1 //デフォ値
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    // 使用するメソッド
    doAdd: function(event, value) {
      var comment = this.$refs.comment //htmlにref属性を定義する必要あり
      if(!comment.value.length) { //何も入力されてなかったら何もしない
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })
      comment.value = '' //フォーム要素を空にする
    },
    doChangeState(item) {
      item.state = item.state? 0 : 1
    },
    doRemove(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },
  computed: {
    computedTodos() {
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this) 
    },

    labels() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    }
  }

})

// el: '#app'と.$mount("#app")は等価
