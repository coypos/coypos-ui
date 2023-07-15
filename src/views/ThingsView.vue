<template>
  <div class="home">
    <ThingsComponent></ThingsComponent>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThingsComponent from "@/components/ThingsComponent.vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "ThingsView",
  components: { ThingsComponent },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    return { t };
  },
});
</script>
