<template>
  <div class="hello">
    <h1>{{ $t("open") }}</h1>

    <button @click="ktojestnajlepszy">Kto jest fajny</button>
    {{ kto }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import type { AxiosInstance } from "axios";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    catTags: string[];
  }
}
export default defineComponent({
  name: "HelloComponent",
  data() {
    return {
      kto: "",
    };
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    return { t };
  },
  methods: {
    async ktojestnajlepszy() {
      this.kto = await this.$axios.get("/ktofajnyjest");
      console.log(this.kto);
    },
  },
});
</script>
