<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Docker</span>
        <span class="font-weight-light">Management Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="$emit('changeView', 'Images')">Images</v-btn>
        <v-btn flat @click="$emit('changeView', 'Containers')">Containers</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
