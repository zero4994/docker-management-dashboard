<template>
  <div>
    <div v-if="this.currentView === 'all'">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <h1>Volumes</h1>
          <v-spacer></v-spacer>
          <v-btn color="cyan" dark @click="fetchAllVolumes">
            Refresh
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { allVolumes } from "../../services/VolumeService";
export default {
  data: () => ({
    currentView: "all",
    volumes: []
  }),
  methods: {
    fetchAllVolumes: async function() {
      try {
        const result = await allVolumes();
        console.log(result);
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error listing volumes", {
          position: "top-left"
        });
      }
    }
  },
  mounted() {
    this.fetchAllVolumes();
  }
};
</script>

<style>
</style>