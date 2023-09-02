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
  --bs-btn-color: var(--button-color);
  --bs-btn-bg: var(--button-color);
  --bs-btn-border-color: var(--button-color-darker);
  --bs-btn-hover-color: var(--button-text-color);
  --bs-btn-hover-bg: var(--button-color);
  --bs-btn-hover-border-color: var(--button-color-darker);
  --bs-btn-focus-shadow-rgb: 7, 39, 62;
  --bs-btn-active-color: var(--button-color);
  --bs-btn-active-bg: var(--button-color);
  --bs-btn-active-border-color: var(--button-color-darker);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: var(--button-color);
  --bs-btn-disabled-bg: var(--button-color);
  --bs-btn-disabled-border-color: var(--button-color-darker);
  color: var(--text-second-color);
}
.btn-warning {
  --bs-btn-color: var(--button-color-warning);
  --bs-btn-bg: var(--button-color-warning);
  --bs-btn-border-color: var(--button-color-warning-darker);
  --bs-btn-hover-color: var(--text-third-color);
  --bs-btn-hover-bg: var(--button-color-warning);
  --bs-btn-hover-border-color: var(--button-color-warning-darker);
  --bs-btn-focus-shadow-rgb: 254, 149, 3;
  --bs-btn-active-color: var(--text-third-color);
  --bs-btn-active-bg: var(--button-color-warning);
  --bs-btn-active-border-color: var(--button-color-warning-darker);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: var(--button-color-warning-darker);
  --bs-btn-disabled-bg: var(--button-color-warning);
  --bs-btn-disabled-border-color: var(--button-color-warning-darker);
  color: var(--text-third-color);
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
