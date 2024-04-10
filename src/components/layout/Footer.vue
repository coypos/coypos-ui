<template>
  <div class="footer">
    <div class="row">
      <div class="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-1">
        <back-button-component
          where="cart"
          v-if="
            $router.currentRoute.value.name != `home` &&
            $router.currentRoute.value.name != `login` &&
            $router.currentRoute.value.name != `pin` &&
            $router.currentRoute.value.name != `cart`
          "
        ></back-button-component>
      </div>
      <div class="col-1 col-sm-1 col-md-4 col-lg-4 col-xl-8"></div>
      <div class="col-3 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <round-button-component
          v-if="$router.currentRoute.value.name != `seller`"
          id="help"
          @click="showModal('Wezwano pomoc')"
          :small="true"
          :width="34"
          color="yellow"
          :text="$t(`help`)"
          image="/images/buttons/chat.png"
        ></round-button-component>
      </div>
      <div class="col-1 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <round-button-component
          id="barcode"
          v-if="$router.currentRoute.value.name == `cart`"
          @click="showCountModal()"
          image="/images/buttons/barcode.png"
        ></round-button-component>
      </div>
      <div class="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <round-button-component
          id="search"
          v-if="$router.currentRoute.value.name != `seller`"
          @click="
            $router.push({
              name: `search`,
              query: {
                lang: $router.currentRoute.value.query.lang,
                page: 1,
              },
            })
          "
          image="/images/buttons/search.png"
        ></round-button-component>
      </div>
    </div>
    <count-component :barcode="true"></count-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RoundButtonComponent from "@/components/RoundButtonComponent.vue";
import { showCountModal, showModal } from "@/functions";
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import CountComponent from "@/components/CountComponent.vue";

export default defineComponent({
  name: "HeaderLayout",
  components: {
    CountComponent,
    BackButtonComponent,
    RoundButtonComponent,
  },

  methods: {
    showModal,
    showCountModal() {
      showCountModal();
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  text-align: right;
  border-top: 1px solid black;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 40px;
  position: fixed;
}
</style>
