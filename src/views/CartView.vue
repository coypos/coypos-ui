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
            <h3>Zeskanuj kod towaru lub wybierz kategorie</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <product-component
              text="Owoce i Warzywa"
              image="/images/products/vegetables.png"
            ></product-component>
          </div>
          <div class="col-6">
            <product-component
              text="Pieczywo"
              image="/images/products/bread.png"
            ></product-component>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <product-component
              text="Zakończ i zapłać"
              image="/images/products/card.png"
            ></product-component>
          </div>
          <div class="col-6">
            <product-component
              color="yellow"
              :text="$t(`help`)"
              image="/images/products/chat.png"
            ></product-component>
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
export default defineComponent({
  name: "ThingsView",
  components: {
    ProductComponent,
    CartComponent,

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
</style>
