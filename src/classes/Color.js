export default class Color {
  static Red = Symbol("Red");
  static Yellow = Symbol("Yellow");
  static Orange = Symbol("Orange");
  static Green = Symbol("Green");
  static Blue = Symbol("Blue");
  static White = Symbol("White");

  constructor(color) {
    this.color = color;
    this.alias = this.getAlias();
    this.hex = this.getHex();
  }

  getHex() {
    switch (this.color) {
      case Color.Red:
        return "#ff0000";
      case Color.Yellow:
        return "#ffff00";
      case Color.Orange:
        return "#ffa500";
      case Color.Green:
        return "#00ff00";
      case Color.Blue:
        return "#0000ff";
      case Color.White:
        return "#ffffff";
      default:
        return;
    }
  }

  getAlias() {
    switch (this.color) {
      case Color.Red:
        return "U";
      case Color.Yellow:
        return "F";
      case Color.Orange:
        return "B";
      case Color.Green:
        return "D";
      case Color.Blue:
        return "L";
      case Color.White:
        return "R";
      default:
        return;
    }
  }

  static fromAlias(alias) {
    switch (alias) {
      case "U":
        return Color.Red;
      case "F":
        return Color.Yellow;
      case "B":
        return Color.Orange;
      case "D":
        return Color.Green;
      case "L":
        return Color.Blue;
      case "R":
        return Color.White;
      default:
        return;
    }
  }
}
