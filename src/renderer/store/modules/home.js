const state = {
  filters: {
    title: '',
    tags: []
  },
};

const mutations = {
  setFilters(state, filters) {
    state.filters = filters;
  },
};

const actions = {
  async SET_FILTERS({ commit }, filters) {
    commit('setFilters', filters)
  },
};

export default {
  state,
  mutations,
  actions,
};
