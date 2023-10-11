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
          <h1 class="modal-title" id="staticBackdropLabel">Kasa zamknięta</h1>
        </div>
        <div class="modal-body">
          "Wystąpił błąd kasy, kasa została zamknięta. Poproś o pomoc
          sprzedawce.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="'btn btn-danger'"
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
            Dostęp Administracyjny
          </button>
          <button
            type="button"
            :class="'btn btn-success'"
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
            Wezwij sprzedawce
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  expose: ["showModal"],
  name: "ModalComponent",
});
</script>
<style scoped lang="scss">
.modal {
  padding-top: 200px;
  --bs-modal-width: 80%;
  .modal-content {
    .modal-body {
      font-size: 20px;
      padding: 50px 0;
    }
    .modal-footer {
      font-size: 20px;
      button {
        font-size: 20px;
        padding: 20px;
      }
    }
  }
}
</style>
