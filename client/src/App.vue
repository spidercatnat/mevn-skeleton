<template>
  <div id="app">
    <TheNavBar />
    <router-view />
  </div>
</template>

<script>
import TheNavBar from "./components/TheNavBar";

export default {
  name: "App",
  components: {
    TheNavBar,
  },
};
</script>
