<template lang="pug">
  div
    ourheader
    p(v-if="msg.length > 0") {{msg}}
    p(v-else) no text
    input(type="text" v-model="msg")
    button(@click="plus()") clear
    p {{ msg.length }}
    div(v-for="ss in sss")
      p(:style="{ color: ss.color }") {{ss.text}}
    //- sssのそれぞれに対してkeyが表示される
    p {{rawHTML}}
    //- rawHTMLをhtmlとして認識
    p(v-html="rawHTML")
    //- v-bind:属性 で属性にbindかけられる
    p(v-bind:id="dynamicId") dynamic
    //- v-on:click == @click
    button(@click="change()") DisableButton
    button(v-bind:disabled="isDisabled") Button
    button(v-on:click="plus") pls button
    label(v-on:mouseover="plus") go!

    //- styleの頭に:をつけるとバインディングできる
    //- v-bind:id == :id
    h2(:style="{ color: color }") johnson
    p(:style="style1") OHHHH
    p(v-bind:id="jj") xxxdddccc
    //- プロパティを設定するには
    hello(:msg="msg")
    counter(@update_count="updateCount")
    p {{count2}}

    forms

    
</template>

<script>
import ourheader from './components/ourheader' //外部インポート
import hello from './components/HelloWorld'
import counter from './components/counter'
import forms from './components/forms'
export default {
  components: {
    ourheader, //componentとして迎え入れる
    hello,
    counter,
    forms
    
  },
  data() {
    return {
      msg: 'Hello World!', //初期化 msgは共通でリアルタイムで変わる
      count: 0,
      rawHTML: "<span style=\"color:red\">this is red</span>",
      sss: [
        { text: "ssf", color: "red" },
        { text: "ffff", color: "blue" },
        { text: "dfsfs", color: "green" }
      ],
      dynamicId: "john",
      isDisabled: true,
      color: "red", 
      // スタイルをここで定義して流し込むのもよさそうだな
      style1: {
        color: "green",
        fontSize: "40px" 
      },
      jj: false,
      count2: 0
    }
  },
  methods: {
    clear() {
      this.msg = ""
    },
    plus() {
      this.msg += "s"
      this.count += 1
    },
    change() {
      if(this.isDisabled){
        this.isDisabled = false
      }else{
        this.isDisabled = true
      }
    },
    updateCount() {
      this.count2 += 1
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
