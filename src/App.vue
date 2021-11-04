<template>
  <v-app>
    <v-main>
      <ThemeViewer/>
    </v-main>
    <v-footer app>
      <small><a target="_blank" href="https://www.wakfu.com/fr/mmorpg">WAKFU MMORPG : © {{new Date().getFullYear()}} Ankama Studio. All rights reserved</a> "wakfu-theme-viewer" and it's derivative services are unofficial websites without any connection with Ankama.</small>
      <v-spacer/>
      <v-btn-toggle v-model="themeToggle">
        <v-btn @click="$vuetify.theme.dark = true" x-small>
          Dark
        </v-btn>

        <v-btn @click="$vuetify.theme.dark = false" x-small>
          Light
        </v-btn>
      </v-btn-toggle>
    </v-footer>
  </v-app>
</template>

<script>
import ThemeViewer from './components/ThemeViewer';

export default {
  name: 'App',

  components: {
    ThemeViewer,
  },

  data: () => ({
    themeToggle: 1,
  }),
};
</script>

<style>
  .v-application .text-center {
    text-align: left !important;
  }
</style>
