<template>
  <div id="app" class="mb-3">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossorigin="anonymous"
    >
    <navbar/>
    <div class="row container-fluid">
      <div class="col-sm-2">
        <sidebar v-on:changeView="changeView"/>
      </div>
      <div class="col-sm-10">
        <images-list v-if="this.currentView === 'Images'"/>
        <containers-list v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import ImagesList from "./components/ImagesList.vue";
import ContainerList from "./components/ContainerList.vue";

export default {
  name: "app",
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
html,
body {
  margin-top: 6rem;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
