<template>
  <div>
    <div v-if="this.currentView === 'all'">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <h1>Containers</h1>
          <v-spacer></v-spacer>
          <v-btn color="cyan" dark @click="fetchAllContainers">Refresh
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="container in this.containers"
            :key="container.Id"
            v-bind="{ [`md6`]: true }"
          >
            <docker-container-preview
              v-bind:container="container"
              v-on:changeView="changeView"
              v-on:fetchAllContainers="fetchAllContainers"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ContainerPreview from "./ContainerPreview.vue";
export default {
  components: {
    "docker-container-preview": ContainerPreview
  },
  mounted: function() {
    this.currentView = "all";
    this.fetchAllContainers();
  },
  data: () => ({
    containers: [],
    currentView: "all"
  }),
  methods: {
    fetchAllContainers: async function() {
      try {
        const { data } = await axios({
          method: "get",
          url: "api/containers",
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.containers = data;
      } catch (error) {
        console.error(error);
      }
    },
    changeView: function() {}
  }
};
</script>

<style>
</style>
