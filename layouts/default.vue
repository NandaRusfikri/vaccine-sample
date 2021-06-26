<template>
  <v-app app>
    <v-app-bar
      dense
      flat
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      :style="{ background: $vuetify.theme.themes[theme].background }"
    >
      <v-toolbar-title style="font-family: Comfortaa;font-weight: 800" class="ml-0 pl-4">
        <b>E-Vaksin</b>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-snackbar
        v-model="snackbar.enabled"
        :color="snackbar.color"
        absolute
        top
      >
        <strong>{{ snackbar.message }}</strong>
        <template v-slot:action="{ attrs }">
          <v-btn dark icon v-bind="attrs" @click="snackbar.enabled = false">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    snackbar() {
      return this.$store.getters.Snackbar;
    }
  }
};
</script>
<style scoped></style>
