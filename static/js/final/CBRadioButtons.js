export default class CBRadioButtons {
    constructor() {
      this.AllowClasses = ["CBRadio", "CBText", "CBList"];
      this.DisAllowClasses = [""];
      this.Lod = [
        {
          First: "",
          FollowedBy: "CBText",
          Placement: "Across",
        },
        {
          First: "CBRadio",
          FollowedBy: "CBRadio",
          Placement: "Across",
        },
        {
          First: "CBText",
          FollowedBy: "CBRadio",
          Placement: "Across",
        }
      ];

      this.CBClassofKeys = [
        {
          "CB":"CBRadio",
          "ApplyTo":["Type1","Type2","Type3"]
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
  