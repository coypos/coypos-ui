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
    changeLanguage(lang: string) {
      this.$i18n.locale = lang;
      this.$router.replace({ query: { lang: lang } });
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("lang");
    if (myParam) {
      this.changeLanguage(myParam);
    }
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
