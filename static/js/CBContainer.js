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
              this.setObj(this.CBTree, newName, Name, path, type);
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
    Load (data) {
        var keys = Object.keys(data)
        this.data = data
        keys.forEach((key)=>{
          this.CBTree = {root: {}}
          if(data[key].hasOwnProperty("cbd")) {
            this.CBTree = this.createBasicCBTree(key, data[key]["cbd"]["cbname"])
            this.Render("data_here")
          } else {
            this.restructure({[key]:data[key]}, "Node", "")
            setTimeout(()=>{
              this.Render("data_here")
            }, 200)
          }
        })         
        
    }
    Render (div) {
        var keys = Object.keys(this.CBTree["root"]) 
        keys.forEach(key => {
            var objType = this.CBTree["root"][key]["CB"]
            if (objType == "CBNode") {
              var obj = new CBNode(this.data)
              obj.Render(div, this.CBTree["root"][key])
            } else {
              var obj = new cbSection1(this.data)

              obj.Render(div, this.CBTree["root"][key])
            }
            
        });  
    }   
}
