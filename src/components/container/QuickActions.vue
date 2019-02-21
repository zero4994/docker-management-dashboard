<template>
  <v-card class="mt-2">
    <v-card-actions>
      <span class="headline">Quick Actions</span>
    </v-card-actions>
    <v-layout row wrap>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
      <v-flex v-bind="{ [`md6`]: true }">
        <v-btn color="red darken-3" dark block @click="onStopContainer"
          >STOP
          <v-icon>stop</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
      <v-flex v-bind="{ [`md6`]: true }">
        <v-btn color="yellow darken-1" dark block @click="onPauseContainer"
          >PAUSE
          <v-icon>pause</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
      <v-flex v-bind="{ [`md6`]: true }">
        <v-btn
          color="light-green lighten-1"
          dark
          block
          @click="onUnpauseContainer"
          >UNPAUSE
          <v-icon>play_arrow</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
      <v-flex v-bind="{ [`md6`]: true }">
        <v-btn color="grey darken-4" dark block @click="onRemoveContainer">
          REMOVE
          <i class="fas fa-trash-alt"></i>
        </v-btn>
      </v-flex>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import {
  stopContainer,
  deleteContainer,
  pauseContainer,
  unpauseContainer
} from "../../services/ContainerService.js";

export default {
  props: ["id"],
  methods: {
    onStopContainer: async function() {
      try {
        const { data } = await stopContainer(this.id);
        alert(data);
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
      }
    },
    onRemoveContainer: async function() {
      try {
        const { data } = await deleteContainer(this.id);

        alert(data);
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
      }
    },
    onPauseContainer: async function() {
      try {
        const { data } = await pauseContainer(this.id);
        alert(data);
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
      }
    },
    onUnpauseContainer: async function() {
      try {
        const { data } = await unpauseContainer(this.id);
        alert(data);
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style></style>
