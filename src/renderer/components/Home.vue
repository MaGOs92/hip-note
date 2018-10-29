<template>
  <v-layout 
    id="wrapper" 
    row 
    wrap 
    justify-center>
    <v-flex 
      xs10 
      class="mt-3">
      <v-card>
        <v-card-title>Mes notes
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details/>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="documents"
          :search="search"
          :loading="isLoading">
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
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.created | dateFormated }}</td>
              <td>{{ props.item.lastModified | dateRelative }}</td>
            </tr>
          </template>
          <div
            slot="no-results"
            :value="true">
            Aucun résultat pour la recherche "{{ search }}".
          </div>
        </v-data-table>
      </v-card>
    </v-flex>
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

<script>
import CommonMixins from './../mixins/commonMixins';

export default {
  name: 'Home',
  mixins: [CommonMixins],
  data() {
   return {
      headers: [
        {
          text: 'Titre',
          align: 'left',
          value: 'title'
        },
        {
          text: 'Type',
          value: 'type',
          align: 'left'
        },
        {
          text: 'Date de création',
          value: 'created',
          align: 'left'
        },
        {
          text: 'Date de dernière modification',
          value: 'lastModified',
          align: 'left'
        },
      ],
      isLoading: true,
      search: ''
   } 
  },
  computed: {
    documents() {
      return this.$store.state.document.allDocuments;
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
    }
  }
};
</script>

<style scoped>
  .data-table-line:hover {
    cursor: pointer;
  }
</style>
