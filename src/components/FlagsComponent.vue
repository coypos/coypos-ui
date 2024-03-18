<template>
  <div class="flags">
    <img
      :key="language.id"
      v-for="language in languages"
      @click="changeLanguage(language.countryCode)"
      :class="flagClass"
      :src="'data:image/jpeg;base64,' + language.image"
      :alt="language.name"
      :id="language.countryCode"
      srcset=""
    />
  </div>
</template>
<script lang="ts">
import { LanguageModel } from "@/types/api/Language";
import { ResponseModel } from "@/types/Response";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "FlagsComponent",
  props: {
    horizontally: Boolean,
  },
  setup() {
    let flagClass = ref<string>("flag ");
    let languages = ref<LanguageModel[]>([]);
    return { languages, flagClass };
  },
  methods: {
    async getLanguages() {
      try {
        await this.$axios
          .get(`/languages?filter=AND&loadImages=true`)
          .then((response) => {
            const resp: ResponseModel = response.data;
            this.languages = resp.response;
          });
      } catch (e: any) {
        console.log(e);
      }
    },
    async changeLanguage(lang: string) {
      this.$storage.setStorageSync("lang", lang);
      this.$i18n.locale = lang;
      const currentParams = await this.$router.currentRoute.value.query;
      const currentName = this.$router.currentRoute.value.name;
      const mergedParams = { ...currentParams, lang: lang };

      if (currentName) {
        await this.$router.push({ name: currentName, query: mergedParams });
        this.activeFlag();
      }
    },
    async changeHorizontally() {
      if (this.horizontally == true) {
        this.flagClass = "flag horizontally";
      } else {
        this.flagClass = "flag";
      }
    },
    async activeFlag() {
      let flags = document.getElementsByClassName("flag");
      if (flags) {
        for (let i = 0; i < flags.length; i++) {
          flags[i].className = this.flagClass;
        }
      }
      let lang = this.$storage.getStorageSync("lang");
      let flag = document.getElementById(lang);
      if (flag) {
        flag.className = flag.className + " active";
      }
    },
  },
  mounted() {
    this.getLanguages();
    this.changeHorizontally().then(() => {
      this.activeFlag();
    });
  },
});
</script>
<style scoped lang="scss">
.flags {
  .flag {
    width: 150px;
    height: 90px;
    margin: 2px;
    display: block;
    margin-bottom: 30px;
    margin-top: 35px;
    margin-left: 15px;
    border: 2px solid var(--text-color);
  }
  .active {
    -webkit-box-shadow: 0px 0px 12px 11px var(--flag-border-color);
    -moz-box-shadow: 0px 0px 12px 11px var(--flag-border-color);
    box-shadow: 0px 0px 12px 11px var(--flag-border-color);
  }
  .horizontally {
    display: inline;
    width: 120px;
    height: 70px;
    margin-bottom: 5px;
    margin-top: 20px;
    margin-left: 30px;
  }
}
</style>
