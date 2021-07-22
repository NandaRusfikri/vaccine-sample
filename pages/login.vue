<template>
  <v-app app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-row class="ma-10" fill-height align="center" justify="center">
      <v-card
        max-width="400px"
        class="mx-auto rounded-lg"
        hover
        :loading="loading"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle class="text-h6" style="color:black"
              >Lindungi diri dan sekitar dengan vaksinasi
              COVID-19</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Segera daftarkan diri Anda!</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Terbuka untuk seluruh warga berusia 12 tahun ke
              atas.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-form>
            <v-text-field
              outlined
              flat
              placeholder="Masukan NIK Anda"

              hint="Masukan NIK Anda"
              name="nik"
              v-model="nik"
              :rules="nikRules"
              type="text"
            />

            <v-text-field
              outlined
              flat
              placeholder="Nama Lengkap Sesuai KTP"

              hint="Nama Lengkap Sesuai KTP"
              name="name"
              v-model="name"
              :rules="nameRules"
              type="text"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="rounded-lg"
            block
            color="primary"
            :disabled="nik.length != 16 || name.length <= 3"

            large
            @click="Login"
            >Periksa</v-btn
          >
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <!-- <v-btn class="caption" @click="FuncForgetPassowrd()" text
            >Forget Password?</v-btn
          > -->
          <v-spacer />
          <!-- <v-btn class="caption" @click="FuncRegister()" text
            >Create New Account</v-btn
          > -->
        </v-card-actions>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
export default {
  middleware({ store, redirect, app }) {
    if (app.$cookies.get("mahasiswa") !== undefined) {
      return redirect("/biodata");
    }
  },
  name: "login",
  layout: "blank",
  data() {
    return {
      mahasiswa: [
        {
          nik: 3174123456781231,
          password: 201943502024,
          name: "Sindy Silvya"
        },

        {
          nik: 3174123456781232,
          password: 201943502022,
          name: "Herman Setia"
        },
        {
          nik: 3174123456781233,
          password: 201943501887,
          name: "NandaRusfikri"
        },

        {
          nik: 3174123456781234,
          password: 201943502005,
          name: "Lani Oktofiyanto"
        }
      ],
      show4: false,
      loading: false,

      nik: "",
      name: "",
      color: { snackbar: "" },
      snackbar: false,
      message: null,
      response: null,
      nikRules: [v => !!v || "NIK wajib diisi"],
      nameRules: [v => !!v || "Nama wajib diisi"]
    };
  },
  mounted() {},

  methods: {
    FuncForgetPassowrd() {
      let snackbar = {
        color: "warning",
        message: "Password Sama Dengan nik",
        enabled: true
      };

      this.$store.commit("SET_SNACKBAR", snackbar);
    },
    FuncRegister() {
      console.log("ayams");
      this.$router.push("/register");
    },

    async Login({ commit }) {
      this.loading = true;

      var exist = null;
      for (let i = 0; i < this.mahasiswa.length; i++) {
        if (this.mahasiswa[i].nik == this.nik) {
          exist = i;
        }
      }

      if (exist == null) {
        let snackbar = {
          color: "error",
          message: "NIK tidak Terdaftar",
          enabled: true
        };

        this.$store.commit("SET_SNACKBAR", snackbar);
      } else if (
        exist !== null &&
        this.mahasiswa[exist].nik == this.nik
      ) {
        this.$cookies.set("mahasiswa", this.mahasiswa[exist]);
        this.$store.commit("SET_USER", this.mahasiswa[exist]);
        this.$router.push("/biodata");
      } else {
        let snackbar = {
          color: "warning",
          message: "password salah",
          enabled: true
        };

        this.$store.commit("SET_SNACKBAR", snackbar);
      }

      this.loading = false;
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
#latar {
  height: 100%;
  background: rgb(7, 2, 88);
  background: linear-gradient(
    59deg,
    rgba(7, 2, 88, 1) 0%,
    rgba(9, 171, 139, 1) 48%,
    rgba(7, 2, 88, 1) 100%
  );
}

.rounded-card {
  border-radius: 18px;
}
.rounded-btn {
  border-radius: 10px;
}
</style>
