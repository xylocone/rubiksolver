import { useState, useRef, useContext } from "react";

// Class dependencies
import Face from "../../classes/Face";

// Internal dependencies
import AppContext from "../../AppContext";
import FacesList from "./FacesList";
import CaptureArea from "./CaptureArea";
import SolveButton from "./SolveButton";

import "./index.scss";

export default function InputView() {
  const order = useRef([
    Face.Front,
    Face.Right,
    Face.Top,
    Face.Left,
    Face.Down,
    Face.Back,
  ]);

  const instructions = useRef([
    "Show any face",
    "Show the face to its right",
    "Show the face on top",
    "Show the left face",
    "Show the face at the bottom",
    "Show the back face",
  ]);

  const { cubeGrid, goToNextView } = useContext(AppContext);
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);

  function updateCurrentFaceIndex() {
    if (currentFaceIndex < order.current.length)
      setCurrentFaceIndex(currentFaceIndex + 1);
  }

  function updateCubeGrid(face, colorsList) {
    cubeGrid.applyColorsToFace(face, colorsList);
  }

  return (
    <div className="input-view">
      <FacesList
        order={order.current}
        cubeGrid={cubeGrid}
        currentFaceIndex={currentFaceIndex}
        setCurrentFaceIndex={setCurrentFaceIndex}
      />
      <CaptureArea
        currentInstruction={(() => {
          const currentInstruction = instructions.current[currentFaceIndex];
          /* set the instruction to an empty string so that it does not appear again if the user manually changes the current face from the FacesList */
          instructions.current[currentFaceIndex] = "";
          return currentInstruction;
        })()}
        onCapture={(colorsList) => {
          updateCubeGrid(order.current[currentFaceIndex], colorsList);
          updateCurrentFaceIndex();
        }}
      />
      <SolveButton
        onClick={() => goToNextView()}
        disabled={!cubeGrid.isComplete()}
      />
    </div>
  );
}
