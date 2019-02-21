<template>
  <div>
    <v-card>
      <v-card-actions>
        <span class="headline">{{ container.Image }}</span>
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-4"
          flat
          dark
          @click="$emit('changeView', container.Id)"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>ID</v-list-tile-title>
            <v-list-tile-sub-title>{{
              this.container.Id
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Status</v-list-tile-title>
            <v-list-tile-sub-title>{{
              this.container.Status
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>State</v-list-tile-title>
            <v-list-tile-sub-title>{{
              this.container.State
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-card-actions class="justify-center">
        <v-btn color="red darken-3" dark @click="onStopContainer"
          >STOP
          <v-icon>stop</v-icon>
        </v-btn>
        <v-btn color="yellow darken-1" dark @click="onPauseContainer"
          >PAUSE
          <v-icon>pause</v-icon>
        </v-btn>
        <v-btn color="light-green lighten-1" dark @click="onUnpauseContainer"
          >UNPAUSE
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn color="grey darken-4" dark @click="onRemoveContainer">
          REMOVE
          <i class="fas fa-trash-alt"></i>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {
  stopContainer,
  deleteContainer,
  pauseContainer,
  unpauseContainer
} from "../../services/ContainerService.js";

export default {
  props: ["container"],
  methods: {
    onStopContainer: async function() {
      try {
        const { data } = await stopContainer(this.container.Id);
        alert(data);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    },
    onRemoveContainer: async function() {
      try {
        const { data } = await deleteContainer(this.container.Id);

        alert(data);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    },
    onPauseContainer: async function() {
      try {
        const { data } = await pauseContainer(this.container.Id);
        alert(data);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    },
    onUnpauseContainer: async function() {
      try {
        const { data } = await unpauseContainer(this.container.Id);
        alert(data);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
