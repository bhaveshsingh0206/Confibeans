function confibean3(msg){
    var sections = msg["Sections"]
    var properties = sections["Execution"]["Properties"]
    var keys = Object.keys(properties);
    var htmlData = ""
    keys.forEach((key, i)=>{
        data = properties[key]
        if (data["ControlType"] == "Textbox") {
            if (data["Editable"] == "True"){
                htmlData+='<div class="form-group"><label for="exampleInputEmail1">'+key+'</label><input type="text" class="form-control" value="'+data["DefaultValue"]+'" id="'+key+'"></div>'

            } else {
                htmlData+='<div class="form-group"><label for="exampleInputEmail1">'+key+'</label><input type="text" class="form-control" id="'+key+'" readonly></div>'

            }
        } else {
            console.log('list')
            d = data["DefaultValue"].substr(1, (data["DefaultValue"].length-2))
            d = d.split(',')
            console.log(d.length)
            if (d.length > 0){
                htmlData+='<label>'+key+'</label>'
                htmlData += '<ul class="list-group">'
                d.forEach((j, t)=>{
                    htmlData += '<li class="list-group-item">'+j+'</li>'
                    if (j == d.length-1) {
                        htmlData += '</ul>'
                    }
            })
               
            }
            
        }
        
        if(i == keys.length-1) {
            htmlData += '<button class="btn btn-primary mb-5" onclick="save()">Save</button>'
            $(".data").html(htmlData)
        }
    })
}
