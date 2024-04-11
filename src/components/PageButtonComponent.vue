<template>
  <div class="pagebutton">
    <img
      v-if="type == 'left'"
      @click="goToPage()"
      src="/images/buttons/back.png"
    />
    <img
      v-if="type == 'right'"
      @click="goToPage()"
      src="/images/buttons/right.png"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BackButtonComponent",
  props: {
    page: Number,
    type: String,
  },
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    return { buttonClass };
  },
  methods: {
    //zmiana query nr strony, aby przejsc na nastepna/poprzednia
    goToPage() {
      const currentLang = this.$router.currentRoute.value.query.lang;
      const currentRoute = this.$router.currentRoute.value.name as string;
      const currentCategory = this.$router.currentRoute.value.query
        .category as string;

      this.$router.push({
        name: currentRoute,
        query: {
          lang: currentLang,
          page: this.page,
          category: currentCategory,
        },
      });
    },
  },
});
</script>
<style scoped lang="scss">
.pagebutton {
  border-radius: 100%;
  padding: 20px;
  margin-top: 10px;
  background-color: var(--button-color);
  display: inline-block;
  width: 150px;
  height: 150px;
  img {
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
