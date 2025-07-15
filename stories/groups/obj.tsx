// obj.tsx
import React, { useState, useCallback } from 'react';
import Mousetrap from 'mousetrap';

// standard-view
import { View3D, OBJ, AmbientLight, Sphere, SpotLight, Group } from '../../src';
import { Ground } from '../utils/common';
import { DEFAULT_NORMAL } from '../../src/utils/constants';
import * as THREE from 'three';

function OBJComponent({ autoRotate, ornamentProps }: any): React.ReactNode {
  // Ornament
  const Ornament = useCallback(
    function Ornament(props: any): React.ReactNode {
      return (
        <Sphere
          materialType="standard"
          roughness={0.2}
          metalness={0.8}
          view3DEnvMap
          {...ornamentProps}
          {...props}
        />
      );
    },
    [ornamentProps]
  );

  return (
    <View3D
      camera={{
        fov: 45,
        position: [0, 0, 20],
        target: [0, 6.5, 0],
        up: [0, 1, 0],
      }}
      orbitControls
      style={{ height: 'stretch', width: 'stretch', minHeight: '80vh' }}
      controls={{ autoRotate, maxPolarAngle: Math.PI * 0.5 }}
      gl={{ outputEncoding: THREE.SRGBColorSpace }}
      backgroundEquirectangularTextureURL="backgrounds/snow-mountains2.jpg"
    >
      {/* Ground */}
      <Ground color="white" materialType="phong" />

      {/* Lights */}
      <AmbientLight intensity={0.3} />
      <SpotLight
        position={[-10, 20, 15]}
        intensity={0.7}
        decay={0.3}
        angle={Math.PI * 0.8}
        penumbra={0.8}
        castShadow
      />

      {/* OBJ */}
      <Group
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
        normal={DEFAULT_NORMAL}
        roll={0}
      >
        <OBJ
          position={[0, 6.8, 0]}
          scale={[0.2, 0.2, 0.2]}
          rotation={[0, Math.PI * 0.5, 0]}
          normal={DEFAULT_NORMAL}
          roll={0}
          castShadow={true}
          visible={true}
          objPath="/obj-mtl/santa-hat/"
          objURL="santa-hat.obj"
          mtlPath="/obj-mtl/santa-hat/"
          mtlURL="santa-hat.mtl"
        />
        <OBJ
          position={[0, -0.9, 0]}
          scale={[0.3, 0.3, 0.3]}
          rotation={[0, 0, 0]}
          normal={DEFAULT_NORMAL}
          roll={0}
          castShadow={true}
          visible={true}
          objPath="/obj-mtl/christmas-tree/"
          objURL="christmas-tree.obj"
          mtlPath="/obj-mtl/christmas-tree/"
          mtlURL="christmas-tree.mtl"
        />
        {/* Ornaments */}
        <Ornament position={[-1.1, 5.5, 0]} color="white" />
        <Ornament position={[1.5, 5, 0]} color="red" />
        <Ornament position={[-1, 4.3, 1.3]} color="gold" />
        <Ornament
          position={[0, 3, -2]}
          color="white"
          textureURL="textures/ornament2.png"
          roughness={0.2}
          metalness={0.3}
        />
        <Ornament position={[0, 3, 2]} color="blue" />
        <Ornament position={[-1.9, 2.6, -1]} color="green" />
        <Ornament position={[2.3, 2.5, 0]} color="green" />
        <Ornament
          position={[-1.8, 2, 1.8]}
          color="white"
          textureURL="textures/ornament.png"
          roughness={0.2}
          metalness={0.3}
        />
        <Ornament position={[-2, 1, -2]} color="red" />
        <Ornament position={[2.2, 0.8, 2]} color="white" />
        <Ornament position={[2.2, 0.9, -1.8]} color="cyan" />
      </Group>
    </View3D>
  );
}

export default {
  title: 'Groups/OBJ',
  parameters: {
    docs: {
      description: {
        component: 'OBJ model loading with materials and textures',
      },
    },
  },
  argTypes: {
    autoRotate: {
      control: { type: 'boolean' },
      description: 'Enable auto rotation',
      defaultValue: true,
    },
    ornamentScale: {
      control: { type: 'object' },
      description: 'Ornament scale',
      defaultValue: [0.4, 0.4, 0.4],
    },
    ornamentVisible: {
      control: { type: 'boolean' },
      description: 'Ornament visibility',
      defaultValue: true,
    },
    ornamentCastShadow: {
      control: { type: 'boolean' },
      description: 'Ornament cast shadow',
      defaultValue: true,
    },
  },
};

export function OBJStory(args: any = {}): React.ReactElement {
  const {
    autoRotate = true,
    ornamentScale = [0.4, 0.4, 0.4],
    ornamentVisible = true,
    ornamentCastShadow = true,
  } = args || {};

  const ornamentProps = {
    scale: ornamentScale,
    visible: ornamentVisible,
    castShadow: ornamentCastShadow,
  };

  const props = {
    autoRotate,
    ornamentProps,
  };

  return <OBJComponent {...props} />;
}

OBJStory.storyName = 'OBJ';
