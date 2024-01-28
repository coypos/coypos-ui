<template>
  <div class="about">
    <div class="row">
      <div class="col 12">
        <h1>{{ $t(`yourshopping`) }}</h1>
      </div>
    </div>
    <div class="row list">
      <div class="col-12">
        <div v-for="(product, index) in cartList" :key="index" class="row">
          <div class="col-6">{{ product.name }}</div>
          <div class="col-2">{{ product.count }}</div>
          <div class="col-4 right" v-if="product.discountedPrice == null">
            {{ (product.price * product.count).toFixed(2) }} zł
          </div>
          <div class="col-4 right" v-else>
            {{ (product.discountedPrice * product.count).toFixed(2) }} zł
            <span class="oldprice">
              <del v-if="product.discountedPrice != null"
                >{{ (product.price * product.count).toFixed(2) }} zł</del
              ></span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row summary">
      <div class="col-4">{{ $t(`total`) }}:</div>
      <div class="col-4 center">
        <div class="cartico">
          <img src="/images/buttons/cart.png" />
        </div>
      </div>
      <div class="col-2 right">
        <del v-if="saved.toFixed(2) != sum.toFixed(2)"
          >{{ saved.toFixed(2) }}zł</del
        >
      </div>
      <div class="col-2 right">{{ sum.toFixed(2) }}zł</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import { CartModel } from "@/types/api/Cart";

export default defineComponent({
  name: "CartComponent",

  setup() {
    let cartList = ref<CartModel[]>([]);
    let sum = ref<number>(0.0);
    let saved = ref<number>(0.0);
    return { cartList, sum, saved };
  },
  methods: {
    async getCartList() {
      this.cartList = this.$storage.getStorageSync("cartList") as CartModel[];
      this.sum = 0;
      this.saved = 0;
      if (this.cartList) {
        for (let i = 0; this.cartList.length > i; i++) {
          this.saved =
            this.saved + this.cartList[i].count * this.cartList[i].price;
        }
      }

      if (this.cartList) {
        for (let i = 0; this.cartList.length > i; i++) {
          if (this.cartList[i].discountedPrice != null) {
            this.sum =
              this.sum +
              this.cartList[i].count * (this.cartList[i].discountedPrice || 1);
          } else {
            this.sum =
              this.sum + this.cartList[i].count * this.cartList[i].price;
          }
          this.$storage.setStorageSync("sum", this.sum);
        }
      }
      this.calculateOnApi();
    },
    async calculateOnApi() {
      if (this.cartList.length > 0) {
        const data = this.cartList;

        const jsonString = JSON.stringify(data);
        const encodedJsonString = encodeURIComponent(jsonString);
      }
    },
  },

  mounted() {
    setInterval(() => {
      this.getCartList();
      if (
        this.cartList !=
        (this.$storage.getStorageSync("cartList") as CartModel[])
      ) {
        this.getCartList();
      }
    }, 400);
  },
});
</script>
<style scoped lang="scss">
.about {
  color: var(--text-color);
  height: 530px;
  width: 100%;
  position: relative;
  text-align: left;
  padding: 30px;
  border-radius: 40px;
  margin: 40px 15px;
  background-color: var(--cart-first-background-color);
  border: 2px solid var(--cart-border-color);
  .list {
    position: relative;
    color: black;
    font-weight: 600;
    height: 85%;
    right: 0;
    text-align: left;
    padding: 20px 20px 20px;
    border-radius: 40px;
    margin: 5px;
    background-color: var(--cart-second-background-color);
    border: 2px solid var(--cart-second-background-color-darker);
    overflow: clip;
    .col-12 {
      bottom: 30px;
      width: 90%;
      min-height: 90%;
      position: absolute;
    }
  }
  .summary {
    font-size: 1.15em;
    font-weight: 700;
    margin: 5px 20px;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
  .cartico {
    z-index: 9;
    position: relative;
    border-radius: 100%;

    background-color: #f3f3f3;
    max-height: 100px;
    max-width: 100px;
    margin: auto;
    margin-top: -40px;
    img {
      padding: 10px;
      max-height: 100px;
      max-width: 100px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
