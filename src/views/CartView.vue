<template>
  <div class="cart">
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
            @click="pay(payment.name)"
          >
            <product-component
              :text="payment.name"
              image="/images/products/vegetables.png"
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
        <div class="row">
          <div class="col-12">
            <product-component
              v-if="!payView"
              @click="showModal('Wezwano pomoc')"
              :small="true"
              :width="34"
              color="yellow"
              :text="$t(`help`)"
              image="/images/buttons/chat.png"
            ></product-component>

            <round-button-component
              v-if="!payView"
              @click="showCountModal(product)"
              image="/images/buttons/barcode.png"
            ></round-button-component>
            <round-button-component
              v-if="!payView"
              @click="
                $router.push({
                  name: `search`,
                  query: {
                    lang: $router.currentRoute.value.query.lang,
                    page: 1,
                  },
                })
              "
              image="/images/buttons/search.png"
            ></round-button-component>
            <product-component
              v-if="payView"
              @click="showModal('Wezwano pomoc')"
              :small="false"
              :width="100"
              color="yellow"
              :text="$t(`help`)"
              image="/images/buttons/chat.png"
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
import { showCountModal, showModal } from "@/functions";
import { ResponseModel } from "@/types/Response";
import CountComponent from "@/components/CountComponent.vue";
import { ProductModel } from "@/types/api/Product";
import RoundButtonComponent from "@/components/RoundButtonComponent.vue";
export default defineComponent({
  name: "CartView",

  components: {
    CountComponent,
    ProductComponent,
    CartComponent,
    ScannerComponent,
    RoundButtonComponent,
  },
  setup() {
    let categories = ref<CategoryModel[]>([]);
    let payView = ref<boolean>(false);
    let payments = ref<CategoryModel[]>([]);
    return { payments, payView, categories };
  },
  methods: {
    showCountModal() {
      showCountModal();
    },
    pay(name: string) {
      if (name == "Inne") {
        const suma = this.$storage.getStorageSync("sum");
        window.location.href = `https://platnosc.hotpay.pl/?SEKRET=ZTY0MHBVb29JRU5MeHNKdExZWGdieGZVRDIwYU9sZ3BWSTl0RC9BeDhQWT0%2C&KWOTA=${suma}&NAZWA_USLUGI=Zakupy&ADRES_WWW=https%3A%2F%2Fsmilginp.evolpe.net&ID_ZAMOWIENIA=1&EMAIL=&DANE_OSOBOWE=`;
      }
    },
    showModal,
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
        showModal(e as string);
      }
    },
  },
  mounted() {
    this.payments = [
      {
        id: null,
        name: "Gotówka",
        parentCategory: null,
        updateDate: null,
        createDate: null,
        image: null,
        isVisible: null,
      },
      {
        id: null,
        name: "Inne",
        parentCategory: null,
        updateDate: null,
        createDate: null,
        image: null,
        isVisible: null,
      },
      {
        id: null,
        name: "Karta",
        parentCategory: null,
        updateDate: null,
        createDate: null,
        image: null,
        isVisible: null,
      },
    ];
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
.scaninfo {
  font-weight: 700;
}
</style>
