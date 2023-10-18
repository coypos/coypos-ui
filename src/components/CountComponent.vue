<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdropPin"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="staticBackdropLabel">Podaj ilość</h1>
        </div>
        <div class="modal-body">
          <pin-component :product="product"></pin-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PinComponent from "@/components/PinComponent.vue";
export default defineComponent({
  props: {
    product: Object,
  },
  components: { PinComponent },
  expose: ["showModal"],
  name: "CountComponent",
});
</script>
<style scoped lang="scss">
.modal {
  --bs-modal-width: 50%;
  .modal-content {
    margin: auto;
    width: 500px;
    .modal-body {
      font-size: 20px;
    }
  }
}
</style>
