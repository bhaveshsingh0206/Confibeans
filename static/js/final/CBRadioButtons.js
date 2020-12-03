export default class CBRadioButtons {
    constructor() {
      this.AllowClasses = ["CBRadio", "CBText", "CBList"];
      this.DisAllowClasses = [""];
      this.Lod = [
        {
          First: "CBText",
          FollowedBy: "CBRadio",
          Placement: "Across",
        },
      ];

      this.CBClassofKeys = [
        {
          "CB":"CBRadio",
          "ApplyTo":["Value"]
        }
      ]
  
      this.Cmd = [
        // {
        //   Outer: "CBRadioButton",
        //   Nested: "CBRadioButton",
        //   Placement: "Across",
        // },
      ];
    }
  }
  