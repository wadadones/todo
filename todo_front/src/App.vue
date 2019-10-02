<template lang="pug">
  //- 親要素にv-appがあればrouter-view下でもいける
  //- v-app
    //- router-view
    //- sidebar(@show-side-bar="showSideBar")
  v-app#app
    v-app-bar(app dark elevate-on-scroll color="cyan")
      v-app-bar-nav-icon
      v-toolbar-title My Todo
      //- right fixedはいっしょに使用
      v-btn(right fixed class="hidden-lg-and-down") xl
      v-btn(right fixed class="hidden-md-and-down hidden-xl-only") lg
      v-btn(right fixed class="hidden-sm-and-down hidden-lg-and-up") md
      v-btn(right fixed class="hidden-xs-only hidden-md-and-up") sm
      v-btn(right fixed class="hidden-sm-and-up") xs

    //- <!-- 絞り込みラジオボタン -->
    //- v-contentでtoolbarとのマージンをとる
    v-content
      v-container
        //- v-layout(row wrap)
        //-   v-flex()
        //- v-card(class="d-flex flex-row", color="grey lighten-2", flat, tile)
        //-   v-card(outlined tile class="hidden-md-and-down") おおお
        //-   v-card(outlined tile) おおお
        //- ここでradioの値をbinding
        v-radio-group(v-model="current" row)
          //- div(v-for="label in options")
          v-radio(v-for="label in options" :value="label.value" :label="label.label")

        //- <!-- テーブルヘッダー -->
        //- v-simple-table.hidden-sm-and-up
        v-simple-table
          template(v-slot:default)
            thead
              tr
                th.id(width="10%") ID
                th.comment(width="50%") comment
                th.state(width="20%") state
                th.button(width="20%") -
            tbody
              tr(v-for="todo in computedTodos" :key="todo.id")
                td {{ todo.id }}
                td {{ todo.comment }}
                td.state
                  v-btn(dark width="30" @click="doChangeState(todo)" :color="colors[todo.state]") {{ labels[todo.state] }}
                td.button
                  v-btn(@click="doRemove(todo)" color="red" dark) delete
        //- <!-- ToDo テーブル -->
        h2 new task
        form.add-form(@submit.prevent="doAdd")
          p comment
          input(type="text" ref="comment")
          button(type="submit") add
        //- 新規登録フォーム
</template>


<script>
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

export default {
  name: 'App',
  data() {
    // 使用するデータ
    return {
      todos: [],
      options: [
        { value: -1, label: 'all' },
        { value: 0, label: 'WIP', color: 'blue-grey darken-1' },
        { value: 1, label: 'done', color: 'green' },
      ],
      current: -1 //デフォ値
    } 
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    // 使用するメソッド
    doAdd() {
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
    // -1なら全てtrue、
    computedTodos() {
      return this.todos.filter(function(el) {
        return this.current < 0 ? true : this.current === el.state
      }, this) 
    },

    labels() {
      return this.options.reduce(function(a, b) {
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
