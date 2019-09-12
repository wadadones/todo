<template lang="pug">
  div
    ourheader
    p(v-if="msg.length > 0") {{msg}}
    p(v-else) no text
    input(type="text" v-model="msg")
    button(@click="plus()") clear
    p {{ msg.length }}
</template>

<script>
import ourheader from './components/ourheader' //外部インポート

export default {
  components: {
    ourheader //componentとして迎え入れる
  },
  data() {
    return {
      msg: 'Hello World!', //初期化 msgは共通でリアルタイムで変わる
      count: 0
    }
  },
  methods: {
    clear() {
      this.msg = ""
    },
    plus() {
      this.msg += "s"
      this.count += 1
    }
  },
  created() {
    fetch('http://www.geonames.org/postalCodeLookupJSON?postalcode=10504&country=US')
    .then( response => {
      return response.json()
    })
    .then( json => {
      this.msg = json.postalcodes[0].adminName1
    })
    .catch( (err) => {
      this.msg = err
    });
  }
}
</script>
