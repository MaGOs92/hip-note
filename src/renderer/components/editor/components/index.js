const files = require.context('.', false, /\.vue$/);
const components = {};

files.keys().forEach((key) => {
  if (key === './index.js'){
    return;
  }
  components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default;
});

export default components;
