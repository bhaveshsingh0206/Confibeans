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
  checkInParent(path, type, parent, children) {
    console.log(typeof(parent))
    console.log("Parent ",parent)
    console.log("Children ",children)
    // var obj = dynamicClass(parent["CB"]);
    // obj = new obj();
    // var CBClassofKeys = obj.CBClassofKeys
    // if (CBClassofKeys) {
    //   for (var i=0;i<CBClassofKeys.length;i++) {
    //     var temp = CBClassofKeys[i]
    //     var keys = temp["ApplyTo"]
    //     for(var j=0;j<keys.length;j++) {
    //       if (keys[j]==children) {
    //         this.newNode(path, type, parent=null, temp["CB"])
    //         break
    //       }
    //     }
    //   }
    // }
    
  }
  newNode(path, type, parent=null, iscb=null) {

    var node = {};
    if (iscb) {
      node["Path"] = "$" + path;
      node["CB"] = iscb;
      if (type=="Object"||type=="Array")
        node["Children"] = {};
    } else if(parent) {
      var children = path.split("..")
      children = children[children.length-1]
      this.checkInParent(path, type, parent, children)
    }
      else {
      var cbClass = this.checkInCBD("$" + path, this.cbd);
      // console.log(cbClass);
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
        if (type == "Object") {
          node["Path"] = "$" + path;
          node["CB"] = "CBNode";
          node["Children"] = {};
        } else if (type == "Array") {
          node["Path"] = "$" + path;
          node["CB"] = "CBList";
          node["Children"] = {};
        } else {
          node["Path"] = "$" + path;
          node["CB"] = "CBText";
        }
      }
    }
    return node;
  }
   setObj(obj, query, name, prop, type, exist) {
    console.log("obj ",obj)
    var node;
    for (var key in obj) {
      var value = obj[key];
  
      if (key === query) {
        if(exist!=null){
          node = exist;
        }
        else{
          console.log("obj[key] purana se parent aaya")
          // console.log("Key ", key)
          console.log(obj)
          node = this.newNode(prop, type, obj, null);
        }
        obj[key]["Children"][name] = node;
        // console.log("CHILDREN", obj[key]["Children"]);
      }
  
      if (typeof value === "object") {
        this.setObj(value, query, name, prop, type, exist);
      }
    }
  }
  restructure(obj, newName, path, array) {
    var y = 1;
    var Name = null;
    var type = null;
    var elementName = null;
    if (array == true) {
      for (var i = 1; i < obj.length + 1; i++) {
        y = 1;
        Name = newName + i;
        var pathMain = path + "[" + (i - 1) + "]";
        if (typeof obj[i - 1] == "object") {
          type = "Object";
          this.setObj(this.cbTree, newName, Name, pathMain, type);
          // console.log(typeof obj[i - 1]);
          if (obj[i-1].hasOwnProperty("cbd")) {
            // console.log("cbd",obj[i-1][prop]["cbd"]["CB"] )
            elementName = Name + y;
            type = "Object";
            var path_obj = pathMain;
            // console.log("BHAVESH", obj[i-1]["cbd"]["CBClass"])
            node = this.newNode(pathMain, type, null,obj[i-1]["cbd"]["CBClass"]);
            this.setObj(this.cbTree, newName, Name, path_obj, type, node);
            // restructure(obj[i-1][prop], Name, path_obj);
          }
          for (var prop in obj[i - 1]) {
            if (typeof obj[i - 1][prop] == "object") {
              if (Array.isArray(obj[prop])) {
                //leaf nodes
                elementName = Name + y;
                type = "Array";
                var path_obj = pathMain + ".." + prop;
                this.setObj(this.cbTree, Name, elementName, path_obj, type);
                this.restructure(obj[i - 1][prop], elementName, path_obj, true);
              } else {
                if (prop != "cbd") {
                  elementName = Name + y;
                  type = "Object";
                  path_obj = pathMain + ".." + prop;
                  this.setObj(this.cbTree, Name, elementName, path_obj, type);
                  this.restructure(obj[[i - 1]][prop], elementName, path_obj, false);
                } else y--;
              }
            } else {
              //leaf nodes
              // console.log("PROP",prop);
              elementName = Name + y;
              // console.log("ENAME",elementName)
              type = "";
              var path_leaf = pathMain + ".." + prop;
              // console.log(path_leaf);
              // console.log(JSON.stringify(cbTree));
              this.setObj(this.cbTree, Name, elementName, path_leaf, type);
            }
            y++;
          }
        } else {
          elementName = Name + y;
          type = "";
          var path_leaf = path + ".." + prop;
          this.setObj(this.cbTree, Name, elementName, path_leaf, type);
          y++;
        }
      }
      array = false;
    } else {
      for (var prop in obj) {
        if (typeof obj[prop] == "object") {
          // object
          if (
            (Name == null || Name == "Node" + (this.z - 1)) &&
            prop != "cbd" &&
            !Array.isArray(obj[prop])
          ) {
            Name = newName;
            Name = Name + this.z;
            type = "Object";
            // console.log(prop);
            if (obj[prop]["cbd"]) {
              var path_obj = path + ".." + prop;
              // console.log("BHAVESH", obj[prop]["cbd"]["CBClass"])
              node = this.newNode(".." + prop,type,null,obj[prop]["cbd"]["CBClass"]);
            } else {
              var path_obj = path + ".." + prop;
              console.log("obj se parent aaya")
              node = this.newNode(".." + prop, type, obj, null);
            }
            this.cbTree.root[Name] = node;
            this.restructure(obj[prop], Name, path_obj);
            this.z++;
          } else if (Array.isArray(obj[prop])) {
            //leaf nodes
            Name = newName + y;
            type = "Array";
            var path_leaf = path + ".." + prop;
            this.setObj(this.cbTree, newName, Name, path_leaf, type);
            this.restructure(obj[prop], Name, path_leaf, true);
          } else if(obj[prop]["cbd"]){
            // console.log(obj[prop]["cbd"]);
            var path_obj = path + ".." + prop;
            Name = newName + y;
            type = "Object";
            // console.log("BHAVESH", obj[prop]["cbd"]["CBClass"])
            var node = this.newNode(".." + prop, type, null, obj[prop]["cbd"]["CBClass"]);
            // console.log("name",Name);
            // console.log("mynode",node);
            this.setObj(this.cbTree, newName, Name, path_obj, type, node);
            this.restructure(obj[prop], Name, path_obj);
          }else {
            if (prop != "cbd") {
              Name = newName + y;
              // console.log(Name);
              type = "Object";
              path_obj = path + ".." + prop;
              this.setObj(this.cbTree, newName, Name, path_obj, type);
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
          this.setObj(this.cbTree, newName, Name, path_leaf, type);
        }
        y++;
      }
    }
  }
  tpFunction(cbtree) {
    
    var keys = Object.keys(cbtree);
    keys.forEach((key) => {
      if (cbtree[key]["Children"]) {
        
        if (cbtree[key]["CB"] != "cbCapVal") {
          this.tpFunction(cbtree[key]["Children"])
        } else {
          // console.log(cbtree[key]["Children"])
          keys = Object.keys(cbtree[key]["Children"])

          keys.forEach((k)=>{
            var obj = cbtree[key]["Children"][k]
            var temp = obj["Path"].split("..")
            if (temp[temp.length-1] == "Value") {
              obj["CB"] = "CBInput"
            }
          })
          
        }
        
        
      } 
      
    })
  }
  Parse(data, cbd) {
    this.cbd = cbd;
    this.data = data;
    this.restructure(data, "Node", "");
    var t = this;
    this.tpFunction(this.cbTree["root"])
    setTimeout(function () {
      
      console.log(JSON.stringify(t.cbTree));

      t.Render(t.cbTree["root"], null);
    }, 1000);
  }



  Render(cbtree, parent) {
    // console.log("Please die")
    var across = false;
    var render = true;
    var keys = Object.keys(cbtree);
    var parentNestedClasses = [];
    keys.forEach((key, j) => {
      // console.log("first cbtree[key]", cbtree[key]);
      if (parent != null) {
        var obj = dynamicClass(parent["CB"]);
        // console.log("myobj");
        // console.log(cbtree[key]["CB"]);
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
      // console.log("ok girls ",allowedClasses);
      // console.log("come on", cbtree[key]);

      if (cbtree[key].hasOwnProperty("Children")) {
        var children = cbtree[key]["Children"];
        if (parent != null) {
          // console.log("Parent", parent["CB"]);
          // console.log("Childref", cbtree[key]["CB"]);

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
          // console.log("RECURSING");
          this.Render(children, cbtree[key]);
          this.htmlContent += `</div>`;
        } else {
          this.htmlContent += `<div>`;
          // console.log("RECURSING");
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
              // console.log(parentNestedClasses.indexOf(layout["First"]));
              // console.log(parentNestedClasses.indexOf(layout["FollowedBy"]));
              if (
                parentNestedClasses[len - 1] === layout["FollowedBy"] &&
                layout["First"] === parentNestedClasses[len - 2]
              ) {
                placements = layout["Placement"];
                placeFound = true;
                // console.log("-------------------------------------");
                // console.log("placements ", placements);
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
        // console.log("Rendering the tree");
        // console.log(t.htmlContent);
        $("#data").append(t.htmlContent);
      }, 1000);
    }
  }
}
