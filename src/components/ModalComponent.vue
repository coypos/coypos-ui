<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ text }}</div>
        <div class="modal-footer">
          <button
            v-for="button in buttons"
            :key="button"
            type="button"
            :class="'btn btn-' + button.color"
            data-bs-dismiss="modal"
            @click="
              $router.push({
                name: `login`,
                query: {
                  lang: $router.currentRoute.value.query.lang,
                },
              })
            "
          >
            {{ button.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    title: String,
    text: String,
    buttons: Array,
  },
  expose: ["showModal"],
  name: "ModalComponent",
  data() {
    return {};
  },
  setup() {
    const modalRef = ref<Element | null>(null); // Dodana referencja do modalu
    let scanned = ref<string>("");

    return { scanned, modalRef };
  },
  methods: {},
});
</script>
