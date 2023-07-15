<template>
  <div class="container hello">
    <input id="input" v-model="thing.sampleRequestString" />
    <button id="add" class="btn btn-primary" @click="addThings">Dodaj</button>
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
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    catTags: string[];
  }
}
export default defineComponent({
  name: "HelloComponent",
  data() {
    return {};
  },
  setup() {
    let thing = ref<ThingRequestModel>({
      sampleRequestString: "",
    });
    let result = ref<ThingModel>({ id: 0, sampleGeneratedInteger: 0 });
    let things = ref<ThingModel[]>([{ id: 0, sampleGeneratedInteger: 0 }]);
    return { thing, things, result };
  },
  methods: {
    async getThings() {
      await this.$axios.get("/things").then((response) => {
        this.things = response.data;
      });
    },
    async addThings() {
      await this.$axios.post("/thing", this.thing).then(async (response) => {
        this.result = response.data;
        await this.getThings();
      });
    },
    async deleteThings(id: number) {
      await this.$axios.delete(`/thing/${id}`).then(async (response) => {
        this.things = response.data;
        await this.getThings();
      });
    },
  },
  mounted() {
    this.getThings();
  },
});
</script>
