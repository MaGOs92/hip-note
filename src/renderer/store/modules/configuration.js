import { save, load } from '../../providers/configuration.provider';

const state = {
  settings: {},
};

const mutations = {
  setSettings(state, settings) {
    state.settings = settings;
  },
};

const actions = {
  async SAVE_SETTINGS({ commit }, settings) {
    try {
      await save(settings);
      commit('setSettings', settings);
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message:
          'Une erreur est survenue lors de la sauvegarde de la configuration.',
      });
      console.error(err);
    }
  },
  async GET_SETTINGS({ commit }) {
    try {
      const settings = await load();
      commit('setSettings', settings);
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message:
          'Une erreur est survenue lors de la lecture de la configuration.',
      });
      console.error(err);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
