<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Containers</h1>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-info btn-block" @click="fetchAllContainers">
          Refresh
          <i class="pl-2 fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
    <div v-for="(container, index) in this.containers" :key="index">
      <docker-container v-bind:container="container" v-on:fetchAllContainers="fetchAllContainers"/>
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
