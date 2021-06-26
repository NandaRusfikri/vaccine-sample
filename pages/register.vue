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
                dense
                label="Nama"
                :rules="[rules.required]"
                name="Nama"
                v-model="Register.User.Name"
                prepend-inner-icon="mdi-account"
                type="text"
              />
              <v-text-field
                outlined
                flat
                dense
                label="E-mail Address"
                name="Email"
                v-model="Register.User.Email"
                prepend-inner-icon="mdi-email"
                type="text"
              />

              <v-text-field
                outlined
                flat
                dense
                :rules="[rules.required]"
                label="Telepon"
                name="Telepon"
                v-model="Register.User.Phone"
                prepend-inner-icon="mdi-phone"
                type="text"
              />
              <v-text-field
                outlined
                flat
                dense
                :rules="[rules.required]"
                label="NIK"
                name="NIK"
                v-model="Register.User.NIK"
                prepend-inner-icon="mdi-card"
                type="text"
              />
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Tanggal Lahir"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    outlined
                    :rules="[rules.required]"
                    flat
                    dense
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :active-picker.sync="activePicker"
                  max="2015-01-01"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              :disabled="!valid || loading"
              block
              @click="onSubmit"
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
      activePicker: null,
      date: null,
      menu: false,
      loading: false,
      valid: false,
      show4: false,
      color: { snackbar: "" },
      snackbar: false,
      message: null,
      Register: {
        Company: { CompanyName: null, CompanyType: null },
        User: { Name: null, Email: null, NIK: [], Phone: null }
      },
      rules: {
        required: value => !!value || "Field Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        passMatch: v => v == this.password || "password you entered don't match"
      },
      DataCompanyType: [],
      emailRules: [v => !!v || "Email wajib diisi"],
      passRules: [v => !!v || "Password wajib diisi"]
    };
  },
  async created() {},
  mounted() {},
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },

    async onSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;

        var biodata = {
          nama: this.Register.User.Name,
          tgl_lahir: this.date,
          phone: this.Register.User.Phone,
          email: this.Register.User.email,
          NIK: this.Register.User.NIK
        };

        this.$cookies.set("biodata", biodata);

        this.loading = false;
        this.$router.replace("/skrining");
      }
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
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
