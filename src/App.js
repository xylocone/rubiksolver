import { useState } from "react";

// Class dependencies
import View from "./classes/View";
import CubeGrid from "./classes/CubeGrid";

// Internal dependencies
import AppContext from "./AppContext";
import InputView from "./views/InputView";
import SolvingView from "./views/SolvingView";
import OutputView from "./views/OutputView";

import "./App.scss";

export default function App() {
  const [currentView, setCurrentView] = useState(View.InputView);
  const [cubeGrid, setCubeGrid] = useState(new CubeGrid());

  function goToNextView() {
    switch (currentView) {
      case View.InputView:
        setCurrentView(View.SolvingView);
        break;
      case View.SolvingView:
        setCurrentView(View.OutputView);
        break;
      default:
        throw new Error("Cannot go to next view: no next view exists");
    }
  }
  return (
    <AppContext.Provider
      value={{
        cubeGrid,
        setCubeGrid,
        goToNextView,
      }}
    >
      <main className="app">
        {currentView === View.InputView && <InputView />}
        {currentView === View.SolvingView && <SolvingView />}
        {currentView === View.OutputView && <OutputView />}
      </main>
    </AppContext.Provider>
  );
}
