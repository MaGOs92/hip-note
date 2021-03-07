<template>
  <v-dialog 
    v-model="newTagDialog" 
    max-width="290">
    <form @submit="addTag">
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
</template>

<style scoped>

</style>

<script>
import colors from 'vuetify/lib/util/colors';
import { mdiNames } from '../../shared/mdi_names'

export default {
  props: {

  },
    data() {
    return {
      tagColors: Object.keys(colors)
        .filter((colorKey) => Boolean(colors[colorKey].base))
        // Camel case to Kebab case
        .map((colorKey) => colorKey.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()),
      tagIcons: mdiNames,
      newTag: {}
    }
  },
  methods: {
    async addTag() {
      const savedTag = await this.$store.dispatch("SAVE_TAG", this.newTag);
      this.documentTags = [...this.documentTags, savedTag.id]
      this.newTagDialog = false
    },
  }
}
</script>