function confibean1(msg){
    if (msg["success"]) {
        var data = msg["data"];
        var stringObj = ""
        if (data.length > 0){
            stringObj += '<div class="row row-cols-3">'
            data.forEach((obj, index) => {
                stringObj += '<div class="col mb-4"><div class="card"><img src="static/images/image.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+obj["Title"]+'</h5><p class="card-text">'+obj["Description"]+'</p></div></div></div>'
                if (index == data.length-1) {
                    stringObj += '</div>'
                    // return stringObj
                    $('.data').html(stringObj)
                }
            });
        }
        
      
        
    }
    
}
        