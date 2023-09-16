<template>
  <div class="backbutton">
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
  setup() {
    let buttonClass = ref<string>("btn btn-primary btn-lg btn-default  mr-1");
    return { buttonClass };
  },
  methods: {
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
  position: absolute;
  border-top-right-radius: 100%;
  padding: 20px;
  background-color: var(--product-color);
  bottom: 0;
  left: 0;

  width: 150px;
  height: 150px;
  img {
    position: relative;
    left: -20px;
    bottom: -20px;
    width: 90%;
    height: 90%;
  }
}
</style>
