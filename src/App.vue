<template>
  <div id="app">
    <navbar/>
    <div class="row container-fluid">
      <div class="col-2 col-md-2">
        <sidebar/>
      </div>
      <div class="col-8 col-md-8">Hello World</div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "app",
  components: {
    navbar: Navbar,
    sidebar: Sidebar
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
