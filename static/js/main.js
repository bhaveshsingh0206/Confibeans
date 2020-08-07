$(".get").click(() => {
  getData();
});
var confibean_data;
function getData() {
  $.ajax({
    url: "http://127.0.0.1:5000/api/getJson",
    method: "POST",
    processData: false,
    contentType: "application/json",
    data: JSON.stringify({
      type: "data3",
    }),
    success: function (msg) {
      jsFile = msg["jsFile"];
      console.log(jsFile);
      confibean_data = msg;
      console.log(msg);
      var fn = window[jsFile](msg);

      if (typeof fn === "function") {
        console.log("hi");
        fn();
        // setTimeout(function afterTwoSeconds() {
        //     console.log("Pirfkrnj")
        //     console.log(dat)
        //     $(".data").html(dat)
        //   }, 1000)
      }
    },
    error: function (result) {},
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
    error: function (result) {},
  });
}
