import { useState } from "react";

// Internal dependencies
import "./SolutionDisplay.scss";

export default function SolutionDisplay({ solution }) {
  const [isCopied, setIsCopied] = useState(false);

  const solutionString = solution.join(" ");

  function handleCopying() {
    console.log("Copied");

    setIsCopied(true);

    // make the copy button function again after some delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <div className="solution-display">
      <p className="solution-display__label">Solution</p>
      <div className="solution-display__solution">
        <p className="solution-display__steps">{solutionString}</p>
        <button
          className="solution-display__copy-button"
          onClick={() => handleCopying()}
          disabled={isCopied}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
