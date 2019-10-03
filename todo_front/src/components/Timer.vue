<template lang="pug">
  v-layout
    v-flex(xs12).text-center
      v-card.font-weight-light.pa-2(@click="$emit('start')" :color="color" :dark="dark")
        | {{ timer }}

</template>

<script>
export default {
  name: "Timer",
  props: ["timer", "state"],
  data() {
    return {
      color: "",
      dark: false
    }
  },

  watch: {
    // 変わった後のstateがrunningだったら色を帰る
    state(val) {
      if(val == "running") {
        this.color = "teal"
        this.dark = true
      }
      else {
        this.color = ""
        this.dark = false
      }
    }
  }
}
</script>