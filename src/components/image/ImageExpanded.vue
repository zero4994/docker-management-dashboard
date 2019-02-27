<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h2>{{ this.image.RepoTags[0].split(":")[0] }}</h2>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-bind="{ [`md8`]: true }">
          <v-card>
            <v-card-actions>
              <v-layout row wrap>
                <v-flex v-bind="{ [`md8`]: true }">
                  <span class="headline">Container options</span>
                </v-flex>
                <v-flex v-bind="{ [`md4`]: true }">
                  <v-select
                    :items="versions"
                    label="Version"
                    outline
                    @change="changeSelectedVersion"
                    v-bind:error="isError"
                    v-bind:error-messages="errorMessages"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card-actions>

            <v-tabs color="dark blue" dark slider-color="yellow">
              <v-tab ripple @click="changeTab('normal')">Normal</v-tab>
              <v-tab ripple @click="changeTab('raw')">Raw</v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>This is where the options go</v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card>
                  <v-textarea solo v-model="rawOptions" rows="20" no-resize></v-textarea>
                </v-card>
              </v-tab-item>
            </v-tabs>

            <v-btn color="yellow accent-4" @click="startContainer">START CONTAINER
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-card>
        </v-flex>
        <v-flex v-bind="{ [`md4`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Additional Info</span>
            </v-card-actions>
            <image-additional-info v-bind:image="image"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import ImageAdditionalInfo from "./ImageAdditionalInfo.vue";

export default {
  props: ["image"],
  components: {
    "image-additional-info": ImageAdditionalInfo
  },
  data: () => ({
    hostPort: "",
    localPort: "",
    rawOptions: "",
    currentTab: "normal",
    versions: [],
    selectedVersion: "",
    errorMessages: [],
    isError: false
  }),
  mounted() {
    this.versions = this.image.RepoTags.map(tag => {
      return tag.split(":")[1];
    });
  },
  methods: {
    changeTab: function(view) {
      this.currentTab = view;
    },
    startContainer: async function() {
      try {
        if (this.selectedVersion === "") {
          this.isError = true;
          this.errorMessages = "Version must be selected";
          return;
        }

        let containerOptions = {};
        if (this.currentTab === "raw") {
          containerOptions = JSON.parse(this.rawOptions);
        }
        containerOptions.Image = `${this.image.RepoTags[0].split(":")[0]}:${
          this.selectedVersion
        }`;

        console.log("starting container");
        const { data } = await axios({
          method: "post",
          url: "/api/containers/create",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(containerOptions)
        });
        console.log("====>", data);
        alert(data);
      } catch (error) {
        console.error(error);
      }
    },
    changeSelectedVersion(selected) {
      this.isError = false;
      this.errorMessages = "";
      this.selectedVersion = selected;
    }
  }
};
</script>

<style></style>
