import dynamicClass from "./classes.js";
export default class CBContainers {
  constructor(cbd, data) {
    this.cbTree = { root: {} };
    this.z = 1;
    this.cbd = cbd;
    this.data = data;
    this.htmlContent = "";
    this.styles = {
      Center: "title",
      Across: "across",
      Down: "down",
      Default: "default",
      Indented: "indent",
      Toggle: "toggle"
    };
    this.radioCategories = 0;
    this.checkBoxCategories = 0;
    this.panelCategories = 0;
  }

  checkInCBD(path, cbd) {
    var CBClassofNode = cbd["root"]["CBClassofNode"];
    var paths = CBClassofNode["ApplyTo"];
    for (var i = 0; i < paths.length; i++) {
      if (path === paths[i]) {
        var cbClass = CBClassofNode["CBClass"];
        return cbClass;
      }
      if (i == paths.length - 1) {
        var CBTypeofNode = cbd["root"]["CBTypeofNode"];
        var paths_type = CBTypeofNode["ApplyTo"];
        var type = CBTypeofNode["Type"];
        for (var j = 0; j < paths_type.length; j++) {
          if (path == paths_type[j]) {
            var CBClassofType = cbd["root"]["CBClassofType"];
            var types = CBClassofType["ApplyTo"];
            if (types.includes(type)) {
              var cbClass = CBClassofType["CBClass"];
              return cbClass;
            }
          }
          if (j == paths_type.length - 1) {
            return null;
          }
        }
      }
    }
  }
  checkInParent(parent, children) {
    var obj = dynamicClass(parent["CB"]);
    obj = new obj();
    var CBClassofKeys = obj.CBClassofKeys
    if (CBClassofKeys) {
      for (var i=0;i<CBClassofKeys.length;i++) {
        var temp = CBClassofKeys[i]
        var keys = temp["ApplyTo"]
        for(var j=0;j<keys.length;j++) {
          if (keys[j]==children) {
            return temp["CB"];
          }
        }
      }
      return null;
    }
    
  }
  newNode(path, type, parent=null, iscb=null) {
    var node = {};
    var children = path.split("..");
    var cbd =null;
    children = children[children.length-1]
    if (iscb) {
      node["Path"] = "$" + path;
      node["CB"] = iscb;
      node["Children"] = {};
    }
    else {
      var cbClass = this.checkInCBD("$" + path, this.cbd);
      if (cbClass != null) {
        if (type == "Object") {
          node["Path"] = "$" + path;
          node["CB"] = cbClass;
          node["Children"] = {};
        } else if (type == "Array") {
          node["Path"] = "$" + path;
          node["CB"] = cbClass;
          if (cbClass != "CBDropdowns" && cbClass != "CBRadio" && cbClass != "CBCheckBoxes") {
            node["Children"] = {};
          }
          
        } else {
          node["Path"] = "$" + path;
          node["CB"] = cbClass;
        }
      } else {
        if(parent["CB"]){
          cbd = this.checkInParent(parent, children);
        }
        if (type == "Object") {
          node["Path"] = "$" + path;
          cbd==null ? node["CB"] = "CBNode": node["CB"] = cbd;
          node["Children"] = {};
        } else if (type == "Array") {
          node["Path"] = "$" + path;
          cbd==null ? node["CB"] = "CBList": node["CB"] = cbd;
          if (cbd != "CBDropdowns" && cbd != "CBRadio" && cbd != "CBCheckBoxes") {
            node["Children"] = {};
          }
        } else {
          node["Path"] = "$" + path;
          cbd==null ? node["CB"] = "CBText": node["CB"] = cbd;
        }
      }
    }
    return node;
  }
   setObj(obj, query, name, prop, type, exist) {
    var node;
    for (var key in obj) {
      var value = obj[key];
      if (key === query) {
        if(exist!=null){
          node = exist;
        }
        else{
            node = this.newNode(prop, type, obj[key], null);
        }
        obj[key]["Children"][name] = node;
      }
  
      if (typeof value === "object") {
        this.setObj(value, query, name, prop, type, exist);
      }
    }
  }
  restructure(obj, newName, path, array) {
    // y is for labelling node name
    var y = 1;
    //Name is current node name
    var Name = null;
    // type of node
    var type = null;
    var elementName = null;
    if (array == true) {
      //if it enters then we are in child elements of array
      // traversing array
      for (var i = 1; i < obj.length + 1; i++) {
        y = 1;
        // newname is name of parent node
        Name = newName + i;
        //naming each array element using pathmain
        var pathMain = path + "[" + (i - 1) + "]";
        //if an element is an object it enters here
        if (typeof obj[i - 1] == "object") {
          type = "Object";
          this.setObj(this.cbTree, newName, Name, pathMain, type, null);
          // if cbd exists in this element we set CB of node based on CBClass
          if (obj[i-1].hasOwnProperty("cbd")) {
            elementName = Name + y;
            type = "Object";
            var path_obj = pathMain;
            //create custom node and send it to setobj function
            node = this.newNode(pathMain, type, null,obj[i-1]["cbd"]["CBClass"]);
            this.setObj(this.cbTree, newName, Name, path_obj, type, node);
          }
          // traversing through the child_elements of the object element
          for (var prop in obj[i - 1]) {
            if (typeof obj[i - 1][prop] == "object") {
              //if child_element is an array recursively call same function
              if (Array.isArray(obj[prop])) {
                elementName = Name + y;
                type = "Array";
                var path_obj = pathMain + ".." + prop;
                this.setObj(this.cbTree, Name, elementName, path_obj, type, null);
                this.restructure(obj[i - 1][prop], elementName, path_obj, true);
              } else {
                // set all nodes except the cbd node in cbtree
                if (prop != "cbd") {
                  elementName = Name + y;
                  type = "Object";
                  path_obj = pathMain + ".." + prop;
                  this.setObj(this.cbTree, Name, elementName, path_obj, type, null);
                  this.restructure(obj[[i - 1]][prop], elementName, path_obj, false);
                } else y--; // reduce y for correct naming pattern
              }
            } else {
              // if child_element is leaf node
              elementName = Name + y;
              type = "";
              var path_leaf = pathMain + ".." + prop;
              this.setObj(this.cbTree, Name, elementName, path_leaf, type, null);
            }
            y++; // after each iteration increase y for node naming
          }
        } else {
          // if element is leaf node
          elementName = Name + y;
          type = "";
          var path_leaf = path + ".." + prop;
          this.setObj(this.cbTree, Name, elementName, path_leaf, type, null);
          y++;
        }
      }
      // once all elements are traversed through for loop setting array back to false
      array = false;
    } else {
      // traversing through the object
      for (var prop in obj) {
        if (typeof obj[prop] == "object") {
          // if element is an object
          if (
            (Name == null || Name == "Node" + (this.z - 1)) &&
            prop != "cbd" &&
            !Array.isArray(obj[prop])
          ) {
            // enters this ONLY for primary first layer nodes eg Node1,Node2,Node3 etc...
            Name = newName;
            Name = Name + this.z; // z is for naming primary nodes eg z=1 for Node1, z=2 for Node2 etc...
            type = "Object";
            if (obj[prop]["cbd"]) {
              // if primary Nodes contain cbd set CB to CBClass
              var path_obj = path + ".." + prop;
              //create custom node and send it to setobj function
              node = this.newNode(".." + prop,type,null,obj[prop]["cbd"]["CBClass"]);
            } else {
              // else set CBNode
              var path_obj = path + ".." + prop;
              node = this.newNode(".." + prop, type, obj, null);
            }
            this.cbTree.root[Name] = node; // set this node in root
            this.restructure(obj[prop], Name, path_obj); // recursive call to traverse primary nodes, NO array parameter here
            this.z++;
          } else if (Array.isArray(obj[prop])) {
            //if array object
            Name = newName + y;
            type = "Array";
            var path_leaf = path + ".." + prop;
            //set node 
            this.setObj(this.cbTree, newName, Name, path_leaf, type, null);
            //recursive call by setting array parameter as TRUE for traversing array elements
            this.restructure(obj[prop], Name, path_leaf, true);
          } else if(obj[prop]["cbd"]){
            // if normal nodes contain cbd set CB to CBClass
            var path_obj = path + ".." + prop;
            Name = newName + y;
            type = "Object";
            //create custom node and send it to setobj function
            var node = this.newNode(".." + prop, type, null, obj[prop]["cbd"]["CBClass"]);
            this.setObj(this.cbTree, newName, Name, path_obj, type, node);
            this.restructure(obj[prop], Name, path_obj);
          }else {
            // set all nodes and skip if cbd appears
            if (prop != "cbd") {
              Name = newName + y;
              type = "Object";
              path_obj = path + ".." + prop;
              this.setObj(this.cbTree, newName, Name, path_obj, type, null);
              this.restructure(obj[prop], Name, path_obj);
            } else {
              y--;
            }
          }
        } else {
          //leaf nodes
          Name = newName + y;
          type = "";
          var path_leaf = path + ".." + prop;
          this.setObj(this.cbTree, newName, Name, path_leaf, type, null,null);
        }
        y++;
      }
    }
  }
 
  Parse(data, cbd) {
    this.cbd = cbd;
    this.data = data;
    this.restructure(data, "Node", "");
    var t = this;
    setTimeout(function () {
      
      console.log(JSON.stringify(t.cbTree));

      t.Render(t.cbTree["root"], null);
    }, 1000);
  }



  Render(cbtree, parent) {
    var across = false; //bool to check if across needs to be applied
    var render = true; //bool to check when html must be sent
    var keys = Object.keys(cbtree); //get keys of cbtree
    var parentNestedClasses = []; 
    keys.forEach((key, j) => { // iterate through cbtree
      if (parent != null) { //initialize variables only if parent exists
        var obj = dynamicClass(parent["CB"]); //create instance obj of parent to access parent class
        obj = new obj();
        // initialize variables
        var allowedClasses = obj.AllowClasses;
        var disallowedClasses = obj.DisAllowClasses;
        var parentLayouts = obj.Lod;
        var parentCMD = obj.Cmd;
        var layoutCmd;
        var style = "";
        render = false;
      }
      if (cbtree[key].hasOwnProperty("Children")) { // if chiildren exists
        var children = cbtree[key]["Children"]; // set children
        // cmd logic start
        if (parent != null) {
          if(cbtree[key]["CB"] == "CBRadioButtons")
          {
            this.radioCategories++;

          }
          if (cbtree[key]["CB"]=="CBMultiChoice") {
            this.checkBoxCategories++;
          }
          // if basic allowed classes and disallowed classes is satisfied enter if
          if (
            allowedClasses.includes(cbtree[key]["CB"]) ||
            (allowedClasses.includes("All") &&
              !disallowedClasses.includes(cbtree[key]["CB"])) ||
            !disallowedClasses.includes("All")
          ) {
            // initialize temporary variables
            var place = "";
            var newStyle = "";
            // iterate through parent class cmd object
            for (var k = 0; k < parentCMD.length; k++) {
              layoutCmd = parentCMD[k];
              // checking if current node cb is in nested part and parent cb is in outer part
              if (
                cbtree[key]["CB"] === layoutCmd["Nested"] &&
                layoutCmd["Outer"] === parent["CB"]
              ) {
                place = layoutCmd["Placement"];
                newStyle = this.styles[place]; // set temporary variables
                break;
              }
            }
          }
          this.htmlContent += `<div class="${newStyle}">`; // add cmd style to html
          this.Render(children, cbtree[key]);
          this.htmlContent += `</div>`;
          // cmd logic end
        } else {
          this.htmlContent += `<div>`; // if no cmd then dont add any style
          this.Render(children, cbtree[key]);
          this.htmlContent += `</div>`;
        }
      }

      if (parent != null) {
        if (
          allowedClasses.includes(cbtree[key]["CB"]) ||
          (allowedClasses.includes("All") &&
            !disallowedClasses.includes(cbtree[key]["CB"])) ||
          !disallowedClasses.includes("All")
        ) {
          parentNestedClasses.push(cbtree[key]["CB"]);
          var placements = "";
          var internalStyle = "";
          var placeFound = false;
          var layout;
          var len = parentNestedClasses.length;
          // for loop to check if we will have an across layout
          for (var k = 0; k < parentLayouts.length; k++) {
            layout = parentLayouts[k];
            if (keys.length > j + 1) {
              if (
                cbtree[keys[j + 1]]["CB"] === layout["FollowedBy"] &&
                layout["First"] === parentNestedClasses[len - 1]
              ) {
                placements = layout["Placement"];
                if (placements == "Across") across = true;
              }
            }
          }
          // end of across check 
          // for loop for checking lod of class
          for (var k = 0; k < parentLayouts.length; k++) {
            layout = parentLayouts[k];
            // checking above
            if (parentNestedClasses.length == 1) {
              if (
                parentNestedClasses[0] === layout["FollowedBy"] &&
                layout["First"] === ""
              ) {
                placements = layout["Placement"];
                // console.log("placementsZZZ ", placements);
                placeFound = true;
                break;
              }
            } else {
              if (
                parentNestedClasses[len - 1] === layout["FollowedBy"] &&
                layout["First"] === parentNestedClasses[len - 2]
              ) {
                placements = layout["Placement"];
                placeFound = true;
                break;
              }
            }
          } // lod check end
          if (!placeFound) { // lod not found then default layout
            placements = "Default";
          }

          // if we reach leaf nodes that dont have children
          if(cbtree[key]["CB"] == "CBDropdowns" || cbtree[key]["CB"] == "CBRadio" || cbtree[key]["CB"] == "CBCheckBoxes"){
            var path = cbtree[key]["Path"];
            var pathCBD = path;
            pathCBD = pathCBD.slice(0, pathCBD.length-5);
            pathCBD = pathCBD + "cbd..LoV";
            var leafobj = dynamicClass(cbtree[key]["CB"]);
            var path = cbtree[key]["Path"];
            leafobj = new leafobj();
            style = leafobj.styles;
            internalStyle = this.styles[placements];
            var value = jsonPath(this.data, path)[0];
            console.log("value ", value)
            var values = jsonPath(this.data, pathCBD)[0];
            switch (cbtree[key]["CB"]) {
              case "CBDropdowns":
                if(across)
                  this.htmlContent += `<div class="${style} ${internalStyle} across"><select id="${path}">`;
                else
                  this.htmlContent += `<div class="${style} ${internalStyle}"><select id="${path}">`;
                for(var k =0; k<values.length ; k++){
                  if(this.isChecked(values[k], value)){
                    // console.log("Erorrr->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                    this.htmlContent += `<option value="${values[k]}" selected>${values[k]}</option>`;
                  }
                    
                  else
                    this.htmlContent += `<option value="${values[k]}">${values[k]}</option>`;
                }
                this.htmlContent += `</select></div>`;
                break;
              case "CBRadio":
                var radioName = "Category" + this.radioCategories;
                if(across)
                  this.htmlContent += `<div class="${style} ${internalStyle} across">`;
                else
                  this.htmlContent += `<div class="${style} ${internalStyle}">`;
                for(var k =0; k<values.length ; k++){
                  if(this.isChecked(values[k], value))
                    this.htmlContent += `<input id="${path}[${k}]" type="radio" name="${radioName}" class="${internalStyle} ${style}" value="${
                      values[k]
                    }" checked="checked"></input><label for="${path}[${k}]">${values[k]}</label>`;
                  else
                    this.htmlContent += `<input id="${path}[${k}]" type="radio" name="${radioName}" class="${internalStyle} ${style}" value="${
                      values[k]
                    }" ></input><label for="${path}[${k}]">${values[k]}</label>`;
                }
                this.htmlContent += `</div>`;
                break;
              case "CBCheckBoxes":
                var checkName = "Category" + this.checkBoxCategories;
                console.log("CBCheckBoxes")
                if(across)
                  this.htmlContent += `<div class="${style} ${internalStyle} across">`;
                else
                  this.htmlContent += `<div class="${style} ${internalStyle}">`;
                for(var k =0; k<values.length ; k++){
                  if(this.isChecked(values[k], value))
                    this.htmlContent += `<input id="${path}[${k}]" type="checkbox" name="${checkName}" class="${internalStyle} ${style}" value="${
                      values[k]
                    }" checked="checked"></input><label for="${path}[${k}]">${values[k]}</label>`;
                  else
                    this.htmlContent += `<input id="${path}[${k}]" type="checkbox" name="${checkName}" class="${internalStyle} ${style}" value="${
                      values[k]
                    }" ></input><label for="${path}[${k}]">${values[k]}</label>`;
                }
                this.htmlContent += `</div>`;
                break;
            }
          }
          else if (cbtree[key]["CB"] == "CBText" || cbtree[key]["CB"] == "CBInput" || cbtree[key]["CB"] == "CBDate" || cbtree[key]["CB"] == "CBPanelTitle" )  {
            var leafobj = dynamicClass(cbtree[key]["CB"]);
            var path = cbtree[key]["Path"];
            leafobj = new leafobj();
            // console.log(typeof leafobj);
            style = leafobj.styles;
            internalStyle = this.styles[placements];
            if (cbtree[key]["CB"] == "CBText") {
              //check if across layout has to be applied
              if (across)
                this.htmlContent += `<div class=" ${internalStyle} across"><p id="${path}" class="${style}">${
                  jsonPath(this.data, cbtree[key]["Path"])[0]
                }</p></div>`;
            else
              this.htmlContent += `<div class="${internalStyle}"><p id="${path}" class="${style}">${
                jsonPath(this.data, cbtree[key]["Path"])[0]
              }</p></div>`;
            }
            else if ((cbtree[key]["CB"] == "CBPanelTitle")) {
              this.panelCategories += 1
              var name = "Panel"+this.panelCategories
              if (across){
                this.htmlContent += `<div class=" ${internalStyle} across" id="${name}"><p class="${style}">${
                  jsonPath(this.data, cbtree[key]["Path"])[0]
                } <i class="fal fa-chevron-down"></i></p></div>`;

                
              }
            else{
              this.htmlContent += `<div class="${internalStyle}" id="${name}"><p class="${style}">${
                jsonPath(this.data, cbtree[key]["Path"])[0]
              } <i class="fal fa-chevron-down"></i></p></div>`;
              
            }
            } 
            else if ((cbtree[key]["CB"] == "CBInput") ) {
              var inputValue = jsonPath(this.data, cbtree[key]["Path"])[0];

              //this is for default cbcapval rendering - currently useless
              // if(this.jsonChecker(inputValue)){
              //   inputValue = inputValue.replace(/'/g,"\"");
              //   var inputObj = JSON.parse(inputValue);
              //   console.log(inputObj);
              //   for(var inputKey in inputObj){
              //     console.log(inputKey);
              //     console.log(inputObj[inputKey]);
              //     this.htmlContent += `<div>`;
              //     this.htmlContent += `<div class=" default across"><p id="${path}" class="${style}">${
              //       inputKey
              //     }</p></div>`;
              //     this.htmlContent += `<div class="${style} ${internalStyle} across"><input id="${path}" type="text" class="${internalStyle}" value="${
              //       inputObj[inputKey][0]
              //     }"></input></div>`;
              //     this.htmlContent += `</div>`;
              //   }
              // }
              
              //check if across layout has to be applied
              if (across)
                this.htmlContent += `<div class="${style} ${internalStyle} across"><input id="${path}" type="text" class="${internalStyle}" value="${
                  inputValue
                }"></input></div>`;
              else
                this.htmlContent += `<div class="${style} ${internalStyle}"><input id="${path}" type="text" class="${internalStyle}" value="${
                  inputValue
                }"></input></div>`;
              
            }
            else  {
              //check if across layout has to be applied
              if (across)
                this.htmlContent += `<div class=" ${internalStyle} across"><input id="${path}" type="date" class="" value="${
                  inputValue
                }"></input></div>`;
              else
                this.htmlContent += `<div class=" ${internalStyle}"><input id="${path}" type="date" class="${internalStyle} ${style}" value="${
                  inputValue
                }"></input></div>`;
            }
          }
          across = false; // set across false after html is applied
        }
      }
    });
    // if render is true we sent html content
    if (render) {
      var t = this;
      setTimeout(function () {
        $("#data").append(t.htmlContent);
        $("#Panel1").click(()=>{  
          console.log("Clicked")
          $("#Panel1").siblings().toggle()
        })
        
        // t.Collect(t.cbTree["root"]);
        // console.log("Before data ", t.data)
        // setTimeout(()=>{
        //   console.log("Saving valueee.............")
        //   t.Collect(t.cbTree["root"]);
        //   setTimeout(()=>{
        //     console.log(t.data)
        //   }, 1000)
        // }, 5000)
        
      }, 1000);
    }
  }

  isChecked(value, valueList) {
    for (var k =0;k<valueList.length;k++) {
      if (value == valueList[k])
      return true
    }
    return false
  }

  //json string validator - useless for now

  // jsonChecker(str){
  //   str = str.replace(/'/g,"\"");
  //   try {
  //       JSON.parse(str);
  //   } catch (e) {
  //       return false;
  //   }
  //   if(isNaN(str))
  //     return true;
  //   else
  //     return false;
  // }


  findDataNode(path) {
      var subx = [];
      return path.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                 .replace(/'?\.'?|\['?/g, ";")
                 .replace(/;;;|;;/g, ";..;")
                 .replace(/;$|'?\]|'$/g, "")
                 .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
  }
  removeElement(item) {
      return item != ".."
    
  }
  Collect(cbtree){
    var keys = Object.keys(cbtree); 
    keys.forEach((key, j) => { 
      if (cbtree[key].hasOwnProperty("Children")) {
        var children = cbtree[key]["Children"];
        this.Collect(children);
      }
      else{
        //get value of leaf node
        var leafobj = dynamicClass(cbtree[key]["CB"]);
        leafobj = new leafobj();
        var value = leafobj.getValue(cbtree[key]["Path"]);
        var dataPath = this.findDataNode(cbtree[key]["Path"]);
        dataPath = dataPath.split(";")
        // console.log(dataPath)
        dataPath = dataPath.slice(2)
        dataPath = dataPath.filter(this.removeElement)
        var temp = ""
        // console.log(dataPath)
        dataPath.forEach((key, index)=>{
          var er = /^-?[0-9]+$/;
          var isDigit = er.test(key);
          if (isDigit) {
            key = Number(key) 
          }   
          // console.log("temp ",temp)
          if (index != dataPath.length-1) {
            if (temp != "") {
              temp = temp[key]
            } else {
              temp = this.data[key]
            }
          } else {
            
            temp[key] = value
          }
        })        
        
      }
    });
  }
}

// types of data in json

// {
  // "cbCVSection": {
  //     "AectionTitle": "Section1",
  //     "cbd": {
  //         "CBClass": "cbCVSection"
  //     },
  //     "CaptionValues": [
  //         {
  //             "Caption": "Caption1",
  //             "Value": "Value1",
  //             "cbd": {
  //                 "CBClass": "cbCapVal"
  //             }
  //         },
  //         {
  //             "Caption": "Caption2",
  //             "Value": "Value2",
  //             "cbd": {
  //                 "CBClass": "cbCapVal"
  //             }
  //         },
  //         {
  //             "Caption": "Last Updated",
  //             "Value": "2013-01-08"
  //         }
  //     ]
  // },
//   "zzPanel":{
//       "Aitel":"Ambilight",
//       "Banner":[
//           {
//               "Key": "Features",
//               "Value": "Demo 1 Features",
//               "cbd": {
//                   "CBClass": "CBPanels"
//               }
//           },
//           {
//               "Key": "Specifications",
//               "Value": "Demo 1 Specifications",
//               "cbd": {
//                   "CBClass": "CBPanels"
//               }
//           }
//       ],
//   "cbd": {
//           "CBClass":"CBPanel"
//       }
//   }
  
// }





// {
//   "Invoice": {
//       "InvoiceDate":{
//           "Aitle": "Invoice Date",
//           "Value": "2000-12-20"
//       },
//       "InvoiceType":{
//           "Aitle": "Select Type",
//           "Value": ["Australia"],
//           "cbd": {
//               "CBClass":"CBDropdown",
//               "LoV": ["India", "Australia", "England"]
//           }
//       },
//       "DI_DocumentType": {
//           "Caption": "DI_DocumentType",
//           "Value": [
//             "Others",
//             "Aadhar",
//             "Pan"
//           ],
//           "cbd": {
//             "CBClass": "CBMultiChoice",
//             "LoV": [
//               "Others",
//               "DriverLicense",
//               "Form",
//               "Aadhar",
//               "Pan"
//             ]
//           }
//       },
//       "zI_SERVING_SIGNATURE": {
//           "Caption": "DI_SERVING_SIGNATURE",
//           "Value": [
//               "detection_signature"
//           ],
//           "cbd": {
//               "CBClass": "CBDropdown",
//               "LoV": [
//               "detection_signature1",
//               "detection_signature"
//               ]
//           }
//       },
//       "cbCVSection": {
//           "AectionTitle": "Section1",
//           "cbd": {
//               "CBClass": "cbCVSection"
//           },
//       "InvoiceNo":{
//           "ak": "Some Text"
//       }
//   }
// }

