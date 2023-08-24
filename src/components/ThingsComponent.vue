<template>
  <div class="container things">
    <modal-component
      :title="ErrorModal.title"
      :text="ErrorModal.text"
      :buttons="ErrorModal.buttons"
      ref="staticBackdrop"
    ></modal-component>
    <input id="input" v-model="thing.sampleRequestString" />
    <button id="add" class="btn btn-primary" @click="addThings">
      {{ $t("add") }}
    </button>
    <div v-if="things.length" class="row">
      <div class="col-3">Twoj String</div>
      <div class="col-3">Wygenerowany String</div>
      <div class="col-3">Dlugosc</div>
      <div class="col-3">DELETE</div>
    </div>
    <div class="row" v-for="thing in things" :key="thing.id">
      <div class="col-3">{{ thing.sampleRequestString }}</div>
      <div class="col-3">
        {{ thing.sampleGeneratedString }}
      </div>
      <div class="col-3">{{ thing.sampleGeneratedInt }}</div>
      <div class="col-3">
        <button class="btn btn-danger" @click="deleteThings(thing.id)">
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { AxiosInstance } from "axios";
import { ThingModel } from "@/types/Thing";
import { ThingRequestModel } from "@/types/ThingRequest";
import { ModalModel } from "@/types/Modal";
import ModalComponent from "@/components/ModalComponent.vue";
import { showModal } from "@/functions";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    catTags: string[];
  }
}
export default defineComponent({
  name: "HelloComponent",
  components: { ModalComponent },
  data() {
    return {};
  },
  setup() {
    let thing = ref<ThingRequestModel>({
      sampleRequestString: "",
    });
    let result = ref<ThingModel>({ id: 0, sampleGeneratedInteger: 0 });
    let things = ref<ThingModel[]>([{ id: 0, sampleGeneratedInteger: 0 }]);

    let ErrorModal = ref<ModalModel>({
      title: "Kasa zamknięta",
      text: "Wystąpił błąd kasy, kasa została zamknięta. Poproś o pomoc sprzedawce.",
      buttons: [
        { text: "Dostęp Administracyjny", color: "danger" },
        { text: "Wezwij sprzedawce", color: "success" },
      ],
    });
    return { thing, things, result, ErrorModal };
  },
  methods: {
    async getThings() {
      try {
        await this.$axios.get("/things").then((response) => {
          this.things = response.data;
        });
      } catch (e) {
        showModal();
      }
    },
    async addThings() {
      try {
        await this.$axios.post("/thing", this.thing).then(async (response) => {
          this.result = response.data;
          await this.getThings();
        });
      } catch (e) {
        showModal();
      }
    },
    async deleteThings(id: number) {
      try {
        await this.$axios.delete(`/thing/${id}`).then(async (response) => {
          this.things = response.data;
          await this.getThings();
        });
      } catch (e) {
        showModal();
      }
    },
  },
  mounted() {
    this.getThings();
  },
});
</script>
