<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <h1>Containers</h1>
      </div>
      <div class="col-sm-3">
        <button class="btn btn-info btn-block" @click="fetchAllContainers">Refresh</button>
      </div>
    </div>
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
  mounted: function() {
    this.fetchAllContainers();
  },
  data: () => ({
    containers: []
  }),
  methods: {
    fetchAllContainers: async function() {
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
    }
  }
};
</script>

<style>
</style>
