export default class CBText {
  styles = "";
  getValue(path) {
    console.log(path);
    var leaf = document.getElementById(path);
    var value = leaf.textContent;
    return value;
  }
}
