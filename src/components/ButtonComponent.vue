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
  methods: {
    updateClass() {
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
</style>
