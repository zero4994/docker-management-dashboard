<template>
  <div class="container">
    <div v-if="this.currentView === 'all'">
      <h1>Images</h1>
      <div v-for="(image, index) in this.images" :key="index" class="list-group">
        <docker-image v-bind:image="image" v-on:changeView="changeView"/>
      </div>
    </div>
    <div v-else>
      <docker-image-expanded/>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { allImages } from "../queries";
import Image from "./Image.vue";
import ImageExpanded from "./ImageExpanded.vue";

export default {
  components: {
    "docker-image": Image,
    "docker-image-expanded": ImageExpanded
  },
  mounted: async function() {
    try {
      const {
        data: { data }
      } = await axios({
        method: "post",
        url: "/graphql",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          query: allImages
        })
      });

      this.images = data.Images;
    } catch (error) {
      console.error(error);
    }
  },
  data: () => ({
    images: [],
    selectedImage: {},
    currentView: "all"
  }),
  methods: {
    changeView: function(image) {
      this.currentView = "single";
      this.selectedImage = image;
    }
  }
};
</script>


<style>
</style>
