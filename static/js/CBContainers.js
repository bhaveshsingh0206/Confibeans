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
      Down: "",
      Default: "default",
      Indented: "indent",
    };
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
          node["Children"] = {};
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
          node["Children"] = {};
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
    var across = false;
    var render = true;
    var keys = Object.keys(cbtree);
    var parentNestedClasses = [];
    keys.forEach((key, j) => {
      if (parent != null) {
        var obj = dynamicClass(parent["CB"]);
        obj = new obj();
        // console.log(obj)
        var allowedClasses = obj.AllowClasses;
        var disallowedClasses = obj.DisAllowClasses;
        var parentLayouts = obj.Lod;
        var parentCMD = obj.Cmd;
        var layoutCmd;
        var style = "";
        render = false;
      }
      

      if (cbtree[key].hasOwnProperty("Children")) {
        var children = cbtree[key]["Children"];
        if (parent != null) {
          

          if (
            allowedClasses.includes(cbtree[key]["CB"]) ||
            (allowedClasses.includes("All") &&
              !disallowedClasses.includes(cbtree[key]["CB"])) ||
            !disallowedClasses.includes("All")
          ) {
            var place = "";
            var newStyle = "";
            for (var k = 0; k < parentCMD.length; k++) {
              layoutCmd = parentCMD[k];
              // checking above
              if (
                cbtree[key]["CB"] === layoutCmd["Nested"] &&
                layoutCmd["Outer"] === parent["CB"]
              ) {
                place = layoutCmd["Placement"];
                newStyle = this.styles[place];
                break;
              }
            }
          }
          this.htmlContent += `<div class="${newStyle}">`;
          this.Render(children, cbtree[key]);
          this.htmlContent += `</div>`;
        } else {
          this.htmlContent += `<div>`;
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
          }
          if (!placeFound) {
            placements = "Default";
          }
          if (cbtree[key]["CB"] == "CBText" || cbtree[key]["CB"] == "CBInput") {
            
            var leafobj = dynamicClass(cbtree[key]["CB"]);
            leafobj = new leafobj();
            // console.log(typeof leafobj);
            style = leafobj.styles;
            internalStyle = this.styles[placements];
            if (cbtree[key]["CB"] == "CBText") {
              if (across)
              this.htmlContent += `<div class="${style}  across"><p class="${internalStyle}">${
                jsonPath(this.data, cbtree[key]["Path"])[0]
              }</p></div>`;
            else
              this.htmlContent += `<div class="${style}"><p class="${internalStyle}">${
                jsonPath(this.data, cbtree[key]["Path"])[0]
              }</p></div>`;
            } else {
              if (across)
              this.htmlContent += `<div class="${style} ${internalStyle} across"><input type="text" class="${internalStyle}" value="${
                jsonPath(this.data, cbtree[key]["Path"])[0]
              }"></input></div>`;
            else
              this.htmlContent += `<div class="${style} ${internalStyle}"><input type="text" class="${internalStyle}" value="${
                jsonPath(this.data, cbtree[key]["Path"])[0]
              }"></input></div>`;
            }
            
            // console.log(this.htmlContent);
          }
          across = false;
        }
      }
    });
    if (render) {
      var t = this;
      setTimeout(function () {
        $("#data").append(t.htmlContent);
      }, 1000);
    }
  }
}
