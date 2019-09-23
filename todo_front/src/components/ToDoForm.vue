<template lang='pug'>
  //- v-appで色などを使える
  v-content
    v-app-bar(color="teal")
      router-link(to="/")
        v-icon arrow_back
      v-toolbar-title(class="white--text pl-5") New Todo
    v-container
      v-text-field(placeholder="title" v-model="title")
      v-text-field(placeholder="detail" v-model="detail")
      v-text-field(placeholder="time" v-model="time")
      v-btn(color="teal darken-3", class="white--text", @click="addTodo") ADD

</template>
<script>
export default {
  data() {
    return {
      title: null,
      detail: null,
      time: null
    }
  },
  methods: {
    addTodo() {
      if(this.title === null) return
      const todos = JSON.parse(localStorage.getItem('todos')) || [] //データ読み出し？？
      todos.push({title: this.title, detail: this.detail, time: this.time})
      localStorage.setItem('todos', JSON.stringify(todos)) // データ書き出し？
      this.title = ''
      this.detail = ''
      this.time = ''
      this.$router.push('/');
    },
    go() {
      this.$router.push('/go')
    }
  }

}
</script>

<style scoped>

</style>