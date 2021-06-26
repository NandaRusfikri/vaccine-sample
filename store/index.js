import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      token: null,
      dialog: false,
      id_prospect : null,
      snackbar: { color: "", message: null, enabled: false }
    },
    mutations: {
      SET_USER(state, user) {
        state.user = user;
      },
      SET_IdProspect(state, id_prospect) {
        state.id_prospect = id_prospect;
      },
      SET_TOKEN(state, token) {
        state.token = token;
      },
      SET_DIALOG(state, dialog) {
        state.dialog = dialog;
      },
      SET_SNACKBAR(state, snackbar) {
        state.snackbar = snackbar;
      }
    },
    getters: {
      Snackbar: state => {
        return state.snackbar;
      },
      IdProspect: state => {
        return state.id_prospect;
      }
    },
    actions: {
      store_token({ commit }, token) {
        commit("SET_TOKEN", token);
      }
    }
  });
};

export default createStore;

