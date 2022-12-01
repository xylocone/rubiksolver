import { useState } from "react";

// Internal dependencies
import "./App.scss";
import Cube from "./Cube";
import AppContext from "./AppContext";

export default function App() {
  const [cubeGrid, setCubeGrid] = useState(null);
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
