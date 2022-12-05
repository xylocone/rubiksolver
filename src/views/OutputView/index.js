import { useContext } from "react";

// Internal dependencies
import AppContext from "../../AppContext";
import Cube from "./Cube";

import "./index.scss";

export default function OutputView() {
  const { cubeGrid } = useContext(AppContext);

  return (
    <div className="output-view">
      <Cube cubeGrid={cubeGrid} />
    </div>
  );
}
