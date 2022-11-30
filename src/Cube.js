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

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

    let { scene, camera, renderer } = elements.current;

    camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );

    camera.position.z = 1;

    renderer.setSize(containerWidth, containerHeight);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const box = new BoxGeometry(0.1, 0.1, 0.1);
          const material = new MeshNormalMaterial();
          const mesh = new Mesh(box, material);
          mesh.position.set(x * 0.1, y * 0.1, z * 0.1);

          scene.add(mesh);
        }
      }
    }

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.render(scene, camera);

    elements.current.scene = scene;
    elements.current.renderer = renderer;
    elements.current.camera = camera;
    elements.current.controls = controls;
  };

  const assignMeshesToTurnGroup = (face) => {
    const turnGroup = new Group();

    const { scene } = elements.current;
    const cubies = scene.children;

    const mapping = {
      T: { axis: "y", coefficient: 1 },
      D: { axis: "y", coefficient: -1 },
      F: { axis: "z", coefficient: 1 },
      B: { axis: "z", coefficient: -1 },
      L: { axis: "x", coefficient: -1 },
      R: { axis: "x", coefficient: 1 },
    };

    const cubiesToTurn = [];

    for (let i = 0; i < cubies.length; i++) {
      const cubie = cubies[i];

      if (
        cubie.position[mapping[face].axis] ===
        0.1 * mapping[face].coefficient
      ) {
        cubiesToTurn.push(cubies[i]);
      }
    }

    cubiesToTurn.forEach((cubieToTurn) => turnGroup.add(cubieToTurn));

    return turnGroup;
  };

  const executeStep = (step) => {
    return new Promise((resolve) => {
      const face = step[0];
      const rotationAngle = ((parseInt(step[1], 10) || 1) * 90 * Math.PI) / 180;

      let rotationAxis;

      let turnGroup = assignMeshesToTurnGroup(face);

      if (face === "T" || face === "D") rotationAxis = "y";
      if (face === "L" || face === "R") rotationAxis = "x";
      if (face === "F" || face === "B") rotationAxis = "z";

      const { scene, camera, renderer } = elements.current;

      scene.add(turnGroup);

      let counter = 0;
      renderer.setAnimationLoop(() => {
        turnGroup.rotation[rotationAxis] += rotationAngle / 60;
        renderer.render(scene, camera);
        counter++;

        if (counter === 60) {
          renderer.setAnimationLoop(null);

          const cubiesToRemove = [];

          for (let i = 0; i < turnGroup.children.length; i++) {
            cubiesToRemove.push(turnGroup.children[i]);
          }

          cubiesToRemove.forEach((cubieToRemove) => {
            turnGroup.remove(cubieToRemove);
            scene.add(cubieToRemove);
          });

          turnGroup.parent.remove(turnGroup);
          turnGroup = null;

          renderer.render(scene, camera);
          resolve();
        }
      });
    });
  };

  const executeSteps = async (steps) => {
    steps = steps.split(" ");
    for (let i = 0; i < steps.length; i++) {
      console.log("Executing", steps[i]);
      await executeStep(steps[i]);
      console.log("Executed", steps[i]);
    }
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
      onClick={async () => await executeSteps("T1 F1 L2 F2 F1 D1 T2")}
    ></div>
  );
}
