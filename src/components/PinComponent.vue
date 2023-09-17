<template>
  <div class="row">
    <div class="col-12">
      {{ pin }}
    </div>
  </div>
  <div class="pin">
    <div class="row">
      <div @click="addtopin('1')" class="col-4 leftup">1</div>
      <div @click="addtopin('2')" class="col-4">2</div>
      <div @click="addtopin('3')" class="col-4 rightup">3</div>
    </div>
    <div class="row">
      <div @click="addtopin('4')" class="col-4">4</div>
      <div @click="addtopin('5')" class="col-4">5</div>
      <div @click="addtopin('6')" class="col-4">6</div>
    </div>
    <div class="row">
      <div @click="addtopin('7')" class="col-4">7</div>
      <div @click="addtopin('8')" class="col-4">8</div>
      <div @click="addtopin('9')" class="col-4">9</div>
    </div>
    <div class="row">
      <div @click="removefrompin()" class="col-4 leftdown">Kasuj</div>
      <div @click="addtopin('0')" class="col-4">0</div>
      <div @click="accept()" class="col-4 rightdown">Zatw</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "PinComponent",

  setup() {
    let pin = ref<string>("");
    return { pin };
  },
  methods: {
    async addtopin(number: string) {
      this.pin += number;
    },
    async removefrompin() {
      this.pin = this.pin.slice(0, this.pin.length - 1);
    },
    async accept() {
      this.$router.push({
        name: `cart`,
        query: {
          lang: this.$router.currentRoute.value.query.lang,
        },
      });
    },
  },
  mounted() {
    //this.pinf();
  },
});
</script>
<style scoped lang="scss">
.col-12 {
  height: 50px;
  font-size: 30px;
  line-height: 50px;
}
.pin {
  text-align: center;
  align-items: center;
  margin: 10px auto auto;
  width: 390px;
  height: 520px;
  border-radius: 50px;
  .row {
    margin: 0;
    line-height: 130px;
    height: 130px;
    font-size: 30px;

    .col-4 {
      width: 33%;
      margin: 0;
      border: 1px solid #c0c0c0;
      background-color: #f6f6f6;
    }
  }
}
.leftdown {
  border-radius: 0 0 0 50px;
}
.leftup {
  border-radius: 50px 0 0 0;
}
.rightdown {
  border-radius: 0 0 50px 0;
}
.rightup {
  border-radius: 0 50px 0 0;
}
</style>
