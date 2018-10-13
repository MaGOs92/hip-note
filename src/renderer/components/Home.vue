<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 md4 offset-md1 class="text-xs-center centered">
      <img id="logo" class="logo" src="~@/assets/logo.png" alt="electron-vue">
    </v-flex>
    <v-flex xs12 md6 class="text-xs-center centered">
      <img id="logo" class="logo" src="/static/v.png" alt="Vuetifyjs">
    </v-flex>
    <v-flex xs10 class="mt-3">
      <v-card>
        <v-card-text>
          <p>Welcome to the Electron-vue + Vuetify template.</p>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications. For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank">documentation</a>. If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">discord</a>. Find a bug? Report it on the github <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" title="contribute">issue board</a>.</p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
        </v-card-text>
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
  mixins: [CommonMixins],
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
