<template>
  <div class="row productlist">
    <div :class="'col-' + column" v-for="product in products" :key="product.id">
      <product-component
        :small="false"
        :text="product.name"
        :image="'data:image/jpeg;base64,' + product.image"
        @click="showCountModal(product)"
      ></product-component>
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
    <count-component :product="product"></count-component>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";

import { useI18n } from "vue-i18n";
import { showCountModal, showModal } from "@/functions";
import { ProductModel } from "@/types/api/Product";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import { CartModel } from "@/types/api/Cart";
import PageButtonComponent from "@/components/PageButtonComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import { ResponseModel } from "@/types/Response";
export default defineComponent({
  name: "productlistView",
  components: {
    PageButtonComponent,
    ProductComponent,
    CountComponent,
  },
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
    let product = ref<ProductModel>();
    return { product, totalPages, t, products, column, itemsPerPage, page };
  },
  methods: {
    showCountModal(product: ProductModel) {
      this.product = product;
      if (product.isLoose && product.name != null && product.price != null) {
        this.addToCart(product.name, product.price, 1, product.discountedPrice);
      } else {
        showCountModal();
      }
    },
    async addToCart(
      name: string,
      price: number,
      count: number,
      discountedPrice: number | null
    ) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({
        name: name,
        price: price,
        count: count,
        discountedPrice: discountedPrice,
      });
      this.$storage.setStorageSync("cartList", list);
      this.$router.push(`/cart`);
    },
    async getProducts() {
      try {
        const data = {
          category: { id: this.$router.currentRoute.value.query.category },
        };
        const lang = this.$storage.getStorageSync("lang");

        const jsonString = JSON.stringify(data);
        const encodedJsonString = encodeURIComponent(jsonString);
        await this.$axios
          .get(
            `/products?filter=AND&language=${lang}&loadImages=true&itemsPerPage=${this.itemsPerPage}&page=${this.page}&body=${encodedJsonString}`
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
  watch: {
    $route: function (to) {
      this.getProducts();
    },
  },
});
</script>
<style scoped lang="scss">
.product {
  margin: 15px;
}
.productlist {
  margin-top: 20px;
}
</style>
