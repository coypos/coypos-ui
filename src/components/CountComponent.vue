<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdropPin"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropPinLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-if="barcode" class="modal-title" id="staticBackdropPinLabel">
            {{ $t(`enterbarcode`) }}
          </h1>
          <h1 v-else class="modal-title" id="staticBackdropPinLabel">
            {{ $t(`enternumber`) }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close"
          ></button>
        </div>
        <div class="modal-body">
          <pin-component v-if="barcode" :barcode="barcode"></pin-component>
          <pin-component v-if="product" :product="product"></pin-component>
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
    barcode: Boolean,
  },
  components: { PinComponent },
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
