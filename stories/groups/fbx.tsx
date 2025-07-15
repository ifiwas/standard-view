// fbx.tsx
import React from 'react';
import * as THREE from 'three';

// standard-view
import {
  View3D,
  FBX,
  AmbientLight,
  SpotLight,
  DirectionalLight,
} from '../../src';
import { DEFAULT_NORMAL } from '../../src/utils/constants';

export default {
  title: 'Groups/FBX',
  parameters: {
    docs: {
      description: {
        component: 'FBX model loading and animation',
      },
    },
  },
  argTypes: {
    autoRotate: {
      control: { type: 'boolean' },
      description: 'Enable auto rotation',
      defaultValue: false,
    },
    fbxURL: {
      control: { type: 'select' },
      options: ['sophia.fbx', 'samba.fbx'],
      description: 'FBX model URL',
      defaultValue: 'sophia.fbx',
    },
    fbxPath: {
      control: { type: 'text' },
      description: 'FBX model path',
      defaultValue: 'fbx/',
    },
    position: {
      control: { type: 'object' },
      description: 'Model position',
      defaultValue: [0, -150, 0],
    },
    scale: {
      control: { type: 'object' },
      description: 'Model scale',
      defaultValue: [1, 1, 1],
    },
    rotation: {
      control: { type: 'object' },
      description: 'Model rotation',
      defaultValue: [0, 0, 0],
    },
    normal: {
      control: { type: 'object' },
      description: 'Model normal',
      defaultValue: DEFAULT_NORMAL,
    },
    roll: {
      control: { type: 'number', min: 0, max: Math.PI * 2, step: 0.1 },
      description: 'Roll angle',
      defaultValue: 0,
    },
    actionIndex: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Animation action index',
      defaultValue: 0,
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Model visibility',
      defaultValue: true,
    },
  },
};

export function FBXStory(args: any = {}): React.ReactElement {
  const {
    autoRotate = false,
    fbxURL = 'sophia.fbx',
    fbxPath = 'fbx/',
    position = [0, -150, 0],
    scale = [1, 1, 1],
    rotation = [0, 0, 0],
    normal = DEFAULT_NORMAL,
    roll = 0,
    actionIndex = 0,
    visible = true,
  } = args || {};

  // Calculate rotation based on model
  const calculatedRotation =
    fbxURL === 'sophia.fbx' ? [-Math.PI / 2, 0, 0] : rotation;

  return (
    <View3D
      camera={{
        fov: 45,
        position: [0, 20, 50],
        far: 10000,
      }}
      backgroundEquirectangularTextureURL="backgrounds/store.jpg"
      orbitControls
      style={{ height: 'stretch', width: 'stretch', minHeight: '80vh' }}
      controls={{ autoRotate, enableZoom: false }}
      gl={{ outputEncoding: THREE.SRGBColorSpace }}
    >
      {/* Lights */}
      <SpotLight intensity={0.7} color="cyan" position={[0, 100, 100]} />
      <SpotLight intensity={0.4} color="cyan" position={[0, 100, -100]} />
      <SpotLight intensity={0.7} color="snow" position={[0, 100, 100]} />
      <SpotLight intensity={0.4} color="snow" position={[0, 100, -100]} />
      <SpotLight intensity={0.6} color="tan" position={[0, 100, -100]} />
      <SpotLight intensity={0.3} color="tan" position={[0, 100, 100]} />
      <DirectionalLight intensity={0.3} position={[0, 1, 0]} />
      <AmbientLight intensity={0.2} />

      {/* FBX */}
      <FBX
        position={position}
        scale={scale}
        rotation={calculatedRotation}
        normal={normal}
        roll={roll}
        fbxURL={fbxURL}
        fbxPath={fbxPath}
        actionIndex={actionIndex}
        visible={visible}
      />
    </View3D>
  );
}

FBXStory.storyName = 'FBX';
