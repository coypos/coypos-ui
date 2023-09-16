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
      <div class="col-4">Razem:</div>
      <div class="col-4 center">
        <div class="cartico">
          <img src="/images/buttons/cart.png" />
        </div>
      </div>
      <div class="col-4 right">21.37 zł</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.about {
  color: var(--text-color);
  height: 590px;
  width: 100%;
  position: relative;
  text-align: left;
  padding: 30px;
  border-radius: 40px;
  margin: 55px 15px;
  background-color: var(--cart-first-background-color);
  border: 2px solid var(--cart-border-color);
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
    background-color: var(--cart-second-background-color);
    border: 2px solid var(--cart-second-background-color-darker);
  }
  .summary {
    font-size: 1.15em;
    font-weight: 700;
    margin: 5px 20px;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
  .cartico {
    z-index: 9;
    position: relative;
    border-radius: 100%;
    margin-top: -30px;
    background-color: #f3f3f3;
    img {
      padding: 10px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
