export default class cbCapVal{
    constructor() {
        this.AllowClasses = ["CBText", "CBInput"];
        this.DisAllowClasses = [""];
    
        this.Lod = [
          {
            First: "CBText",
            FollowedBy: "CBInput",
            Placement: "Across",
          }
        ];

        this.CBClassofKeys = [
          {
            "CB":"CBText",
            "ApplyTo":["Caption"]
          },
          {
            "CB":"CBInput",
            "ApplyTo":["Value"]
          }
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