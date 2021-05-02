import marked from 'marked';
import DOMPurify from 'dompurify';
import hightlight from 'highlight.js';
import components from './components';

export default class {
  constructor() {
    this.timeout = null;
    this.componentsArray = [];
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;
    renderer.link = (href, title, text) => {
      const linkHtml = linkRenderer.call(renderer, href, title, text);
      return linkHtml.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
    };
    marked.setOptions({
      renderer,
      highlight: (code) => hightlight.highlightAuto(code).value,
      smartLists: true,
      xhtml: true,
    });
  }

  getHtmlFromMardownString(markdownString) {
    const html = marked(markdownString);
    const sanitizedHtml = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target'],
    });

    return sanitizedHtml;
  }

  processContent(content, delay) {
    this.content = content;
    this.delay = delay || 500;

    return new Promise((resolve) => {
      if (this.timeout) {
        clearInterval(this.timeout);
      }

      this.timeout = setTimeout(() => {
        this.parseContent()
          .parseComponent()
          .sortComponents()
          .fillWithMarkdown();

        resolve(
          this.componentsArray.length > 0
            ? this.componentsArray
            : [
                {
                  name: 'div',
                  html: this.getHtmlFromMardownString(content),
                },
              ]
        );
      }, this.delay);
    });
  }

  parseContent() {
    this.componentsArray = Object.keys(components).reduce((acc, cur) => {
      let resArray;
      const re = new RegExp('--' + cur + "(\n@([a-zA-Z]+)='(.*)')*", 'g');
      while ((resArray = re.exec(this.content)) !== null) {
        acc.push({
          name: cur,
          str: resArray[0],
          index: resArray.index,
          lastIndex: resArray.index + resArray[0].length,
          hasProps: resArray[1],
        });
      }
      return acc;
    }, []);
    return this;
  }

  parseComponent() {
    this.componentsArray = this.componentsArray.map((cmp) => {
      if (cmp.hasProps) {
        const props = {};
        const propsRe = /@([a-zA-Z]+)='(.*)'/g;
        let res;
        while ((res = propsRe.exec(cmp.str)) !== null) {
          props[res[1]] = res[2];
        }
        cmp.props = props;
      }
      return cmp;
    });
    return this;
  }

  sortComponents() {
    this.componentsArray = this.componentsArray.sort(
      (cmp1, cmp2) => cmp1.index - cmp2.index
    );
    return this;
  }

  fillWithMarkdown() {
    this.componentsArray = this.componentsArray.reduce(
      (acc, cur, index, array) => {
        if (index === 0 && cur.index !== 0) {
          const markdownString = this.content.substring(0, cur.index);
          acc.push({
            name: 'div',
            html: this.getHtmlFromMardownString(markdownString),
          });
        }
        acc.push(cur);
        if (array[index + 1] && cur.lastIndex + 1 !== array[index + 1].index) {
          const markdownString = this.content.substring(
            cur.lastIndex,
            array[index + 1].index
          );
          acc.push({
            name: 'div',
            html: this.getHtmlFromMardownString(markdownString),
          });
        } else if (
          index === array.length - 1 &&
          cur.lastIndex !== this.content.length
        ) {
          const markdownString = this.content.substring(
            cur.lastIndex,
            this.content.length - 1
          );
          acc.push({
            name: 'div',
            html: this.getHtmlFromMardownString(markdownString),
          });
        }
        return acc;
      },
      []
    );
    return this;
  }
}
