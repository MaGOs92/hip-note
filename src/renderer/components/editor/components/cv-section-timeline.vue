<template>
  <div class="cv-timeline">
    <v-timeline
      dense>
      <v-timeline-item
        v-for="(item, i) in parsedItems"
        :color="item.color"
        :key="i">
        <div class="cv-timeline-item">
          <div class="cv-timeline-item-header">
            <div class="cv-timeline-item-header-title">
              <h2>{{ item.title }}</h2>
              <h4>{{ item.location }}</h4>
            </div>
            <h3 style="margin-top: 3px;">{{ item.date }}</h3>
          </div>
          <div v-html="item.text"/>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style scoped>
.cv-timeline {
  padding: 20px 40px;
}
.cv-timeline-item {
  background-color: #E5E5E5;
  border-radius: 5px;
  padding: 10px;
  page-break-inside: avoid;
}
.cv-timeline-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
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
