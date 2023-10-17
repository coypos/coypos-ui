<template>
  <div class="row productlist">
    <div :class="'col-' + column" v-for="product in products" :key="product.id">
      <product-component
        :small="false"
        :text="product.name"
        image="/images/products/bread3.png"
        @click="addToCart(product.name, product.price)"
      ></product-component>
      <back-button-component where="cart"></back-button-component>
    </div>
    <div :class="'col-' + column">
      <page-button-component
        v-if="page != 1"
        type="left"
        :page="page - 1"
      ></page-button-component>
      <page-button-component
        v-if="totalPages != page"
        type="right"
        :page="page + 1"
      ></page-button-component>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";

import { useI18n } from "vue-i18n";
import { showModal } from "@/functions";
import { ProductModel } from "@/types/api/Product";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import { CartModel } from "@/types/api/Cart";
import PageButtonComponent from "@/components/PageButtonComponent.vue";
import { ResponseModel } from "@/types/Response";
export default defineComponent({
  name: "productlistView",
  components: { PageButtonComponent, BackButtonComponent, ProductComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    let products = ref<ProductModel[]>([]);
    let column = ref<number>(0);
    let itemsPerPage = ref<number>(5);
    let page = ref<number>(1);
    let totalPages = ref<number>(1);
    return { totalPages, t, products, column, itemsPerPage, page };
  },
  methods: {
    async getProducts() {
      try {
        const data = {
          category: { id: this.$router.currentRoute.value.query.category },
        };

        const jsonString = JSON.stringify(data);
        const encodedJsonString = encodeURIComponent(jsonString);
        await this.$axios
          .get(
            `/products?filter=AND&itemsPerPage=${this.itemsPerPage}&page=${this.page}&body=${encodedJsonString}`
          )
          .then((response) => {
            const resp: ResponseModel = response.data;
            this.products = resp.response;
            this.totalPages = resp.totalPages;
          });
      } catch (e) {
        showModal(e as string);
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
    this.page = parseInt(this.$router.currentRoute.value.query.page as string);
    this.column = 12 / Math.ceil(this.itemsPerPage / 2);
    this.getProducts();
  },
  updated() {
    if (
      this.page !=
      parseInt(this.$router.currentRoute.value.query.page as string)
    ) {
      this.page = parseInt(
        this.$router.currentRoute.value.query.page as string
      );
      this.getProducts();
    }
  },
});
</script>
<style scoped lang="scss">
.product {
  margin: 15px;
}
</style>
