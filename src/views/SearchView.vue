<template>
  <div class="row productlist">
    <div :class="'col-' + column" v-for="product in products" :key="product.id">
      <product-component
        :small="false"
        :text="product.name"
        image="/images/products/bread3.png"
        @click="showCountModal(product)"
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
    <count-component :product="product"></count-component>
    <div class="searchcomponent">
      <input
        :value="input"
        class="input searchinput"
        @input="onInputChange"
        placeholder="Tap on the virtual keyboard to start"
      />
      <search-component
        class="search"
        @onChange="onChange"
        @onKeyPress="onKeyPress"
        :input="input"
      />
    </div>
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
import SearchComponent from "@/components/SearchComponent.vue";
export default defineComponent({
  name: "SearchView",
  components: {
    SearchComponent,
    PageButtonComponent,
    BackButtonComponent,
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
    let input = ref<any>();
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
      if (product.isLoose) {
        this.addToCart(product.name, product.price, 1);
      } else {
        showCountModal();
      }
    },
    async addToCart(name: string, price: number, count: number) {
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      list.push({ name: name, price: price, count: count });
      this.$storage.setStorageSync("cartList", list);
      this.$router.push(`/cart`);
    },
    onChange(input: any) {
      this.input = input;
    },
    onKeyPress(button: any) {
      console.log("button", button);
    },
    onInputChange(input: any) {
      this.input = input.target.value;
    },
    async getProducts() {
      try {
        const data = {
          name: this.input,
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
    input(input) {
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
  background: var(--product-color-darker);
  position: absolute;
  width: 100%;
  height: 320px;
  left: 0;
  bottom: 0;
  .searchinput {
    position: absolute;
    left: 5%;
    width: 90vw;
    bottom: 270px;
  }
  .search {
    position: absolute;
    left: 5%;
    width: 90vw;
    bottom: 20px;
  }
}
</style>
