<template>
  <div class="btn btn-success small btn-default btn-lg mr-1">
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
.btn-default {
  position: relative;
  top: 0;
  height: 250px;
  width: 100%;
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  padding-top: 20px;
  font-weight: 700;
  border-radius: 50%;
  border-width: 2px;
  margin: 0 0 15px;

  --bs-btn-color: var(--second-button-color);
  --bs-btn-bg: var(--second-button-color);
  --bs-btn-border-color: var(--second-button-color);
  --bs-btn-hover-color: var(--second-button-color);
  --bs-btn-hover-bg: var(--second-button-color);
  --bs-btn-hover-border-color: var(--second-button-color);
  --bs-btn-focus-shadow-rgb: 7, 39, 62;
  --bs-btn-active-color: var(--second-button-color);
  --bs-btn-active-bg: var(--second-button-color);
  --bs-btn-active-border-color: var(--second-button-color);
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: var(--second-button-color);
  --bs-btn-disabled-bg: var(--second-button-color);
  --bs-btn-disabled-border-color: var(--second-button-color);
  color: var(--button-text-color);
}

.buttonimage {
  position: absolute;
  max-height: 150px;
  max-width: 150px;

  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 20px;
}
.small {
  position: relative;
  top: 50px;
  width: 27%;
  height: 27%;
  text-align: center;
  font-weight: 700;
  border-radius: 50%;
  border-width: 2px;
  margin: 3%;
  .buttonimage {
    position: absolute;
    height: 200px;
    width: 200px;
  }
}
</style>
