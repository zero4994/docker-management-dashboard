<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h1>Volumes</h1>
        <v-spacer></v-spacer>
        <v-btn color="green lighten-2" dark @click="createVolume">
          Create Volume
          <v-icon class="icon-padding-left">add_circle</v-icon>
        </v-btn>
        <v-btn color="cyan" dark @click="fetchAllVolumes">
          Refresh
          <v-icon class="icon-padding-left">refresh</v-icon>
        </v-btn>
      </v-layout>
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
        :items="this.volumes"
        class="elevation-1 mt-4 mb-4"
        :rows-per-page-items="[10]"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ formatText(props.item.Name) }}</td>
          <td>{{ formatDate(props.item.CreatedAt) }}</td>
          <td>{{ props.item.Driver }}</td>
          <td>{{ props.item.Scope }}</td>
          <td>{{ formatText(props.item.Mountpoint, 50) }}</td>
          <v-btn icon @click="deleteVolume(props.item.Name)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-footer
        color="#e9ebee"
        absolute
        height="60"
        style="margin-bottom: 2rem"
      >
        <v-btn color="red darken-4" dark @click="pruneVolumes" absolute right>
          Prune Volumes
          <i class="fas fa-trash-alt icon-padding-left"></i>
        </v-btn>
      </v-footer>
    </v-container>
  </div>
</template>

<script>
import {
  allVolumes,
  createVolume,
  removeVolume,
  pruneVolumes
} from "../../services/VolumeService";
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
    ],
    search: ""
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
    formatText: function(text, maxLength = 20) {
      return text.length <= maxLength
        ? text
        : `${text.substr(0, maxLength)}...`;
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
    },
    deleteVolume: async function(name) {
      try {
        const confirmation = await this.$dialog.confirm({
          text: `Are you sure you want to remove the volume ${name}?`,
          title: "Remove Volume",
          actions: {
            false: "No",
            true: "yes"
          }
        });

        if (typeof confirmation === "undefined" || !confirmation) {
          return;
        }

        await removeVolume(name);
        this.$dialog.message.success("Successfully removed volume", {
          position: "top-left"
        });
        this.fetchAllVolumes();
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error removing volume", {
          position: "top-left"
        });
      }
    },
    pruneVolumes: async function() {
      try {
        const confirmation = await this.$dialog.confirm({
          text:
            "WARNING! This will remove all local volumes not used by at least one container. Are you sure you want to continue?",
          title: "Prune Volumes",
          actions: {
            false: "No",
            true: "Yes"
          }
        });

        if (typeof confirmation === "undefined") {
          return;
        }

        const result = await pruneVolumes();

        this.$dialog.message.success(
          `Volumes deleted: ${result.VolumesDeleted.length}, Space reclaimed: ${result.SpaceReclaimed}B`,
          { position: "top-left" }
        );

        this.fetchAllVolumes();
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error pruning volumes", {
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

<style></style>
