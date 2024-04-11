<template>
  <div class="keyboard">
    <div class="search">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10 inputblock">
          <input
            class="form-control"
            disabled
            :value="input"
            id="searchinput"
            placeholder="Wprowadź nazwę lub kod artykułu"
          />
        </div>
      </div>
    </div>
    <div class="keys row">
      <div class="keysletters col-10">
        <div class="row">
          <div @click="keyClicked('Q')" class="btn btn-light key col-1">Q</div>
          <div @click="keyClicked('W')" class="btn btn-light key col-1">W</div>
          <div @click="keyClicked('E')" class="btn btn-light key col-1">E</div>
          <div @click="keyClicked('R')" class="btn btn-light key col-1">R</div>
          <div @click="keyClicked('T')" class="btn btn-light key col-1">T</div>
          <div @click="keyClicked('Y')" class="btn btn-light key col-1">Y</div>
          <div @click="keyClicked('U')" class="btn btn-light key col-1">U</div>
          <div @click="keyClicked('I')" class="btn btn-light key col-1">I</div>
          <div @click="keyClicked('O')" class="btn btn-light key col-1">O</div>
          <div @click="keyClicked('P')" class="btn btn-light key col-1">P</div>
          <div @click="keyClicked('_')" class="btn btn-light key col-1">_</div>
          <div class="col-1"></div>
        </div>
        <div class="row">
          <div @click="keyClicked('A')" class="btn btn-light key col-1">A</div>
          <div @click="keyClicked('S')" class="btn btn-light key col-1">S</div>
          <div @click="keyClicked('D')" class="btn btn-light key col-1">D</div>
          <div @click="keyClicked('F')" class="btn btn-light key col-1">F</div>
          <div @click="keyClicked('G')" class="btn btn-light key col-1">G</div>
          <div @click="keyClicked('H')" class="btn btn-light key col-1">H</div>
          <div @click="keyClicked('J')" class="btn btn-light key col-1">J</div>
          <div @click="keyClicked('K')" class="btn btn-light key col-1">K</div>
          <div @click="keyClicked('L')" class="btn btn-light key col-1">L</div>
          <div @click="keyClicked('@')" class="btn btn-light key col-1">@</div>
          <div @click="keyClicked('-')" class="btn btn-light key col-1">-</div>
          <div class="col-1"></div>
        </div>
        <div class="row">
          <div @click="keyClicked('Z')" class="btn btn-light key col-1">Z</div>
          <div @click="keyClicked('X')" class="btn btn-light key col-1">X</div>
          <div @click="keyClicked('C')" class="btn btn-light key col-1">C</div>
          <div @click="keyClicked('V')" class="btn btn-light key col-1">V</div>
          <div @click="keyClicked('B')" class="btn btn-light key col-1">B</div>
          <div @click="keyClicked('N')" class="btn btn-light key col-1">N</div>
          <div @click="keyClicked('M')" class="btn btn-light key col-1">M</div>
          <div @click="keyClicked(',')" class="btn btn-light key col-1">,</div>
          <div @click="keyClicked('.')" class="btn btn-light key col-1">.</div>
          <div @click="keyClicked('del')" class="btn btn-success key col-2">
            USUŃ
          </div>
          <div class="col-1"></div>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <div @click="keyClicked(' ')" class="btn btn-success key col-5">
            SPACJA
          </div>
        </div>
      </div>
      <div class="keysnumpad col-2">
        <div class="row">
          <div @click="keyClicked('1')" class="btn btn-light key col-4">1</div>
          <div @click="keyClicked('2')" class="btn btn-light key col-4">2</div>
          <div @click="keyClicked('3')" class="btn btn-light key col-4">3</div>
        </div>
        <div class="row">
          <div @click="keyClicked('4')" class="btn btn-light key col-4">4</div>
          <div @click="keyClicked('5')" class="btn btn-light key col-4">5</div>
          <div @click="keyClicked('6')" class="btn btn-light key col-4">6</div>
        </div>
        <div class="row">
          <div @click="keyClicked('7')" class="btn btn-light key col-4">7</div>
          <div @click="keyClicked('8')" class="btn btn-light key col-4">8</div>
          <div @click="keyClicked('9')" class="btn btn-light key col-4">9</div>
        </div>
        <div class="row">
          <div class="col-4 key"></div>

          <div @click="keyClicked('0')" class="btn btn-light key col-4">0</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "SearchComponent",

  setup() {
    let input = ref<string>("");

    return { input };
  },

  methods: {
    //dodawnia wcisnietego przycisku do zmiennej input
    keyClicked(key: any) {
      if (key == "del") {
        this.input = this.input.slice(0, this.input.length - 1);
      } else {
        this.input += key;
      }
      this.$emit("onKeyPress", this.input);
    },
  },
});
</script>
<style scoped lang="scss">
#searchinput {
  margin: 10px;
}
.keyboard {
  height: 100%;
  width: 100%;
}
.key {
  margin: 4px;

  font-size: 30px !important;
}
.col-1 {
  width: 8% !important;
}
.col-4 {
  width: 28% !important;
}
.col-8 {
  width: 61% !important;
}
#searchinput {
  font-size: 25px !important;
}
</style>
