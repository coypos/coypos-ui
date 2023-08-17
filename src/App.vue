<template>
  <HeaderLayout></HeaderLayout>

  <nav>
    <router-link to="/">Hello</router-link> |
    <router-link to="/cart">Cart</router-link> |
    <router-link to="/products">Products</router-link> |
    <router-link to="/things">Things</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script setup lang="ts">
import HeaderLayout from "@/components/layout/Header.vue";
</script>
