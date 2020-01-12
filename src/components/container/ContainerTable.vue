<template>
  <div>
    <v-layout>
      <v-flex md8></v-flex>
      <v-flex md4>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="this.containers"
      class="elevation-1 mt-4 mb-4"
      :rows-per-page-items="[10]"
      :search="search"
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
          @click="$emit('changeView', props.item.Id, 'single')"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
        <v-btn
          color="red darken-3"
          :dark="!isDisabled"
          @click="onStopContainer(props.item.Id)"
          :disabled="isDisabled"
          icon
        >
          <v-icon>stop</v-icon>
        </v-btn>
        <v-btn
          color="light-green lighten-1"
          :dark="!isDisabled"
          @click="onUnpauseContainer(props.item.Id)"
          :disabled="isDisabled"
          icon
        >
          <v-icon>play_arrow</v-icon>
        </v-btn>
        <v-btn
          color="grey darken-4"
          :dark="!isDisabled"
          @click="onRemoveContainer(props.item.Id)"
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
import {
  stopContainer,
  deleteContainer,
  unpauseContainer
} from "../../services/ContainerService.js";

export default {
  data: () => ({
    containers: [],
    interval: {},
    isDisabled: false,
    search: "",
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
    },
    formatDate: function(date) {
      return moment(date).format("LLL");
    },
    onStopContainer: async function(id) {
      try {
        this.isDisabled = true;
        await stopContainer.bind(this)(id);
        this.fetchAllContainers();

        this.$dialog.message.success("Container successfully stopped", {
          position: "top-left"
        });
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error stopping container", {
          position: "top-left"
        });
      }
      this.isDisabled = false;
    },
    onRemoveContainer: async function(id) {
      try {
        const forceRemove = await this.$dialog.confirm({
          text: "Do you want to force remove the container?",
          title: "Remove Container",
          actions: {
            false: "No",
            true: "Yes"
          }
        });

        if (typeof forceRemove === "undefined") {
          return;
        }
        this.isDisabled = true;
        await deleteContainer.bind(this)(id, forceRemove);
        this.isDisabled = false;
        this.fetchAllContainers();
        this.$dialog.message.success("Container removed", {
          position: "top-left"
        });
      } catch (error) {
        console.error(error);
        this.isDisabled = false;
        this.$dialog.message.error("Error removing the container", {
          position: "top-left"
        });
      }
    },
    onUnpauseContainer: async function(id) {
      try {
        await unpauseContainer(id);
        this.isDisabled = true;
        this.$dialog.message.success("Container successfully unpaused", {
          position: "top-left"
        });
        this.isDisabled = false;
        this.fetchAllContainers();
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error unpausing container", {
          position: "top-left"
        });
      }
    }
  },
  beforeDestroy() {
    console.log("clearing interval");
    clearInterval(this.interval);
  }
};
</script>

<style></style>
