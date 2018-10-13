import shortid from 'shortid';

const state = {
  id: '',
  title: 'Sans titre',
  content: '# Hello World :)',
  type: 'NOTE',
};

const mutations = {
  setId(state) {
    state.id = shortid.generate();
  },
  setTitle(state, title) {
    state.title = title;
  },
  setType(state, type) {
    state.type = type;
  },
  setContent(state, content) {
    state.content = content;
  },
  setState(state, note) {
    state = note;
  },
};

const actions = {
  SET_TITLE({ commit, state }, title) {
    if (!state.id) {
      commit('setId');
    }
    commit('setTitle', title);
  },
  SET_CONTENT({ commit, state }, content) {
    if (!state.id) {
      commit('setId');
    }
    commit('setContent', content);
  },
  SET_TYPE({ commit, state }, type) {
    if (!state.id) {
      commit('setId');
    }
    commit('setContent', type);
  },
  SET_NOTE({ commit }, note) {
    commit('setState', note);
  },
};

export default {
  state,
  mutations,
  actions,
};
