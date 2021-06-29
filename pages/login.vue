<template>
  <v-app app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-row class="ma-10" fill-height align="center" justify="center">
      <v-card
        min-width="400px"
        class="mx-auto rounded-lg"
        hover
        :loading="loading"
      >
        <v-toolbar color="white" flat>
          <v-spacer />
          <v-toolbar-title
            class="text-center display-1 font-weight-black"
            style="font-family: Comfortaa,sans-serif; font-Weight:300"
            ><b>For Participant</b></v-toolbar-title
          >
          <v-spacer />
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
              outlined
              flat
              label="Username"
              placeholder="Username"
              persistent-hint
              hint="Username"
              name="npm"
              v-model="npm"
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
          <v-spacer />
          <v-btn
            class="rounded-lg"
            block
            color="primary"
            :disabled="loading"
            dark
            large
            @click="Login"
            >Sign In</v-btn
          >
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <v-btn class="caption" @click="FuncForgetPassowrd()" text
            >Forget Password?</v-btn
          >
          <v-spacer />
          <v-btn class="caption" @click="FuncRegister()" text
            >Create New Account</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
export default {
  middleware({ store, redirect, app }) {
    if (app.$cookies.get("mahasiswa") !== undefined) {
      return redirect("/register");
    }
    console.log("cookie login", app.$cookies.get("mahasiswa"));
    console.log("middleware login", store.state.user);
  },
  name: "login",
  layout: "blank",
  data() {
    return {
      mahasiswa: [
        {
          nama: "Ajeng Larasati ",
          npm: 201943501949
        },
        {
          nama: "Sindy Silvya",
          npm: 201943502024
        },
        {
          nama: " Andri Ardiansyah",
          npm: 201943501899
        },
        {
          nama: "Risky Muhamad",
          npm: 201943502061
        },
        {
          nama: "Rendi Gunawan",
          npm: 201943502022
        },
        {
          nama: "Muhammad Ananda Rusfikri",
          npm: 201943501887
        },
        {
          nama: "Inka Bunga Pertiwi",
          npm: 201943502068
        },
        {
          nama: "Fetra Ela Rahmah",
          npm: 201943502001
        },
        {
          nama: "Fariz Dwi Prayitno",
          npm: 201943501912
        },
        {
          nama: "Rahmat Irfanudin",
          npm: 201943501999
        },
        {
          nama: "Muhammad Rizki Fadil",
          npm: 201943502072
        },
        {
          nama: "Niluh Chintya Rizkiyana",
          npm: 201943501955
        },
        {
          nama: "Pratama Hadi Saputra",
          npm: 201943501894
        },
        {
          nama: "Almathari",
          npm: 202043579043
        },
        {
          nama: "Fahrul Rozi",
          npm: 201943502031
        },
        {
          nama: "Khrisna Adi S",
          npm: 201943502053
        },
        {
          nama: "Irfan solehudin",
          npm: 201943501997
        },
        {
          nama: "Hanif Art Swendho",
          npm: 201943502069
        },
        {
          nama: "Ismarianto",
          npm: 201943579152
        },
        {
          nama: "Fathi Hamid",
          npm: 201943501994
        },
        {
          nama: "Doddy Al Fattah",
          npm: 201943502041
        },
        {
          nama: "Muhamad Riyadh",
          npm: 201943502050
        },
        {
          nama: "Muhammad Fajar Septiawan",
          npm: 201543501647
        },
        {
          nama: "Aditya Permata restu",
          npm: 201943502018
        },
        {
          nama: "Ali Zaid Sa'ari",
          npm: 201943501962
        },
        {
          nama: "Thufaila Hasna",
          npm: 201943501927
        },
        {
          nama: "Satrio Wibisono",
          npm: 201943501934
        },
        {
          nama: "Wardoyo",
          npm: 201943502006
        },
        {
          nama: "Lani Oktofiyanto",
          npm: 201943502005
        },
        {
          nama: "Rama lana komara",
          npm: 201943502066
        },
        {
          nama: "Ade Fadel Amirudin",
          npm: 201943502074
        },
        {
          nama: "Bayu Rahmadani",
          npm: 201943502073
        },
        {
          nama: "Safarudin Alwi Prayogo",
          npm: 202043579059
        },
        {
          nama: "Aditya Prayoga",
          npm: 201943502046
        }
      ],
      show4: false,
      loading: false,

      npm: null,
      password: null,
      color: { snackbar: "" },
      snackbar: false,
      message: null,
      response: null,
      npmRules: [v => !!v || "username wajib diisi"],
      passRules: [v => !!v || "Password wajib diisi"]
    };
  },
  mounted() {},

  methods: {
    FuncForgetPassowrd() {
      let snackbar = {
        color: "warning",
        message: "Password Sama Dengan NPM",
        enabled: true
      };

      this.$store.commit("SET_SNACKBAR", snackbar);
    },
    FuncRegister() {
      let snackbar = {
        color: "warning",
        message: "Harap Hubungi Panitia Penyelenggara",
        enabled: true
      };

      this.$store.commit("SET_SNACKBAR", snackbar);
    },

    async Login({ commit }) {
      this.loading = true;

      var exist = null;
      for (let i = 0; i < this.mahasiswa.length; i++) {
        if (this.mahasiswa[i].npm == this.npm) {
          exist = i;
        }
      }

      if (exist == null) {
        let snackbar = {
          color: "error",
          message: "NPM tidak ada",
          enabled: true
        };

        this.$store.commit("SET_SNACKBAR", snackbar);
      } else if (
        exist !== null &&
        this.mahasiswa[exist].npm == this.npm &&
        this.mahasiswa[exist].npm == this.password
      ) {
        this.$cookies.set("mahasiswa", this.mahasiswa[exist]);
        this.$store.commit("SET_USER", this.mahasiswa[exist]);
        this.$router.push("/register");
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
