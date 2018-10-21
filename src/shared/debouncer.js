export default class {

  constructor(delay) {
    this.delay = delay;
    this.timeOut = null;
  }

  debounce(fn, args) {
    return new Promise((resolve, reject) => {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
      this.timeOut = setTimeout(() => fn(args)
        .then(() => resolve())
        .catch(err => reject(err)), this.delay);
    });
  }
}
