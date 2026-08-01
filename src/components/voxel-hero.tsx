'use client';

import React, { useRef, useEffect, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import CustomShaderMaterial from 'three-custom-shader-material';
import * as THREE from 'three';
import gridData from '@/data/voxel-grid.json';

interface Cell {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

interface VoxelGridData {
  cols: number;
  rows: number;
  cells: Cell[];
}

const { cols, rows, cells } = gridData as VoxelGridData;

const vertexShader = /* glsl */ `
  attribute vec2 aGridPos;
  uniform vec2 uWaveOrigin;
  varying float vWaveArrivalTime;

  void main() {
    float dist = distance(aGridPos, uWaveOrigin);
    vWaveArrivalTime = dist * 0.055;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uProgress;
  varying float vWaveArrivalTime;

  void main() {
    float bandWidth = 0.35;
    float waveDelta = uProgress - vWaveArrivalTime;
    
    float pulse = smoothstep(-bandWidth, 0.0, waveDelta) * (1.0 - smoothstep(0.0, bandWidth, waveDelta));
    vec3 glowColor = vec3(0.302, 0.651, 1.0);
    
    csm_Emissive = glowColor * pulse * 4.0;
  }
`;

interface WaveUniformMaterial {
  uniforms: { uProgress: { value: number } };
}

function VoxelPortrait({ registerTrigger }: { registerTrigger: (fn: () => void) => void }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const geometryRef = useRef<THREE.BoxGeometry>(null!);
  const materialRef = useRef<WaveUniformMaterial | null>(null);
  const waveUniforms = () => materialRef.current;
  const { invalidate } = useThree();

  const isAnimating = useRef(false);
  const progress = useRef(-1.0);
  const animationStart = useRef(0);

  const uniforms = useMemo(
    () => ({
      uWaveOrigin: { value: new THREE.Vector2(cols / 2, rows / 2) },
      uProgress: { value: -1.0 },
    }),
    []
  );

  const triggerWave = useCallback(() => {
    progress.current = 0.0;
    animationStart.current = performance.now();
    isAnimating.current = true;
    const material = waveUniforms();
    if (material?.uniforms?.uProgress) {
      material.uniforms.uProgress.value = 0.0;
    }
    invalidate();
  }, [invalidate]);

  useEffect(() => {
    registerTrigger(triggerWave);
  }, [registerTrigger, triggerWave]);

  useEffect(() => {
    if (!meshRef.current) return;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    const gridPosArray = new Float32Array(cells.length * 2);

    cells.forEach((cell, i) => {
      const x = cell.x - cols / 2;
      const y = cell.y - rows / 2;
      matrix.setPosition(x, y, 0);
      meshRef.current.setMatrixAt(i, matrix);

      color.setRGB(cell.r / 255, cell.g / 255, cell.b / 255, THREE.SRGBColorSpace);
      meshRef.current.setColorAt(i, color);

      gridPosArray[i * 2] = cell.x;
      gridPosArray[i * 2 + 1] = cell.y;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        'aGridPos',
        new THREE.InstancedBufferAttribute(gridPosArray, 2)
      );
    }

    meshRef.current.computeBoundingSphere();
    invalidate();
  }, [invalidate]);

  useFrame(() => {
    if (!isAnimating.current) return;

    const elapsedSeconds = (performance.now() - animationStart.current) / 1000;
    progress.current = elapsedSeconds * 1.7;

    const material = waveUniforms();
    if (material?.uniforms?.uProgress) {
      material.uniforms.uProgress.value = progress.current;
    }

    if (progress.current >= 2.6) {
      isAnimating.current = false;
    }
    invalidate();
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, cells.length]}
    >
      <boxGeometry ref={geometryRef} args={[0.85, 0.85, 0.85]} />
      <CustomShaderMaterial
        ref={(instance) => {
          materialRef.current = instance as unknown as WaveUniformMaterial;
        }}
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        roughness={0.4}
        metalness={0.1}
        emissive={new THREE.Color(0x000000)}
      />
    </instancedMesh>
  );
}

const subscribe = () => () => {};

export function VoxelHero() {
  const triggerRef = useRef<(() => void) | null>(null);
  const registerTrigger = useCallback((fn: () => void) => {
    triggerRef.current = fn;
  }, []);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const handlePointerEnter = () => {
    if (triggerRef.current) {
      triggerRef.current();
    }
  };

  if (!mounted) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[600px] md:h-[700px] bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
      onPointerEnter={handlePointerEnter}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 55], fov: 65 }}
        frameloop="demand"
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[15, 25, 35]} intensity={1.4} />
        <directionalLight position={[-15, -15, 20]} intensity={0.5} />
        
        <VoxelPortrait registerTrigger={registerTrigger} />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.25}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default VoxelHero;
