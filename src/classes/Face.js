import { Float32BufferAttribute, Color } from "three";

// Internal dependencies
import Axis from "./Axis";

export default class Face {
  // the order of the static properties declared below is meaningful
  // while enumerating all possible faces, the order in which the properties are defined determines the order they will be accessible in while using Object.keys()
  // computeVertexRange() uses Object.keys(Face) to dynamically generate the vertex range
  // perhaps the dependence on order of keys here should be eliminated using conditional constructs in computeVertexRange()
  static Right = Symbol("Right");
  static Left = Symbol("Left");
  static Top = Symbol("Top");
  static Down = Symbol("Down");
  static Front = Symbol("Front");
  static Back = Symbol("Back");

  constructor(faceType, mesh) {
    this.faceType = faceType;
    mesh.geometry = mesh.geometry.toNonIndexed();
    this.geometry = mesh.geometry;

    const vertexRange = this.computeVertexRange();

    this.vertexIndicesStart = vertexRange[0];
    this.vertexIndicesEnd = vertexRange[1];
  }

  computeVertexRange() {
    const faces = Object.keys(Face);
    for (let i = 0; i < faces.length; i++) {
      // every "square" face is made up of 2 "triangle" faces, which equals 6 vertices
      // each vertex is composed of three color values: r, g and b
      // thus, a square corresponds to 6 * 3 = 18 contiguous values
      if (this.faceType === Face[faces[i]])
        return [i * 3 * 6, i * 3 * 6 + 3 * 6];
    }

    return null;
  }

  static getFaceTypeFromAxis(axis) {
    switch (axis.axisType) {
      case Axis.PositiveY:
        return Face.Top;
      case Axis.NegativeY:
        return Face.Down;
      case Axis.PositiveX:
        return Face.Right;
      case Axis.NegativeX:
        return Face.Left;
      case Axis.PositiveZ:
        return Face.Front;
      case Axis.NegativeZ:
        return Face.Back;
      default:
        return null;
    }
  }

  applyColor(color) {
    color = color.hex;

    const colorAttributeArray = Array.from(
      this.geometry.getAttribute("color")?.array || new Array(3 * 6 * 6).fill(0)
    );

    let colorHolder = new Color(color);
    let colors = [];

    for (let j = 0; j < 6; j++)
      colors.push(colorHolder.r, colorHolder.g, colorHolder.b);

    colors = [
      ...colorAttributeArray.slice(0, this.vertexIndicesStart),
      ...colors,
      ...colorAttributeArray.slice(
        this.vertexIndicesEnd,
        colorAttributeArray.length
      ),
    ];

    this.geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  }
}
