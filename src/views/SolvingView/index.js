import { useContext, useEffect } from "react";
import Cube from "cubejs";

// Internal dependencies
import Face from "../../classes/Face";
import AppContext from "../../AppContext";

import "./index.scss";

export default function SolvingView() {
  const { setSolution, goToNextView, cubeGrid } = useContext(AppContext);

  function getCubeJSString() {
    let result = "";

    console.log(cubeGrid.grid);
    console.log(Object.getOwnPropertySymbols(cubeGrid.grid));

    const order = [
      Face.Front,
      Face.Right,
      Face.Top,
      Face.Left,
      Face.Down,
      Face.Back,
    ];

    for (const face of order) {
      result += cubeGrid.grid[face].map((color) => color.alias).join("");
    }

    return result;
  }

  function solveCube() {
    console.log(getCubeJSString());
    const cube = Cube.fromString(getCubeJSString());
    Cube.initSolver();

    setSolution(cube.solve().replace(/U/g, "T").split(" "));

    goToNextView();
  }

  useEffect(() => {
    setTimeout(() => solveCube(), 1);
  });

  return (
    <div className="solving-view">
      <div className="solving-view__spinner">
        <div className="solving-view__spinner__circle"></div>
        <p className="solving-view__spinner__text">
          Calculating the solution...
        </p>
      </div>
    </div>
  );
}
