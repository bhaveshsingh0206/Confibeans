export default class CBPanelTitle {
  constructor() {
    this.styles = "panel";
  }

  getValue(path) {
    var leaf = document.getElementById(path);
    var value = leaf.textContent;
    return value;
  }
}
