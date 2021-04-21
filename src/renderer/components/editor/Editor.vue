<template>
  <div id="editor">
    <vue-ace-editor
      ref="editor"
      v-model="documentContent"
      :width="isFullwidth ? '0%' : '50%'"
      height="100%"
      lang="markdown"
      theme="chrome"
      class="ace-editor-custom"
      @init="editorInit"
    />
    <div
      id="editor-renderer"
      :class="{
        'full-width': isFullwidth,
        'half-width': !isFullwidth}">
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
  height: calc(100vh - 64px);
  margin: 0;
  width: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  display: flex;
}

#editor-renderer {
  height: 100%;
  overflow-y: scroll;
  position: relative;
}

.ace-editor-custom .ace_gutter {
  z-index: 1;
  background-color: #f5f5f5 !important;
}

.full-width {
  width: 100%;
}

.half-width {
  width: 50%;
}

.no-display {
  display: none;
}

.markedown-div {
  padding: 20px;
}

@media print {
  #editor-renderer {
    margin-top: -56px;
    width: 100%;
  }
  .ace-editor-custom {
    display: none;
  }
}
</style>

<script>
import ContentParser from './content-parser';
import components from './components';
import VueAceEditor from 'vue2-ace-editor';
import 'brace/ext/language_tools';
import 'brace/mode/markdown';
import 'brace/theme/chrome';

export default {
  name: 'Editor',
  components: {
    ...components,
    VueAceEditor,
  },
  data() {
    return {
      components: [],
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
        this.contentParser
          .processContent(content)
          .then((processedArray) => (this.components = processedArray));
      },
    },
    isFullwidth() {
      return this.$store.state.editor.fullWidth;
    },
  },
  beforeMount() {
    this.contentParser = new ContentParser();
    return this.fetchDocument();
  },
  methods: {
    async fetchDocument() {
      this.$route.query.id
        ? await this.$store.dispatch('GET_DOCUMENT', this.$route.query.id)
        : this.$store.dispatch('CREATE_DOCUMENT');
      this.contentParser
        .processContent(this.documentContent)
        .then((processedArray) => (this.components = processedArray), 0);
    },
    editorInit(editor) {
      editor.getSession().setUseWrapMode(true);
      editor.setOption('showPrintMargin', false);
    },
  },
};
</script>
