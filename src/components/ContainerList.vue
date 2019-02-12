<template>
  <div class="container">
    <h1>Containers</h1>
    <div v-for="(container, index) in this.containers" :key="index">
      <docker-container v-bind:container="container"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { allContainers } from "../queries";
import Container from "./Container.vue";
export default {
  components: {
    "docker-container": Container
  },
  mounted: async function() {
    try {
      const {
        data: { data }
      } = await axios({
        method: "post",
        url: "/graphql",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          query: allContainers
        })
      });
      this.containers = data.Containers;
    } catch (error) {
      console.error(error);
    }
  },
  data: () => ({
    containers: []
  })
};
</script>

<style>
</style>
