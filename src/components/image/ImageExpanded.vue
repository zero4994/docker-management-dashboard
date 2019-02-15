<template>
  <div class="container">
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
  </div>
</template>


<script>
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
