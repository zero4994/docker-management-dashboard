<template>
  <div class="card m-3">
    <div class="card-header">
      <h5>{{image.RepoTags[0] || ""}}</h5>
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
      <button class="btn btn-success btn-block" v-on:click="$emit('changeView', image)">
        CREATE CONTAINER
        <i class="pl-2 fas fa-plus-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image"]
};
</script>


<style>
.card {
  -webkit-box-shadow: 3px 3px 18px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 18px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 18px 0px rgba(0, 0, 0, 0.75);
}
</style>
