<template>
  <div :class="buttonClass">
    <p>{{ text }}</p>
    <img class="buttonimage" :src="image" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProductComponent",
  props: {
    text: String,
    color: String,
    image: String,
    small: Boolean,
  },
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    return { buttonClass };
  },
  methods: {
    updateClass() {
      if (this.color == "yellow") {
        this.buttonClass = "btn btn-warning btn-default btn-lg mr-1 ";
      }
      if (this.small) {
        this.buttonClass = "btn  btn-primary small btn-default btn-lg mr-1 ";
      }
      return this.buttonClass;
    },
  },
  mounted() {
    this.updateClass();
  },
});
</script>
<style scoped lang="scss">
$mynewcolor: #0b3e62;
$mynewcolor2: #ffa629;
@import "bootstrap";
.btn-default {
  position: relative;
  top: 0;
  height: 280px;
  width: 230px;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  padding-top: 20px;
  font-weight: 700;
  border-radius: 40px;
  border-width: 2px;
  margin: 15px;
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
.buttonimage {
  position: absolute;
  height: 160px;
  width: 160px;
  left: 30px;
  bottom: 10px;
}
.small {
  position: relative;
  top: 0;
  height: 200px;
  width: 170px;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  padding-top: 20px;
  font-weight: 700;
  border-radius: 40px;
  border-width: 2px;
  margin: 15px;
  .buttonimage {
    position: absolute;
    height: 110px;
    width: 110px;
    left: 25px;
    bottom: 10px;
  }
}
</style>
