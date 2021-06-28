<template>
  <div :style="{ background: $vuetify.theme.themes[theme].background }">
    <!-- <v-toolbar
      :style="{ background: $vuetify.theme.themes[theme].background }"
      flat
    >
      <v-toolbar-title
        @click="$router.push('/')"
        style="font-family: Comfortaa,sans-serif"
      >
        <b>{{ $router.currentRoute.name }}</b></v-toolbar-title
      >
    </v-toolbar> -->

    <v-row align="center" justify="center">
      <v-col cols="12" md="7" sm="7">
       <v-card class="pa-10" flat :color="$vuetify.theme.themes[theme].background">
          <h1 style="font-family: Comfortaa,sans-serif; font-size:44px">
            #Ayo Berdamai Dengan Virus Corona
          </h1>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-card flat :color="$vuetify.theme.themes[theme].background">
                <v-card-title><b>For Administrator</b></v-card-title>
                <v-card-text
                  >Bergabung menjadi relawan vaksinasi covid 19 selamatkan orang
                  tercinta selamatkan Indonesia.</v-card-text
                >
                <v-card-actions>
                  <v-btn block outlined color="primary">Start Help People </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-card flat :color="$vuetify.theme.themes[theme].background">
                <v-card-title><b>For Participant </b></v-card-title>
                <v-card-text
                  >Ayo ikut program Vaksinasi dan ciptakan Herd Immunity. Hidup
                  sehat mudah cari kerja.
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" @click="$router.push('/login')" >Sign Up </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" sm="5">
        <v-img src="jaga_jarak.svg"></v-img>
      </v-col>

      <!-- <v-col cols="12" md="11" sm="11">
        <v-card flat class="rounded-lg">
          <v-toolbar dense flat>
            <b>Pilih Lokasi Vaksinasi</b>
            <v-spacer />
            <v-select
              style="maxWidth:130px"
              hide-details
              outlined
              :items="periode"
              dense
              v-model="selected_periode"
              single-line
            ></v-select>
          </v-toolbar>
          <v-row class="mx-auto pt-2">
            <v-col
              v-for="item in assignment"
              :key="item.title"
              cols="12"
              md="3"
              sm="3"
            >
              <v-card hover
                class="rounded-lg"
                :color="item.current >= item.target ?   '#FFF1F1' : '#EAEFF1'"
              >
                <v-card-subtitle class="pb-0"
                  ><b>{{ item.title }}</b></v-card-subtitle
                >
                <v-card-subtitle class="pt-0">{{ item.desc }}</v-card-subtitle>
                <v-card-text>
                  <div class="d-flex " align="center" justify="center">
                    <v-progress-linear
                      rounded
                      class="mr-2"
                      :color="
                        item.current >= item.target ? '#FF7C7C' : 'primary'
                      "
                      height="12"
                      :value="(100 / item.target) * item.current"
                    >
                      <template v-slot:default="{ value }">
                        <div style="color:white">
                          <strong>{{ item.current }}</strong>
                        </div>
                      </template></v-progress-linear
                    >
                    <span style="font-size:12px"
                      ><b> {{ Math.ceil((100 / item.target) * item.current) }}% </b></span
                    >
                  </div>
                   <span style="font-size:12px"
                      >Kuota:  <b>{{ item.target }}/Hari</b></span
                    >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col> -->
    </v-row>
  </div>
</template>
<script>
export default {
  // middleware({ store, redirect }) {
  //   if (store.state.user == undefined) {
  //     return redirect("/login");
  //   }
  // },
  // layout: "home",
  data() {
    return {
      assignment: [
        {
          title: "Universitas Pancasila",
          desc: "Jakarta Selatan, Kecamatan",
          target: 300,
          current: 5
        },
        {
          title: "Rs Pertamina Jaya",
          desc: "Jakarta Pusat, Kecamatan",
          target: 1000,
          current: 8
        },
        {
          title: "Kalbis Institute",
          desc: "Jakarta Timur, Kecamatan",
          target: 500,
          current: 400
        },
        {
          title: "RSUD Kemayoran",
          desc: "Jakarta Pusat, Kecamatan",
          target: 30,
          current: 30
        },
        {
          title: "RSUD Kramat Jati",
          desc: "Jakarta Timur, Kecamatan",
          target: 320,
          current: 200
        },
        {
          title: "RSUD Cengkareng",
          desc: "Jakarta Barat, Kecamatan ",
          target: 40,
          current: 20
        }
      ],
      periode: ["Daily", "Weekly", "Mouthly", "Year"],
      selected_periode: "Daily",
      dates: ["2021-06-15", "2021-06-20"],
      summary: [
        {
          icon: "mdi-account-multiple",
          name: "Users",
          color: "#3377FF",
          bg_color: "rgba(51, 119, 255, 0.1)",
          angka: "400"
        },
        {
          icon: "mdi-account-multiple",
          name: "Prospect",
          color: "#FCC35B",
          bg_color: "rgba(252, 195, 91, 0.1)",
          angka: "300"
        },
        {
          icon: "mdi-account-multiple",
          name: "Order",
          color: "#F98DB4",
          bg_color: "rgba(249, 141, 180, 0.1)",
          angka: "100"
        },
        {
          icon: "mdi-account-multiple",
          name: "Booking",
          color: "#7B6FFF",
          bg_color: "rgba(123, 111, 255, 0.1)",
          angka: "200"
        }
      ],
      menus: [
        { title: "dashboard", to: "/" },
        {
          title: "Prospect",
          to: "/prospect"
        },
        { title: "Order", to: "/order" },

        {
          title: "Import Data",
          to: "/import"
        },
        {
          title: "Export Data",
          to: "/export"
        },
        {
          title: "Assignment",
          to: "/assignment"
        },
        {
          title: "Users",
          to: "/setting/user"
        },
        {
          title: "Group",
          to: "/setting/group"
        },
        {
          title: "Permission",
          to: "/setting/permission"
        }
      ]
    };
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>
<style scoped>
.deskripsi {
  padding: 0.75rem;
  border: 3px solid black;
  box-shadow: 0.6rem 0.6rem 0 #222;
  border-radius: 0.25rem;
  background-color: #f2f7f5;
  margin-bottom: 2rem;
}
</style>
