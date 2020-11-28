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
            First: "CBDate",
            FollowedBy: "",
            Placement: "Down",
          }

        ];
    
        this.Cmd = [
          {
            Outer: "cbCVSection",
            Nested: "cbCVSection",
            Placement: "Indented",
          },
        ];
      }
}