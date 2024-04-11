<template>
  <div class="row">
    <div class="col-12">{{ pin }}</div>
  </div>
  <div class="pin">
    <div class="row">
      <div @click="addtopin('1')" class="col-4 leftup">1</div>
      <div @click="addtopin('2')" class="col-4">2</div>
      <div @click="addtopin('3')" class="col-4 rightup">3</div>
    </div>
    <div class="row">
      <div @click="addtopin('4')" class="col-4">4</div>
      <div @click="addtopin('5')" class="col-4">5</div>
      <div @click="addtopin('6')" class="col-4">6</div>
    </div>
    <div class="row">
      <div @click="addtopin('7')" class="col-4">7</div>
      <div @click="addtopin('8')" class="col-4">8</div>
      <div @click="addtopin('9')" class="col-4">9</div>
    </div>
    <div class="row">
      <div @click="removefrompin()" class="col-4 leftdown">
        {{ $t(`delete`) }}
      </div>
      <div @click="addtopin('0')" class="col-4">0</div>
      <div
        v-if="product"
        data-bs-target="modal"
        data-bs-dismiss="modal"
        @click="accept()"
        class="col-4 rightdown"
      >
        {{ $t(`accept`) }}
      </div>
      <div v-else @click="accept()" class="col-4 rightdown">
        {{ $t(`accept`) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { CartModel } from "@/types/api/Cart";
import { ResponseModel } from "@/types/Response";
import { hideCountModal, hideModal, showModal } from "@/functions";
import { ProductModel } from "@/types/api/Product";
import { Modal } from "bootstrap";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "PinComponent",
  props: {
    product: Object,
    usage: String,
    barcode: Boolean,
    admin: Boolean,
  },
  setup() {
    let pin = ref<string>("");

    return { pin };
  },
  methods: {
    //dodanie cyfry do pinu kliknetej na ekranie
    async addtopin(number: string) {
      this.pin += number;
    },
    //usuniecie ostatniej cyfry w pinie
    async removefrompin() {
      this.pin = this.pin.slice(0, this.pin.length - 1);
    },
    //funkcja wykonujaca sie po kliknieciu zatwierdz na ekranie
    async accept() {
      //sprawdzamy czy uzytkownik wprowadzil jakis pin oraz czy komponent zostal wykonany jako wprowadzanie barcode czy ilosci produktu
      if (this.pin.length != 0) {
        //jezeli zostal wykonany jako komponent ilosci produktu to dodaj zadana liczbe produktow do koszyka
        if (this.product) {
          await this.addToCart(
            this.product.name,
            this.product.price,
            parseInt(this.pin),
            this.product.discountedPrice,
            this.product.id
          );
          //sprawdzenie czy produkt jest dla pelnoletnich i wywolania modala z zablowoaniem kasy, aby pracownik mogl zatwierdzic wiek
          if (this.product.ageRestricted) {
            //sprawdzamy czy juz nie zostal zatwierdzony wiek
            if (!this.$storage.getStorageSync("checked18")) {
              hideCountModal();
              showModal(
                "Dodano przedmiot dla pełnoletnich. Sprzedawca proszony jest o sprawdzenie dowodu."
              );
              this.$router.push({
                name: `seller`,
                query: {
                  lang: this.$router.currentRoute.value.query.lang,
                },
              });
            } else {
              hideCountModal();
              this.pin = "";
            }
          } else {
            hideCountModal();
            this.pin = "";
          }
        } else if (this.barcode) {
          try {
            //wykonujemy zapytanie do api z podanym barcode aby wyszukac produktu i dodajemy go do koszyka
            const data = {
              barcode: this.pin,
            };

            const jsonString = JSON.stringify(data);
            const encodedJsonString = encodeURIComponent(jsonString);
            await this.$axios
              .get(
                `/products?filter=AND&loadImages=false&itemsPerPage=1&page=1&body=${encodedJsonString}`
              )
              .then((response) => {
                const resp: ResponseModel = response.data;
                let product: ProductModel = resp.response[0] as ProductModel;
                if (product) {
                  this.addToCart(
                    product.name || "",
                    product.price || 0,
                    1,
                    product.discountedPrice,
                    product.id || 0
                  );
                  //sprawdzenie czy produkt jest dla pelnoletnich i wywolania modala z zablowoaniem kasy, aby pracownik mogl zatwierdzic wiek

                  if (product.ageRestricted) {
                    console.log(this.$storage.getStorageSync("checked18"));

                    if (!this.$storage.getStorageSync("checked18")) {
                      hideCountModal();
                      showModal(
                        "Dodano przedmiot dla pełnoletnich. Sprzedawca proszony jest o sprawdzenie dowodu."
                      );
                      this.$router.push({
                        name: `seller`,
                        query: {
                          lang: this.$router.currentRoute.value.query.lang,
                        },
                      });
                    } else {
                      hideCountModal();
                      this.pin = "";
                    }
                  } else {
                    hideCountModal();
                    this.pin = "";
                  }
                }
              });
          } catch (e) {
            showModal(e as string);
          }
        }
        //sprawdzamy czy komponent nie zostal wywolany z poziomu panelu sprzedawcy, jezeli tak to walidujemy pin sprzedawcy z jego numerem karty
        if (this.admin) {
          try {
            const data = {
              card_id: this.$route.query.id,
              pin: this.pin,
            };

            const jsonString = JSON.stringify(data);
            const encodedJsonString = encodeURIComponent(jsonString);
            await this.$axios
              .get(`/employee_validate?body=${encodedJsonString}`)
              .then((response) => {
                const resp = response.data;
                this.$router.push({
                  name: `seller`,
                  query: {
                    lang: this.$router.currentRoute.value.query.lang,
                  },
                });
              });
          } catch (e: any) {
            console.log(e);
          }
        } else {
          this.$router.push({
            name: `cart`,
            query: {
              lang: this.$router.currentRoute.value.query.lang,
            },
          });
        }
      }
    },
    //funkcja odpowiadajaca dodawaniu produktu do koszyka w pamieci przegladarki
    async addToCart(
      name: string,
      price: number,
      count: number,
      discountedPrice: number | null,
      id: number
    ) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({
        name: name,
        price: price,
        count: count,
        discountedPrice: discountedPrice,
        id: id,
      });
      this.$storage.setStorageSync("cartList", list);
      this.$router.push(`/cart`);
    },
  },
});
</script>
<style scoped lang="scss">
.col-12 {
  height: 50px;
  font-size: 30px;
  line-height: 50px;
}
.pin {
  text-align: center;
  align-items: center;
  margin: 10px auto auto;
  width: 390px;
  height: 520px;
  border-radius: 50px;
  .row {
    margin: 0;
    line-height: 130px;
    height: 130px;
    font-size: 30px;

    .col-4 {
      width: 33%;
      margin: 0;
      border: 1px solid #c0c0c0;
      background-color: #f6f6f6;
      cursor: pointer;
    }
  }
}
.leftdown {
  border-radius: 0 0 0 50px;
}
.leftup {
  border-radius: 50px 0 0 0;
}
.rightdown {
  border-radius: 0 0 50px 0;
}
.rightup {
  border-radius: 0 50px 0 0;
}
</style>
