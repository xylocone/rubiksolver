import { useState, useContext } from "react";

// Internal dependencies
import AppContext from "../../AppContext";
import SolutionDisplay from "./SolutionDisplay";
import CubeCanvas from "./CubeCanvas";
import Controls from "./Controls";

import "./index.scss";

export default function OutputView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { cubeGrid, solution } = useContext(AppContext);

  return (
    <div className="output-view">
      <SolutionDisplay solution={solution} />
      <CubeCanvas
        cubeGrid={cubeGrid}
        isPlaying={isPlaying}
        solution={solution}
      />
      <Controls
        isPlaying={isPlaying}
        updateIsPlaying={setIsPlaying}
        currentStepIndex={currentStepIndex}
        updateCurrentStepIndex={setCurrentStepIndex}
      />
    </div>
  );
}
