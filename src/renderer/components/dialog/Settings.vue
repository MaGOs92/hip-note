<template>
  <v-dialog
    v-model="opened"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="headline">Configuration</v-card-title>
      <v-card-text>
        <label for="save-folder-input">Dossier de sauvegarde : </label>
        <input
          id="save-folder-input"
          webkitdirectory
          type="file"
          @change="setSaveFolder">
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="onClose">
          Fermer
        </v-btn>
        <v-btn
          text
          @click="updateSettings">
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    opened: {
      required: false,
      default: false,
      type: Boolean
    },
    onClose: {
      required: false,
      default: () => {},
      type: Function
    },
  },
  data() {
    return {
      settings: {}
    }
  },
  watch: {
    async opened(opened) {
      if (opened) {
        await this.fetchSettings()
        this.settings = this.$store.state.configuration.settings
      }
    }
  },
  beforeMount() {
    return this.fetchSettings();
  },
  methods: {
    fetchSettings() {
      return this.$store.dispatch('GET_SETTINGS');
    },
    async updateSettings() {
      await this.$store.dispatch('SAVE_SETTINGS', this.settings);
      this.onClose()
    },
    setSaveFolder(event) {
      this.settings.saveFolder = event.target.files[0].path
    }
  },
}
</script>