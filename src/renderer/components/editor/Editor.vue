<template>
  <div id="editor">
    <textarea v-model="documentContent"/>
    <div v-html="htmlRender"/>
  </div>
</template>

<style scoped>
@import '~/node_modules/highlight.js/styles/github.css';

html, body, #editor {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  display: flex;
}

textarea, #editor div {
  display: inline-block;
  width: 50%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>

<script>
import marked from 'marked';
import hightlight from 'highlight.js';

export default {
  data() {
    return {
      htmlRender: ''
    };
  },
  computed: {
    documentContent: {
      get() {
        return this.$store.state.document.curDocument.content;
      },
      set(content) {
        this.htmlRender = marked(content);
        this.$store.dispatch('SAVE_DOCUMENT', {
          ...this.$store.state.document.curDocument,
          content,
        });
      }
    },
  },
  beforeMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: code => hightlight.highlightAuto(code).value,
      smartLists: true,
      xhtml: true
    });
    return this.fetchDocument();
  },
  methods: {
    async fetchDocument() {
      this.$route.query.id ? await this.$store.dispatch('GET_DOCUMENT', this.$route.query.id) : this.$store.dispatch('CREATE_DOCUMENT');
      this.htmlRender = marked(this.documentContent);
    }
  }
};
</script>
