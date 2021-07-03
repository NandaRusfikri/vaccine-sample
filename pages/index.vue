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
        <v-card
          class="pa-10"
          flat
          :color="$vuetify.theme.themes[theme].background"
        >
          <h1 style="font-family: Comfortaa,sans-serif; font-size:44px">
            #Ayo Berdamai Dengan Virus Corona
          </h1>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-card flat :color="$vuetify.theme.themes[theme].background">
                <v-card-title><b>For Facilitator</b></v-card-title>
                <v-card-text
                  >Bergabung menjadi relawan vaksinasi covid 19 selamatkan orang
                  tercinta selamatkan Indonesia.</v-card-text
                >
                <v-card-actions>
                  <v-btn block outlined color="primary"
                    >Start Help People
                  </v-btn>
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
                  <v-btn block color="primary" @click="$router.push('/login')"
                    >Sign In
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" sm="5">
        <v-img src="jaga_jarak.svg"></v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
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
  mounted() {
    var task = [20 ,7 ,10 ,8 ,10 ,27 ,2 ,3 ,10 ,5];
    // this.server(task, 60 );

    this.almost(650)
  },
  methods: {
    almost(n){
      var total = 0
      for (let i = 1; i < n; i++) {
       if (n % i == 0) {
         total = total+i
       }

      }
      if (total == n) {
        console.log(n ,"perpect")
      }else if (total - n >= 2) {
        console.log(n ,"almost perpect")
      }else{
        console.log(n ,"not perfect")
      }
      console.log("total ",total)

    },
    server(task, t) {
      var time = 0;
      var task_complate = 0;
      for (let i = 0; i < task.length; i++) {

        if (task[i] + time < t) {
          console.log("task ",task[i] + time)

          time = time + task[i];
          console.log("time ",time)
        } else {
          task_complate = i ;
          break;
        }
      }
      console.log("task_complate ", task_complate);
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
.deskripsi {
  padding: 0.75rem;
  border: 3px solid black;
  box-shadow: 0.6rem 0.6rem 0 #222;
  border-radius: 0.25rem;
  background-color: #f2f7f5;
  margin-bottom: 2rem;
}
</style>
