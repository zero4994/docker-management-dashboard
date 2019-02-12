<template>
  <div class="card m-3">
    <div class="card-header">
      <h5>{{container.Image}}</h5>
    </div>
    <div class="card-body">
      <ul class="list-group mb-3">
        <li class="list-group-item">
          <p>Id: {{container.Id}}</p>
        </li>
        <li class="list-group-item">
          <p>Status: {{container.Status}}</p>
        </li>
        <li class="list-group-item">
          <p>Command: {{container.Command}}</p>
        </li>
        <li class="list-group-item">
          <p>State: {{container.State}}</p>
        </li>
        <li class="list-group-item">
          <p>Ports</p>
          <ul class="list-group" v-for="(port, index) in container.Ports" :key="index">
            <li class="list-group-item">IP: {{port.IP || "null"}}</li>
            <li class="list-group-item">Private Port: {{port.PrivatePort || "null"}}</li>
            <li class="list-group-item">Public Port: {{port.PublicPort || "null"}}</li>
            <li class="list-group-item">Type: {{port.Type || "null"}}</li>
          </ul>
        </li>
      </ul>
      <button class="btn btn-danger d-inline mr-4" @click="onStopContainer">STOP CONTAINER</button>
      <button class="btn btn-dark d-inline" @click="onRemoveContainer">REMOVE CONTAINER</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { stopContainer, removeContainer } from "../queries";

export default {
  props: ["container"],
  methods: {
    onStopContainer: async function() {
      const query = stopContainer(this.container.Id);
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
            query
          })
        });

        alert(data.StopContainer);
        this.$emit("fetchAllContainers");
      } catch (error) {
        console.error(error);
      }
    },
    onRemoveContainer: async function() {
      const query = removeContainer(this.container.Id);
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
            query
          })
        });

        alert(data.RemoveContainer);
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
