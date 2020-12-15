export default class CBPanels {
    constructor() {
        this.AllowClasses = ["All"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBText",
            FollowedBy: "CBText",
            Placement: "Across",
          }

        ];

        this.CBClassofKeys = [
          {
            "CB":"",
            "ApplyTo":[""]
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