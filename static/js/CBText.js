class CBText {
    Render (path, data) {
        console.log(data)
        console.log(jsonPath(data, "$..Section2..SectionTitle")[0])
        return `<div class="text-left"><h4>${jsonPath(data, path)[0]}</h4></div>`
    }
}