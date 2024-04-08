<template>
  <div class="scanner"></div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { hideModal, showModal } from "@/functions";
import { CartModel } from "@/types/api/Cart";
import { ResponseModel } from "@/types/Response";

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
    let finded = ref<boolean>(false);
    return { scanned, finded };
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
    async addToCart(
      name: string,
      price: number,
      discountedPrice: number | null,
      id: number
    ) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({
        name: name,
        price: price,
        count: 1,
        discountedPrice: discountedPrice,
        id: id,
      });

      this.$storage.setStorageSync("cartList", list);
    },
    async getProduct() {
      const code = this.scanned;
      try {
        let data = {
          cardNumber: code,
          role: null,
        };
        let findeduser = false;
        let jsonString = JSON.stringify(data);
        let encodedJsonString = encodeURIComponent(jsonString);
        if (!this.finded) {
          try {
            await this.$axios
              .get(`/users?filter=AND&body=${encodedJsonString}`)
              .then((response) => {
                const resp: ResponseModel = response.data;
                if (resp.response[0].name) {
                  console.log(resp.response[0]);

                  data = { cardNumber: "-1", role: null };
                  this.finded = true;
                  findeduser = true;
                  this.$storage.setStorageSync("user", resp.response[0].id);
                  this.$storage.setStorageSync(
                    "username",
                    resp.response[0].name
                  );
                }
                if (this.$route.name != "cart") {
                  this.$router.push({
                    name: "cart",
                    params: this.$route.params,
                  });
                }
              });
          } catch (e) {
            console.log(e);
          }
        }
        if (!findeduser) {
          let data2 = {
            barcode: code,
          };

          jsonString = JSON.stringify(data2);
          encodedJsonString = encodeURIComponent(jsonString);
          await this.$axios
            .get(`/products?filter=AND&body=${encodedJsonString}`)
            .then((response) => {
              const resp: ResponseModel = response.data;
              if (resp.response[0].ageRestricted) {
                if (!this.$storage.getStorageSync("checked18")) {
                  hideModal();
                  showModal(
                    "Dodano przedmiot dla pełnoletnich. Sprzedawca proszony jest o sprawdzenie dowodu."
                  );
                }
              }
              this.addToCart(
                resp.response[0].name,
                resp.response[0].price,
                resp.response[0].discountedPrice,
                resp.response[0].id
              );
              if (this.$route.name != "cart") {
                this.$router.push({ name: "cart", params: this.$route.params });
              }
            });
        }
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
