<template>
  <div class="productlist">
    <product-component
      v-for="number in 15"
      class="product"
      :key="number"
      :small="true"
      text="Chleb"
      image="/images/products/bread3.png"
      @click="
        $router.push({
          name: `products`,
        })
      "
    ></product-component>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";

import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "productlistView",
  components: { ProductComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
  },
});
</script>
<style scoped lang="scss"></style>
