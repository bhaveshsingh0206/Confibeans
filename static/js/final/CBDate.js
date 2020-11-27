export default class CBDate {
    constructor(){
        this.styles = "special"
    }
    getValue(path) {
        var leaf = document.getElementById(path);
        var value = leaf.value;
        console.log("Date ", value)
        return value;
    }
}