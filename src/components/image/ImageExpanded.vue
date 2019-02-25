<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h2>{{ this.image.RepoTags[0] }}</h2>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-bind="{ [`md8`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Container</span>
            </v-card-actions>
            <v-btn color="yellow accent-4" @click="startContainer">START CONTAINER
              <v-icon>play_arrow</v-icon>
            </v-btn>
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

<style></style>
