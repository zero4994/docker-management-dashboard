<template>
  <div>
    <sidebar/>
    <v-container fluid grid-list-md id="workspace">
      <v-layout row wrap>
        <v-flex v-bind="{ [`md8`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Hello World</span>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-bind="{ [`md3`]: true }">
          <additional-info v-bind:container="container"/>
          <quick-actions v-bind:id="container.Id"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import Sidebar from "./Sidebar.vue";
import AdditionalInfo from "./AdditionalInfo.vue";
import QuickActions from "./QuickActions.vue";
import { containerById } from "../../services/ContainerService.js";

export default {
  components: {
    sidebar: Sidebar,
    "additional-info": AdditionalInfo,
    "quick-actions": QuickActions
  },
  data: () => ({
    container: {}
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
    }
  }
};
</script>


<style>
#workspace {
  margin-left: 7rem;
}
</style>
