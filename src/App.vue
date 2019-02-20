<template>
  <v-app id="app">
    <navbar v-on:changeView="changeView"/>
    <v-content>
      <images-list v-if="this.currentView === 'Images'"/>
      <containers-list v-else/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import ImagesList from "./components/image/ImagesList.vue";
import ContainerList from "./components/container/ContainerList.vue";
const io = require("socket.io-client");

export default {
  name: "App",
  components: {
    navbar: Navbar,
    "images-list": ImagesList,
    "containers-list": ContainerList
  },
  data: () => ({
    currentView: "Images",
    socket: {}
  }),
  methods: {
    changeView: function(value) {
      this.currentView = value;
    }
  },
  mounted() {
    this.socket = io.connect("localhost:3000");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* //color: #2c3e50; */
  background-color: #cfeef7;
}
</style>
