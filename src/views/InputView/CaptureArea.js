import { useEffect, useRef } from "react";

// Internal dependencies
import "./CaptureArea.scss";

export default function CaptureArea({ onCapture }) {
  const videoElement = useRef(null);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoElement.current.srcObject = stream;
    })();
  }, []);

  function handleCapture() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const videoWidth = videoElement.current.offsetWidth;
    const videoHeight = videoElement.current.offsetHeight;

    context.drawImage(videoElement.current, 0, 0, videoWidth, videoHeight);

    const imageData = canvas.toDataURL("image/jpeg");
    onCapture(processImage(imageData));
  }

  function processImage(imageData) {
    /* This function is supposed to take in an image, apply Computer Vision algorithms on it to turn it into a 3 * 3 grid of colors */
    // For now, this is going to return a grid with colors assigned randomly
    return Array(9).fill("rebeccapurple");
  }

  return (
    <div className="capture-area">
      <video
        className="capture-area__preview"
        autoPlay={true}
        ref={videoElement}
      ></video>
      <button className="capture-area__button" onClick={() => handleCapture()}>
        Capture
      </button>
    </div>
  );
}
