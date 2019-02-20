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
  props: ["id"],
  data: () => ({
    logs: "",
    interval: {},
    lastUpdateTime: 0
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.getLogs(this.id, this.lastUpdateTime);
    }, 1000);
  },
  beforeDestroy() {
    console.log("clearing interval");
    clearInterval(this.interval);
  },
  methods: {
    getLogs: async function(id, lastUpdateTime) {
      try {
        const { data } = await getContainerLogs(id, lastUpdateTime);
        const logData = String(data.logs);
        this.logs += logData;
        this.lastUpdateTime = data.lastUpdateTime;

        if (logData.length > 0) {
          var textarea = document.getElementById("textLogs");
          textarea.scrollTop = textarea.scrollHeight;
        }
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
