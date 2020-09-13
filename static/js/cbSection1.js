class cbSection1 {
    constructor(data) {
        this.data = data
    }
    Render (div, CBTree) {
        // console.log(CBTree)
        var path = CBTree["Path"]
        var data = jsonPath(this.data, path)[0]
        var html = ""
        html += `<div class="text-left"><h4>${data["SectionTitle"]}</h4></div>`
        data["values"].forEach((caption, i) => {
            html += `<div class="form-group row mt-4">
            <label for="${caption["Caption"]}" class="col-sm-2 col-form-label mt-0 col-form-label">${caption["Caption"]}</label>
            <div class="col-sm-10">
              <input class="form-control col-form-label-sm col-md-6" id="${caption["Caption"]}" value="${caption["Value"]}">
            </div></div>`
            if(i == data["values"].length-1) {
                $(`#${div}`).append(html)
            }
        }); 
    }
}