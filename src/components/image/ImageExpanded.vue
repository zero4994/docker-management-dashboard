<template>
  <!-- <div class="container">
    <h2>{{this.image.Name}}</h2>
    <div class>
      <div class="card">
        <div class="card-body">
          <h5>Additional Properties</h5>
          <div class="row">
            <div class="ml-2 mr-2 col-sm-4 border border-secondary rounded">
              <h6 class="mt-2 text-muted">Port Binding</h6>
              <div class="form-group">
                <label for="hostPort">Host Port</label>
                <input v-model="hostPort" type="text" class="form-control" id="hostPort">
              </div>
              <div class="form-group">
                <label for="localPort">Local Port</label>
                <input v-model="localPort" type="text" class="form-control" id="localPort">
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-warning mt-3" v-on:click="startContainer">
        START CONTAINER
        <i class="pl-2 fas fa-play"></i>
      </button>
    </div>
  </div>-->
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h2>{{this.image.RepoTags}}</h2>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-bind="{ [`md8`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Container</span>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-bind="{ [`md4`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Additional Info</span>
            </v-card-actions>
            <image-additional-info v-bind:image="image"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import axios from "axios";
import ImageAdditionalInfo from "./ImageAdditionalInfo.vue";

export default {
  props: ["image"],
  components: {
    "image-additional-info": ImageAdditionalInfo
  },
  data: () => ({
    hostPort: "",
    localPort: ""
  }),
  mounted() {
    console.log(this.image);
  },
  methods: {
    startContainer: async function() {
      this.image.HostPort = this.localPort; //8081
      this.image.ContainerPort = this.hostPort; //8080
      try {
        console.log("starting container");
        const { data } = await axios({
          method: "post",
          url: "/api/containers/create",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify({
            Image: this.image.RepoTags[0]
          })
        });
        console.log("====>", data);
        alert(data);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
</style>
