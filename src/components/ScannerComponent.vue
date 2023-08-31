<template>
  <div class="scanner">
    <h1>{{ scanned }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ScannerComponent",
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
        console.log(`wyszukaj produkt o numerze ${this.scanned}`);
        this.scanned = "";
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
