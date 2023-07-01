<template>
  <div class="hello">
    <h1>{{ $t("open") }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HelloComponent",
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });

    // Something todo ..

    return { t };
  },
});
</script>
