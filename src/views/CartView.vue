<template>
  <div class="cart">
    <div class="row">
      <div class="col-5 list">
        <cart-component></cart-component>
        <scanner-component></scanner-component>
      </div>
      <div class="col-7">
        <div class="row">
          <div class="col-12">
            <h3 class="scaninfo">Zeskanuj kod towaru lub wybierz kategorie</h3>
          </div>
        </div>
        <div class="row">
          <div v-for="category in categories" :key="category.id" class="col-4">
            <product-component
              :text="category.name"
              @click="
                $router.push({
                  name: `category`,
                  query: {
                    category: category.id,
                    lang: $router.currentRoute.value.query.lang,
                  },
                })
              "
              image="/images/products/vegetables.png"
            ></product-component>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <product-component
              @click="showModal()"
              :small="true"
              :width="100"
              color="green"
              :text="$t('Pay')"
              image="/images/buttons/card.png"
            ></product-component>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <product-component
              @click="showModal()"
              :small="true"
              :width="100"
              color="yellow"
              :text="$t(`help`)"
              image="/images/buttons/chat.png"
            ></product-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import CartComponent from "@/components/CartComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";

import { useI18n } from "vue-i18n";
import ProductComponent from "@/components/ProductComponent.vue";
import { CategoryModel } from "@/types/api/Category";
import { showModal } from "@/functions";
export default defineComponent({
  name: "CartView",

  components: {
    ProductComponent,
    CartComponent,
    ScannerComponent,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    let categories = ref<CategoryModel[]>([]);
    return { t, categories };
  },
  methods: {
    showModal,
    async getParentCategoriesList() {
      const data = {
        ParentCategory: null,
      };

      const jsonString = JSON.stringify(data);
      const encodedJsonString = encodeURIComponent(jsonString);

      try {
        await this.$axios
          .get(`/categories?body=${encodedJsonString}`)
          .then((response) => {
            this.categories = response.data.filter((object: CategoryModel) => {
              return object.parentCategory == null;
            });
          });
      } catch (e) {
        showModal();
      }
    },
  },
  mounted() {
    this.getParentCategoriesList();
  },
});
</script>

<style scoped lang="scss">
.cart {
  padding-top: 30px;
}
.scaninfo {
  font-weight: 700;
}
</style>
