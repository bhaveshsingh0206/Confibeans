export default class CBDropdowns {
    constructor(){
        this.styles = "spaced"
        
    }
    getValue(path) {
        var leaf = document.getElementById(path);
        var value = leaf.value;
        return value;
    }
}