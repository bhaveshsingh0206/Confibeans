export default class CBList {
    constructor() {
        this.AllowClasses = ["CBText", "CBInput", "cbCapVal"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "cbCapVal",
            FollowedBy: "cbCapVal",
            Placement: "Down",
          },
          {
            First: "CBRadioButton",
            FollowedBy: "CBRadioButton",
            Placement: "Across",
          }
        ];
    
        this.Cmd = [
          {
            Outer: "CBRadioButton",
            Nested: "CBRadioButton",
            Placement: "Across",
          }
        ];
      }
}