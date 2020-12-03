export default class CBDropdown {
    constructor() {
        this.AllowClasses = ["CBDropdowns", "CBText"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBText",
            FollowedBy: "CBDropdowns",
            Placement: "Across",
          }

        ];

        this.CBClassofKeys = [
          {
            "CB":"CBDropdowns",
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