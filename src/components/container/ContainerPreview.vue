<template>
  <div>
    <v-card>
      <v-card-actions>
        <span class="headline">{{ container.Image }}</span>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-4" flat dark>
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </v-card-actions>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>ID</v-list-tile-title>
            <v-list-tile-sub-title>{{this.container.Id}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Status</v-list-tile-title>
            <v-list-tile-sub-title>{{this.container.Status}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>State</v-list-tile-title>
            <v-list-tile-sub-title>{{this.container.State}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-card-actions class="justify-center">
        <v-btn color="red darken-3" dark @click="onStopContainer">STOP
          <v-icon>stop</v-icon>
        </v-btn>
        <v-btn color="yellow darken-1" dark>PAUSE
          <v-icon>pause</v-icon>
        </v-btn>
        <!-- <v-btn color="green darken-1" dark>
          <v-icon>add_circle</v-icon>
        </v-btn>-->
        <v-btn color="grey darken-4" dark @click="onRemoveContainer">
          REMOVE
          <i class="fas fa-trash-alt"></i>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import axios from "axios";

export default {
  props: ["container"],
  methods: {
    onStopContainer: async function() {
      try {
        const { data } = await axios({
          method: "delete",
          url: `/api/containers/${this.container.Id}/stop`,
          headers: {
            "Content-Type": "application/json"
          }
        });

        alert(data);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    },
    onRemoveContainer: async function() {
      try {
        const { data } = await axios({
          method: "delete",
          url: `/api/containers/${this.container.Id}/remove`,
          headers: {
            "Content-Type": "application/json"
          }
        });

        alert(data);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>


<style>
.card {
  -webkit-box-shadow: 3px 3px 18px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 18px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 18px 0px rgba(0, 0, 0, 0.75);
}
</style>
