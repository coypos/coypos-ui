<template>
  <div class="cart">
    <div class="row">
      <div
        :class="'col-' + column"
        v-for="category in categories"
        :key="category.id"
      >
        <product-component
          :text="category.name"
          image="/images/products/fruits.png"
          :small="false"
          @click="
            $router.push({
              name: `products`,
              query: {
                category: category.id,
                lang: $router.currentRoute.value.query.lang,
              },
            })
          "
        ></product-component>
      </div>
    </div>
    <div
      v-if="itemsPerPage / categories.length > 2"
      class="row"
      style="height: 265px"
    ></div>
    <div class="row">
      <div class="col-12">
        <product-component
          @click="showModal()"
          :small="true"
          :width="80"
          color="yellow"
          :text="$t(`help`)"
          image="/images/buttons/chat.png"
        ></product-component>
      </div>
    </div>
    <back-button-component where="cart"></back-button-component>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import { showModal } from "@/functions";
import { CategoryModel } from "@/types/api/Category";
import { SettingModel } from "@/types/api/Setting";
export default defineComponent({
  name: "CategoryView",

  components: {
    ProductComponent,
    BackButtonComponent,
  },
  setup() {
    let categories = ref<CategoryModel[]>([]);
    let column = ref<number>(0);
    let itemsPerPage = ref<number>(5);
    let settings = ref<SettingModel[]>([]);
    let page = ref<number>(1);
    return { settings, page, itemsPerPage, column, categories };
  },

  methods: {
    showModal,

    async getParentCategoriesList() {
      const data = {
        parentCategory: { id: this.$router.currentRoute.value.query.category },
      };
      const jsonString = JSON.stringify(data);
      const encodedJsonString = encodeURIComponent(jsonString);

      try {
        await this.$axios
          .get(
            `/categories?filter=AND&itemsPerPage=${this.itemsPerPage}&page=${this.page}&body=${encodedJsonString}`
          )
          .then((response) => {
            this.categories = response.data;
            console.log(this.categories);
          });
      } catch (e) {
        showModal();
      }
    },
  },
  mounted() {
    this.column = 12 / Math.ceil(this.itemsPerPage / 2);
    this.getParentCategoriesList();
  },
});
</script>

<style scoped lang="scss">
.cart {
  padding-top: 30px;
}
</style>
