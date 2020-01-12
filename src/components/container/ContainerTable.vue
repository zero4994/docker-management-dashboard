<template>
  <div></div>
</template>

<script>
import { allContainers } from "../../services/ContainerService.js";

export default {
  data: () => ({
    containers: [],
    interval: {}
  }),
  mounted: function() {
    this.fetchAllContainers();
    this.interval = setInterval(() => {
      this.fetchAllContainers();
    }, 5000);
  },
  methods: {
    fetchAllContainers: async function() {
      this.containers = await allContainers.bind(this)();
    }
  },
  beforeDestroy() {
    console.log("clearing interval");
    clearInterval(this.interval);
  }
};
</script>

<style></style>
