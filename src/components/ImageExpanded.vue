<template>
  <div class="container">
    <h1>{{this.image.Name}}</h1>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h5>Additional Properties</h5>
        </div>
      </div>
      <button class="btn btn-warning mt-3" v-on:click="startContainer">START</button>
    </div>
  </div>
</template>


<script>
import { runContainer } from "../queries";
import axios from "axios";
export default {
  props: ["image"],
  mounted() {
    console.log(this.image);
  },
  methods: {
    startContainer: async function() {
      const query = runContainer(this.image.Name);
      try {
        console.log("start container");
        const {
          data: { data }
        } = await axios({
          method: "post",
          url: "/graphql",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify({
            query
          })
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
</style>
