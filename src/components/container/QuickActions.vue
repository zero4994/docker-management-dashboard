<template>
  <v-card class="mt-2">
    <v-card-actions>
      <span class="headline">Quick Actions</span>
    </v-card-actions>
    <v-layout row wrap>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
      <v-flex v-bind="{ [`md6`]: true }">
        <v-btn color="red darken-3" dark block @click="onStopContainer">
          STOP
          <v-icon>stop</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-bind="{ [`md3`]: true }"></v-flex>
      <v-flex v-bind="{ [`md6`]: true }">
        <v-btn color="yellow darken-1" dark block @click="onPauseContainer">
          PAUSE
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
        >
          UNPAUSE
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
        await stopContainer.bind(this)(this.id);
        this.$dialog.message.success("Container successfully stopped", {
          position: "top-left"
        });
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error stopping container", {
          position: "top-left"
        });
      }
    },
    onRemoveContainer: async function() {
      try {
        const forceRemove = await this.$dialog.confirm({
          text: "Do you want to force remove the container?",
          title: "Remove Container",
          actions: {
            false: "No",
            true: "yes"
          }
        });

        if (typeof forceRemove === "undefined") {
          return;
        }

        await deleteContainer.bind(this)(this.id, forceRemove);
        this.$dialog.message.success("Container removed", {
          position: "top-left"
        });
        this.$emit("changeView", "allContainers");
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error removing the container", {
          position: "top-left"
        });
      }
    },
    onPauseContainer: async function() {
      try {
        await pauseContainer(this.id);
        this.$dialog.message.success("Container successfully paused", {
          position: "top-left"
        });
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error pausing container", {
          position: "top-left"
        });
      }
    },
    onUnpauseContainer: async function() {
      try {
        await unpauseContainer(this.id);
        this.$dialog.message.success("Container successfully unpaused", {
          position: "top-left"
        });
        this.$emit("fetchContainer", this.id);
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error unpausing container", {
          position: "top-left"
        });
      }
    }
  }
};
</script>

<style></style>
