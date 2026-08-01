'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';

const MODEL_PATH = '/assets/3d/shubh-bust-final.glb';

// Preload GLTF model for faster initialization
useGLTF.preload(MODEL_PATH);

/**
 * BustModel Component
 * Loads and renders the 3D GLB bust centered at origin.
 */
function BustModel() {
  const { scene } = useGLTF(MODEL_PATH);

  return <primitive object={scene} rotation={[0, Math.PI, 0]} />;
}

/**
 * LoadingFallback Component
 * Accessible loading indicator rendered during model fetch & compilation.
 */
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        aria-label="Loading 3D bust model"
        className="w-10 h-10 border-2 border-slate-700 border-t-slate-200 rounded-full animate-spin"
      />
      <span className="text-xs text-slate-400 font-medium tracking-wide">
        Loading 3D Display...
      </span>
    </div>
  );
}

/**
 * BustCanvas Component
 * Internal canvas container setup with lighting, camera, controls, and 3D scene.
 */
function BustCanvas() {
  return (
    /*
      Camera Choice Justification:
      The GLB was not scale-normalized before export, so a blind fixed camera position risks
      the camera sitting inside (or absurdly far from) the geometry depending on its raw scale.
      Drei's <Bounds fit clip observe> measures the actual rendered content and fits the camera
      to it automatically, which is robust regardless of the model's absolute scale.

      Frameloop Choice Justification:
      frameloop="demand" is sufficient: Drei's OrbitControls already calls invalidate() on every
      control change and drives its own damping tail via useFrame, so continuously rendering this
      224k-triangle model while idle would be pure wasted GPU/battery.
    */
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      className="w-full h-full"
    >
      {/* Professional Three-Point Studio Lighting (Neutral White/Soft Light Only) */}
      {/* Key Light: Main directional illumination from upper-right front */}
      <directionalLight position={[3, 4, 4]} intensity={2.2} color="#ffffff" />

      {/* Fill Light: Soft secondary illumination from upper-left front to soften shadows */}
      <directionalLight position={[-3, 2, 3]} intensity={0.8} color="#f8fafc" />

      {/* Rim / Hair Light: High-angle back light to separate subject silhouette from background */}
      <directionalLight position={[0, 4, -4]} intensity={1.2} color="#ffffff" />

      {/* Ambient Light: Soft overall base light level */}
      <ambientLight intensity={0.55} color="#f8fafc" />

      {/* Auto-fit camera to the model's actual bounding box, then allow gentle orbit */}
      <Bounds fit clip observe margin={1.05}>
        <BustModel />
      </Bounds>

      {/* Restricted Orbit Interaction: Gentle rotation left/right and slight tilt up/down */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.3} // ~78 deg tilt limit
        maxPolarAngle={Math.PI / 1.85} // ~97 deg tilt limit
        minAzimuthAngle={-Math.PI / 3.5} // ~ -51 deg horizontal rotation limit
        maxAzimuthAngle={Math.PI / 3.5}  // ~ +51 deg horizontal rotation limit
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

/**
 * BustHero Component
 * Self-contained named export rendering a 3D bust portrait display in a hero layout.
 */
export function BustHero() {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-slate-950 flex items-center justify-center overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <BustCanvas />
      </Suspense>
    </div>
  );
}
