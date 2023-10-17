<template>
  <div class="scanner"></div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { showModal } from "@/functions";
import { CartModel } from "@/types/api/Cart";

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
          }
        } else {
          this.getProduct();
          this.scanned = "";
        }
      }
    },
    removeScannerEvent() {
      window.removeEventListener("keydown", this.handleBarcodeInput);
      window.removeEventListener("input", this.handleBarcodeInput);
    },
    async addToCart(name: string, price: number) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({ name: name, price: price });

      this.$storage.setStorageSync("cartList", list);
    },
    async getProduct() {
      try {
        const data = {
          barcode: this.scanned,
        };

        const jsonString = JSON.stringify(data);
        const encodedJsonString = encodeURIComponent(jsonString);
        await this.$axios
          .get(`/products?filter=AND&body=${encodedJsonString}`)
          .then((response) => {
            this.addToCart(
              response.data.response[0].name,
              response.data.response[0].price
            );
          });
      } catch (e) {
        showModal("Nie znaleziono produktu");
      }
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
