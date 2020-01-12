<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="this.containers"
      class="elevation-1 mt-4 mb-4"
      :rows-per-page-items="[10]"
    >
      <template v-slot:items="props">
        <td>{{ props.item.Image }}</td>
        <td>{{ props.item.Id.substr(0, 15) }}</td>
        <td>{{ formatDate(props.item.Created) }}</td>
        <td>{{ props.item.Status }}</td>
        <td>{{ props.item.State }}</td>
        <v-btn
          color="indigo"
          dark
          icon
          @click="$emit('changeView', container.Id, 'single')"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
        <v-btn
          color="red darken-3"
          :dark="!isDisabled"
          @click="onStopContainer"
          :disabled="isDisabled"
          icon
        >
          <v-icon>stop</v-icon>
        </v-btn>
        <v-btn
          color="light-green lighten-1"
          :dark="!isDisabled"
          @click="onUnpauseContainer"
          :disabled="isDisabled"
          icon
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn
          color="grey darken-4"
          :dark="!isDisabled"
          @click="onRemoveContainer"
          :disabled="isDisabled"
          icon
        >
          <i class="fas fa-trash-alt"></i>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { allContainers } from "../../services/ContainerService.js";
import moment from "moment";

export default {
  data: () => ({
    containers: [],
    interval: {},
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "Image"
      },
      {
        text: "ID",
        align: "left",
        sortable: false,
        value: "Id"
      },
      {
        text: "Created",
        align: "left",
        sortable: false,
        value: "Created"
      },
      {
        text: "Status",
        align: "left",
        sortable: false,
        value: "Status"
      },
      {
        text: "State",
        align: "left",
        sortable: false,
        value: "State"
      }
    ]
  }),
  mounted: function() {
    this.fetchAllContainers();
    this.interval = setInterval(() => {
      this.fetchAllContainers();
    }, 5000);
  },
  methods: {
    fetchAllContainers: async function() {
      this.containers = await allContainers.bind(this)();
      console.log({ containers: this.containers });
    },
    formatDate: function(date) {
      return moment(date).format("LLL");
    }
  },
  beforeDestroy() {
    console.log("clearing interval");
    clearInterval(this.interval);
  }
};
</script>

<style></style>
