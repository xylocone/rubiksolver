import { useEffect, useRef } from "react";

import Cube from "cubejs";

// Icons
import { AiFillCamera } from "react-icons/ai";
import Color from "../../classes/Color";

// Internal dependencies
import "./CaptureArea.scss";

export default function CaptureArea({ currentInstruction, onCapture }) {
  const videoElement = useRef(null);

  const cubeOrder = useRef([...Cube.random().asString()]); // only for testing

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
    const colors = [];

    for (let i = 0; i < 9; i++) {
      const alias = cubeOrder.current.shift();

      colors.push(new Color(Color.fromAlias(alias)));
    }

    console.log(colors.map((color) => color.alias).join(""));

    return colors;
  }

  return (
    <div className="capture-area">
      {currentInstruction && (
        <p className="capture-area__instruction">{currentInstruction}</p>
      )}
      <video
        className="capture-area__preview"
        autoPlay={true}
        ref={videoElement}
      ></video>
      <button className="capture-area__button" onClick={() => handleCapture()}>
        <AiFillCamera />
      </button>
    </div>
  );
}
