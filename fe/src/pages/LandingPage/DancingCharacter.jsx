import { OrbitControls } from "@react-three/drei";
import React from "react";
import { RumbaDance } from "./RumbaDance";

function DancingCharacter() {
  return (
    <>
      {/* Orbit Controls to interact with the scene */}
      <OrbitControls />

      {/* Ambient light for general illumination */}
      <ambientLight intensity={2} />

      {/* Directional light for shadows */}
      <directionalLight
        position={[-5, 5, 5]} // Positioned above the character
        castShadow // Enable casting shadows
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        intensity={1}
      />

      {/* Group to hold the character, adjusting position */}
      <group position={[0, -1, 0]} castShadow receiveShadow>
        <RumbaDance castShadow />
      </group>

      {/* Ground Plane */}
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]} // Rotates the plane to lie flat
        position={[0, -1, 0]} // Position it below the character
        receiveShadow // Enable the plane to receive shadows
      >
        <planeGeometry args={[10, 10]} /> {/* Updated to `planeGeometry` */}
        <shadowMaterial transparent opacity={0.3} />{" "}
        {/* Adjust shadow visibility */}
      </mesh>
    </>
  );
}

export default DancingCharacter;
