export default class CBInput {
    constructor(){
        this.styles = "editable"
    }
    getValue(path) {
        console.log(path);
        var leaf = document.getElementById(path);
        var value = leaf.value;
        return value;
    }
}