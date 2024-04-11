<template>
  <div class="container-fluid">
    <div
      class="row"
      v-if="
        $router.currentRoute.value.name != `home` &&
        $router.currentRoute.value.name != `login` &&
        $router.currentRoute.value.name != `pin` &&
        $router.currentRoute.value.name != `search`
      "
    >
      <div class="col-12">
        <HeaderLayout></HeaderLayout>
      </div>
      <div class="row"></div>
    </div>

    <div class="row">
      <div class="col-12">
        <router-view />
      </div>
    </div>
    <modal-component ref="staticBackdrop"></modal-component>
    <FooterLayout
      v-if="
        $router.currentRoute.value.name != `home` &&
        $router.currentRoute.value.name != `login` &&
        $router.currentRoute.value.name != `pin`
      "
    ></FooterLayout>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--background-color);
  width: 100%;
  height: 100vh;
}
</style>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { QueryModel } from "@/types/Query";
import HeaderLayout from "@/components/layout/Header.vue";
import FooterLayout from "@/components/layout/Footer.vue";

import ModalComponent from "@/components/ModalComponent.vue";
import type { AxiosInstance } from "axios";
import { useI18n } from "vue-i18n";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    catTags: string[];
  }
}
export default defineComponent({
  name: "app",
  components: { ModalComponent, HeaderLayout, FooterLayout },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    let flagClass = ref<string>("flag");

    return { t, flagClass };
  },
  methods: {
    //zmiana jezyka kasy (dodanie do query inofmracji)
    async changeLanguage(lang: string) {
      this.$storage.setStorageSync("lang", lang);
      this.$i18n.locale = lang;
      const currentParams = await this.$router.currentRoute.value.query;
      const currentName = this.$router.currentRoute.value.name;
      const mergedParams = { ...currentParams, lang: lang };
      if (currentName) {
        await this.$router.push({ name: currentName, query: mergedParams });
      }
    },
    //sprawdzamy czy w pamieci mamy jakis zapisany jezyk i uzywamy go
    refreshLanguage(to: QueryModel) {
      const langParam = this.$storage.getStorageSync("lang");
      if (to.query.lang) {
        this.changeLanguage(to.query.lang);
      } else if (langParam) {
        this.changeLanguage(langParam);
      } else {
        this.changeLanguage("pl");
      }
    },
  },
  mounted() {
    this.refreshLanguage;
  },
  watch: {
    $route: function (to) {
      this.refreshLanguage(to);
    },
  },
});
</script>
