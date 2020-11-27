export default class CBRadio {
    constructor(){
        this.styles = "spaced"
    }
    getValue(path) {
        var leaf = document.getElementById(path);
        var value = leaf.value;
        return value;
    }
}