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
    <div v-else>
      <docker-container v-bind:container="this.selectedContainer"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ContainerPreview from "./ContainerPreview.vue";
import Container from "./Container.vue";
import { allContainers } from "../../services/ContainerService.js";
export default {
  components: {
    "docker-container-preview": ContainerPreview,
    "docker-container": Container
  },
  mounted: function() {
    this.currentView = "all";
    this.fetchAllContainers();
  },
  data: () => ({
    containers: [],
    currentView: "all",
    selectedContainer: {}
  }),
  methods: {
    fetchAllContainers: async function() {
      try {
        const { data } = await allContainers();
        this.containers = data;
      } catch (error) {
        console.error(error);
      }
    },
    changeView: function(container) {
      this.selectedContainer = container;
      this.currentView = "single";
    }
  }
};
</script>

<style>
</style>
