<template>
  <div>
    <v-card>
      <v-card-actions>
        <span class="title">{{ container.Image }}</span>
        <v-spacer></v-spacer>
        <v-btn color="indigo" dark @click="$emit('changeView', container.Id, 'single')">
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>ID</v-list-tile-title>
            <v-list-tile-sub-title>
              {{
              this.container.Id
              }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Status</v-list-tile-title>
            <v-list-tile-sub-title>
              {{
              this.container.Status
              }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>State</v-list-tile-title>
            <v-list-tile-sub-title>
              {{
              this.container.State
              }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-container>
        <v-layout>
          <v-flex>
            <v-btn color="red darken-3" dark @click="onStopContainer">
              <v-icon>stop</v-icon>
            </v-btn>
          </v-flex>
          <!-- <v-flex>
            <v-btn color="yellow darken-1" dark @click="onPauseContainer">
              <v-icon>pause</v-icon>
            </v-btn>
          </v-flex>-->
          <v-flex>
            <v-btn color="light-green lighten-1" dark @click="onUnpauseContainer">
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-flex>
          <v-flex>
            <v-btn color="grey darken-4" dark @click="onRemoveContainer">
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
