<template>
  <div class="backbutton btn small btn-lg mr-1">
    <img @click="backTo(where)" src="/images/buttons/back.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BackButtonComponent",
  props: {
    where: String,
  },
  methods: {
    //zmiana widoku na zadany w argumencie z zachowaniem jezyka
    backTo(where: string) {
      const currentLang = this.$router.currentRoute.value.query.lang;
      this.$router.push({
        name: where,
        query: { lang: currentLang },
      });
    },
  },
});
</script>
<style scoped lang="scss">
.backbutton {
  display: inline-block;
  width: 100px;
  height: 100px;
  img {
    width: 90px;
    height: 90px;
  }
}
</style>
