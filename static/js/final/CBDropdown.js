export default class CBDropdown {
    constructor(){
        this.styles = "spaced"
    }
    getValue(path) {
        var leaf = document.getElementById(path);
        var value = leaf.value;
        return value;
    }
}