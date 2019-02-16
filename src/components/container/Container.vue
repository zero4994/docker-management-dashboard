<template>
  <div>
    <sidebar/>
    <v-container fluid grid-list-md id="workspace">
      <v-layout row wrap>
        <!-- <v-flex v-bind="{ [`md1`]: true }"></v-flex> -->
        <v-flex v-bind="{ [`md8`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Hello World</span>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-bind="{ [`md3`]: true }">
          <v-card>
            <v-card-actions>
              <span class="headline">Additional Info</span>
            </v-card-actions>
            <additional-info v-bind:container="container"/>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import Sidebar from "./Sidebar.vue";
import AdditionalInfo from "./AdditionalInfo.vue";
export default {
  components: { sidebar: Sidebar, "additional-info": AdditionalInfo },
  props: ["container"],
  mounted() {
    console.log(this.container);
  }
};
</script>


<style>
#workspace {
  margin-left: 7rem;
}
</style>
