var data = {
  DataElement1: {
    DataElement11: "DE11-V1",
    DataElement12: "DE12-V2",
  },

  DataElement2: {
    DataElement21: "DE11-V1",
    DataElement22: "DE12-V2",
  },
  DataElement3: {
    DataElement31: "DE11-V1",
    DataElement32: "DE12-V2",
    DataElement23: {
      DataElement231: "DE11-V1",
      DataElement232: {
        DataElement2321: "DE11-V1",
        DataElement2322: "DE11-V2",
      },
    },
  },
};

var a = {
  root: {},
};

function newNode(prop, type, name) {
  var node = {};
  node["Path"] = prop;
  if (type == "Object") {
    node["CB"] = "CBNode";
  } else {
    node["CB"] = "CBText";
  }
  return node;
}

function setObj(obj, query, name, prop, type) {
  // console.log("ENTERED");
  // console.log(node);
  for (var key in obj) {
    var value = obj[key];

    if (key === query) {
      // console.log(obj[key]);
      node = newNode(prop, type);
      obj[key][name] = node;
    }

    if (typeof value === "object") {
      setObj(value, query, name, prop, type);
    }
  }
}

var z = 1;
function restructure(obj, newName) {
  var y = 1;
  var Name = null;
  for (var prop in obj) {
    // console.log(prop);
    if (typeof obj[prop] == "object") {
      // object
      if (Name == null || Name == "Node" + (z - 1)) {
        Name = newName;
        // console.log(z);
        Name = Name + z;
        type = "Object";
        node = newNode(prop, type);
        // console.log(prop);
        a.root[Name] = node;
        console.log(prop);
        restructure(obj[prop], Name);
        console.log("Looop");
        z++;
        y++;
      } else {
        //Name: node1 NN: Node
        Name = newName + y;
        type = "Object";
        setObj(a, newName, Name, prop, type);
        restructure(obj[prop], Name);
        // console.log("Looop");
        y++;
      }
    } else {
      //leaf nodes
      Name = newName + y;
      type = "";
      // console.log(a);
      // console.log(newName);
      // console.log(Name);

      setObj(a, newName, Name, prop, type);
      y++;
    }
  }
}

restructure(data, "Node");
console.log(a);
console.log(a.root.Node3.Node33);