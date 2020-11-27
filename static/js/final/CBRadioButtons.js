export default class CBRadioButtons {
    constructor() {
      this.AllowClasses = ["CBRadio", "CBText", "CBList"];
      this.DisAllowClasses = [""];
  
      this.Lod = [
        {
          First: "CBText",
          FollowedBy: "CBList",
          Placement: "Across",
        },
      ];
  
      this.Cmd = [
        {
          Outer: "CBRadioButton",
          Nested: "CBRadioButton",
          Placement: "Across",
        },
      ];
    }
  }
  