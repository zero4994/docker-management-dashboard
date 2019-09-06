<template>
  <v-app id="app">
    <navbar v-on:changeView="changeView" />
    <v-content>
      <images-list v-if="this.currentView === 'Images'" />
      <containers-list v-else-if="this.currentView === 'Containers'" />
      <volumes-list v-else-if="this.currentView === 'Volumes'" />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import ImagesList from "./components/image/ImagesList.vue";
import ContainerList from "./components/container/ContainerList.vue";
import VolumesList from "./components/Volumes/VolumesList.vue";

export default {
  name: "App",
  components: {
    navbar: Navbar,
    "images-list": ImagesList,
    "containers-list": ContainerList,
    "volumes-list": VolumesList
  },
  data: () => ({
    currentView: "Images"
  }),
  methods: {
    changeView: function(value) {
      this.currentView = value;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* //color: #2c3e50; */
  /* background-color: #cfeef7; */
  background-color: #e9ebee;
}

i.icon-padding-left {
  padding-left: 1rem;
}
</style>
