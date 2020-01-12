<template>
  <div>
    <v-card>
      <v-card-actions>
        <span class="title">{{ container.Image }}</span>
        <v-spacer></v-spacer>
        <v-btn
          color="indigo"
          dark
          @click="$emit('changeView', container.Id, 'single')"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>ID</v-list-tile-title>
            <v-list-tile-sub-title>
              {{ this.container.Id }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Status</v-list-tile-title>
            <v-list-tile-sub-title>
              {{ this.container.Status }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>State</v-list-tile-title>
            <v-list-tile-sub-title>
              {{ this.container.State }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-container>
        <v-layout>
          <v-flex>
            <v-btn
              color="red darken-3"
              :dark="!isDisabled"
              @click="onStopContainer"
              :disabled="isDisabled"
            >
              <v-icon>stop</v-icon>
            </v-btn>
          </v-flex>
          <!-- <v-flex>
            <v-btn color="yellow darken-1" dark @click="onPauseContainer">
              <v-icon>pause</v-icon>
            </v-btn>
          </v-flex>-->
          <v-flex>
            <v-btn
              color="light-green lighten-1"
              :dark="!isDisabled"
              @click="onUnpauseContainer"
              :disabled="isDisabled"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-flex>
          <v-flex>
            <v-btn
              color="grey darken-4"
              :dark="!isDisabled"
              @click="onRemoveContainer"
              :disabled="isDisabled"
            >
              <i class="fas fa-trash-alt"></i>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {
  stopContainer,
  deleteContainer,
  unpauseContainer
} from "../../services/ContainerService.js";

export default {
  props: ["container"],
  data: () => ({
    isDisabled: false
  }),
  methods: {
    onStopContainer: async function() {
      try {
        this.isDisabled = true;
        await stopContainer.bind(this)(this.container.Id);
        this.$emit("fetchAllContainers");

        this.$dialog.message.success("Container successfully stopped", {
          position: "top-left"
        });
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error stopping container", {
          position: "top-left"
        });
      }
      this.isDisabled = false;
    },
    onRemoveContainer: async function() {
      try {
        const forceRemove = await this.$dialog.confirm({
          text: "Do you want to force remove the container?",
          title: "Remove Container",
          actions: {
            false: "No",
            true: "Yes"
          }
        });

        if (typeof forceRemove === "undefined") {
          return;
        }
        this.isDisabled = true;
        await deleteContainer.bind(this)(this.container.Id, forceRemove);
        this.$emit("fetchAllContainers");
        this.$dialog.message.success("Container removed", {
          position: "top-left"
        });
      } catch (error) {
        console.error(error);
        this.isDisabled = false;
        this.$dialog.message.error("Error removing the container", {
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
        this.$emit("fetchAllContainers");
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
