function confibean4(properties) {
  console.log("confibeans4")
  var keys = Object.keys(properties);
  var htmlData = "";
  document.body.style.background = "#202124";
  //   document.label.style.background = "#fff";
  keys.forEach((key, i) => {
    data = properties[key];
    if (data["ControlType"] == "Textbox") {
      if (data["Editable"] == "True") {
        htmlData +=
          '<div class="form-group"><label class="label2" for="exampleInputEmail1">' +
          key +
          '</label><input type="text" class="form-control2" value="' +
          data["DefaultValue"] +
          '" id="' +
          key +
          '"></div>';
      } else {
        htmlData +=
          '<div class="form-group"><label class="label2" for="exampleInputEmail1">' +
          key +
          '</label><input type="text" class="form-control2" id="' +
          key +
          '" readonly></div>';
      }
    } else {
      console.log("list");
      d = data["DefaultValue"].substr(1, data["DefaultValue"].length - 2);
      d = d.split(",");
      console.log(d.length);
      if (d.length > 0) {
        htmlData += "<label class='label2'>" + key + "</label>";
        htmlData += '<ul class="list-group">';
        d.forEach((j, t) => {
          htmlData += '<li class="list-group-item2">' + j + "</li>";
          if (j == d.length - 1) {
            htmlData += "</ul>";
          }
        });
      }
    }

    if (i == keys.length - 1) {
      htmlData +=
        '<button class="btn btn-primary mb-5 mt-5" onclick="save()">Save</button>';
      $(".data").html(htmlData);
    }
  });
}
