import shortid from 'shortid';
import { save, load, listAll } from '../../providers/document.provider';
import Debouncer from '../../../shared/debouncer';

const debouncer = new Debouncer(1000);

const state = {
  curDocument: {},
  allDocuments: [],
  isLoaded: false,
  isSaved: true,
};

const mutations = {
  setCurDocument(state, document) {
    state.curDocument = document;
  },
  setIsLoaded(state, isLoaded) {
    state.isLoaded = isLoaded;
  },
  setIsSaved(state, isSaved) {
    state.isSaved = isSaved;
  },
  setAllDocuments(state, documents) {
    state.allDocuments = documents;
  },
};

const actions = {
  CREATE_DOCUMENT({ commit }) {
    const newDocument = {
      id: shortid.generate(),
      tags: [],
      title: 'Sans titre',
      content: '# Hello World :)',
      type: 'NOTE',
      created: new Date(),
    };
    commit('setCurDocument', newDocument);
    commit('setIsLoaded', true);
  },
  async SAVE_DOCUMENT({ commit }, document) {
    commit('setIsSaved', false);
    commit('setCurDocument', document);
    try {
      await debouncer.debounce(save, document);
      commit('setIsSaved', true);
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message: 'Une erreur est survenue lors de la sauvegarde du document.',
      });
      console.error(err);
    }
  },
  async GET_DOCUMENT({ commit }, id) {
    commit('setIsLoaded', false);
    try {
      const document = await load(id);
      commit('setCurDocument', document);
      commit('setIsLoaded', true);
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message: 'Une erreur est survenue lors de la lecture du document.',
      });
      console.error(err);
    }
  },
  async LIST_ALL_DOCUMENTS({ commit }) {
    try {
      const allDocuments = await listAll();
      commit('setAllDocuments', allDocuments);
    } catch (err) {
      this._vm.$toast.open({
        type: 'error',
        position: 'top-right',
        duration: 2000,
        message:
          'Une erreur est survenue lors de la récupération des documents.',
      });
      console.error(err);
    }
  },
  async UPDATE_ALL_DOCUMENTS({ commit, state }, document) {
    const allDocumentsUpdated = [...state.allDocuments];
    allDocumentsUpdated.splice(
      state.allDocuments.findIndex((doc) => doc.id === document.id),
      1,
      document
    );
    commit('setAllDocuments', allDocumentsUpdated);
  },
};

export default {
  state,
  mutations,
  actions,
};
