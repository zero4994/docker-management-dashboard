<template>
  <!-- <v-card>
    <v-card-actions>
      <! -- <span class="headline">Logs</span> - ->
    </v-card-actions>
    <v-card-actions>
      
    </v-card-actions>
  </v-card>-->
  <vue-command
    ref="terminal"
    :commands="commands"
    :prompt="prompt"
    :intro="intro"
    :title="title"
    :show-intro="true"
  />
</template>

<script>
import VueCommand from "vue-command";
import "vue-command/dist/vue-command.css";
import { getContainerLogs } from "../../services/ContainerService.js";
import { setInterval } from "timers";
export default {
  props: ["id"],
  components: {
    "vue-command": VueCommand
  },
  data: () => ({
    logs: "",
    commands: {
      cat: ({ _ }) => {
        return "";
      }
    },
    prompt: "🐳 $",
    intro: `docker container logs`,
    title: "virtual-terminal@docker"
  }),
  mounted() {
    this.intro = `${this.prompt} ${this.intro} ${this.id
      .toString()
      .substring(0, 10)}`;

    this.getLogs(this.id);
  },
  methods: {
    getLogs: async function(id) {
      try {
        await getContainerLogs(id, null, this.$refs.terminal.history);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<!--<style>
.fixed-heigth {
  height: 44rem;
  resize: none;
}
</style>-->


<style lang="scss">
.vue-command {
  .term {
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }

  .term-std {
    // min-width: 50px;
    // max-width: 50px;
    height: 45.5rem;
    // max-height: 600px;
    overflow-y: scroll;
  }
}
</style>
