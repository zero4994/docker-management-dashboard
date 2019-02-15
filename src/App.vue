<template>
  <v-app>
    <navbar v-on:changeView="changeView"/>
    <v-content>
      <images-list v-if="this.currentView === 'Images'"/>
      <containers-list v-else/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import ImagesList from "./components/ImagesList.vue";
import ContainerList from "./components/ContainerList.vue";

export default {
  name: "App",
  components: {
    navbar: Navbar,
    sidebar: Sidebar,
    "images-list": ImagesList,
    "containers-list": ContainerList
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
  color: #2c3e50;
}
</style>
