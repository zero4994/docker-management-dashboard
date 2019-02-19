<template>
  <v-card>
    <v-card-actions>
      <span class="headline">Inspect</span>
    </v-card-actions>
    <v-card-actions>
      <v-textarea solo readonly v-model="container" class="fixed-heigth" rows="32" no-resize></v-textarea>
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


<style scoped>
.fixed-heigth {
  height: 44rem;
  resize: none;
}
</style>
