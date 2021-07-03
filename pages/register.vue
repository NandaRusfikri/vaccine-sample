<template>
  <v-app app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-snackbar v-model="snackbar" :color="color.snackbar" top="top">
      {{ message }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <br />

    <v-row fill-height align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="rounded-lg" :loading="loading">
          <v-toolbar color="white" flat>
            <v-spacer />
            <v-toolbar-title class="text-center"
              >Biodata Peserta Vaksin</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                outlined
                flat
                label="Nama"
                :rules="[rules.required]"
                name="Nama"
                v-model="name"
                prepend-inner-icon="mdi-account"
                type="text"
              />
              <v-text-field
                outlined
                flat
                label="Username"
                placeholder="Username"
                persistent-hint
                hint="Username"
                name="npm"
                v-model="username"
                :rules="npmRules"
                prepend-inner-icon="mdi-account"
                type="text"
              />

              <v-text-field
                :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-inner-icon="mdi-key"
                :rules="passRules"
                :type="show4 ? 'text' : 'password'"
                name="password"
                label="Password"
                outlined
                v-model="password"
                @click:append="show4 = !show4"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              :disabled="!valid || !name || !username || !password"
              block
              @click="onSubmit"
              >Daftar</v-btn
            >
          </v-card-actions>

          <v-card-text align="center">
            <v-card-subtitle dark
              >Dengan Daftar di E-Vaksin, saya setuju dengan</v-card-subtitle
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
  // middleware({ store, redirect, app }) {
  //   if (app.$cookies.get("mahasiswa") == undefined) {
  //     return redirect("/login");
  //   } else if (app.$cookies.get("biodata") !== undefined) {
  //     return redirect("/place");
  //   }

  //   console.log("middleware login", store.state.user);
  //   console.log("cookie", app.$cookies.get("mahasiswa"));
  // },
  data() {
    return {
      activePicker: null,
      date: null,
      username: null,
      password: null,
      menu: false,
      loading: false,
      valid: false,
      show4: false,
      color: { snackbar: "" },
      snackbar: false,
      message: null,
      name: null,
      show4: false,
      npmRules: [v => !!v || "username wajib diisi"],
      passRules: [v => !!v || "Password wajib diisi"],
      rules: {
        required: value => !!value || "Field Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        passMatch: v => v == this.password || "password you entered don't match"
      },
      emailRules: [v => !!v || "Email wajib diisi"],
      passRules: [v => !!v || "Password wajib diisi"]
    };
  },
  async created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      var daftar = {
        username: this.username,
        password: this.password,
        nama: this.name
      };
      this.$cookies.set("mahasiswa", daftar);
      this.$store.commit("SET_USER", daftar);
      this.$router.push("/biodata");
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
