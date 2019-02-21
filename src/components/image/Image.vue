<template>
  <div>
    <v-card>
      <v-card-actions>
        <span class="headline">{{ image.RepoTags }}</span>
      </v-card-actions>
      <v-btn
        color="green lighten-2"
        block
        dark
        v-on:click="$emit('changeView', image)"
        >CREATE CONTAINER
        <v-icon>add_circle</v-icon>
      </v-btn>
    </v-card>
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
