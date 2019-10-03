<template lang="pug">
  v-layout
    v-flex(xs12).text-center
      v-card.font-weight-light.pa-2(@click="$emit('start')")
        | {{ timer }}

</template>

<script>
export default {
  name: "Timer",
  props: ["timer", "state"]
}
</script>