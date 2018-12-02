import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => hightlight.highlightAuto(code).value,
  smartLists: true,
  xhtml: true
});

export const markedDown = inputString => marked(inputString);