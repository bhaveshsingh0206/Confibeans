function confibean2(msg){
    console.log("confibean1 ")
    console.log(msg)
    if (msg["success"]) {
        var data = msg["data"];
        var headers = data["header"]
        var table = ""
        table += '<table class="table table-striped table-dark"><thead><tr>'
        headers.forEach((name, index) => {
            table += '<th scope="col">'+ name +'</th>'
            if (index == headers.length-1) {
                table += "</tr></thead>"
                body = data["body"]
            if (body.length > 0) {
                table +="<tbody>"
                body.forEach((d, index) =>{
                    table +='<tr><th scope="row">'+d[headers[0]]+'</th><td>'+d[headers[1]]+'</td><td>'+d[headers[2]]+'</td><td>'+d[headers[3]]+'</td></tr>'
                if (index == body.length - 1) {
                    table += "</tbody>"
                    table += "</table>"
                
                    console.log(table)
                    console.log("From not main")
                    // return table
                $(".data").html(table)
        } 
       
        });
        }
    }
        
        });
        
        
    }
    
}

