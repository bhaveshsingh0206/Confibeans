class CBText {
    constructor(data) {
        this.data = data
    }
    Render (path, data) {
        
        return `<div class="text-left"><h4>${jsonPath(data, path)[0]}</h4></div>`
    }
}
export default CBText