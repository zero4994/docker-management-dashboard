<template>
  <div class="card m-3">
    <div class="card-header">
      <h5>{{image.Name}}</h5>
    </div>
    <div class="card-body">
      <ul class="list-group mb-3">
        <li class="list-group-item">
          <p>Id: {{image.Id}}</p>
        </li>
        <li class="list-group-item">
          <p>Created: {{image.Created}}</p>
        </li>
      </ul>
      <button class="btn btn-success btn-block" v-on:click="changeView">RUN</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image"],
  data: function() {
    return {
      currentView: "singleImage"
    };
  },
  mounted() {
    console.log(this.currentView);
  },
  methods: {
    changeView: function() {
      this.currentView = "propsImage";
    }
  }
};
</script>


<style>
</style>
