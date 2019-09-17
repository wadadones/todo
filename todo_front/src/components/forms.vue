<template lang="pug">
  form(@submit="submitform")
    div
      input(v-model="name")
    div
      textarea(v-model="content") {{content}}
    div
      input(type="submit")
</template>

<script>
export default {
  data() {
    return {
      name: "",
      content: ""
    }
  },
  methods: {
    submitform() {
      this.name = ""
      this.content = ""
    }
  }
}
</script>