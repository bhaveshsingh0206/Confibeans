export default class cbCVSection {
    constructor() {
        this.AllowClasses = ["CBText", "CBList","cbCapVal"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBText",
            FollowedBy: "cbCapVal",
            Placement: "Down",
          },
          {
            First: "cbCapVal",
            FollowedBy: "cbCapVal",
            Placement: "Down",
          },
        ];
    
        this.Cmd = [
          {
            Outer: "",
            Nested: "",
            Placement: "",
          },
        ];
      }
}