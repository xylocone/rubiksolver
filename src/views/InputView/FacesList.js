// Internal dependencies
import "./FacesList.scss";

export default function FacesList({
  cubeGrid,
  order,
  setCurrentFaceIndex,
  currentFaceIndex,
}) {
  const grid = cubeGrid.grid;

  return (
    <div className="faces-list">
      {order.map(
        (faceKey, index) =>
          grid[faceKey] && (
            <div
              key={index}
              className={`faces-list__face ${
                currentFaceIndex === index ? "selected" : ""
              }`}
              onClick={() => setCurrentFaceIndex(index)}
            >
              {grid[faceKey].map((cell, index) => (
                <div
                  key={index}
                  className="faces-list__cell"
                  style={{ "--cell-color": cell.hex }}
                ></div>
              ))}
            </div>
          )
      )}
    </div>
  );
}
