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
    <v-dialog max-width="400px" v-model="dialog_place">
      <v-card class="rounded-lg">
        <v-toolbar flat dense>
          <v-toolbar-title dark
            ><b>Konfirmasi Pemilihan Lokasi </b></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_place = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text v-if="selected_item">
          <v-card
            flat
            class="rounded-lg"
            :color="
              selected_item.current >= selected_item.target
                ? '#FFF1F1'
                : '#EAEFF1'
            "
          >
            <v-card-subtitle class="pb-0"
              ><b>{{ selected_item.title }}</b></v-card-subtitle
            >
            <v-card-subtitle class="pt-0"
              >{{ selected_item.desc }}, Kelurahan, 12930</v-card-subtitle
            >
            <v-card-text>
              <div class="d-flex " align="center" justify="center">
                <v-progress-linear
                  rounded
                  class="mr-2"
                  :color="
                    selected_item.current >= selected_item.target
                      ? '#FF7C7C'
                      : 'primary'
                  "
                  height="12"
                  :value="(100 / selected_item.target) * selected_item.current"
                >
                  <template v-slot:default="{ value }">
                    <div style="color:white">
                      <strong>{{ selected_item.current }}</strong>
                    </div>
                  </template></v-progress-linear
                >
                <span style="font-size:12px"
                  ><b>
                    {{
                      Math.ceil(
                        (100 / selected_item.target) * selected_item.current
                      )
                    }}%
                  </b></span
                >
              </div>
              <span style="font-size:12px"
                >Kuota: <b>{{ selected_item.target }}/Hari</b></span
              >
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_place = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn dense small @click="FuchSavePlace()" color="primary">
            Lanjut
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="700px" v-model="dialog_skrining">
      <v-card class="rounded-lg">
        <v-toolbar flat dense>
          <v-toolbar-title dark
            ><b>Skrining Vaksinasi COVID-19* </b></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_skrining = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="skrining"
            hide-default-footer
          >
            <!-- <v-radio-group v-model=""></v-radio-group> -->
            <template v-slot:item.yes="{ item }">
              <v-icon
                v-if="!item.yes"
                @click="
                  (item.yes = true),
                    (item.no = false),
                    (item.answer = 'Y'),
                    FuncValidSkrining()
                "
                >mdi-checkbox-blank-outline</v-icon
              >
              <v-icon
                v-if="item.yes"
                @click="
                  (item.yes = false), (item.answer = null), FuncValidSkrining()
                "
                >mdi-checkbox-marked</v-icon
              >
            </template>
            <template v-slot:item.no="{ item }">
              <v-icon
                v-if="!item.no"
                @click="
                  (item.no = true),
                    (item.yes = false),
                    (item.answer = 'N'),
                    FuncValidSkrining()
                "
                >mdi-checkbox-blank-outline</v-icon
              >
              <v-icon
                v-if="item.no"
                @click="
                  (item.no = false), (item.answer = null), FuncValidSkrining()
                "
                >mdi-checkbox-marked</v-icon
              >
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_skrining = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn
            dense
            :disabled="!validasi_skrining"
            small
            @click="FuncSaveSkrining()"
            color="primary"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row v-if="selected_place" align="center" justify="center">
      <v-col cols="12" md="2" sm="2">
        <v-avatar class="ma-3 center" size="200" tile>
          <v-img src="qr-code.svg"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <v-card flat height="200">
          <v-card-title>{{ biodata.nama }}</v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle class="py-0"
            >NIK : <b>{{ biodata.NIK }}</b></v-card-subtitle
          >
          <v-card-subtitle class="py-0"
            >No Antrian : <b>{{ selected_place.antrian }}</b></v-card-subtitle
          >
          <v-card-subtitle class="py-0"
            >Lokasi : <b>{{ selected_place.place.title }}</b></v-card-subtitle
          >
          <v-card-subtitle class="py-0">
            <span style="color:red">
              Wajib Datang Sebelum Pukul 10:00
            </span></v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" md="11" sm="11">
        <v-card flat class="rounded-lg">
          <v-toolbar dense flat>
            <b>Pilih Lokasi Vaksinasi</b>
            <v-spacer />
            <!-- <v-select
              style="maxWidth:130px"
              hide-details
              outlined
              :items="periode"
              dense
              v-model="selected_periode"
              single-line
            ></v-select> -->
          </v-toolbar>
          <v-row class="mx-auto pt-2">
            <v-col
              v-for="item in assignment"
              :key="item.title"
              cols="12"
              md="3"
              sm="3"
            >
              <v-card
                hover
                @click="(selected_item = item), (dialog_place = true)"
                class="rounded-lg"
                :color="item.current >= item.target ? '#FFF1F1' : '#EAEFF1'"
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
                      ><b>
                        {{ Math.ceil((100 / item.target) * item.current) }}%
                      </b></span
                    >
                  </div>
                  <span style="font-size:12px"
                    >Kuota: <b>{{ item.target }}/Hari</b></span
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware({ store, redirect, app }) {
    // if (store.state.user == undefined) {
    //   return redirect("/login");
    // }

    if (app.$cookies.get("biodata") == undefined) {
      return redirect("/biodata");
    }
    //  console.log("cookie place",app.$cookies.get("biodata"))
    // console.log("middleware place",store.state.user)
  },
  // layout: "home",
  data() {
    return {
      validasi_skrining: false,
      skrining: [
        {
          nomor: 1,
          question: "Apakah Anda pernah terkonfirmasi menderita COVID-19?",
          yes: null,
          no: null,
          answer: null
        },
        {
          nomor: 2,
          question: "Apakah Anda sedang hamil atau menyusui?",
          yes: null,
          no: null,
          answer: null
        },
        {
          nomor: 3,
          question:
            "Apakah Anda mengalami gejala ISPA seperti batuk/pilek/sesak napas dalam 7 hari terakhir?",
          yes: null,
          no: null,
          answer: null
        },
        {
          nomor: 4,
          question:
            "Apakah ada anggota keluarga serumah yang kontak erat/suspek/konfirmasi/sedang dalam perawatan karena penyakit COVID-19?",
          yes: null,
          no: null,
          answer: null
        },
        {
          nomor: 5,
          question:
            "Apakah Anda memiliki riwayat alergi berat atau mengalami gejala sesak napas, bengkak dan kemerahan setelah divaksinasi COVID-19 sebelumnya?(pertanyaan untuk vaksinasi ke-2?",
          yes: null,
          no: null,
          answer: null
        },
        {
          nomor: 6,
          question:
            "Apakah Anda sedang mendapatkan terapi aktif jangka panjang terhadap penyakit kelainan darah?",
          yes: null,
          no: null,
          answer: null
        }
      ],
      headers: [
        {
          text: "No",
          sortable: false,
          value: "nomor"
        },
        {
          text: "Pertanyaan",
          sortable: false,
          value: "question"
        },
        { text: "YA", sortable: false, value: "yes" },
        { text: "TIDAK", sortable: false, value: "no" }
      ],
      dialog_skrining: false,
      biodata: null,
      selected_place: null,
      selected_item: null,
      dialog_place: false,
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
      dates: ["2021-06-15", "2021-06-20"]
    };
  },
  methods: {
    FuncValidSkrining() {
      var question = 0;
      for (let i = 0; i < this.skrining.length; i++) {
        if (this.skrining[i].answer == null) {
          question = question + 1;
        }
      }
      question == 0
        ? (this.validasi_skrining = true)
        : (this.validasi_skrining = false);
    },
    async FuchSavePlace() {
      var reverse = {};
      console.log("skring ", this.$cookies.get("skrining"));
      if (this.$cookies.get("skrining") == undefined) {
        this.dialog_skrining = true;
      } else {
        reverse = {
          place: this.selected_item,
          antrian:
            Math.floor(Math.random() * this.selected_item.target) +
            this.selected_item.current
        };
        this.$cookies.set("reverse", reverse);
        this.dialog_place = false;
        let snackbar = {
          color: "success",
          message:
            "Pendaftaran Berhasil Silahkan Mendatangi Tempat yang dipilih.",
          enabled: true
        };

        this.$store.commit("SET_SNACKBAR", snackbar);

        this.selected_place = reverse;
      }
    },
    FuncSaveSkrining() {
      this.$cookies.set("skrining", this.skrining);
      var reverse = {
        place: this.selected_item,
        antrian:
          Math.floor(Math.random() * this.selected_item.target) +
          this.selected_item.current
      };
      this.$cookies.set("reverse", reverse);

      let snackbar = {
        color: "success",
        message:
          "Pendaftaran Berhasil Silahkan Mendatangi Tempat yang dipilih.",
        enabled: true
      };

      this.$store.commit("SET_SNACKBAR", snackbar);

      this.selected_place = reverse;

      this.dialog_place = false;
      this.dialog_skrining = false;
    }
  },
  created() {
    var biodata = this.$cookies.get("biodata");
    var reverse = this.$cookies.get("reverse");
    this.biodata = biodata;
    this.selected_place = reverse;
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
