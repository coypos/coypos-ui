<template>
  <div class="hello">
    <div class="row">
      <div class="col-2">
        <flags-component :horizontally="false"></flags-component>
      </div>
      <div class="col-8">
        <div class="title">
          <h1 class="open">{{ $t("open") }}</h1>
          <h1 class="open">{{ $t("welcome") }}</h1>
        </div>
        <button-component
          @click="
            $router.push({
              name: 'cart',
              query: { lang: $router.currentRoute.value.query.lang },
            })
          "
          :text="$t(`start`)"
          color="green"
        ></button-component>
        <div class="info">{{ $t("info") }}</div>
      </div>
      <div class="col-2">
        <img class="logo" src="../assets/logo.png" alt="logo" />
      </div>
    </div>
    <div class="row">
      <div class="col-12"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <button-component
          @click="showModal()"
          color="yellow"
          :text="$t(`help`)"
          :width="70"
        ></button-component>
      </div>
    </div>
    <scanner-component></scanner-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import FlagsComponent from "@/components/FlagsComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";
import { showModal } from "@/functions";
export default defineComponent({
  name: "HomeView",
  components: { ScannerComponent, ButtonComponent, FlagsComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
  },
  methods: {
    showModal,
    changeColor() {
      document.documentElement.style.setProperty("--text-color", "#000");
      document.documentElement.style.setProperty("--text-second-color", "#000");
      document.documentElement.style.setProperty("--text-third-color", "#000");
      document.documentElement.style.setProperty("--background-color", "#fff");
      document.documentElement.style.setProperty("--button-color", "#fdf");
      document.documentElement.style.setProperty(
        "--button-color-darker",
        "#fef"
      );
      document.documentElement.style.setProperty("--button-text-color", "#000");
      document.documentElement.style.setProperty(
        "--button-color-warning",
        "#fbf"
      );
      document.documentElement.style.setProperty(
        "--button-color-warning-darker",
        "#faf"
      );
      document.documentElement.style.setProperty(
        "--cart-background-color",
        "#fef"
      );
      document.documentElement.style.setProperty(
        "--cart-background-color-darker",
        "#fcf"
      );
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  padding-top: 140px;
  margin-bottom: 40px;
  .open {
    font-size: 45px;
    font-weight: 700;
  }
}
.info {
  margin-top: 10px;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 700;
}
.logo {
  margin-top: 50px;
  margin-left: -100px;
  width: 200px;
  height: 200px;
}
</style>
