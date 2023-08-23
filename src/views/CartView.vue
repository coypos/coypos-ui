<template>
  <div class="cart">
    <h1>This is an Cart page</h1>
    <cart-component></cart-component>
    <pay-component></pay-component>
    <scanner-component></scanner-component>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import CartComponent from "@/components/CartComponent.vue";
import PayComponent from "@/components/PayComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";

import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "ThingsView",
  components: { CartComponent, PayComponent, ScannerComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
  },
});
</script>
