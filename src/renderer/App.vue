<template>
  <div id="app">
    <v-app>
      <v-toolbar 
        v-if="isEditMode && isDocumentLoaded" 
        fixed 
        app>
        <v-btn
          small
          fab
          class="elevation-0"
          @click="navigate('/')">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-toolbar-title>
          <v-text-field v-model="documentTitle" />
        </v-toolbar-title>
        <v-spacer />
        <v-icon :disabled="!isDocumentSaved">saved</v-icon>
      </v-toolbar>
      <v-content>
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
  },
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
</style>
