// Internal dependencies
import "./Controls.scss";

export default function Controls({
  isPlaying,
  updateIsPlaying,
  currentStepIndex,
  updateCurrentStepIndex,
}) {
  return (
    <div className="controls">
      <div className="controls__buttons-wrapper">
        <button className="controls__button">First</button>
        <button className="controls__button">Prev</button>
        <button className="controls__button controls__play-button">Play</button>
        <button className="controls__button">Next</button>
        <button className="controls__button">Last</button>
      </div>
    </div>
  );
}
