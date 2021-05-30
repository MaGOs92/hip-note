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
          v-model="titleFilter"
          append-icon="search"
          label="Filtrer par titre"
          class="filter-title-input"
          single-line
          hide-details
        />
        <v-autocomplete
          v-model="tagsFilter"
          :items="Object.values(tags)"
          :height="32"
          label="Filtrer par tag"
          class="filter-tags-input"
          item-text="name"
          item-value="id"
          chips
          clearable
          multiple
          hide-details
        >
          <template v-slot:selection="{item}">
            <v-chip
              :color="item.color"
              text-color="white"
              close
              @input="removeTag(item)"
            >
              <v-avatar v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-avatar>
              {{ item.name }}
            </v-chip>
          </template>
          <template v-slot:item="{item, tile}">
            <span class="tags-autocomplete-item">
              <v-checkbox 
                :value="tile.props.value" 
                color="primary" />
              <v-chip
                :color="item.color"
                text-color="white"
              >
                <v-avatar v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-avatar>
                {{ item.name }}
              </v-chip>
            </span>
          </template>
          <template v-slot:no-data>
            <v-list-tile>
              <span>Aucun tag ne correspond à votre recherche</span>
            </v-list-tile>
          </template>
        </v-autocomplete>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredDocuments(documents)"
        :loading="isLoading"
        hide-actions
        class="data-table"
      >
        <v-progress-linear 
          slot="progress" 
          color="blue" 
          indeterminate />
        <template 
          slot="items" 
          slot-scope="props">
          <tr
            class="data-table-line"
            @click="navigate('/editor', { id: props.item.id })"
          >
            <td>{{ props.item.title }}</td>
            <td>
              <v-chip 
                v-for="tagId in props.item.tags" 
                :key="tagId" 
                :color="tags[tagId] && tags[tagId].color"
                text-color="white"
                disabled>
                <v-avatar v-if="tags[tagId] && tags[tagId].icon">
                  <v-icon>{{ tags[tagId].icon }}</v-icon>
                </v-avatar>
                {{ tags[tagId] && tags[tagId].name }}
              </v-chip>
            </td>
            <td>{{ props.item.created | dateFormated }}</td>
            <td>{{ props.item.lastModified | dateRelative }}</td>
            <td>
              <v-btn 
                icon 
                class="action-button"
                @click.stop="toggleFav($event, props.item)">
                <v-icon>{{
                  props.item.isFav | favIcon
                }}</v-icon>
              </v-btn>
              
            </td>
            <td>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    class="action-button"
                    icon
                    @click.stop
                    v-on="on"
                  ><v-icon>more_vert</v-icon></v-btn
                  >
                </template>
                <v-list>
                  <v-list-tile
                    v-for="(action, index) in actionsMenu"
                    :key="index"
                    class="menu-tile"
                    @click="() => action.callback(props.item)"
                  >
                    <v-icon>{{ action.icon }}</v-icon>
                    <span>{{ action.text }}</span>
                  </v-list-tile>
                </v-list>
              </v-menu>
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
      @click="navigate('/editor')"
    >
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-dialog 
      v-model="deleteDialog" 
      max-width="290">
      <v-card>
        <v-card-title>
          Êtes-vous sûr de vouloir supprimer cette note?
        </v-card-title>
        <v-card-actions>
          <v-spacer />

          <v-btn 
            small 
            @click="hideDeleteDialog"> Annuler </v-btn>

          <v-btn
            color="primary"
            small
            @click="deleteDocument"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
.tags-autocomplete-item {
  display: flex;
  align-items: center;
}
.filter-title-input {
  width: 50%;
  margin-right: 15px;
}
.filter-tags-input {
  width: 40%;
}
.action-button {
  color: rgba(0, 0, 0, 0.54);
}
.menu-tile span {
  font-size: small;
}
.menu-tile i {
  margin-right: 8px;
  font-size: small;
}
</style>

<script>
import CommonMixins from './../mixins/commonMixins';

export default {
  name: 'Home',
  filters: {
    favIcon(isFav) {
      return isFav ? 'star' : 'star_border';
    },
  },
  mixins: [CommonMixins],
  data() {
    return {
      deleteDialog: false,
      documentToDelete: null,
      headers: [
        {
          text: 'Titre',
          value: 'title',
          align: 'left',
        },
        {
          text: 'Tags',
          value: 'tags',
          align: 'left',
        },
        {
          text: 'Création',
          value: 'created',
          align: 'left',
        },
        {
          text: 'Dernière modification',
          value: 'lastModified',
          align: 'left',
        },
        {
          text: 'Favori',
          value: 'isFav',
          align: 'left',
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'left',
          sortable: false,
        },
      ],
      actionsMenu: [
        {
          text: 'Dupliquer',
          icon: 'content_copy',
          callback: async ({ id }) => {
            await this.$store.dispatch('GET_DOCUMENT', id);
            this.$store.dispatch('DUPLICATE_CUR_DOCUMENT');
            const duplicatedDocument = this.$store.state.document.curDocument;
            await this.$store.dispatch('SAVE_DOCUMENT', duplicatedDocument);
            this.navigate('/editor', { id: duplicatedDocument.id });
          },
        },
        {
          text: 'Supprimer',
          icon: 'delete',
          callback: (document) => {
            this.deleteDialog = true;
            this.documentToDelete = document;
          },
          color: 'danger',
        },
      ],
      isLoading: true,
      search: '',
    };
  },
  computed: {
    documents() {
      return this.$store.state.document.allDocuments.filter(
        (document) => !document.deleted
      );
    },
    tags() {
      return this.$store.state.tag.allTags;
    },
    titleFilter: {
      get() {
        return this.$store.state.home.filters.title;
      },
      set(title) {
        this.$store.dispatch('SET_FILTERS', {
          ...this.$store.state.home.filters,
          title,
        });
      },
    },
    tagsFilter: {
      get() {
        return this.$store.state.home.filters.tags;
      },
      set(tags) {
        this.$store.dispatch('SET_FILTERS', {
          ...this.$store.state.home.filters,
          tags,
        });
      },
    },
  },
  beforeMount() {
    return this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      await this.$store.dispatch('GET_TAGS');
      await this.$store.dispatch('LIST_ALL_DOCUMENTS');
      this.isLoading = false;
    },
    toggleFav(event, document) {
      const newDocument = {
        ...document,
        isFav: !document.isFav,
      };
      this.$store.dispatch('UPDATE_ALL_DOCUMENTS', newDocument);
      this.$store.dispatch('SAVE_DOCUMENT', newDocument);
    },
    hideDeleteDialog() {
      this.documentToDelete = null;
      this.deleteDialog = false;
    },
    async deleteDocument() {
      const newDocument = {
        ...this.documentToDelete,
        deleted: true,
      };
      await this.$store.dispatch('UPDATE_ALL_DOCUMENTS', newDocument);
      this.hideDeleteDialog();
      await this.$store.dispatch('SAVE_DOCUMENT', newDocument);
    },
    filteredDocuments(documents) {
      return documents
        .filter(({ tags }) => {
          if (this.tagsFilter && this.tagsFilter.length > 0) {
            return this.tagsFilter.some(
              (tagFilter) => tags.indexOf(tagFilter) > -1
            );
          }

          return true;
        })
        .filter(({ title }) => {
          if (this.titleFilter) {
            return title.toLowerCase().includes(this.titleFilter.toLowerCase());
          }

          return true;
        });
    },
    removeTag({ id }) {
      const tags = [...this.tagsFilter];
      tags.splice(this.tagsFilter.indexOf(id), 1);
      this.tagsFilter = tags;
    },
  },
};
</script>
