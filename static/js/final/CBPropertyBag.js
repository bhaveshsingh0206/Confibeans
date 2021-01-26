export default class CBPropertyBag {
  constructor() {
    this.AllowClasses = ["All"];
    this.DisAllowClasses = [""];

    this.Lod = [
      {
        First: "",
        FollowedBy: "",
        Placement: "",
      },
      {
        First: "",
        FollowedBy: "",
        Placement: "",
      },
    ];

    this.CBClassofKeys = [
      {
        CB: "",
        ApplyTo: [""],
      },
    ];

    this.Cmd = [
      {
        Outer: "CBPropertyBag",
        Nested: "cbCapVal",
        Placement: "None",
      },
    ];
  }
}
