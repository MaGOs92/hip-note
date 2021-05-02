import shortid from 'shortid';
import { saveTag, getTags } from '../../providers/tags.provider';

const state = {
  allTags: {},
};

const mutations = {
  setTags(state, tags) {
    state.allTags = tags;
  },
};

const actions = {
  async SAVE_TAG({ commit, state }, tag) {
    if (!tag.id) {
      tag.id = shortid.generate();
    }
    try {
      const savedTag = await saveTag(tag);
      commit('setTags', { ...state.allTags, [savedTag.id]: savedTag });
      return savedTag;
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message: 'Une erreur est survenue lors de la sauvegarde du tag.',
      });
      console.error(err);
    }
  },
  async GET_TAGS({ commit }) {
    try {
      const tags = await getTags();
      commit('setTags', tags);
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message: 'Une erreur est survenue lors de la récupération des tags.',
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
