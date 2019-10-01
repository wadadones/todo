<template lang="pug">
  //- 親要素にv-appがあればrouter-view下でもいける
  v-app
    router-view
    //- sidebar(@show-side-bar="showSideBar")
</template>


<script>
// import HelloWorld from './components/HelloWorld';
import sidebar from './components/SideBar'
export default {
  name: 'App',
  components: {
    sidebar
  },
  methods: {
    showSideBar() {

    }
  }

}
</script>
<style>
a {
  text-decoration: none;
}
</style>
