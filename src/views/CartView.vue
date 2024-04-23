<template>
  <div class="cart">
    <div class="row">
      <div class="col-4">
        <div id="username" v-if="username">Witaj, {{ username }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-5 list">
        <cart-component></cart-component>
        <scanner-component></scanner-component>
      </div>
      <div class="col-7">
        <div class="row">
          <div class="col-12">
            <h3 class="scaninfo" v-if="!payView">
              {{ $t("scaninfo") }}
            </h3>
            <h3 class="scaninfo" v-else>
              {{ $t("payinfo") }}
            </h3>
          </div>
        </div>
        <div class="row" v-if="!payView">
          <div v-for="category in categories" :key="category.id" class="col-4">
            <product-component
              :text="category.name"
              @click="
                $router.push({
                  name: `category`,
                  query: {
                    category: category.id,
                    page: 1,
                    lang: $router.currentRoute.value.query.lang,
                  },
                })
              "
              :image="'data:image/jpeg;base64,' + category.image"
            ></product-component>
          </div>
        </div>
        <div class="row" v-else>
          <div
            v-for="(payment, index) in payments"
            :key="index"
            class="col-4"
            style="margin-top: 70px"
            @click="pay(payment.id)"
          >
            <product-component
              :text="payment.name"
              :image="'data:image/jpeg;base64,' + payment.image"
            ></product-component>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <product-component
              v-if="!payView"
              @click="payView = true"
              :small="true"
              :width="100"
              color="green"
              :text="$t(`pay`)"
              image="/images/buttons/card.png"
            ></product-component>
          </div>
        </div>
      </div>
    </div>
    <count-component :barcode="true"></count-component>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import CartComponent from "@/components/CartComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";

import ProductComponent from "@/components/ProductComponent.vue";
import { CategoryModel } from "@/types/api/Category";
import { showModal } from "@/functions";
import { ResponseModel } from "@/types/Response";
import CountComponent from "@/components/CountComponent.vue";
import { CartModel } from "@/types/api/Cart";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "CartView",

  components: {
    CountComponent,
    ProductComponent,
    CartComponent,
    ScannerComponent,
  },
  setup: function () {
    let categories = ref<CategoryModel[]>([]);
    let payView = ref<boolean>(false);
    let payments = ref<CategoryModel[]>([]);
    let username = ref<string>("");
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t, username, payments, payView, categories };
  },
  methods: {
    //funkcja wysylajaca koszyk i dane kupujacego do api aby utworzyc paragon
    async pay(id: number) {
      let cartlist = this.$storage.getStorageSync("cartList") as CartModel[];
      let basket = [];
      //przygotowanie listy produktow pod api
      for (let i = 0; i < cartlist.length; i++) {
        basket.push({
          product_id: cartlist[i].id,
          quantity: cartlist[i].count,
        });
      }

      const data = {
        user_id: this.$storage.getStorageSync("user") || 40,
        payment_method: id,
        basket_items: basket,
        transaction_id: null,
      };

      try {
        await this.$axios.post(`/receipt`, data).then((response) => {
          const resp: ResponseModel = response.data;
          console.log(resp);
          this.$router.push({ name: "home" });
        });
      } catch (e) {
        showModal((this.t("error") + e) as string);
        //testowe wyslanie zapytania do bramki platniczej z kwota do zaplaty
        if (id == 3) {
          const suma = this.$storage.getStorageSync("sum");
          window.location.href = `https://platnosc.hotpay.pl/?SEKRET=ZTY0MHBVb29JRU5MeHNKdExZWGdieGZVRDIwYU9sZ3BWSTl0RC9BeDhQWT0%2C&KWOTA=${suma}&NAZWA_USLUGI=Zakupy&ADRES_WWW=https%3A%2F%2Fsmilginp.evolpe.net&ID_ZAMOWIENIA=1&EMAIL=&DANE_OSOBOWE=`;
        }
      }
    },
    showModal,
    //pobranie kategorii do wyswietlenia sie w koszyku jako kategorie glowne
    async getParentCategoriesList() {
      const data = {
        isVisible: true,
      };

      const jsonString = JSON.stringify(data);
      const encodedJsonString = encodeURIComponent(jsonString);

      try {
        const lang = this.$storage.getStorageSync("lang");
        await this.$axios
          .get(
            `/categories?filter=AND&language=${lang}&loadImages=true&body=${encodedJsonString}`
          )
          .then((response) => {
            const resp: ResponseModel = response.data;
            this.categories = resp.response;
          });
      } catch (e) {
        showModal((this.t("error") + e) as string);
      }
    },
    //pobranie metod platnosci do wyswietlenia w koszyku jako mozliwe do placenia
    async getPaymentsMethodsList() {
      const data = {
        enabled: true,
      };

      const jsonString = JSON.stringify(data);
      const encodedJsonString = encodeURIComponent(jsonString);

      try {
        const lang = this.$storage.getStorageSync("lang");
        await this.$axios
          .get(
            `/payment_methods?filter=AND&language=${lang}&loadImages=true&body=${encodedJsonString}`
          )
          .then((response) => {
            const resp: ResponseModel = response.data;
            this.payments = resp.response;
          });
      } catch (e) {
        showModal((this.t("error") + e) as string);
      }
    },
  },
  mounted() {
    //sprawdzanie czy nie zostala zeskanowana karta lojalnosciowa aby wyswietlic komunikat witaj
    setInterval(() => {
      if (!this.username) {
        this.username = this.$storage.getStorageSync("username") as string;
      }
    }, 400);

    this.getPaymentsMethodsList();
    this.getParentCategoriesList();
  },
  watch: {
    $route: function (to) {
      this.getParentCategoriesList();
    },
  },
});
</script>

<style scoped lang="scss">
.cart {
  padding-top: 30px;
}
#username {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
}
.scaninfo {
  font-weight: 700;
}
</style>
