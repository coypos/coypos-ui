<template>
  <div class="header">
    <div class="flags">
      <img
        @click="changeLanguage('pl')"
        class="flag"
        src="../../assets/pl.png"
        alt="Polski"
        srcset=""
      />
      <img
        @click="changeLanguage('en')"
        class="flag"
        src="../../assets/en.png"
        alt="English"
        srcset=""
      />
      <img
        @click="changeLanguage('uk')"
        class="flag"
        src="../../assets/uk.png"
        alt="українська"
        srcset=""
      />
      <img
        @click="changeLanguage('de')"
        class="flag"
        src="../../assets/ge.png"
        alt="Deutsch"
        srcset=""
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeaderLayout",

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
    refreshLanguage(to: any) {
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
    $route: function (to, from) {
      this.refreshLanguage(to);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: left;

  .flags {
    .flag {
      width: 100px;
      height: 50px;
      padding: 2px;
    }
  }
}
</style>
