<template>
  <div :style="'width:' + width + '%;'" :class="buttonClass">
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
    image: String,
    small: Boolean,
    color: String,
    width: Number,
  },
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    return { buttonClass };
  },
  methods: {
    //jezeli w props dostaniemy kolor yellow to nastąpi zmiana klasy aby guzik byl zółty itp dla zielonego, dodatkowo weryfikujemy czy nie dostalismy props small ktore zmieni klase na przycisk o mniejszych rozmiarach

    updateClass() {
      if (this.color == "yellow" && this.small) {
        this.buttonClass = "btn btn-warning small btn-default btn-lg mr-1 ";
      } else if (this.color == "green" && this.small) {
        this.buttonClass = "btn btn-success small btn-default btn-lg mr-1 ";
      } else if (this.color == "yellow") {
        this.buttonClass = "btn btn-warning btn-default btn-lg mr-1 ";
      } else if (this.small) {
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
  height: 260px;
  width: 100%;
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  padding-top: 20px;
  font-weight: 700;
  border-radius: 40px;
  border-width: 2px;
  margin: 0 0 15px;
}
.btn-primary {
  --bs-btn-color: var(--product-color);
  --bs-btn-bg: var(--product-color);
  --bs-btn-border-color: var(--product-color-darker);
  --bs-btn-hover-color: var(--button-text-color);
  --bs-btn-hover-bg: var(--product-color);
  --bs-btn-hover-border-color: var(--product-color-darker);
  --bs-btn-focus-shadow-rgb: 7, 39, 62;
  --bs-btn-active-color: var(--product-color);
  --bs-btn-active-bg: var(--product-color);
  --bs-btn-active-border-color: var(--product-color-darker);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: var(--product-color);
  --bs-btn-disabled-bg: var(--product-color);
  --bs-btn-disabled-border-color: var(--product-color-darker);
  color: var(--button-text-color);
}
.btn-success {
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
  color: var(--button-text-color);
}
.btn-warning {
  --bs-btn-color: var(--button-color-warning);
  --bs-btn-bg: var(--button-color-warning);
  --bs-btn-border-color: var(--button-color-warning-darker);
  --bs-btn-hover-color: var(--button-warning-text-color);
  --bs-btn-hover-bg: var(--button-color-warning);
  --bs-btn-hover-border-color: var(--button-color-warning-darker);
  --bs-btn-focus-shadow-rgb: 254, 149, 3;
  --bs-btn-active-color: var(--button-warning-text-color);
  --bs-btn-active-bg: var(--button-color-warning);
  --bs-btn-active-border-color: var(--button-color-warning-darker);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: var(--button-color-warning-darker);
  --bs-btn-disabled-bg: var(--button-color-warning);
  --bs-btn-disabled-border-color: var(--button-color-warning-darker);
  color: var(--button-warning-text-color);
}
.buttonimage {
  position: absolute;
  max-height: 140px;
  max-width: 90%;
  width: 70%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 20px;
}
.small {
  position: relative;
  top: 0;
  height: 180px;
  width: 170px;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  padding-top: 20px;
  font-weight: 700;
  border-radius: 40px;
  border-width: 2px;
  .buttonimage {
    position: absolute;
    height: 110px;
    width: 110px;
    bottom: 10px;
  }
}
</style>
