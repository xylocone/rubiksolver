import { useRef, useEffect } from "react";

import {
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshNormalMaterial,
  Scene,
  Mesh,
  Group,
} from "three";

// Internal dependencies
import "./Cube.scss";

export default function Cube() {
  const containerElement = useRef(null);
  const elements = useRef({
    scene: new Scene(),
    camera: null,
    renderer: new WebGLRenderer({ antialias: true }),
  });

  /* 3D control functions */
  const initScene = () => {
    const container = containerElement.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    elements.current.camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );

    elements.current.camera.position.z = 1;

    elements.current.renderer.setSize(containerWidth, containerHeight);

    elements.current.group = new Group();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const box = new BoxGeometry(0.1, 0.1, 0.1);
          const material = new MeshNormalMaterial();
          const mesh = new Mesh(box, material);
          mesh.position.set(i * 0.1, j * 0.1, k * 0.1);

          elements.current.group.add(mesh);
        }
      }
    }

    elements.current.scene.add(elements.current.group);

    container.appendChild(elements.current.renderer.domElement);
    elements.current.renderer.render(
      elements.current.scene,
      elements.current.camera
    );
  };

  const animateRotation = () => {
    const { scene, camera, renderer } = elements.current;

    const animation = (time) => {
      for (let groups of scene.children) {
        for (let mesh of groups.children) {
          mesh.rotation.x = time / 1000;
          mesh.rotation.y = time / 1000;
        }
      }

      elements.current.group.rotation.x = time / 500;
      elements.current.group.rotation.y = time / 500;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animation);
  };

  /* end of control functions */

  useEffect(() => {
    // onComponentDidMount()
    initScene();
  }, []);

  return (
    <div
      className="app"
      ref={containerElement}
      onClick={() => animateRotation()}
    ></div>
  );
}
