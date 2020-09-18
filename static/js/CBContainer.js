import dynamicClass  from './classes.js';
import CBNode from './CBNode.js'
import CBText from './CBText.js'
import cbType1 from './cbType1.js'
import cbClass1 from './cbClass1.js'
class CBContainer {
    constructor() {
        this.data = {}
        this.CBTree = {root: {}}
        this.nodeCount = 1
    }
    newNode(prop, type, name) {
        var node = {};
        node["Path"] = "$"+prop;
        if (type == "Object") {
          node["CB"] = "CBNode";
          node["Children"] = {};
        } else if (type == "Array") {
          node["CB"] = "CBList";
        } 
        else {
          node["CB"] = "CBText";
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
            if (typeof value === "object" && !Array.isArray(value)) {
              this.setObj(value, query, name, prop, type);
            }
          }
      }
      restructure(obj, newName, path) {
        var y = 1;
        var Name = null;
        var type = null;
        for (var prop in obj) {
          if (typeof obj[prop] == "object" && !Array.isArray(obj[prop])) {
            if (Name == null || Name == "Node" + (this.nodeCount - 1)) {
              Name = newName;
              Name = Name + this.nodeCount;
              type = "Object";
              var path_obj = path + ".." + prop;
              var node = this.newNode(prop, type);
              this.CBTree.root[Name] = node;
              this.restructure(obj[prop], Name, path_obj);
              this.nodeCount++;
              y++;
            } else {
              Name = newName + y;
              type = "Object";
              var path_obj = path + ".." + prop;
              // setObj(a, newName, Name, path_obj, type);
              this.setObj(this.CBTree, newName, Name, path_obj, type);
              this.restructure(obj[prop], Name, path_obj);
              y++;
            }
          }
           else if (Array.isArray(obj[prop])) {
            
            Name = newName + y;
            type = "Array";
            var path_leaf = path + ".." + prop;
            
            this.setObj(this.CBTree, newName, Name, path_leaf, type);
            y++;
          } 
          else {
            Name = newName + y;
            type = "";
            var path_leaf = path + ".." + prop;
            this.setObj(this.CBTree, newName, Name, path_leaf, type);
            y++;
          }
        }
      }
    createBasicCBTree (node_name, cb_name) {
      var temp = {
        "root": {
          [node_name]:{
            "Path":"$.."+node_name,
            "CB":cb_name
          }
        }
      }
      return temp
    }
    Load (data, cb) {
        var keys = Object.keys(data)
        this.data = data
        keys.forEach((key)=>{
          this.CBTree = {root: {}}
          if(data[key].hasOwnProperty("cbd")) {
            this.CBTree = this.createBasicCBTree(key, data[key]["cbd"]["cbname"])
            this.Render("data_here")
          } else {
            var CBClassofNode = cb["root"]["CBClassofNode"]
            var paths = CBClassofNode["ApplyTo"]
            for (var i=0; i<paths.length; i++) {
            
              var obj = jsonPath(data, paths[i])[0]
              console.log("Check ", obj)
              if (obj == data[key]){
                console.log("if m gaya")
                var cbClass = CBClassofNode["CB"]
                this.CBTree = this.createBasicCBTree(key, cbClass)
                this.Render("data_here")
                break
              }
              if (i==paths.length-1) {
                var CBTypeofNode = cb["root"]["CBTypeofNode"]
                var paths_type = CBTypeofNode["ApplyTo"]
                // console.log(typeof(paths_type))
                var type = CBTypeofNode["Type"]
                for (var j=0; j<paths_type.length; j++) {
                  // console.log(paths_type[j])
                  var obj = jsonPath(data, paths_type[j])[0]
                  console.log("Here ,", obj)
                  console.log(data[key])
                  if (obj == data[key]){
                    var CBClassofType = cb["root"]["CBClassofType"]
                    var types = CBClassofType["ApplyTo"]
                    console.log(types)
                    if (types.includes(type)){
                      var cbClass = CBClassofType["CB"]
                      this.CBTree = this.createBasicCBTree(key, cbClass)
                      this.Render("data_here")
                      break
                    }
                  
                }
                if (j == paths_type.length -1) {
                  this.restructure({[key]:data[key]}, "Node", "")
                  this.Render("data_here")
                }
                }
                
              }
            }
            
            
          }
        })         
        
    }
    Render (div) {
      console.log("This is is CbTree")
      console.log(this.CBTree)
        var keys = Object.keys(this.CBTree["root"]) 
        keys.forEach(key => {
            var objType = this.CBTree["root"][key]["CB"]
            // console.log(objType)
            var obj = dynamicClass(objType)
            // console.log(obj)
            obj = new obj(this.data)
            obj.Render(div, this.CBTree["root"][key])
            // if (objType == "CBNode") {
            //   var obj = new CBNode(this.data)
            //   obj.Render(div, this.CBTree["root"][key])
            // } else {
            //   var obj = new cbSection1(this.data)

            //   obj.Render(div, this.CBTree["root"][key])
            // }
            
        });  
    }   
}
export default CBContainer