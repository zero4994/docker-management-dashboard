<template>
  <div class="container">
    <h2>{{this.image.Name}}</h2>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h5>Additional Properties</h5>
          <div class="row">
            <div class="ml-2 col-sm-4 border border-secondary rounded">
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
      <button class="btn btn-warning mt-3" v-on:click="startContainer">START CONTAINER</button>
    </div>
  </div>
</template>


<script>
import { runContainer } from "../queries";
import axios from "axios";
export default {
  props: ["image"],
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
