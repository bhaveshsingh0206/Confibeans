// $(".get").click(() => {
//   getData();
// });
/*
var confibean_data;
function getData() {
	$.ajax({
         url: 'http://127.0.0.1:5000/api/getJson',
         method: 'POST',
         processData: false,
        contentType: 'application/json',
         data: JSON.stringify({
            type:"data3",
         }),
         success: function(msg) {
                console.log(msg)
                confibean_data = msg["data"];
                jcb = msg["jcb"]
                var keys = Object.keys(jcb)
                confibean_data = confibean_data["Sections"]["Execution"]
                keys.forEach((key)=>{
                    data = confibean_data[key]
                    jsFile = jcb[key]["ConfibeanName"]
                    console.log(jsFile) 
                    var fn = window[jsFile](data);
                    if (typeof fn === "function"){
                        fn();     
                    } 
                })             	
         },
         error: function(result) {
         }      
      });
}
getData();
function save() {
  var sections = confibean_data["Sections"];
  var properties = sections["Execution"]["Properties"];
  var keys = Object.keys(properties);
  var htmlData = "";
  keys.forEach((key, i) => {
    properties[key]["value"] = $("#" + key).val();
    if (i == keys.length - 1) {
      confibean_data["Sections"]["Execution"]["Properties"] = properties;

      sendData(confibean_data);
    }
  });
}

function sendData(data) {
  $.ajax({
    url: "http://127.0.0.1:5000/api/receiveJson",
    method: "POST",
    processData: false,
    contentType: "application/json",
    data: JSON.stringify({
      data: data,
    }),
    success: function (msg) {
      console.log(msg);
      alert("Saved");
    },
    error: function (result) {}
  });
}
*/

function getDataContainer() {
      $.ajax({
          url: 'http://127.0.0.1:5000/api/getJson',
          method: 'POST',
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify({
             type: "sample",
          }),
          success: function(data) {
            var a = new CBContainer()
            a.Load(data)                   
          },
          error: function(err) {
            console.log(err)
          }      
       });  
}


$("#get").click(()=>{    
  getDataContainer()
})

