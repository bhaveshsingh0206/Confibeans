export default class CBText {
  styles = "";
  getValue(path) {
    
    var leaf = document.getElementById(path);
    var value = leaf.textContent;
    return value;
  }
}
