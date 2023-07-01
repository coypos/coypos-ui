<template>
  <div class="home">
    <HelloComponent></HelloComponent>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloComponent from "@/components/HelloComponent.vue";
export default defineComponent({
  name: "HomeView",
  components: { HelloComponent },
});
</script>
