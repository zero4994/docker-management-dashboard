<template>
  <v-card>
    <v-card-actions>
      <span class="headline">Additional Info</span>
    </v-card-actions>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>ID</v-list-tile-title>
          <v-list-tile-sub-title>{{ this.container.Id }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Created</v-list-tile-title>
          <v-list-tile-sub-title>
            {{
            this.container.Created
            }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Command</v-list-tile-title>
          <v-list-tile-sub-title>
            {{
            this.container.Command
            }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Image</v-list-tile-title>
          <v-list-tile-sub-title>
            {{
            this.container.Image
            }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>State</v-list-tile-title>
          <v-list-tile-sub-title>
            {{
            this.container.State
            }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Status</v-list-tile-title>
          <v-list-tile-sub-title>
            {{
            this.container.Status
            }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Names</v-list-tile-title>
          <v-list-tile-sub-title>
            {{
            this.container.Names
            }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["container"],
  computed: {
    millis: function() {
      const millis = Number(this.container.Created) * 1000;
      const date = new Date(millis);
      console.log("this is the moment test ==>", millis);
      return 0;
    }
  }
};
</script>

<style></style>
