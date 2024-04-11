<template>
  <div :style="'width:' + width + '%;'" :class="buttonClass">
    {{ text }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ButtonComponent",
  props: {
    text: String,
    color: String,
    width: Number,
    height: Number,
  },
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    return { buttonClass };
  },
  methods: {
    updateClass() {
      //jezeli w props dostaniemy kolor yellow to nastąpi zmiana klasy aby guzik byl zółty
      if (this.color == "yellow") {
        this.buttonClass = "btn btn-warning btn-default btn-lg mr-1 ";
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
  height: 180px;
  min-width: 420px;
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  padding-top: 70px;
  font-weight: 700;
  border-radius: 30px;
  border-width: 2px;
  padding-bottom: 15px;
  margin-bottom: 15px;
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
</style>
