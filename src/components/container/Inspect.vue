<template>
  <div>
    <span class="headline mb-4">Inspect Container</span>
    <terminal ref="terminal" :id="this.id" :configuration="this.configuration" />
  </div>
</template>

<script>
import Terminal from "../Terminal";
import { inspectContainer } from "../../services/ContainerService.js";
export default {
  props: ["id"],
  components: {
    terminal: Terminal
  },
  data: () => ({
    container: ""
  }),
  created() {
    this.configuration = {
      intro: "docker container inspect"
    };
  },
  mounted() {
    this.inspectContainer(this.id);
  },
  methods: {
    inspectContainer: async function(id) {
      try {
        const data = await inspectContainer(id);
        this.$refs.terminal.setHistory(
          `<pre>${JSON.stringify(data, null, 3)}</pre>`
        );
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
