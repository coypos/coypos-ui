<template>
  <div class="btn small btn-lg mr-1">
    <img class="buttonimage" :src="image" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RoundButtonComponent",
  props: {
    image: String,
  },
  methods: {},
});
</script>
<style scoped lang="scss">
@import "bootstrap";

.small {
  display: inline-block;
  height: 100px;
  width: 100px;
  padding-right: 100px;
  .buttonimage {
    width: 90px;
    height: 90px;
  }
}
</style>
