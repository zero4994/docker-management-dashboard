<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    hide-overlay
    stateless
    dark
    permanent
    absolute
  >
    <v-list class="pa-1">
      <v-list-tile v-if="mini" @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile v-else @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider light></v-divider>

      <v-list-tile @click="$emit('changeView', 'home')">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="$emit('changeView', 'logs')">
        <v-list-tile-action>
          <v-icon>history</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logs</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="$emit('changeView', 'inspect')">
        <v-list-tile-action>
          <v-icon>search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Inspect</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      right: true
    };
  }
};
</script>

<style></style>
