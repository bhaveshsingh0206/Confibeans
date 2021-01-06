export default class CBRadio {
    constructor(){
        this.styles = "spaced"
    }
    getValue(path) {
        var value = document.querySelector(`input[name="${path}"]:checked`).value
        console.log("Radio ",value)
        return [value];
    }
}