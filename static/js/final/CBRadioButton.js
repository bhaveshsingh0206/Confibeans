export default class CBRadioButton {
    constructor() {
      this.AllowClasses = ["CBRadio"];
      this.DisAllowClasses = [""];
  
      this.Lod = [
        {
          First: "",
          FollowedBy: "CBText",
          Placement: "Center",
        },
        {
          First: "CBText",
          FollowedBy: "CBDate",
          Placement: "Across",
        },
        {
          First: "CBText",
          FollowedBy: "CBText",
          Placement: "Across",
        },
      ];
  
      this.Cmd = [
        {
          Outer: "CBNode",
          Nested: "CBNode",
          Placement: "Indented",
        },
      ];
    }
  }
  