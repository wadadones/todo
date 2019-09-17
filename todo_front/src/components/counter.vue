<template lang="pug">
  button(@click="counter") add count
</template>

<script>
export default {
  methods: {
    counter() {
      this.$emit("update_count")
    }
  }
}
</script>

