<template>
  <div class="scanner">
    <h1>{{ scanned }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ScannerComponent",
  props: {
    goto: String,
  },
  data() {
    return {};
  },
  setup() {
    let scanned = ref<string>("");
    return { scanned };
  },
  methods: {
    scannerEvent() {
      window.addEventListener("input", this.handleBarcodeInput);
      window.addEventListener("keydown", this.handleBarcodeInput);
    },
    handleBarcodeInput(event: Event) {
      const inputValue = (event as KeyboardEvent).key;
      if (inputValue && !isNaN(parseInt(inputValue))) {
        this.scanned += inputValue;
      } else if (inputValue == "Enter") {
        if (this.$router.currentRoute.value.name == "login") {
          console.log("check user exists");
          const user = true;
          if (user) {
            this.$router.push({
              name: this.goto,
              query: {
                id: this.scanned,
                lang: this.$router.currentRoute.value.query.lang,
              },
            });
          } else {
            this.scanned = "";
          }
        }
      }
    },
    removeScannerEvent() {
      window.removeEventListener("keydown", this.handleBarcodeInput);
      window.removeEventListener("input", this.handleBarcodeInput);
    },
  },
  mounted() {
    this.scannerEvent();
  },
  unmounted() {
    this.removeScannerEvent();
  },
});
</script>
