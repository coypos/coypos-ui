<template>
  <div class="row productlist">
    <div :class="'col-' + column" v-for="product in products" :key="product.id">
      <product-component
        :small="false"
        :text="product.name"
        style="height: 220px"
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
        v-if="totalPages != page && totalPages != 0"
        type="right"
        :page="page + 1"
      ></page-button-component>
    </div>
    <count-component :product="product"></count-component>
    <div class="searchcomponent">
      <input
        :value="input"
        class="input searchinput"
        @input="onInputChange"
        placeholder="Tap on the virtual keyboard to start"
      />
      <search-component class="search" @onChange="onChange" :input="input" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";

import { useI18n } from "vue-i18n";
import { showCountModal, showModal } from "@/functions";
import { ProductModel } from "@/types/api/Product";
import { CartModel } from "@/types/api/Cart";
import PageButtonComponent from "@/components/PageButtonComponent.vue";
import CountComponent from "@/components/CountComponent.vue";
import { ResponseModel } from "@/types/Response";
import SearchComponent from "@/components/SearchComponent.vue";
import { KeyboardInputModal } from "@/types/KeyboardInput";
export default defineComponent({
  name: "SearchView",
  components: {
    SearchComponent,
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
    let input = ref<string>();
    return {
      input,
      product,
      totalPages,
      t,
      products,
      column,
      itemsPerPage,
      page,
    };
  },
  methods: {
    showCountModal(product: ProductModel) {
      this.product = product;
      if (
        product.isLoose &&
        product.name != null &&
        product.price != null &&
        product.id != null
      ) {
        this.addToCart(
          product.name,
          product.price,
          1,
          product.discountedPrice,
          product.id
        );
      } else {
        showCountModal();
      }
    },
    async addToCart(
      name: string,
      price: number,
      count: number,
      discountedPrice: number | null,
      id: number
    ) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({
        name: name,
        price: price,
        count: count,
        discountedPrice: discountedPrice,
        id: id,
      });
      this.$storage.setStorageSync("cartList", list);
      this.$router.push(`/cart`);
    },
    onChange(input: string) {
      this.input = input;
    },
    onInputChange(input: KeyboardInputModal) {
      this.input = input.target.value;
    },
    async getProducts() {
      try {
        if (this.input) {
          await this.$axios
            .get(
              `/search/${this.input}?loadImages=true&itemsPerPage=${this.itemsPerPage}&page=${this.page}`
            )
            .then((response) => {
              const resp: ResponseModel = response.data;
              this.products = resp.response;
              this.totalPages = resp.totalPages;
            });
        }
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
    input() {
      this.getProducts();
    },
  },
});
</script>
<style scoped lang="scss">
.product {
  margin: 15px;
}
.searchcomponent {
  //background: var(--product-color-darker);
  position: absolute;
  width: 80%;
  height: 245px;
  right: 0;
  bottom: 90px;
  .searchinput {
    position: absolute;
    left: 5%;
    width: 90%;
    bottom: 250px;
  }
  .search {
    position: absolute;
    left: 5%;
    width: 90%;
    bottom: 20px;
  }
}
</style>
