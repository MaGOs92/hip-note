import shortid from 'shortid';
import { saveTag, getTags } from '../../providers/tags.provider';

const state = {
  allTags: {},
};

const mutations = {
  setTags(state, tags) {
    state.allTags = tags;
  },
  setTag(state, tag) {
    state.allTags[tag.id] = tag
  }
};

const actions = {
  async SAVE_TAG({ commit }, tag) {
    if (!tag.id) {
      tag.id = shortid.generate()
    }
    try {
      await saveTag(tag)
      commit('setTag', tag)
    } catch (err) {
      console.error('Erreur lors de la sauvegarde du tag', err);
    }
  },
  async GET_TAGS({ commit }) {
    try {
      const tags = await getTags();
      commit('setTags', tags);
    } catch (err) {
      console.error('Erreur lors de la lecture des tags', err);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
