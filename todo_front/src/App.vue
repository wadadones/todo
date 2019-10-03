<template lang="pug">
  //- 親要素にv-appがあればrouter-view下でもいける
  v-app#app
    v-app-bar(app dark elevate-on-scroll color="cyan")
      v-app-bar-nav-icon(@click.stop="drawer_left = !drawer_left")
      v-toolbar-title My Todo
      //- right fixedはいっしょに使用
      v-btn(right fixed class="hidden-lg-and-down") xl
      v-btn(right fixed class="hidden-md-and-down hidden-xl-only") lg
      v-btn(right fixed class="hidden-sm-and-down hidden-lg-and-up") md
      v-btn(right fixed class="hidden-xs-only hidden-md-and-up") sm
      v-btn(right fixed class="hidden-sm-and-up") xs

    //- v-contentでtoolbarとのマージンをとる
    v-content
      v-container
        v-layout(wrap).justify-center
          v-flex.xs12.md10
            //- v-layout(row wrap)
            //-   v-flex()
            //- v-card(class="d-flex flex-row", color="grey lighten-2", flat, tile)
            //-   v-card(outlined tile class="hidden-md-and-down") おおお
            //-   v-card(outlined tile) おおお
            
            //- 絞り込みラジオボタン
            //- ここでradioの値をbinding
            v-radio-group(v-model="current" row)
              v-radio(v-for="label in options" :value="label.value" :label="label.label" :key="label.id")

            //- <!-- テーブルヘッダー -->
            //- v-simple-table.hidden-sm-and-up
            
            v-simple-table
              template(v-slot:default)
                thead
                  tr
                    th.text-center.px-2(width="5%") ID
                    th.text-center.px-2(width="60%") comment
                    th.text-center.px-2(width="20%") timer
                    th.text-center.px-2(width="10%") state
                    th.text-center.px-2(width="5%") -
                tbody
                  tr(v-for="todo in computedTodos" :key="todo.id")
                    td.text-center.px-2 {{ todo.id }}
                    td.px-2 {{ todo.comment }}
                    td.text-center.px-2
                      Timer(:timer="todo.time"
                            :state="todo.timer_state"
                            @start="start(todo)")
                    td.text-center.px-2.state
                      v-btn(dark width="30" @click="doChangeState(todo)" :color="colors[todo.state]") {{ labels[todo.state] }}
                    td.text-center.px-2.button
                      v-icon(@click="doRemove(todo)") delete
            v-btn(color="pink" dark fab right bottom fixed @click.stop="drawer_right = !drawer_right")
              v-icon(dark) mdi-plus
    //- 右サイドバー
    v-navigation-drawer(v-model="drawer_right" fixed temporary right)
      v-container
        h2 New Task
        form.add-form(@submit.prevent="doAdd")
          v-text-field(
            :counter="10"
            label="comment"
            required
            v-model="comment"
          )
          v-btn(type="submit" color="pink" dark) add
    //- 左サイドバー
    v-navigation-drawer(v-model="drawer_left" temporary fixed)
      v-container
        h2 Todo
    //- フッター
    v-footer.text-center(color="blue-grey darken-3" height="80")
      v-row(justify="center" no-gutters)
         div.blue-grey--text.text--lighten-2 My Todo is sample app for Vue and Vuetify.
</template>


<script>
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    // idを0から入れ直す
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

import Timer from './components/Timer'

export default {
  name: 'App',
  components: {
    Timer
  },
  data() {
    // 使用するデータ
    return {
      todos: [],
      options: [
        { value: -1, label: 'all' },
        { value: 0, label: 'WIP', color: 'blue-grey darken-1' },
        { value: 1, label: 'done', color: 'green' },
      ],
      current: -1, //デフォ値
      drawer_right: false,
      drawer_left: false,
      comment: '',

      timerState: 'stopped',
      currentTimer: 0,
      formattedTime: "00:00:00",
      ticker: undefined
    } 
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    // 使用するメソッド
    doAdd() {
      // console.log(this.$refs.comment)
      // var comment = this.$refs.comment //htmlにref属性を定義する必要あり
      if(!this.comment) { //何も入力されてなかったら何もしない
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: this.comment,
        time: "00:00:00",
        timer_state: "paused",
        state: 0
      })
      this.comment = '' //フォーム要素を空にする
    },
    doChangeState(item) {
      item.state = item.state ? 0 : 1
    },
    doRemove(item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
    start(item) {
      // doneのタスクはタイマーをいじれないように
      if(this.labels[item.state]==="done") return
      // ストップ
      if(item.timer_state === "running") {
        window.clearInterval(this.ticker)
        item.timer_state = 'paused'
      }
      // スタート
      else if(item.timer_state !== "running") {

        // 他のタイマーを止める
        this.todos.forEach((item) => {
          item.timer_state = "paused"
        })
        window.clearInterval(this.ticker)
        this.currentTimer = this.timeToSecond(item.time)
        this.tick(item)
        item.timer_state = "running"
      }
    },
    tick(item) {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        item.time = this.formatTime(this.currentTimer)
      }, 1000)
    },
    formatTime(seconds) {
      let measuredTime = new Date(null)
      measuredTime.setSeconds(seconds)
      let HMSTime = measuredTime.toISOString().substr(11,8)
      return HMSTime
    },
    timeToSecond(time) {
      var splitted_time = time.split(":")
      return Number(splitted_time[0]) * 3600 + Number(splitted_time[1]) * 60 + Number(splitted_time[2])
    }
  },
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    // todosが変わるごとに実行される
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      // todos.todo.id, todos.todo.statusの変化も監視できるようになる
      deep: true
    }
  },
  // 複雑なデータ加工をして出力したいときはこっち(rails modelのscopeみたいなもん))
  computed: {
    // -1なら全てtrue、
    computedTodos() {
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this) 
    },

    labels() {
      return this.options.reduce(function(a, b) {
        // 二つのhashを結合する
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    },

    colors() {
      return this.options.reduce(function(a, b) {
        return Object.assign(a, { [b.value]: b.color })
      }, {})
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    touch-action: manipulation;
  }
</style>
