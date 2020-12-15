export default class CBPanel {
    constructor() {
        this.AllowClasses = ["All"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBList",
            FollowedBy: "",
            Placement: "Toggle",
          }

        ];

        this.CBClassofKeys = [
          {
            "CB":"CBPanelTitle",
            "ApplyTo":["Aitel"]
          },
        ]
    
        this.Cmd = [
          {
            Outer: "CBPanel",
            Nested: "CBList",
            Placement: "Indented",
          },
        ];
      }
}