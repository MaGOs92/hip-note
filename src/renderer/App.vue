<template>
  <div id="app">
    <v-app>
      <v-toolbar v-if="isEditMode" fixed app>
      <v-btn
        small
        fab
        class="elevation-0"
        @click="navigate('/')">
        <v-icon>chevron_left</v-icon>
      </v-btn>
        <v-toolbar-title>
          <v-text-field v-model="title" />
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container class="no-padding" fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
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
    title: {
      get() {
        return this.$store.state.currentNote.title;
      },
      set(newTitle) {
        this.$store.dispatch('SET_TITLE', newTitle);
      },
    },
    isEditMode() {
      return this.$route.path === '/editor';
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
