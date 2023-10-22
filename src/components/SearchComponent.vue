<template>
  <div class="keyboard">
    <div :class="keyboardClass"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
export default defineComponent({
  name: "SearchComponent",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String,
    },
  },
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    const keyboard = ref<any>(null);

    return { keyboard, buttonClass };
  },
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      display: {
        "{bksp}": "USUŃ",
        "{space}": "SPACJA",
      },
      layout: {
        default: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "z x c v b n m",
          "{space} {bksp}",
        ],
      },
    });
  },

  methods: {
    onChange(input: any) {
      this.$emit("onChange", input);
    },
    onKeyPress(button: any) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
});
</script>
<style lang="scss">
.hg-theme-default {
  background-color: var(--product-color);
}
.searchbutton {
  position: absolute;
  border-top-left-radius: 100%;
  border: 1px solid var(--text-color);
  padding: 20px;
  background-color: var(--product-color);
  bottom: 0;
  right: 0;

  width: 150px;
  height: 150px;
  img {
    position: relative;
    right: -20px;
    bottom: -20px;
    width: 90%;
    height: 90%;
  }
}
</style>
