<template>
  <div>
    <sidebar/>
  </div>
</template>


<script>
import Sidebar from "./Sidebar.vue";
export default {
  components: { sidebar: Sidebar },
  props: ["container"],
  mounted() {
    console.log(this.container);
  }
};
</script>


<style>
</style>
