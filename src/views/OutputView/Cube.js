import { useRef, useEffect, useContext } from "react";
import {
  WebGLRenderer,
  PerspectiveCamera,
  BoxGeometry,
  MeshLambertMaterial,
  Scene,
  Mesh,
  AmbientLight,
  Group,
} from "three";

// Class dependencies
import Face from "../../classes/Face";
import Axis from "../../classes/Axis";

// Internal dependencies
import "./Cube.scss";

export default function Cube({ cubeGrid }) {
  const containerElement = useRef(null);
  const elements = useRef({
    scene: new Scene(),
    camera: null,
    renderer: new WebGLRenderer({ antialias: true }),
    light: new AmbientLight(0xffffff, 1),
  });

  /* 3D control functions */
  const initScene = () => {
    const container = containerElement.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    let { scene, camera, light, renderer } = elements.current;

    scene.add(light);

    camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      10
    );

    camera.position.z = 1;
    camera.position.x = 0.5;
    camera.position.y = 0.5;
    camera.lookAt(scene.position);

    renderer.setSize(containerWidth, containerHeight);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const box = new BoxGeometry(0.1, 0.1, 0.1);
          const material = new MeshLambertMaterial({
            vertexColors: true,
          });
          const mesh = new Mesh(box, material);
          mesh.position.set(x * 0.1, y * 0.1, z * 0.1);

          const faceAxes = [];

          if (x === -1) faceAxes.push(new Axis(Axis.NegativeX));
          else if (x === 1) faceAxes.push(new Axis(Axis.PositiveX));
          if (y === -1) faceAxes.push(new Axis(Axis.NegativeY));
          else if (y === 1) faceAxes.push(new Axis(Axis.PositiveY));
          if (z === -1) faceAxes.push(new Axis(Axis.NegativeZ));
          else if (z === 1) faceAxes.push(new Axis(Axis.PositiveZ));

          faceAxes.forEach((axis) => {
            const face = new Face(Face.getFaceTypeFromAxis(axis), mesh);
            face.applyColor(cubeGrid.grid[face.faceType][0]);
          });

          scene.add(mesh);
        }
      }
    }

    container.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    window.addEventListener("resize", () => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(containerWidth, containerHeight);

      renderer.render(scene, camera);
    });

    elements.current.scene = scene;
    elements.current.renderer = renderer;
    elements.current.camera = camera;
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
        almostEqual(
          cubie.position[mapping[face].axis],
          0.1 * mapping[face].coefficient
        )
      ) {
        cubiesToTurn.push(cubies[i]);
      }
    }

    cubiesToTurn.forEach((cubieToTurn) => {
      turnGroup.add(cubieToTurn);
    });

    return turnGroup;
  };

  const executeStep = (step) => {
    return new Promise((resolve) => {
      const face = step[0];
      const rotationAngle =
        -((parseInt(step[1], 10) || 1) * 90 * Math.PI) / 180;

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
            scene.attach(cubieToRemove);
          });

          turnGroup.removeFromParent();
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
      await executeStep(steps[i]);
    }
  };

  /* end of control functions */

  useEffect(() => {
    // onComponentDidMount()
    initScene();
  }, []);

  return (
    <div
      className="cube"
      ref={containerElement}
      onClick={async () => await executeSteps("F1 T1 L2 F2 T1 D2 B1 T2 F2")}
    ></div>
  );
}

function almostEqual(float1, float2) {
  return Math.abs(float1 - float2) < 0.05;
}
