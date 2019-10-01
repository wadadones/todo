import Vue from 'vue'
import Router from 'vue-router'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'
import Go from './components/Go'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: ToDoList },
    { path: '/todos/add', component: ToDoForm },
    { path: '/go', component: Go }
  ]
})