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
          :image="'data:image/jpeg;base64,' + category.image"
          :small="false"
          @click="
            $router.push({
              name: `products`,
              query: {
                category: category.id,
                lang: $router.currentRoute.value.query.lang,
                page: 1,
              },
            })
          "
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
    </div>
    <div
      v-if="itemsPerPage / categories.length > 2"
      class="row"
      style="height: 265px"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import ProductComponent from "@/components/ProductComponent.vue";
import PageButtonComponent from "@/components/PageButtonComponent.vue";
import { showModal } from "@/functions";
import { CategoryModel } from "@/types/api/Category";
import { ResponseModel } from "@/types/Response";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "CategoryView",

  components: {
    ProductComponent,
    PageButtonComponent,
  },
  setup() {
    let categories = ref<CategoryModel[]>([]);
    let column = ref<number>(0);
    let itemsPerPage = ref<number>(5);
    let page = ref<number>(1);
    let totalPages = ref<number>(1);
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t, totalPages, page, itemsPerPage, column, categories };
  },

  methods: {
    showModal,
    //pobranie podkategorii kategorii z zadanym id
    async getParentCategoriesList() {
      const data = {
        parentCategory: { id: this.$router.currentRoute.value.query.category },
      };
      const jsonString = JSON.stringify(data);
      const encodedJsonString = encodeURIComponent(jsonString);

      try {
        const lang = this.$storage.getStorageSync("lang");

        await this.$axios
          .get(
            `/categories?filter=AND&loadImages=true&language=${lang}&itemsPerPage=${this.itemsPerPage}&page=${this.page}&body=${encodedJsonString}`
          )
          .then((response) => {
            const resp: ResponseModel = response.data;
            this.categories = resp.response;
            this.totalPages = resp.totalPages;
          });
      } catch (e) {
        showModal((this.t("error") + e) as string);
      }
    },
  },
  mounted() {
    //obliczamy ilosc kategorii do wyswietlania na stronie
    this.page = parseInt(this.$router.currentRoute.value.query.page as string);
    this.column = 12 / Math.ceil(this.itemsPerPage / 2);
    this.getParentCategoriesList();
  },
  updated() {
    //sprawdzamy czy nie zmienila sie strona i wyswietlamy nowe kategorie jezeli sie zmienila
    if (
      this.page !=
      parseInt(this.$router.currentRoute.value.query.page as string)
    ) {
      this.page = parseInt(
        this.$router.currentRoute.value.query.page as string
      );
      this.getParentCategoriesList();
    }
  },
  watch: {
    $route: function (to) {
      this.getParentCategoriesList();
    },
  },
});
</script>

<style scoped lang="scss">
.cart {
  padding-top: 30px;
}
</style>
