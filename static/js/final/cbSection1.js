export default class cbSection1 {
  constructor() {
    this.AllowClasses = ["CBText", "CBNode", "CBList"];
    this.DisAllowClasses = ["cbType1"];

    this.Lod = [
      {
        First: "CBText",
        FollowedBy: "CBText",
        Placement: "Across",
      },
    ];

    this.Cmd = [
      {
        Outer: "cbSection1",
        Nested: "CBNode",
        Placement: "Indented",
      },
    ];
  }
}
