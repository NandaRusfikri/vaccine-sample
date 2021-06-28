<template>
  <v-app app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-row fill-height align="center" justify="center">
      <v-card
        max-width="500px"
        class="mx-auto rounded-lg"
        hover
        :loading="loading"
      >
        <v-toolbar color="white" flat>
          <v-spacer />
          <v-toolbar-title class="text-center"
            >Sign in with credentials</v-toolbar-title
          >
          <v-spacer />
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
              outlined
              flat
              dense
              label="E-mail Address"
              name="npm"
              v-model="npm"
              :rules="npmRules"
              prepend-inner-icon="mdi-npm"
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
              dense
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
            @click="Login"
            >Sign In</v-btn
          >
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <!-- <v-btn class="caption" text to="/forgot_password"
            >Forget Password?</v-btn
          > -->
          <v-spacer />
          <v-btn class="caption" text to="/register">Create New Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      mahasiswa: [
        { nama: "Nanda", npm: 201943501887 },
        { nama: "Safarudin Alwi Prayogo", npm: 202043579059 }
      ],
      show4: false,
      loading: false,
      eula: true,
      npm: null,
      password: null,
      color: { snackbar: "" },
      snackbar: false,
      message: null,
      response: null,
      npmRules: [v => !!v || "npm wajib diisi"],
      passRules: [v => !!v || "Password wajib diisi"]
    };
  },
  mounted() {


    this.test(2, "four");
  },

  methods: {
    test(d, s) {
      const ayam = ["one", "two", "three", "four", "five"];
      for (let i = 1; i < ayam.length; i++) {
        if (ayam[i] == s) {
          console.log("hasil",(i+1)*d)
        }
      }
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
        //     this.$store.commit("SET_TOKEN", response.data.token);
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

      // this.$req
      //   .post("api/user/v1/user/signin", formData)
      //   .then(response => {
      //     this.loading = false;
      //     var ayam = JSON.stringify(response.data);

      //     this.$cookies.set("user", response.data);
      //     this.$cookies.set("token", response.data.token);

      //     // window.localStorage.setItem("user", JSON.stringify(response.data));
      //     // window.localStorage.setItem("token", response.data.token);

      //     this.$store.commit("SET_USER", response.data);
      //     this.$store.commit("SET_TOKEN", response.data.token);
      //     this.$router.push("/dashboard");
      //     //  this.$router.replace("/admin");
      //   })
      //   .catch(error => {
      //     this.loading = false;
      //     let snackbar = {
      //       color: "error",
      //       message: error.response.data.api_message,
      //       enabled: true
      //     };

      //     this.$store.commit("SET_SNACKBAR", snackbar);
      //   });
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
