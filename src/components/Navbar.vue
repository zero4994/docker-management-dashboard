<template>
  <nav>
    <v-toolbar app color="light-blue darken-4" dark>
      <v-toolbar-side-icon @click="hidePanel"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <i class="text-black fab fa-docker pr-2"></i>
        <span>Docker</span>
        <span class="font-weight-light">Management Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-navigation-drawer app dark v-model="drawer" width="260">
      <v-list class="pt-4" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" @click="onOptionSelected(item.view)">
          <v-list-tile-action v-html="item.icon"></v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    items: [
      {
        title: "Images",
        icon: `<i class="far fa-file-image fa-2x"></i>`,
        view: "Images"
      },
      {
        title: "Containers",
        icon: `<i class="fas fa-box fa-2x"></i>`,
        view: "Containers"
      },
      {
        title: "Volumes",
        icon: `<i class="far fa-hdd fa-2x"></i>`,
        view: "Volumes"
      }
    ]
  }),
  methods: {
    hidePanel: function() {
      this.drawer = !this.drawer;
    },
    onOptionSelected: function(view) {
      this.$emit("changeView", view);
      this.hidePanel();
    }
  }
};
</script>

<style scoped></style>
