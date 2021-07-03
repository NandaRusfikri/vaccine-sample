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
              name="username"
              v-model="username"
              :rules="usernameRules"
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
      return redirect("/biodata");
    }

  },
  name: "login",
  layout: "blank",
  data() {
    return {
      mahasiswa: [
        {
          username: 201943502024,
          password: 201943502024,
          nama: "Sindy Silvya"
        },

        {
          username: 201943502022,
          password: 201943502022,
          nama: "Rendi Gunawan"
        },
        {
          username: 201943501887,
          password: 201943501887,
          nama: "NandaRusfikri"
        },

        {
          username: 201943502005,
          password: 201943502005,
          nama: "Lani Oktofiyanto"
        }
      ],
      show4: false,
      loading: false,

      username: null,
      password: null,
      color: { snackbar: "" },
      snackbar: false,
      message: null,
      response: null,
      usernameRules: [v => !!v || "username wajib diisi"],
      passRules: [v => !!v || "Password wajib diisi"]
    };
  },
  mounted() {},

  methods: {
    FuncForgetPassowrd() {
      let snackbar = {
        color: "warning",
        message: "Password Sama Dengan username",
        enabled: true
      };

      this.$store.commit("SET_SNACKBAR", snackbar);
    },
    FuncRegister() {
      console.log("ayams")
        this.$router.push("/register");
    },

    async Login({ commit }) {
      this.loading = true;

      var exist = null;
      for (let i = 0; i < this.mahasiswa.length; i++) {
        if (this.mahasiswa[i].username == this.username) {
          exist = i;
        }
      }

      if (exist == null) {
        let snackbar = {
          color: "error",
          message: "username tidak ada",
          enabled: true
        };

        this.$store.commit("SET_SNACKBAR", snackbar);
      } else if (
        exist !== null &&
        this.mahasiswa[exist].username == this.username &&
        this.mahasiswa[exist].username == this.password
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
