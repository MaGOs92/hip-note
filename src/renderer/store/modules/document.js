import shortid from 'shortid';
import { save, load, listAll } from '../../providers/document.provider';
import Debouncer from '../../../shared/debouncer';

const debouncer = new Debouncer(1000);

const state = {
  curDocument: {},
  allDocuments: [],
  isLoaded: false,
  isSaved: true
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
  }
};

const actions = {
  CREATE_DOCUMENT({ commit }) {
    const newDocument = {
      id: shortid.generate(),
      title: 'Sans titre',
      content: '# Hello World :)',
      type: 'NOTE',
      created: new Date()
    };
    commit('setCurDocument', newDocument);
    commit('setIsLoaded', true);
  },
  async SAVE_DOCUMENT({ commit }, document) {
    commit('setIsSaved', false);
    document.lastModified = new Date();
    commit('setCurDocument', document);
    try {
      await debouncer.debounce(save, document);
      commit('setIsSaved', true);  
    }
    catch (err) {
      console.error('Erreur lors de la sauvegarde du document', err);
    }
  },
  async GET_DOCUMENT({ commit }, id) {
    commit('setIsLoaded', false);
    try {
      const document = await load(id);
      commit('setCurDocument', document);
      commit('setIsLoaded', true);
    } catch (err) {
      console.error('Erreur lors de la lecture du document', err);
    }
  },
  async LIST_ALL_DOCUMENTS({ commit }) {
    try {
      const allDocuments = await listAll();
      commit('setAllDocuments', allDocuments);
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
