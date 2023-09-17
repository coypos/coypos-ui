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
            <h3 class="scaninfo">Zeskanuj kod towaru lub wybierz kategorie</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <product-component
              text="Owoce i Warzywa"
              @click="
                $router.push({
                  name: `category`,
                  query: {
                    category: '1',
                    lang: $router.currentRoute.value.query.lang,
                  },
                })
              "
              image="/images/products/vegetables.png"
            ></product-component>
          </div>
          <div class="col-4">
            <product-component
              @click="
                $router.push({
                  name: `category`,
                  query: {
                    category: '2',
                    lang: $router.currentRoute.value.query.lang,
                  },
                })
              "
              text="Pieczywo"
              image="/images/products/bread.png"
            ></product-component>
          </div>
          <div class="col-4">
            <product-component
              @click="
                $router.push({
                  name: `category`,
                  query: {
                    category: '3',
                    lang: $router.currentRoute.value.query.lang,
                  },
                })
              "
              text="Cukierki"
              image="/images/products/sweets.png"
            ></product-component>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button-component
              text="Zakończ i zapłać"
              :width="90"
            ></button-component>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button-component
              @click="showModal()"
              color="yellow"
              :text="$t(`help`)"
              :width="90"
            ></button-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import CartComponent from "@/components/CartComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";

import { useI18n } from "vue-i18n";
import ProductComponent from "@/components/ProductComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { showModal } from "@/functions";
export default defineComponent({
  name: "CartView",
  methods: { showModal },
  components: {
    ProductComponent,
    CartComponent,
    ButtonComponent,
    ScannerComponent,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
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
