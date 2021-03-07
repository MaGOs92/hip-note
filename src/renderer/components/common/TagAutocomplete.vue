<template>
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
</template>

<style scoped>
.document-tags {
  width: 40%;
  margin-right: 20px;
  padding-top: 14px;
}

.tags-autocomplete-item {
  display: flex;
  align-items: center;
}
</style>

<script>

export default {
  computed: {
    documentTags: {
      get() {
        return this.$store.state.document.curDocument.tags || [];
      },
      set(tags) {
        this.$store.dispatch("SAVE_DOCUMENT", {
          ...this.$store.state.document.curDocument,
          lastModified: new Date(),
          tags,
        });
      },
    },
    tags() {
      return this.$store.state.tag.allTags;
    },
  },
  methods: {
    openNewTagDialog() {
      this.$emit('showNewTagDialog')
    },
    removeTag({ id }) {
      const tags = [...this.documentTags];
      tags.splice(this.documentTags.indexOf(id), 1);
      this.$store.dispatch("SAVE_DOCUMENT", {
        ...this.$store.state.document.curDocument,
        lastModified: new Date(),
        tags,
      });
    },
  },
};
</script>
