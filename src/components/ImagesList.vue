<template>
  <div class="container">
    <div v-if="this.currentView === 'all'">
      <div class="row">
        <div class="col-sm-10">
          <h1>Images</h1>
        </div>
        <div class="col-sm-2">
          <button class="btn btn-info btn-block" @click="fetchAllImages">
            Refresh
            <i class="pl-2 fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      <div v-for="(image, index) in this.images" :key="index" class="list-group">
        <docker-image v-bind:image="image" v-on:changeView="changeView"/>
      </div>
    </div>
    <div v-else>
      <docker-image-expanded v-bind:image="this.selectedImage"/>
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
        const { data } = await axios({
          method: "get",
          url: "api/images",
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.images = data;
      } catch (error) {
        console.error(error);
      }
    },
    changeView: function(image) {
      this.currentView = "single";
      this.selectedImage = image;
    }
  }
};
</script>


<style>
</style>
