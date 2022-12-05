import { useContext } from "react";

// Internal dependencies
import AppContext from "../../AppContext";

export default function SolvingView() {
  const { goToNextView } = useContext(AppContext);
  return (
    <div className="solving-view">
      <h1>This is the Solving View</h1>
      <button onClick={() => goToNextView()}>Next</button>
    </div>
  );
}
