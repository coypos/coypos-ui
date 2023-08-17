<template>
  <div class="productlist">
    <h1>This is an Product List page</h1>
    <search-component></search-component>
    <product-component v-for="number in 10" :key="number"></product-component>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import SearchComponent from "@/components/SearchComponent.vue";
import ProductComponent from "@/components/ProductComponent.vue";

import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "ThingsView",
  components: { SearchComponent, ProductComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
  },
});
</script>
