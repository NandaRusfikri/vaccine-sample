<template>
  <v-app app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-snackbar v-model="snackbar" :color="color.snackbar" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <br />

    <v-row fill-height align="center" justify="center">
      <v-col cols="12" sm="8" md="7">
        <v-card class="rounded-lg" :loading="loading">
          <v-toolbar color="white" flat>
            <v-spacer />
            <v-toolbar-title class="text-center"
              >Skrining Vaksinasi COVID-19*</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>

          <v-card-text>
            <!-- <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Question
                    </th>
                    <th class="text-left">
                      YA
                    </th>
                    <th class="text-left">
                      TIDAK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in skrining" :key="item.question">
                    <td>{{ item.question }}</td>
                    <v-radio-group v-model="item.answer">
                      <td>
                        <v-radio value="true"></v-radio>
                      </td>
                      <td><v-radio value="false"></v-radio></td>
                    </v-radio-group>
                  </tr>
                </tbody>
              </template>
            </v-simple-table> -->
            <v-data-table
              :headers="headers"
              :items="skrining"
              hide-default-footer
            >
              <!-- <v-radio-group v-model=""></v-radio-group> -->
              <template v-slot:item.yes="{ item }">
                <v-icon
                  v-if="!item.yes"
                  @click="(item.yes = true), (item.no = false)"
                  >mdi-checkbox-blank-outline</v-icon
                >
                <v-icon v-if="item.yes" @click="item.yes = false"
                  >mdi-checkbox-marked</v-icon
                >
              </template>
              <template v-slot:item.no="{ item }">
                <v-icon
                  v-if="!item.no"
                  @click="(item.no = true), (item.yes = false)"
                  >mdi-checkbox-blank-outline</v-icon
                >
                <v-icon v-if="item.no" @click="item.no = false"
                  >mdi-checkbox-marked</v-icon
                >
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :disabled="loading" block @click="onSubmit"
              >Daftar</v-btn
            >
          </v-card-actions>

          <v-card-text align="center">
            <v-card-subtitle dark
              >Dengan masuk di E-Vaksin, saya setuju dengan</v-card-subtitle
            >

            <!-- <router-link to="/faq"> Kebijakan Privasi.</router-link> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br />
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      skrining: [
        {
          question: "Apakah Anda pernah terkonfirmasi menderita COVID-19?",
          yes: null,
          no: null,
          answer: null
        },
        {
          question: "Apakah Anda sedang hamil atau menyusui?",
          yes: null,
          no: null,
          answer: null
        },
        {
          question:
            "Apakah Anda mengalami gejala ISPA seperti batuk/pilek/sesak napas dalam 7 hari terakhir?",
          yes: null,
          no: null,
          answer: null
        }
      ],
      headers: [
        {
          text: "Pertanyaan",
          sortable: false,
          value: "question"
        },
        { text: "YA", sortable: false, value: "yes" },
        { text: "TIDAK", sortable: false, value: "no" }
      ],

      loading: false,

      show4: false,
      color: { snackbar: "" },
      snackbar: false,
      message: null,

      rules: {
        required: value => !!value || "Field Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        passMatch: v => v == this.password || "password you entered don't match"
      }
    };
  },
  async created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      this.loading = true;

      this.$cookies.set("skrining", this.skrining);

      this.loading = false;
      this.$router.replace("/place");
    }
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>

<style scoped>
#gradient {
  height: 100%;
  background: rgb(7, 2, 88);
  background: linear-gradient(
    59deg,
    rgba(7, 2, 88, 1) 0%,
    rgba(9, 171, 139, 1) 48%,
    rgba(7, 2, 88, 1) 100%
  );
}
</style>
