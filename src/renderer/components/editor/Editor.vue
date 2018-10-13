<template>
  <div id="editor">
    <textarea v-model="content">
    </textarea>
    <div v-html="htmlRender"/>
  </div>
</template>

<style scoped>
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

export default {
  computed: {
    content: {
      get() {
        return this.$store.state.currentNote.content;
      },
      set(newContent) {
        this.$store.dispatch('SET_CONTENT', newContent);
      },
    },
  },
  data() {
    return {
      htmlRender: '',
    };
  },
  watch: {
    content: {
      handler(newContent) {
        this.htmlRender = marked(newContent, {
          gfm: true,
          breaks: true,
        });
      },
      immediate: true,
    },
  },
};
</script>
