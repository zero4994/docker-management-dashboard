<template>
  <div class="sidebar-wrapper">
    <ul class="sidebar-nav">
      <li>
        <button v-on:click="$emit('changeView', 'Images')">
          <h5>Images</h5>
        </button>
      </li>
      <li>
        <button v-on:click="$emit('changeView', 'Containers')">
          <h5>Containers</h5>
        </button>
      </li>
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
</style>
