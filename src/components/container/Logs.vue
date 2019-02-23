<template>
  <v-card>
    <v-card-actions>
      <span class="headline">Logs</span>
    </v-card-actions>
    <v-card-actions>
      <v-textarea
        solo
        readonly
        name="input-7-1"
        v-model="logs"
        class="fixed-heigth"
        rows="32"
        no-resize
        dark
        id="textLogs"
      ></v-textarea>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getContainerLogs } from "../../services/ContainerService.js";
export default {
  props: ["id", "socket"],
  data: () => ({
    logs: "",
    interval: {},
    lastUpdateTime: 0
  }),
  mounted() {
    this.socket.on(this.id, message => {
      this.logs += message;
      if (message.length > 0) {
        var textarea = document.getElementById("textLogs");
        textarea.scrollTop = textarea.scrollHeight;
      }
    });
    this.getLogs(this.id, this.lastUpdateTime);
  },
  beforeDestroy() {
    console.log("clearing interval");
    clearInterval(this.interval);
  },
  methods: {
    getLogs: async function(id, lastUpdateTime) {
      try {
        await getContainerLogs(id, lastUpdateTime);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
.fixed-heigth {
  height: 44rem;
  resize: none;
}
</style>
