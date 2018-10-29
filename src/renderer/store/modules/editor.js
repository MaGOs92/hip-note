const state = {
  fullWidth: false
};

const mutations = {
  setFullWidth(state, fullWidth) {
    state.fullWidth = fullWidth;
  },
};

const actions = {
  SET_FULLWIDTH({commit}, fullWidth) {
    commit('setFullWidth', fullWidth);
  }
};

export default {
  state,
  mutations,
  actions,
};
