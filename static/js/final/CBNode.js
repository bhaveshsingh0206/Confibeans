export default class CBNode {
  constructor() {
    this.AllowClasses = ["CBText", "CBList"];
    this.DisAllowClasses = ["cbType1"];

    this.Lod = [
      {
        First: "",
        FollowedBy: "CBText",
        Placement: "Center",
      },
      {
        First: "CBText",
        FollowedBy: "CBDate",
        Placement: "Across",
      },
      {
        First: "CBText",
        FollowedBy: "CBText",
        Placement: "Across",
      },
    ];

    this.Cmd = [
      {
        Outer: "CBNode",
        Nested: "CBNode",
        Placement: "Indented",
      },
    ];
  }
}
