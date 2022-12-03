import Face from "./Face";

export default class CubeGrid {
  constructor() {
    this.faces = Array.from(Object.keys(Face).map((key) => Face[key]));
    this.grid = this.faces
      .map((face) => ({ [face]: [] }))
      .reduce((prev, curr) => Object.assign(prev, curr));

    this.initWithSolvedColors();
  }

  addColorsToFace(face, colors) {
    /* Colors are to be added to the face, left to right, from the upperleft corner to the bottomright /*/
    if (colors.constructor !== Array) colors = [colors];
    this.grid[face].push(...colors);
  }

  initWithSolvedColors() {
    const possibleColors = [
      "red",
      "green",
      "yellow",
      "orange",
      "white",
      "blue",
    ];

    this.faces.forEach((face) => {
      const randomIndex = parseInt(
        Math.floor(Math.random() * possibleColors.length),
        10
      );
      for (let i = 0; i < 6; i++)
        this.addColorsToFace(face, possibleColors[randomIndex]);
      possibleColors.splice(randomIndex, 1);
    });

    console.log(this.grid);
  }
}
