export default class cbDDSection {
    constructor() {
        this.AllowClasses = ["CBText", "CBList","CBDropdown"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBText",
            FollowedBy: "CBDropdown",
            Placement: "Across",
          },
          {
            First: "",
            FollowedBy: "",
            Placement: "",
          }

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