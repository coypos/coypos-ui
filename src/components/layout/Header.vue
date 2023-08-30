<template>
  <div class="header">
    <flags-component :horizontally="true"></flags-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlagsComponent from "@/components/FlagsComponent.vue";

export default defineComponent({
  name: "HeaderLayout",
  components: { FlagsComponent },

  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  text-align: left;
}
</style>
