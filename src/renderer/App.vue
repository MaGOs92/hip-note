<template>
  <div id="app">
    <v-app>
      <v-toolbar
        v-if="isEditMode && isDocumentLoaded"
        class="app-toolbar"
        fixed
        app
      >
        <v-btn 
          small 
          fab 
          class="elevation-0" 
          @click="navigate('/')">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-toolbar-title class="toolbar-title">
          <v-text-field 
            v-model="documentTitle"
            label="Titre"
            class="document-title"
            hide-details />
          <v-autocomplete
            v-model="documentTags"
            :items="Object.values(tags)"
            :height="32"
            class="document-tags"
            label="Tags"
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
                  v-model="tile.props.value" 
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
            <template v-slot:append-item>
              <v-divider />
              <v-list-tile>
                <span class="subheading"> Créer un nouveau tag <v-btn
                  color="primary"
                  icon
                  @click="openNewTagDialog">
                  <v-icon>add</v-icon>
                </v-btn></span>
              </v-list-tile>
            </template>
          </v-autocomplete>
        </v-toolbar-title>
        <v-spacer />
        <v-btn 
          small 
          fab 
          class="elevation-0" 
          @click="toggleFullwidth">
          <v-icon>{{ fullWidthIcon }}</v-icon>
        </v-btn>
        <v-btn
          :disabled="!canExport"
          small
          fab
          class="elevation-0"
          @click="exportToPDF"
        >
          <v-icon>launch</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content class="main-content">
        <v-container 
          class="no-padding" 
          fluid 
          fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view />
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-dialog 
        v-model="newTagDialog" 
        max-width="290">
        <form @submit.prevent="addTag">
          <v-card>
            <v-card-title class="subheading">Créer un nouveau tag</v-card-title>
            <v-divider/>
            <v-card-text>
              <v-text-field 
                v-model="newTag.name" 
                label="Nom"/>
              <v-select
                v-model="newTag.color"
                :items="tagColors"
                label="Couleur"
                chips
              >
                <template v-slot:item="{item}">
                  <v-sheet 
                    :color="item" 
                    class="color-sheet" />
                </template>
                <template v-slot:selection="{item}">
                  <v-chip 
                    :color="item" 
                    class="color-chip" />
                </template>
              </v-select>
              <v-autocomplete 
                v-model="newTag.icon"
                :items="tagIcons"
                label="Icone"
                chips
              >
                <template v-slot:item="{item}">
                  <span>
                    <v-icon 
                      style="margin-right: 5px" 
                      color="black">{{ item }}</v-icon>
                    {{ item }}
                  </span>
                </template>
                <template v-slot:selection="{item}">
                  <span>
                    <v-icon 
                      style="margin-right: 5px" 
                      color="black">{{ item }}</v-icon>
                    {{ item }}
                  </span>
                </template>
              </v-autocomplete>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-btn
                small
                @click="newTagDialog = false">Annuler</v-btn>
              <v-btn
                :disabled="!newTag.name"
                type="submit"
                small
                color="primary">Créer</v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
    </v-app>
  </div>
</template>

<style scoped>
.no-padding {
  padding: 0;
}
.toolbar-title {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
.document-title {
  width: 60%;
  margin-right: 20px;
}
.document-tags {
  width: 40%;
  margin-right: 20px;
  padding-top: 14px;
}
.color-sheet {
  width: 100%;
  height: 100%;
  padding: 5px 0;
}
.color-chip {
  width: 95%;
}
.app-toolbar {
  z-index: 10;
}
.tags-autocomplete-item {
  display: flex;
  align-items: center;
}
@media print {
  .application {
    background: white;
  }
  .app-toolbar {
    display: none;
  }
  .main-content {
    padding-top: 56px !important;
  }
}
</style>

<style>
html {
  font-size: 15px;
}
</style>

<script>
import CommonMixins from './mixins/commonMixins';
import colors from 'vuetify/lib/util/colors';
import { mdiNames } from '../shared/mdi_names';

export default {
  mixins: [CommonMixins],
  data() {
    return {
      newTagDialog: false,
      tagColors: Object.keys(colors)
        .filter((colorKey) => Boolean(colors[colorKey].base))
        // Camel case to Kebab case
        .map((colorKey) =>
          colorKey
            .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
            .toLowerCase()
        ),
      tagIcons: mdiNames,
      newTag: {},
    };
  },
  computed: {
    documentTitle: {
      get() {
        return this.$store.state.document.curDocument.title;
      },
      set(title) {
        this.$store.dispatch('SAVE_DOCUMENT', {
          ...this.$store.state.document.curDocument,
          lastModified: new Date(),
          title,
        });
      },
    },
    documentTags: {
      get() {
        return this.$store.state.document.curDocument.tags || [];
      },
      set(tags) {
        this.$store.dispatch('SAVE_DOCUMENT', {
          ...this.$store.state.document.curDocument,
          lastModified: new Date(),
          tags,
        });
      },
    },
    tags() {
      return this.$store.state.tag.allTags;
    },
    isEditMode() {
      return this.$route.path === '/editor';
    },
    isDocumentLoaded() {
      return this.$store.state.document.isLoaded;
    },
    canExport() {
      return !this.$store.state.editor.isExporting;
    },
    fullWidthIcon() {
      return this.$store.state.editor.fullWidth
        ? 'fullscreen_exit'
        : 'fullscreen';
    },
  },
  methods: {
    toggleFullwidth() {
      this.$store.dispatch(
        'SET_FULLWIDTH',
        !this.$store.state.editor.fullWidth
      );
    },
    exportToPDF() {
      this.$store.dispatch('EXPORT_TO_PDF', {
        title: this.documentTitle,
      });
    },
    openNewTagDialog() {
      this.newTag = {
        name: '',
        icon: '',
        color: this.tagColors[
          Math.floor(Math.random() * this.tagColors.length)
        ],
      };
      this.newTagDialog = true;
    },
    async addTag() {
      const savedTag = await this.$store.dispatch('SAVE_TAG', this.newTag);
      this.documentTags = [...this.documentTags, savedTag.id];
      this.newTagDialog = false;
    },
    removeTag({ id }) {
      const tags = [...this.documentTags];
      tags.splice(this.documentTags.indexOf(id), 1);
      this.$store.dispatch('SAVE_DOCUMENT', {
        ...this.$store.state.document.curDocument,
        lastModified: new Date(),
        tags,
      });
    },
  },
};
</script>
