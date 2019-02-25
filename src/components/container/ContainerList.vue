<template>
  <div>
    <div v-if="this.currentView === 'all'">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <h1>Containers</h1>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="container in this.containers"
            :key="container.Id"
            v-bind="{ [`md4`]: true }"
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
      <docker-container v-bind:containerId="this.selectedId" v-bind:socket="this.socket"/>
    </div>
  </div>
</template>

<script>
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
    this.interval = setInterval(() => {
      this.fetchAllContainers();
    }, 5000);
  },
  data: () => ({
    containers: [],
    currentView: "all",
    interval: {},
    selectedId: ""
  }),
  props: ["socket"],
  methods: {
    fetchAllContainers: async function() {
      try {
        const { data } = await allContainers();
        this.containers = data;
      } catch (error) {
        console.error(error);
      }
    },
    changeView: function(id) {
      console.log("this is the id", id);
      this.selectedId = id;
      this.currentView = "single";
    }
  },
  beforeDestroy() {
    console.log("clearing interval");
    clearInterval(this.interval);
  }
};
</script>

<style></style>
