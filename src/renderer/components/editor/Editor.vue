<template>
  <div id="editor">
    <textarea
      ref="editor"
      v-model="documentContent"
      :class="{'no-display': isFullwidth}"
      class="editor"/>
    <div
      :class="{'full-width': isFullwidth}"
      class="render">
      <template v-for="(component, index) in components">
        <div
          v-if="component.html"
          :key="index"
          class="markedown-div"
          v-html="component.html" />
        <component
          v-else
          :key="index"
          :is="component.name"
          v-bind="component.props" />
      </template>
    </div>
  </div>
</template>

<style scoped>
@import '~/node_modules/codemirror/lib/codemirror.css';
@import '~/node_modules/highlight.js/styles/github.css';

#editor {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  display: flex;
}

.render {
  width: 50%;
  height: 100%;
  position: relative;
}

.editor {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
  width: 50%;
}

.full-width {
  width: 100%;
}

.no-display {
  display: none;
}

.markedown-div {
  padding: 20px;
}

</style>

<script>
import ContentParser from './content-parser';
import CodeMirror from 'codemirror';
import components from './components';

export default {
  name: 'Editor',
  components,
  data() {
    return {
      components: []
    };
  },
  computed: {
    documentContent: {
      get() {
        return this.$store.state.document.curDocument.content;
      },
      set(content) {
        this.$store.dispatch('SAVE_DOCUMENT', {
          ...this.$store.state.document.curDocument,
          lastModified: new Date(),
          content,
        });
        this.contentParser.processContent(content).then(processedArray => this.components = processedArray);
      }
    },
    isFullwidth() {
      return this.$store.state.editor.fullWidth;
    }
  },
  beforeMount() {
    this.contentParser = new ContentParser();
    return this.fetchDocument();
  },
  methods: {
    async fetchDocument() {
      this.$route.query.id ? await this.$store.dispatch('GET_DOCUMENT', this.$route.query.id) : this.$store.dispatch('CREATE_DOCUMENT');
      this.contentParser.processContent(this.documentContent).then(processedArray => this.components = processedArray, 0);
    }
  }
};
</script>
