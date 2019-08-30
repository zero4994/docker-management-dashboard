<template>
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

export default {
  props: ["id", "configuration"],
  components: {
    "vue-command": VueCommand
  },
  data: () => ({
    commands: {
      cat: ({ _ }) => {
        return "";
      }
    },
    prompt: "🐳 $",
    intro: "",
    title: "virtual-terminal@docker"
  }),
  methods: {
    setHistory: function(data) {
      this.$refs.terminal.history.push(data);
    }
  },
  mounted() {
    this.intro = `${this.configuration.prompt || this.prompt} ${this
      .configuration.intro || this.intro} ${this.id
      .toString()
      .substring(0, 10)}`;
  }
};
</script>


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