<template>
  <div class="cart">
    <div v-if="$router.currentRoute.value.query.category == 1" class="row">
      <div class="col-6">
        <product-component
          text="Owoce"
          image="/images/products/fruits.png"
          @click="
            $router.push({
              name: `products`,
            })
          "
        ></product-component>
      </div>
      <div class="col-6">
        <product-component
          text="Warzywa"
          image="/images/products/vegetables2.png"
          @click="
            $router.push({
              name: `products`,
            })
          "
        ></product-component>
      </div>
    </div>
    <div v-if="$router.currentRoute.value.query.category == 2" class="row">
      <div class="col-6">
        <product-component
          text="Chleby"
          image="/images/products/bread3.png"
          @click="
            $router.push({
              name: `products`,
            })
          "
        ></product-component>
      </div>
      <div class="col-6">
        <product-component
          text="Bułki"
          image="/images/products/bread2.png"
          @click="
            $router.push({
              name: `products`,
            })
          "
        ></product-component>
      </div>
    </div>
    <div class="row">
      <div class="col-6"></div>
      <div class="col-6">
        <product-component
          color="yellow"
          :text="$t(`help`)"
          image="/images/products/chat.png"
        ></product-component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { useI18n } from "vue-i18n";
import ProductComponent from "@/components/ProductComponent.vue";
import router from "@/router";
export default defineComponent({
  name: "ThingsView",
  methods: {
    router() {
      return router;
    },
  },
  components: {
    ProductComponent,
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
