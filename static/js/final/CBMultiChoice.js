export default class CBMultiChoice {
    constructor() {
        this.AllowClasses = ["CBText", "CBCheckBoxes"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBText",
            FollowedBy: "CBCheckBoxes",
            Placement: "Across",
          }

        ];

        this.CBClassofKeys = [
          {
            "CB":"CBCheckBoxes",
            "ApplyTo":["Value"]
          },
        ]
    
        this.Cmd = [
          {
            Outer: "",
            Nested: "",
            Placement: "",
          },
        ];
      }
}