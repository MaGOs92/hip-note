import shortid from 'shortid';
import { saveTag, getTags } from '../../providers/tags.provider';

const state = {
  allTags: {},
};

const mutations = {
  setTags(state, tags) {
    state.allTags = tags;
  }
};

const actions = {
  async SAVE_TAG({ commit, state }, tag) {
    if (!tag.id) {
      tag.id = shortid.generate()
    }
    try {
      const savedTag = await saveTag(tag)
      commit('setTags', {...state.allTags, [savedTag.id]: savedTag})
      return savedTag
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
