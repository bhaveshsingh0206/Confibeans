import dynamicClass  from './classes.js'
export default class CBContainers {
    constructor (cbd, data) {
        this.cbTree = { root: {} }
        this.z = 1
        this.cbd = cbd
        this.data = data
        this.htmlContent = ""
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
    newNode(path, type, iscb) {
        var node = {};
        if (iscb) {
          node["Path"] = "$" + path;
          node["CB"] = iscb;
          node["Children"] = {};
        } else {
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
    setObj(obj, query, name, prop, type) {
        for (var key in obj) {
          var value = obj[key];
      
          if (key === query) {
            var node = this.newNode(prop, type);
            obj[key]["Children"][name] = node;
          }
      
          if (typeof value === "object") {
            this.setObj(value, query, name, prop, type);
          }
        }
      }
    restructure(obj, newName, path, array) {
        var y = 1;
        var Name = null;
        var type = null
        if (array == true) {
          for (var i = 1; i < obj.length + 1; i++) {
            y = 1;
            Name = newName + i;
            var pathMain = path + "[" + (i - 1) + "]";
            if (typeof obj[i - 1] == "object") {
              type = "Object";
              this.setObj(this.cbTree, newName, Name, pathMain, type);
              
              for (var prop in obj[i - 1]) {
                
                if (typeof obj[i - 1][prop] == "object") {
                  if (Array.isArray(obj[prop])) {
                    //leaf nodes
                    var elementName = Name + y;
                    type = "Array";
                    var path_obj = pathMain + ".." + prop;
                    this.setObj(this.cbTree, Name, elementName, path_obj, type);
                    this.restructure(obj[[i - 1]][prop], elementName, path_obj, true);
                  } else {
                    if (prop != "cbd") {
                      var elementName = Name + y;
                      type = "Object";
                      path_obj = pathMain + ".." + prop;
                      this.setObj(this.cbTree, Name, elementName, path_obj, type);
                      this.restructure(obj[[i - 1]][prop], elementName, path_obj, false);
                    } else y--;
                  }
                } else {
                  //leaf nodes
                  var elementName = Name + y;
                  type = "";
                  var path_leaf = pathMain + ".." + prop;
                  this.setObj(this.cbTree, Name, elementName, path_leaf, type);
                }
                y++;
              }
            } else {
              var elementName = Name + y;
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
                
                if (obj[prop]["cbd"]) {
                  var path_obj = path + ".." + prop;
                  var node = this.newNode(".." + prop, type, obj[prop]["cbd"]["CBClass"]);
                } else {
                  var path_obj = path + ".." + prop;
                  var node = this.newNode(".." + prop, type);
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
              } else {
                if (prop != "cbd") {
                  Name = newName + y;
                  
                  type = "Object";
                  path_obj = path + ".." + prop;
                  this.setObj(this.cbTree, newName, Name, path_obj, type);
                  this.restructure(obj[prop], Name, path_obj);
                } else y--;
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
    Parse (data, cbd){
        this.cbd = cbd
        this.data = data
        this.restructure(data, "Node", "")
        console.log(JSON.stringify(this.cbTree));
    }
    Render (cbTree, prevobj){
        keys = Object.keys(cbtree)
        keys.forEach(key => {
        
          var obj = dynamicClass(cbtree[key]["CB"])
          if (obj != null) {
            obj = new obj()
            var allowedClasses = obj.AllowClasses
            var disallowedClasses = obj.DisAllowClasses
            if (cbtree[key].hasOwnProperty("Children")) {
              var children = cbtree[key][children]
              var childrenKeys = Object.keys(cbtree)
              childrenKeys.forEach((childrenkey)=>{
                if (allowedClasses.includes(children[childrenkey]["CB"]) || (allowedClasses.includes("All") && !disallowedClasses.includes(children[childrenkey]["CB"])) || !disallowedClasses.includes("All") ) {
                  if (children[childrenkey].hasOwnProperty("Children")) {

                  } else {
                    // Leaf node in our case
                    var leafobj = dynamicClass(children[childrenkey]["CB"])
                    if (leafobj != null) {
                      leafobj = new leafobj()
                    }
                    
                  }
                } else {
                  // main section1 k children nhi
                }
              })
              
            }
          }
            
            
            // obj.Load(data, cb)
        });
    }
}


  
  
  
  
  
  
  
  
  
  
  
  








