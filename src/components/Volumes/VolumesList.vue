<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h1>Volumes</h1>
        <v-spacer></v-spacer>
        <v-btn color="green lighten-2" dark @click="createVolume">
          Create Volume
          <v-icon>add_circle</v-icon>
        </v-btn>
        <v-btn color="cyan" dark @click="fetchAllVolumes">
          Refresh
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-layout>
      <v-data-table :headers="headers" :items="this.volumes" class="elevation-1 mt-4">
        <template v-slot:items="props">
          <td>{{ props.item.Name }}</td>
          <td>{{ formatDate(props.item.CreatedAt) }}</td>
          <td>{{ props.item.Driver }}</td>
          <td>{{ props.item.Scope }}</td>
          <td>{{ props.item.Mountpoint }}</td>
          <v-btn icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { allVolumes, createVolume } from "../../services/VolumeService";
import moment from "moment";

export default {
  data: () => ({
    volumes: [],
    headers: [
      {
        text: "Name",
        align: "left",
        sortable: false,
        value: "Name"
      },
      {
        text: "Created At",
        align: "left",
        sortable: false,
        value: "CreatedAt"
      },
      {
        text: "Driver",
        align: "left",
        sortable: false,
        value: "Driver"
      },
      {
        text: "Scope",
        align: "left",
        sortable: false,
        value: "Scope"
      },
      {
        text: "Mountpoint",
        align: "left",
        sortable: false,
        value: "Mountpoint"
      }
    ]
  }),
  methods: {
    fetchAllVolumes: async function() {
      try {
        const volumes = await allVolumes();
        this.volumes = volumes.Volumes;
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error listing volumes", {
          position: "top-left"
        });
      }
    },
    formatDate: function(date) {
      return moment(date).format("LLL");
    },
    createVolume: async function() {
      try {
        const volumeName = await this.$dialog.prompt({
          title: "Create Volume",
          text: "Please input a name for the volume"
        });
        console.log(volumeName);

        if (
          typeof volumeName === "undefined" ||
          typeof volumeName === "boolean"
        ) {
          return;
        }

        await createVolume(volumeName);
        this.$dialog.message.success("Volume created", {
          position: "top-left"
        });
        this.fetchAllVolumes();
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error creating the volume", {
          position: "top-left"
        });
      }
    }
  },
  mounted() {
    this.fetchAllVolumes();
  }
};
</script>

<style>
</style>