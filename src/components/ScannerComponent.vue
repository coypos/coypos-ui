<template>
  <div class="scanner"></div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { hideModal, showModal } from "@/functions";
import { CartModel } from "@/types/api/Cart";
import { ResponseModel } from "@/types/Response";
import { useI18n } from "vue-i18n";

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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t, scanned, finded };
  },
  methods: {
    //event nasluchujacy na wcisniecie klawisza (taka akcje symuluje skaner barcode)
    scannerEvent() {
      window.addEventListener("input", this.handleBarcodeInput);
      window.addEventListener("keydown", this.handleBarcodeInput);
    },
    //sprawdzamy jaki input dostalismy po kliknieciu "enter" czyli zakonczenia skanowania przez skaner wywolywana
    //jest akcja przejscia na widok podany w propsach z zadanym id lub wyszukanai produktu w zaleznosci od widoku na ktorym zostal wywolany
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
    //funkcja wylaczajaca event skanowania
    removeScannerEvent() {
      window.removeEventListener("keydown", this.handleBarcodeInput);
      window.removeEventListener("input", this.handleBarcodeInput);
    },
    //dodanie produktu do koszyyka w pamieci
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
    //pobranie produktu lub uzytkownika z api po zadanym barcode zeksanowanym przez skaner
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
        //sprawdzamy czy nie zostala juz zeskanowana karta lojalnosciowa aby nie wywolywac niepotrzebnych zapytan
        if (!this.finded) {
          //pobranie uzytkownika jezeli uzytkownik o takim kodzie istnieje to zapisywany jest w pamieci do pozniejszego wykorzystania
          try {
            await this.$axios
              .get(`/users?filter=AND&body=${encodedJsonString}`)
              .then((response) => {
                const resp: ResponseModel = response.data;
                if (resp.response[0].name) {
                  data = { cardNumber: "-1", role: null };
                  this.finded = true;
                  findeduser = true;
                  this.$storage.setStorageSync("user", resp.response[0].id);
                  this.$storage.setStorageSync(
                    "username",
                    resp.response[0].name
                  );
                }
                //jezeli produkt zostal zeskanowany na innym widoku niz koszyk to wracamy do niego
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
          //pobranie zeskanowanego produktu z api i dodanie do koszyka
          let data2 = {
            barcode: code,
          };

          jsonString = JSON.stringify(data2);
          encodedJsonString = encodeURIComponent(jsonString);
          await this.$axios
            .get(`/products?filter=AND&body=${encodedJsonString}`)
            .then((response) => {
              const resp: ResponseModel = response.data;
              //sprawdzenie czy produkt jest dla pelnoletnich i wywolania modala z zablowoaniem kasy, aby pracownik mogl zatwierdzic wiek
              if (resp.response[0].ageRestricted) {
                if (!this.$storage.getStorageSync("checked18")) {
                  hideModal();
                  showModal(this.t("adulterror"));
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
        showModal(this.t("noproduct"));
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
