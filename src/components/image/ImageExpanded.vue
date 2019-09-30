<template>
  <div>
    <v-container fluid grid-list-md>
      <h1 class="mb-2">{{ this.image.name }}</h1>
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
                    :items="tags"
                    label="Tags"
                    outline
                    @change="changeSelectedTag"
                    v-bind:error="isError"
                    v-bind:error-messages="errorMessages"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card-actions>

            <v-tabs color="dark blue" dark slider-color="yellow">
              <v-tab ripple @click="changeTab('raw')">Raw</v-tab>

              <v-tab-item>
                <v-card>
                  <v-textarea solo v-model="rawOptions" rows="20" no-resize></v-textarea>
                </v-card>
              </v-tab-item>
            </v-tabs>

            <v-btn color="yellow accent-4" @click="startContainer">
              START CONTAINER
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </v-card>
        </v-flex>
        <v-flex v-bind="{ [`md4`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Additional Info</span>
            </v-card-actions>
            <image-additional-info ref="additionalInfo" />
          </v-card>
          <v-btn
            block
            :disabled="isBtnDisabled"
            class="white--text"
            color="red darken-4"
            @click="deleteImage"
          >
            Delete Image
            <i class="fas fa-trash-alt icon-padding-left"></i>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImageAdditionalInfo from "./ImageAdditionalInfo.vue";
import { createContainer } from "../../services/ContainerService";
import { removeImage } from "../../services/ImageService";

export default {
  props: ["image"],
  components: {
    "image-additional-info": ImageAdditionalInfo
  },
  data: () => ({
    hostPort: "",
    localPort: "",
    rawOptions: "",
    currentTab: "raw",
    tags: [],
    selectedTag: "",
    errorMessages: [],
    isError: false,
    isBtnDisabled: true
  }),
  mounted() {
    this.refreshTags();
  },
  methods: {
    refreshTags: function() {
      this.tags = Object.keys(this.image.tags);
    },
    changeTab: function(view) {
      this.currentTab = view;
    },
    startContainer: async function() {
      try {
        if (this.selectedTag === "") {
          this.isError = true;
          this.errorMessages = "Tag must be selected";
          return;
        }

        let containerOptions = {};
        if (this.currentTab === "raw" && this.rawOptions.length > 0) {
          containerOptions = JSON.parse(this.rawOptions);
        }
        containerOptions.Image = `${this.image.name}:${this.selectedTag}`;

        const containerID = await createContainer.bind(this)(containerOptions);

        this.$dialog.message.success(
          `Container created with id: ${containerID}`,
          {
            position: "top-left"
          }
        );
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error starting the container", {
          position: "top-left"
        });
      }
    },
    changeSelectedTag(selected) {
      this.isError = false;
      this.errorMessages = "";
      this.selectedTag = selected;
      this.$refs.additionalInfo.onSelectedImage(this.image.tags[selected]);
      this.isBtnDisabled = false;
    },
    async deleteImage() {
      try {
        const confirmation = await this.$dialog.confirm({
          text: `This will remove "${this.image.name}", along with any untagged parent images. Are you sure you want to continue?`,
          title: "Delete Image",
          actions: {
            false: "No",
            true: "Yes"
          }
        });

        if (typeof confirmation === "undefined" || !confirmation) {
          return;
        }

        await removeImage(this.image.tags[this.selectedTag].Id);

        this.$dialog.message.success("Image successfully removed", {
          position: "top-left"
        });

        delete this.image.tags[this.selectedTag];
        this.changeSelectedTag("");
        this.refreshTags();
      } catch (error) {
        console.error(error);
        this.$dialog.message.error("Error removing image", {
          position: "top-left"
        });
      }
    }
  }
};
</script>

<style></style>
