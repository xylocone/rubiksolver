import { useState } from "react";

// Internal dependencies
import "./App.scss";
import Cube from "./Cube";
import AppContext from "./AppContext";
import CubeGrid from "./classes/CubeGrid";

export default function App() {
  const [cubeGrid, setCubeGrid] = useState(new CubeGrid());
  return (
    <AppContext.Provider
      value={{
        cubeGrid,
      }}
    >
      <Cube />
    </AppContext.Provider>
  );
}
