export default class Axis {
  static PositiveX = Symbol("PositiveX");
  static NegativeX = Symbol("NegativeX");
  static PositiveY = Symbol("PositiveY");
  static NegativeY = Symbol("NegativeY");
  static PositiveZ = Symbol("PositiveZ");
  static NegativeZ = Symbol("NegativeZ");

  constructor(axisType) {
    this.axisType = axisType;
  }
}
