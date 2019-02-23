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
    logs: ""
  }),
  mounted() {
    this.socket.on(this.id, message => {
      this.logs += message;
      let textarea = document.getElementById("textLogs");
      if (textarea) {
        textarea.scrollTop = textarea.scrollHeight;
      }
    });
    this.getLogs(this.id);
  },
  methods: {
    getLogs: async function(id) {
      try {
        await getContainerLogs(id);
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
