<template>
  <div>
    <div v-if="this.currentView === 'all'">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <h1>Images</h1>
          <v-spacer></v-spacer>
          <v-btn color="cyan" dark @click="fetchAllImages">
            Refresh
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-container>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="image in this.images" :key="image.Id" v-bind="{ [`md4`]: true }" sm4>
            <docker-image v-bind:image="image" v-on:changeView="changeView" />
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div v-else>
      <docker-image-expanded v-bind:image="this.selectedImage" />
    </div>
  </div>
</template>

<script>
import { allImages } from "../../services/ImageService.js";
import Image from "./Image.vue";
import ImageExpanded from "./ImageExpanded.vue";

export default {
  components: {
    "docker-image": Image,
    "docker-image-expanded": ImageExpanded
  },
  mounted: function() {
    this.fetchAllImages();
  },
  data: () => ({
    images: [],
    selectedImage: {},
    currentView: "all"
  }),
  methods: {
    fetchAllImages: async function() {
      try {
        this.images = await allImages.bind(this)();
      } catch (error) {
        console.error(error);
        this.$dialog.message.error(error.toString(), { position: "top" });
      }
    },
    changeView: function(image) {
      this.currentView = "single";
      this.selectedImage = image;
    }
  }
};
</script>

<style></style>
