import { useRef, useEffect } from "react";

import {
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshNormalMaterial,
  Scene,
  Mesh,
} from "three";

// Internal dependencies
import "./Cube.scss";

export default function Cube() {
  const containerElement = useRef(null);

  /* 3D control functions */
  const initScene = () => {
    const container = containerElement.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );
    camera.position.z = 1;

    const geometry = new BoxGeometry(0.2, 0.2, 0.2);
    const material = new MeshNormalMaterial();

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);

    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  };

  /* end of control functions */

  useEffect(() => {
    // onComponentDidMount()
    initScene();
  }, []);

  return <div className="app" ref={containerElement}></div>;
}
