<template>
  <div class="cv-others-wrapper">
    <v-card
      v-for="(item, i) in parsedItems"
      :key="i"
      class="cv-others-card">
      <v-card-title style="padding-bottom: 0;">
        <h3>{{ item.title }}</h3>
      </v-card-title>
      <v-card-text v-html="item.text" />
    </v-card>
  </div>
</template>

<style scoped>
.cv-others-wrapper {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
.cv-others-card {
  background-color: #E5E5E5;
  border-radius: 5px;
  width: 30%;
}
</style>

<script>
export default {
  props: {
    items: {
      required: false,
      default: '',
      type: String
    }
  },
  computed: {
    parsedItems() {
      if (this.items) {
        return JSON.parse(this.items);
      }
      return [];
    }
  }
};
</script>
