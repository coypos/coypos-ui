<template>
  <div class="flags">
    <img
      @click="changeLanguage('pl')"
      :class="flagClass"
      src="../assets/flags/pl.png"
      alt="Polski"
      id="pl"
      srcset=""
    />
    <img
      @click="changeLanguage('en')"
      :class="flagClass"
      src="../assets/flags/en.jpg"
      alt="English"
      srcset=""
      id="en"
    />
    <img
      @click="changeLanguage('uk')"
      :class="flagClass"
      src="../assets/flags/uk.png"
      alt="українська"
      srcset=""
      id="uk"
    />
    <img
      @click="changeLanguage('de')"
      :class="flagClass"
      src="../assets/flags/ge.png"
      alt="Deutsch"
      srcset=""
      id="de"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "FlagsComponent",
  props: {
    horizontally: Boolean,
  },
  setup() {
    let flagClass = ref<string>("flag ");
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
    border: 2px solid var(--button-color);
  }
  .active {
    -webkit-box-shadow: 0px 0px 12px 0px rgba(255, 255, 255, 1);
    -moz-box-shadow: 0px 0px 12px 0px rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(255, 255, 255, 1);
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
