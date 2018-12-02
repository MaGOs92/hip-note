import marked from 'marked';
import hightlight from 'highlight.js';
import components from './components';

export default class {

  constructor() {
    this.timeout = null;
    this.componentsArray = [];
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: code => hightlight.highlightAuto(code).value,
      smartLists: true,
      xhtml: true
    });
  }

  processContent(content, delay) {
    this.content = content;
    this.delay = delay || 500;
    return new Promise(resolve => {
      if (this.timeout) {
        clearInterval(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.parseContent()
        .parseComponent()
        .sortComponents()
        .fillWithMarkdown();
        resolve(this.componentsArray.length > 0 ? this.componentsArray : [{
          name: 'div',
          html: marked(content)
        }]);
      }, this.delay);
    });
  }

  parseContent() {
    this.componentsArray =  Object.keys(components).reduce((acc, cur) => {
      let resArray;
      const re = new RegExp('--' + cur + '(\n@([a-zA-Z]+)=\'(.*)\')*', 'g');
      while ((resArray = re.exec(this.content)) !== null) {
        acc.push({
          name: cur,
          str: resArray[0],
          index: resArray.index,
          lastIndex: resArray.index + resArray[0].length,
          hasProps: resArray[1]
        });
      }
      return acc;
    }, []);
    return this;
  }

  parseComponent() {
    this.componentsArray = this.componentsArray.map(cmp => {
      if (cmp.hasProps) {
        const props = {};
        const propsRe = /@([a-zA-Z]+)='(.*)'/g;
        let res;
        while ((res = propsRe.exec(cmp.str)) !== null) {
          props[res[1]] = res[2];
        }
        cmp.props = props;
      }
      return cmp
    });
    return this;
  }

  sortComponents() {
    this.componentsArray = this.componentsArray.sort((cmp1, cmp2) => cmp1.index - cmp2.index);
    return this;
  }

  fillWithMarkdown() {
    this.componentsArray = this.componentsArray.reduce((acc, cur, index, array) => {
      if (index === 0 && cur.index !== 0) {
        acc.push({
          name: 'div',
          html: marked(this.content.substring(0, cur.index))
        });
      }
      acc.push(cur);
      if (array[index + 1] && cur.lastIndex + 1 !== array[index + 1].index) {
        acc.push({
          name: 'div',
          html: marked(this.content.substring(cur.lastIndex, array[index + 1].index))
        });
      } else if (index === array.length - 1 && cur.lastIndex !== this.content.length) {
        acc.push({
          name: 'div',
          html: marked(this.content.substring(cur.lastIndex, this.content.length - 1))
        });
      }
      return acc;
    }, []);
    return this;
  }
}