<template>
  <div :class="buttonClass">{{ text }}</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    text: String,
    color: String,
  },
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    return { buttonClass };
  },
  mounted() {
    if (this.color == "yellow") {
      this.buttonClass = "btn btn-warning btn-default btn-lg mr-1 ";
    }
  },
});
</script>
<style scoped lang="scss">
$mynewcolor: #0b3e62;
$mynewcolor2: #ffa629;
@import "bootstrap";
.btn-default {
  height: 190px;
  min-width: 420px;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  padding-top: 75px;
  font-weight: 700;
  border-radius: 30px;
  border-width: 2px;
}

.btn-primary {
  @include button-variant(
    $mynewcolor,
    darken($mynewcolor, 7.5%),
    darken($mynewcolor, 10%),
    lighten($mynewcolor, 5%),
    lighten($mynewcolor, 10%),
    darken($mynewcolor, 30%)
  );
  color: white;
}
.btn-warning {
  @include button-variant(
    $mynewcolor2,
    darken($mynewcolor2, 7.5%),
    darken($mynewcolor2, 10%),
    lighten($mynewcolor2, 5%),
    lighten($mynewcolor2, 10%),
    darken($mynewcolor2, 30%)
  );
  color: black;
}
</style>
