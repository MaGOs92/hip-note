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
      await save(settings)
      commit('setSettings', settings);  
    }
    catch (err) {
      console.error('Erreur lors de la sauvegarde du document', err);
    }
  },
  async GET_SETTINGS({ commit }) {
    try {
      const settings = await load();
      commit('setSettings', settings);
    } catch (err) {
      console.error('Erreur lors de la lecture du document', err);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
