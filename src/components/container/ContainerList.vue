<template>
  <div id="Containerlist">
    <div v-if="this.currentView === 'all'">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <h1>Containers</h1>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-md>
        <!-- <v-layout row wrap>
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
        </v-layout> -->
        <docker-conatiner-table />
      </v-container>
    </div>
    <div v-else>
      <docker-container
        v-bind:containerId="this.selectedId"
        v-on:changeView="changeView"
      />
    </div>
  </div>
</template>

<script>
import ContainerPreview from "./ContainerPreview.vue";
import Container from "./Container.vue";
import ContainerTable from "./ContainerTable.vue";

export default {
  components: {
    "docker-container-preview": ContainerPreview,
    "docker-container": Container,
    "docker-conatiner-table": ContainerTable
  },
  mounted: function() {
    this.currentView = "all";
    // this.fetchAllContainers();
    // this.interval = setInterval(() => {
    //   this.fetchAllContainers();
    // }, 5000);
  },
  data: () => ({
    // containers: [],
    currentView: "all",
    // interval: {},
    selectedId: ""
  }),
  methods: {
    // fetchAllContainers: async function() {
    //   this.containers = await allContainers.bind(this)();
    // },
    changeView: function(id, view) {
      console.log("this is the id", id, view);
      // if (view === "all") {
      this.fetchAllContainers();
      this.interval = setInterval(() => {
        this.fetchAllContainers();
      }, 5000);
      // } else {
      //   clearInterval(this.interval);
      // }
      this.selectedId = id;
      this.currentView = view;
    }
  }
};
</script>

<style></style>
