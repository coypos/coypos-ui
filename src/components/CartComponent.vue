<template>
  <div class="about">
    <div class="row">
      <div class="col 12">
        <h1>TWOJE ZAKUPY</h1>
      </div>
    </div>
    <div class="row list">
      <div class="col-12">
        <div class="row">
          <div class="col-8">Koncentrat pom.</div>
          <div class="col-4 right">4,99zł</div>
        </div>
        <div class="row">
          <div class="col-8">Ser żółty plas.</div>
          <div class="col-4 right">8,99zł</div>
        </div>
        <div class="row">
          <div class="col-8">Chipsy ceb.</div>
          <div class="col-4 right">19,99zł</div>
        </div>
      </div>
    </div>
    <div class="row summary">
      <div class="col-6">Razem:</div>
      <div class="col-6 right">21.37 zł</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.about {
  color: white;
  height: 590px;
  width: 100%;
  position: relative;
  text-align: left;
  padding: 30px;
  border-radius: 40px;
  margin: 55px 15px;
  background-color: #0b3e62;
  border: 2px solid darken(#0b3e62, 7.5%);
  .list {
    position: relative;
    color: black;
    font-weight: 600;
    height: 85%;
    right: 0;
    text-align: left;
    padding: 20px 20px 20px;
    border-radius: 40px;
    margin: 5px;
    background-color: #bde3ff;
    border: 2px solid darken(#bde3ff, 10%);
  }
  .summary {
    font-size: 1.15em;
    font-weight: 700;
    margin: 5px 20px;
  }
  .right {
    text-align: right;
  }
}
</style>
