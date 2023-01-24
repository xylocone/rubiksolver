// Internal dependencies
import "./SolveButton.scss";

export default function SolveButton({ onClick, disabled }) {
  return (
    <div className="solve-button-container">
      <button
        className="solve-button"
        onClick={() => onClick()}
        disabled={disabled}
      >
        Solve
      </button>
    </div>
  );
}
