<template>
  <div class="container">
    <h2>{{this.image.Name}}</h2>
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
      this.image.HostPort = "8081";
      this.image.ContainerPort = "8080";
      const query = runContainer(this.image);
      try {
        console.log("starting container");
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
        console.log("====>", data);
        alert(data.CreateContainer);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
</style>
