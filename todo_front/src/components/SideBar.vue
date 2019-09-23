<template lang="pug">
  div
    v-btn(@click="drawer=!drawer") Toggle
    //- drawer以下が切り替えの対象
    //- absolute => トップページに重なるように配置
    //- temporary => 出した時に背景をグレーにする。グレー部分を押すと閉じる
    v-navigation-drawer(v-model="drawer" class="" absolute temporary)
      v-list-item
        v-list-item-content
          v-list-item-title Application
          v-list-item-subtitle subtext
      v-divider
      v-list-item
        v-list-item-content
          v-btn(@click="drawer=!drawer" class="mx-auto") Toggle


</template>

<script>
export default {
  props:{
    drawer_prop: Boolean
  },
  data() {
    return {
      drawer: true
    }
  }
}
</script>
