<template>
  <div id="app">
    <v-app>
      <v-toolbar 
        v-if="isEditMode && isDocumentLoaded" 
        class="app-toolbar"
        fixed 
        app>
        <v-btn
          small
          fab
          class="elevation-0"
          @click="navigate('/')">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-toolbar-title class="toolbar-title">
          <v-text-field
            v-model="documentTitle"/>
        </v-toolbar-title>
        <v-spacer />
        <v-icon :disabled="!isDocumentSaved">saved</v-icon>
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
          @click="exportToPDF">
          <v-icon>launch</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content class="main-content">
        <v-container 
          class="no-padding" 
          fluid 
          fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view/>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import CommonMixins from './mixins/commonMixins';

export default {
  mixins: [CommonMixins],
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
      }
    },
    isEditMode() {
      return this.$route.path === '/editor';
    },
    isDocumentLoaded() {
      return this.$store.state.document.isLoaded;
    },
    isDocumentSaved() {
      return this.$store.state.document.isSaved;
    },
    canExport() {
      return !this.$store.state.editor.isExporting;
    },
    fullWidthIcon() {
      return this.$store.state.editor.fullWidth ? 'fullscreen_exit' : 'fullscreen';
    }
  },
  methods: {
    toggleFullwidth() {
      this.$store.dispatch('SET_FULLWIDTH', !this.$store.state.editor.fullWidth);
    },
    exportToPDF() {
      const element = document.getElementById('editor-renderer');
      const html = element.outerHTML;
      this.$store.dispatch('EXPORT_TO_PDF', {
        title: this.documentTitle,
        html
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
.no-padding {
  padding: 0;
}
.footer-border {
  border-top: 1px
}
.toolbar-title {
  width: 500px;
}
@media print {
  .app-toolbar {
    display: none;
  }
  .main-content {
    padding-top: 56px !important;
  }
}
</style>
