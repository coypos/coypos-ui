<template>
  <div class="productlist">
    <product-component
      v-for="product in products"
      class="product"
      :key="product.id"
      :small="true"
      :text="product.name"
      image="/images/products/bread3.png"
      @click="addToCart(product.name, product.price)"
    ></product-component>
    <back-button-component where="cart"></back-button-component>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";

import { useI18n } from "vue-i18n";
import { showModal } from "@/functions";

import { ProductModel } from "@/types/Product";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import { CartModel } from "@/types/Cart";
export default defineComponent({
  name: "productlistView",
  components: { BackButtonComponent, ProductComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    let products = ref<ProductModel[]>([]);

    return { t, products };
  },
  methods: {
    async getProducts() {
      try {
        await this.$axios
          .get(
            `/products?category=${this.$router.currentRoute.value.query.category}`
          )
          .then((response) => {
            this.products = response.data;
          });
      } catch (e) {
        showModal();
      }
    },
    async addToCart(name: string, price: number) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({ name: name, price: price });
      this.$storage.setStorageSync("cartList", list);
      this.$router.push(`/cart`);
    },
  },
  mounted() {
    this.getProducts();
  },
});
</script>
<style scoped lang="scss"></style>
