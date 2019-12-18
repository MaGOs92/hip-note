<template>
  <v-layout 
    id="wrapper"
    fill-height
    row 
    wrap 
    justify-center>
    <v-card class="main-card">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Recherche"
          single-line
          hide-details/>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="documents"
        :search="search"
        :loading="isLoading"
        hide-actions
        class="data-table">
        <v-progress-linear
          slot="progress"
          color="blue"
          indeterminate />
        <template
          slot="items"
          slot-scope="props">
          <tr
            class="data-table-line"
            @click="navigate('/editor', {id: props.item.id})">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.created | dateFormated }}</td>
            <td>{{ props.item.lastModified | dateRelative }}</td>
            <td>
              <v-icon @click="toggleFav($event, props.item)">{{ props.item.isFav | favIcon }}</v-icon>
            </td>
            <td>
              <v-icon @click="deleteDocument($event, props.item)">delete</v-icon>
            </td>
          </tr>
        </template>
        <div
          slot="no-results"
          :value="true">
          Aucun résultat pour la recherche "{{ search }}".
        </div>
      </v-data-table>
    </v-card>
    <v-btn
      fab
      dark
      color="primary"
      fixed
      bottom
      right
      @click="navigate('/editor')">
      <v-icon dark>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<style scoped>
  .main-card {
    width: 100%;
  }
  .data-table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .data-table-line:hover {
    cursor: pointer;
  }
</style>

<script>
import CommonMixins from './../mixins/commonMixins';

export default {
  name: 'Home',
  filters: {
    favIcon(isFav) {
      return isFav ? 'star' : 'star_border';
    }
  },
  mixins: [CommonMixins],
  data() {
   return {
      headers: [
        {
          text: 'Titre',
          value: 'title',
          align: 'left'
        },
        {
          text: 'Création',
          value: 'created',
          align: 'left'
        },
        {
          text: 'Dernière modification',
          value: 'lastModified',
          align: 'left'
        },
        {
          text: 'Favori',
          value: 'isFav',
          align: 'left'
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'left'
        },
      ],
      isLoading: true,
      search: '',
   } 
  },
  computed: {
    documents() {
      return this.$store.state.document.allDocuments.filter(document => !document.deleted);
    }
  },
  beforeMount() {
    return this.fetchAllDocuments();
  },
  methods: {
    async fetchAllDocuments() {
      this.isLoading = true;
      await this.$store.dispatch('LIST_ALL_DOCUMENTS');
      this.isLoading = false;
    },
    toggleFav(event, document) {
      event.stopPropagation();
      const newDocument = {
        ...document,
        isFav: !document.isFav
      };
      this.$store.dispatch('UPDATE_ALL_DOCUMENTS', newDocument);
      this.$store.dispatch('SAVE_DOCUMENT', newDocument);
    },
    deleteDocument(event, document) {
      event.stopPropagation();
      const newDocument = {
        ...document,
        deleted: true
      };
      this.$store.dispatch('UPDATE_ALL_DOCUMENTS', newDocument);
      this.$store.dispatch('SAVE_DOCUMENT', newDocument);
    },
  }
};
</script>

