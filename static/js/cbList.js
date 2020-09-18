class CBList {
    constructor(data) {
        this.data = data
        
    }
    Render (path, data) {
        // console.log(data, path)
        var renderData = jsonPath(data, path)[0]
        // console.log(renderData)
        var html = ""
        renderData.forEach((obj, i) => {
            // console.log("renderData")
            var keys = Object.keys(obj)
            html += '<div class="form-group row mt-4">'
            keys.forEach((key, i)=>{
                html += `<span class="p-2">${key}</span><span class="p-2">:</span><span class="pt-2">${obj[key]}</span><span class="p-2">,</span>`
                if (i==keys.length-1) {
                    html+= "</div>"
                }
            })
        });
        // console.log("Returned bois")
        return html
        
    }
}
export default CBList