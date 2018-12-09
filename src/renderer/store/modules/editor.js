import { exportToPDF } from '../../providers/export.provider';

const state = {
  fullWidth: false,
  isExporting: false
};

const mutations = {
  setFullWidth(state, fullWidth) {
    state.fullWidth = fullWidth;
  },
  setIsExporting(state, isExporting) {
    state.isExporting = isExporting;
  }
};

const actions = {
  SET_FULLWIDTH({commit}, fullWidth) {
    commit('setFullWidth', fullWidth);
  },
  async EXPORT_TO_PDF({commit}, document) {
    commit('setIsExporting', true);
    try {
      await exportToPDF(document);
    } catch (err) {
      console.log(err);
    } finally {
      commit('setIsExporting', false);
    }
  }
};

export default {
  state,
  mutations,
  actions,
};
