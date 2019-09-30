<template>
  <v-footer class="pa-3" style="min-height: 0px" dark color="light-blue darken-2">
    <div class="mr-4">Images: 30</div>
    <div class="mr-4">Running Containers: {{ this.status.running }}</div>
    <div class="mr-4">Paused Containers: {{ this.status.paused }}</div>
    <div>Exited Containers: {{ this.status.exited }}</div>
  </v-footer>
</template>

<script>
import { getContainersByStatus } from "../services/ContainerService";

export default {
  mounted() {
    this.updateFooter();
    setInterval(this.updateFooter, 5000);
  },
  data: () => ({
    status: {
      running: 0,
      paused: 0,
      exited: 0
    }
  }),
  methods: {
    updateFooter: async function() {
      this.status = await getContainersByStatus();
    }
  }
};
</script>

<style>
</style>