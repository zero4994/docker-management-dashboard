<template>
  <div>
    <sidebar v-on:changeView="changeView"/>
    <v-container fluid grid-list-md id="workspace">
      <v-layout row wrap>
        <v-flex v-bind="{ [`md8`]: true }">
          <stats v-if="currentView === 'home'"/>
          <logs v-if="currentView === 'logs'" v-bind:id="this.containerId"/>
          <inspect v-if="currentView === 'inspect'" v-bind:id="container.Id"/>
        </v-flex>
        <v-flex v-bind="{ [`md3`]: true }">
          <additional-info v-bind:container="container"/>
          <quick-actions v-bind:id="container.Id" v-on:fetchContainer="this.fetchContainer"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import Sidebar from "./Sidebar.vue";
import AdditionalInfo from "./AdditionalInfo.vue";
import QuickActions from "./QuickActions.vue";
import Stats from "./Stats.vue";
import Logs from "./Logs.vue";
import Inspect from "./Inspect.vue";
import { containerById } from "../../services/ContainerService.js";

export default {
  components: {
    sidebar: Sidebar,
    "additional-info": AdditionalInfo,
    "quick-actions": QuickActions,
    stats: Stats,
    logs: Logs,
    inspect: Inspect
  },
  data: () => ({
    container: {},
    currentView: "home"
  }),
  props: ["containerId"],
  mounted() {
    this.fetchContainer(this.containerId);
  },
  methods: {
    fetchContainer: async function(id) {
      try {
        const { data } = await containerById(id);
        this.container = data[0];
      } catch (error) {
        console.error(error);
      }
    },
    changeView: function(view) {
      console.log(view);
      this.currentView = view;
    }
  }
};
</script>


<style>
#workspace {
  margin-left: 7rem;
}
</style>
