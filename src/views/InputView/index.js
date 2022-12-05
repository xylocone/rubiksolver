import { useContext } from "react";

// Internal dependencies
import AppContext from "../../AppContext";

import "./index.scss";

export default function InputView() {
  const { cubeGrid, setCubeGrid, goToNextView } = useContext(AppContext);

  return (
    <div className="input-view">
      <h1>This is the InputView</h1>
      <button onClick={() => goToNextView()}>Next</button>
    </div>
  );
}
