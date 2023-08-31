<template>
  <div class="container-fluid">
    <div class="row" v-if="$router.currentRoute.value.name != `home`">
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
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0d99ff;
  background-color: #085085;
  width: 100%;
  height: 100vh;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { QueryModel } from "@/types/Query";
import HeaderLayout from "@/components/layout/Header.vue";

export default defineComponent({
  name: "app",
  components: { HeaderLayout },
  setup() {
    let flagClass = ref<string>("flag");
    return { flagClass };
  },
  methods: {
    async changeLanguage(lang: string) {
      this.$storage.setStorageSync("lang", lang);
      this.$i18n.locale = lang;
      const currentParams = await this.$router.currentRoute.value.params;
      const currentName = this.$router.currentRoute.value.name;
      const mergedParams = { ...currentParams, lang: lang };
      if (currentName) {
        await this.$router.push({ name: currentName, query: mergedParams });
      }
    },
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
