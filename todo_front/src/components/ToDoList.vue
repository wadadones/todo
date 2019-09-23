<template lang='pug'>
  v-app
    v-content
      v-toolbar(dark color="indigo")
        v-icon(@click="showSideBar") reorder
        v-toolbar-title(class="white--text") My Todo
      v-container
        //- v-row(v-for="n in neededRows(todos.length)")
        //-   v-col(v-for="n in 3")
        //-     v-card おお
        v-card(v-for="(todo, i) in todos" :key="i" class="ma-2 d-inline-block")
          v-card-title(v-bind:key="i") {{ todo.title }}
            v-card-text {{ todo.detail }}
            v-card-actions
              v-btn(flat icon @click="deleteTodo(i)")
                v-icon delete
          v-divider(:key="i")
        //- v-card(v-else) nothing to do
        div(class="buttom-right")
          v-btn(fab color="indigo" @click="addTodo")
            v-icon(color="white") add
          router-link(to="/go")
            v-btn(x-large) go
      
</template>

<script>
export default {
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  },
  methods: {
    deleteTodo(i) {
      this.todos.splice(i, 1)
      localStorage.setItem("todos", JSON.stringify(this.todos))
    },
    addTodo() {
      this.$router.push("/todos/add")
    },
    neededRows(num) {
      return Math.ceil(num/3)
    },
    showSidebar() {
      this.$emit('show-side-bar')
    }
  }
}
</script>
<style scoped>
  .v-card {
    width: 31%;
    /* display: inline-block; */
  }
</style>