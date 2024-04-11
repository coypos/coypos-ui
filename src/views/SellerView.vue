<template>
  <div>
    <div class="row">
      <div class="col-5"><cart-component></cart-component></div>
      <div class="col-7">
        <div class="row">
          <div class="col-3">
            <button @click="isAdult" class="btn btn-success">
              Potwierdz 18+
            </button>
          </div>
          <div class="col-3">
            <button @click="notAdult" class="btn btn-success">
              Nie jest 18+
            </button>
          </div>
          <div class="col-3">
            <button @click="deleteallproducts" class="btn btn-success">
              Wyczyść koszyk
            </button>
          </div>
          <div class="col-3">
            <button @click="triggerdelete" class="btn btn-success">
              Usuń produkt z koszyka
            </button>
            <select
              v-if="deleting"
              class="form-control"
              id="products"
              data-live-search="true"
              v-model="selectedproduct"
            >
              <option
                v-for="(product, index) in products"
                :key="index"
                :data-tokens="index"
                :value="index"
              >
                {{ product.name }}
              </option>
            </select>
            <button @click="deleteproduct()" class="btn btn-success">
              Potwierdź
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <button @click="clearCache()" class="btn btn-warning">
              Wyczyść cache
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import CartComponent from "@/components/CartComponent.vue";
import { CartModel } from "@/types/api/Cart";

export default defineComponent({
  name: "SearchView",
  components: { CartComponent },
  setup() {
    let deleting = ref<boolean>(false);
    let products = ref<CartModel[]>([]);
    let selectedproduct = ref<number>();
    return {
      deleting,
      products,
      selectedproduct,
    };
  },
  methods: {
    //pobranie koszyka do zmiennej i wyswietlenie listy produktow do usuniecia
    triggerdelete() {
      this.deleting = true;
      this.products = this.$storage.getStorageSync("cartList") as CartModel[];
    },
    //wyczyszczenie cache przegladarki przy zmianach w bazie
    clearCache() {
      let arr = [];
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)) {
          let key = localStorage.key(i) as string;
          if (key.substring(0, 12) == "axios-cache:") {
            arr.push(key);
          }
        }
      }

      // Iterate over arr and remove the items by key
      for (let i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i]);
      }
    },
    //oznaczenie klienta jako pelnoletniego
    isAdult() {
      this.$storage.setStorageSync("checked18", true);
    },
    //uzuniecie produktu z koszyka
    deleteproduct(id?: number) {
      this.deleting = false;
      let list = this.$storage.getStorageSync("cartList") as CartModel[];
      if (id != undefined) {
        list.splice(id, 1);
      } else if (this.selectedproduct != undefined) {
        list.splice(this.selectedproduct, 1);
      }
      this.$storage.setStorageSync("cartList", list);
    },
    //uzuniecie wszystkich produktow z koszyka
    deleteallproducts() {
      this.$storage.setStorageSync("cartList", []);
    },
    //usuniecie produktu dla pelnoletnich przy odrzuceniu pelnoletnosci przez sprzedawce
    notAdult() {
      let len = (this.$storage.getStorageSync("cartList") as CartModel[])
        .length;

      this.deleteproduct(len - 1);

      this.$storage.setStorageSync("checked18", false);
    },
  },
});
</script>
<style scoped lang="scss">
.btn {
  margin-top: 50px;
  height: 60px;
  font-size: 16px;
}
</style>
