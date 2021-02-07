export default class CBText {
  constructor() {
    this.styles = "";
  }

  getValue(path) {
    var leaf = document.getElementById(path);
    var value = leaf.textContent;
    return value;
  }
}
