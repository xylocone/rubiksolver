import Face from "./Face";

export default class CubeGrid {
  constructor() {
    this.faces = Array.from(Object.keys(Face).map((key) => Face[key]));
    this.grid = this.faces
      .map((face) => ({ [face]: [] }))
      .reduce((prev, curr) => Object.assign(prev, curr));
  }

  applyColorsToFace(face, colors) {
    /* Colors are to be added to the face, left to right, from the upperleft corner to the bottomright */
    if (colors.constructor !== Array) colors = [colors];
    this.grid[face] = colors;
  }

  isComplete() {
    // Have all the faces been assigned their colors?
    for (const face of Object.getOwnPropertySymbols(this.grid)) {
      if (this.grid[face].length < 6) return false;
    }

    return true;
  }
}
