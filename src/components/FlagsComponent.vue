<template>
  <div class="flags">
    <img
      @click="changeLanguage('pl')"
      :class="flagClass"
      src="../assets/pl.png"
      alt="Polski"
      srcset=""
    />
    <img
      @click="changeLanguage('en')"
      :class="flagClass"
      src="../assets/en.png"
      alt="English"
      srcset=""
    />
    <img
      @click="changeLanguage('uk')"
      :class="flagClass"
      src="../assets/uk.png"
      alt="українська"
      srcset=""
    />
    <img
      @click="changeLanguage('de')"
      :class="flagClass"
      src="../assets/ge.png"
      alt="Deutsch"
      srcset=""
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { QueryModel } from "@/types/Query";

export default defineComponent({
  name: "FlagsComponent",
  props: {
    horizontally: Boolean,
  },
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
  },
  mounted() {
    if (this.horizontally == true) {
      this.flagClass = "flag horizontally";
    }
  },
});
</script>
<style scoped lang="scss">
.flags {
  .flag {
    width: 150px;
    height: 90px;
    padding: 2px;
    display: block;
    margin-bottom: 30px;
    margin-top: 35px;
    margin-left: 15px;
  }
  .horizontally {
    display: inline;
    width: 120px;
    height: 70px;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 15px;
  }
}
</style>
