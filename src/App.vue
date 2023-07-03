<template>
  <HomePage />
</template>

<script>
import HomePage from "@/views/HomePage.vue";

export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  font-family: "Urbanist", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
