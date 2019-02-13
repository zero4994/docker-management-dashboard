<template>
  <div class="sidebar-wrapper mt-3 mb-3">
    <ul class="sidebar-nav list-group">
      <button
        v-on:click="$emit('changeView', 'Images')"
        class="list-group-item list-group-item-action border-bottom"
      >
        <h5>Images</h5>
      </button>
      
      <button
        v-on:click="$emit('changeView', 'Containers')"
        class="list-group-item list-group-item-action"
      >
        <h5>Containers</h5>
      </button>
    </ul>
  </div>
</template>


<script>
export default {
  methods: {
    onLinkClick: function(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
.list-group-item {
  background-color: #cfeef7;
}
</style>
