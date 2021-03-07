<template>
  <div class="cv-timeline">
    <div class="cv-timeline-header">
      <v-icon 
        large
        color="black"
        style="margin-right: 10px;">{{ icon }}</v-icon>
      <h2>{{ title }}</h2>
    </div>
    <v-timeline
      dense>
      <v-timeline-item
        v-for="(item, i) in parsedItems"
        :color="item.color"
        :key="i"
        style="page-break-inside: avoid;"
        fill-dot>
        <v-layout row>
          <v-flex 
            xs2
            class="cv-timeline-date">
            <b style="font-size: small;">
              <div class="align-center">{{ item.dateFrom }}</div>
              <div 
                v-if="item.dateTo" 
                class="align-center">-</div>
              <div 
                v-if="item.dateTo" 
                class="align-center">{{ item.dateTo }}</div>
            </b>
          </v-flex>
          <v-flex xs10>
            <div 
              class="cv-timeline-item">
              <div class="cv-timeline-item-header">
                <div class="cv-timeline-item-header-title">
                  <h3>{{ item.title }}, {{ item.location }}</h3>
                  <h4>{{ item.position }}</h4>
                </div>
              </div>
              <div v-html="item.text"/>
            </div>
          </v-flex>
        </v-layout>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<style scoped>
@page {
  margin: 5px 0 0 0;
}

@page :first {
  margin: 0;
}
.cv-timeline {
  padding: 20px 40px;
  page-break-after: always;
}
.cv-timeline-item {
  border: 2px solid rgba(0,0,0,0.12);
  border-radius: 5px;
  padding: 10px;
}
.cv-timeline-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.cv-timeline-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.cv-timeline-date {
  display: flex;
  align-items: center;
}
.align-center {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>

<script>
export default {
  props: {
    items: {
      required: false,
      default: '',
      type: String
    },
    title: {
      required: false,
      default: '',
      type: String
    },
    icon: {
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
