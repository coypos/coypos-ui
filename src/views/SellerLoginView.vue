<template>
  <div class="hello">
    <div class="row">
      <div class="col-2">
        <flags-component :horizontally="false"></flags-component>
      </div>
      <div class="col-8">
        <div class="title">
          <h1 class="open">{{ $t("login") }}</h1>
          <div class="info">{{ $t("cardscan") }}</div>
          <img
            class="scanner"
            src="/images/buttons/barcode-scanner.png"
            alt="logo"
            @click="
              $router.push({
                name: `pin`,
                query: {
                  lang: $router.currentRoute.value.query.lang,
                  id: 4044780572,
                },
              })
            "
          />
        </div>
      </div>
      <div class="col-2">
        <img
          class="logo"
          :src="'data:image/png;base64,' + this.$storage.getStorageSync(`logo`)"
          alt="logo"
        />
      </div>
    </div>

    <scanner-component goto="pin"></scanner-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import FlagsComponent from "@/components/FlagsComponent.vue";
import ScannerComponent from "@/components/ScannerComponent.vue";
export default defineComponent({
  name: "SellerLoginView",
  components: { ScannerComponent, FlagsComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
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
  .scanner {
    padding-top: 40px;
    width: 50%;
  }
}

.logo {
  margin-top: 50px;
  margin-left: -100px;
  width: 200px;
  height: 200px;
}
</style>
