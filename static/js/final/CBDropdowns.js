export default class CBDropdowns {
    constructor(){
        this.styles = "spaced"
        
    }
    getValue(path) {
        var leaf = document.getElementById(path);
        // console.log("Path ", path)
        var value = leaf.value;
        console.log("Value is ",value)
        return [value];
    }
}