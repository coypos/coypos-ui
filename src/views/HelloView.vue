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
        <img
          class="logo"
          :src="this.$storage.getStorageSync(`logo`)"
          alt="logo"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <button-component
          @click="showModal('Wezwano pomoc')"
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
import { defineComponent, ref } from "vue";
import FlagsComponent from "@/components/FlagsComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";
import { showModal } from "@/functions";
import { SettingModel } from "@/types/api/Setting";
import { ResponseModel } from "@/types/Response";
export default defineComponent({
  name: "HomeView",
  components: { ScannerComponent, ButtonComponent, FlagsComponent },
  setup() {
    let settings = ref<SettingModel[]>([]);
    return { settings };
  },
  methods: {
    showModal,
    async getSettings() {
      try {
        await this.$axios.get(`/settings`).then((response) => {
          const resp: ResponseModel = response.data;
          this.settings = resp.response;
        });
      } catch (e) {
        showModal(e as string);
      }
      for (let i = 0; this.settings.length > i; i++) {
        if (this.settings[i].key.startsWith("--")) {
          document.documentElement.style.setProperty(
            this.settings[i].key,
            this.settings[i].value
          );
        } else if (this.settings[i].key == "logo") {
          this.$storage.setStorageSync(
            this.settings[i].key,
            this.settings[i].value
          );
        }
      }
    },
  },
  mounted() {
    this.getSettings();
    this.$storage.setStorageSync("cartList", []);
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
