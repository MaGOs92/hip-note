<template>
  <v-layout 
    fill-height
    row
    wrap 
    justify-center>
    <v-card class="config-card">
      <v-card-title class="config-header">
        <div class="config-title">Configuration</div>
        <div>
          <v-btn
            text
            @click="() => navigate('/')" >
            Fermer
          </v-btn>
          <v-btn
            text
            @click="updateSettings">
            Sauvegarder
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="save-folder-config">
        <label for="save-folder-input">Dossier de sauvegarde : </label>
        <div class="file-placeholder">{{ settings.saveFolder }}</div>
        <v-btn
          text
          icon
          @click="browseFiles()">
          <v-icon>attach_file</v-icon>
        </v-btn>
        <input
          id="save-folder-input"
          webkitdirectory
          type="file"
          @change="setSaveFolder">
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<style scoped>
  #save-folder-input {
    display: none;
  }
  .save-folder-config {
    display: flex;
    align-items: center;
  }
  .file-placeholder {
    margin: 0 10px;
    font-style: italic;
  }
  .config-card {
    width: 100%;
  }
  .config-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #D5D5D5;
  }
  .config-title {
    font-size: 20px;
  }
</style>

<script>
import CommonMixins from '../../mixins/commonMixins';

export default {
  name: 'Settings',
  mixins: [CommonMixins],
  data() {
    return {
      settings: {}
    }
  },
  beforeMount() {
    return this.fetchSettings();
  },
  methods: {
    async fetchSettings() {
      await this.$store.dispatch('GET_SETTINGS');
      this.settings = this.$store.state.configuration.settings;
    },
    async updateSettings() {
      await this.$store.dispatch('SAVE_SETTINGS', this.settings);
      this.navigate('/')
    },
    setSaveFolder(event) {
      this.settings.saveFolder = event.target.files[0].path
    },
    browseFiles() {
      document.getElementById('save-folder-input').click()
    }
  },
}
</script>
