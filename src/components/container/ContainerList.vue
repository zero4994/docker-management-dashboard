<template>
  <div id="Containerlist">
    <div v-if="this.currentView === 'all'">
      <v-container fluid grid-list-md style="padding: 24px 24px 0px 24px">
        <v-layout row wrap>
          <h1>Containers</h1>
          <v-spacer></v-spacer>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-md style="padding: 0px 24px 24px 24px">
        <docker-conatiner-table v-on:changeView="changeView" />
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
import Container from "./Container.vue";
import ContainerTable from "./ContainerTable.vue";

export default {
  components: {
    "docker-container": Container,
    "docker-conatiner-table": ContainerTable
  },
  mounted: function() {
    this.currentView = "all";
  },
  data: () => ({
    currentView: "all",
    selectedId: ""
  }),
  methods: {
    changeView: function(id, view) {
      console.log({ id, view });
      this.selectedId = id;
      this.currentView = view;
    }
  }
};
</script>

<style></style>
