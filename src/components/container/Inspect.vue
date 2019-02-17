<template>
  <v-card>
    <v-card-actions>
      <span class="headline">Inspect</span>
    </v-card-actions>
    <v-card-actions>
      <v-textarea solo :auto-grow="true" name="input-7-1" v-model="container" disabled></v-textarea>
    </v-card-actions>
  </v-card>
</template>


<script>
import { inspectContainer } from "../../services/ContainerService.js";
export default {
  props: ["id"],
  data: () => ({
    container: ""
  }),
  mounted() {
    this.inspectContainer(this.id);
  },
  methods: {
    inspectContainer: async function(id) {
      try {
        const { data } = await inspectContainer(id);
        this.container = JSON.stringify(data, null, 3);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>


<style>
</style>
