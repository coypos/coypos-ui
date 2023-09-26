<template>
  <div class="cart">
    <div v-if="$router.currentRoute.value.query.category == 4" class="row">
      <div class="col-3"></div>

      <div class="col-3">
        <product-component
          text="Owoce"
          image="/images/products/fruits.png"
          :small="false"
          @click="
            $router.push({
              name: `products`,
              query: {
                category: '6',
                lang: $router.currentRoute.value.query.lang,
              },
            })
          "
        ></product-component>
      </div>
      <div class="col-3">
        <product-component
          text="Warzywa"
          image="/images/products/vegetables2.png"
          :small="false"
          @click="
            $router.push({
              name: `products`,
              query: {
                category: '7',
                lang: $router.currentRoute.value.query.lang,
              },
            })
          "
        ></product-component>
      </div>
      <div class="col-3"></div>
    </div>

    <div v-if="$router.currentRoute.value.query.category == 3" class="row">
      <div class="col-3"></div>

      <div class="col-3">
        <product-component
          text="Chleby"
          image="/images/products/bread3.png"
          @click="
            $router.push({
              name: `products`,
              query: {
                category: '8',
                lang: $router.currentRoute.value.query.lang,
              },
            })
          "
        ></product-component>
      </div>
      <div class="col-3">
        <product-component
          text="Bułki"
          image="/images/products/bread2.png"
          @click="
            $router.push({
              name: `products`,
              query: {
                category: '2',
                lang: $router.currentRoute.value.query.lang,
              },
            })
          "
        ></product-component>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <product-component
          @click="showModal()"
          :small="true"
          :width="80"
          color="yellow"
          :text="$t(`help`)"
          image="/images/buttons/chat.png"
        ></product-component>
      </div>
    </div>
    <back-button-component where="cart"></back-button-component>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { useI18n } from "vue-i18n";
import ProductComponent from "@/components/ProductComponent.vue";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import router from "@/router";
import { showModal } from "@/functions";
export default defineComponent({
  name: "ThingsView",
  methods: {
    showModal,
    router() {
      return router;
    },
  },
  components: {
    ProductComponent,
    BackButtonComponent,
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
