<template>
  <div>
    <span class="headline">Container Logs</span>
    <terminal ref="terminal" :id="this.id" :configuration="this.configuration" />
  </div>
</template>

<script>
import Terminal from "../Terminal";
import { getContainerLogs } from "../../services/ContainerService.js";
import { setInterval } from "timers";
export default {
  props: ["id"],
  components: {
    terminal: Terminal
  },
  data: () => ({
    configuration: {}
  }),
  created() {
    this.configuration = {
      intro: "docker container logs",
      "hide-prompt": true
    };
  },
  mounted() {
    this.getLogs(this.id);
    // const data = JSON.stringify({ a: 1, b: 2, c: 3, d: [4, 5, 6] }, null, 3);
    this.$refs.terminal.setHistory(`<pre>${data}</pre>`);
  },
  methods: {
    getLogs: async function(id) {
      try {
        await getContainerLogs(id, this.$refs.terminal.setHistory);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
</style>
