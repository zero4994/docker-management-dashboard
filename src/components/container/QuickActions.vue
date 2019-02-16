<template>
  <v-card class="mt-2">
    <v-card-actions>
      <span class="headline">Quick Actions</span>
    </v-card-actions>
    <v-btn color="red darken-3" dark @click="onStopContainer">STOP
      <v-icon>stop</v-icon>
    </v-btn>
    <v-btn color="yellow darken-1" dark @click="onPauseContainer">PAUSE
      <v-icon>pause</v-icon>
    </v-btn>
    <v-btn color="light-green lighten-1" dark @click="onUnpauseContainer">UNPAUSE
      <v-icon>play_arrow</v-icon>
    </v-btn>
    <v-btn color="grey darken-4" dark @click="onRemoveContainer">
      REMOVE
      <i class="fas fa-trash-alt"></i>
    </v-btn>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>
