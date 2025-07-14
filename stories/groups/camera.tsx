// camera.tsx
import React, { useState } from "react";
import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

// standard-view
import { View3D, Camera, GLTF } from "../../src";
import { Ground, Light, STORY_STYLE } from "../utils/common";
import { useFrame } from "../../src/utils/hooks";

function AddControls({ group, scene, camera, gl }): void {
  const controls = new TransformControls(camera, gl.domElement);
  controls.addEventListener("change", gl.render);
  controls.addEventListener("dragging-changed", e => {
    camera.controls.enabled = !e.value;
    return null;
  });
  controls.setMode("rotate");
  controls.attach(group.current);
  scene.add(controls);
}

function Background({ backgroundVis, color, opacity }): null {
  useFrame(function updateRenderLoop({ gl, scene, camera }) {
    if (backgroundVis) {
      if (color) {
        const transparent = opacity < 1;
        scene.overrideMaterial = new THREE.MeshBasicMaterial({
          color,
          opacity,
          transparent,
          depthWrite: false
        });
      }
      gl.render(scene, camera);
      scene.overrideMaterial = null;
    }
  }, 2);

  return null;
}

export default {
  title: "Groups/Camera",
  parameters: {
    docs: {
      description: {
        component: "Camera components with transform controls and visualization"
      }
    }
  },
  argTypes: {
    autoRotate: {
      control: { type: "boolean" },
      description: "Enable auto rotation",
      defaultValue: false
    },
    cam1: {
      control: { type: "boolean" },
      description: "Show camera 1",
      defaultValue: true
    },
    cam2: {
      control: { type: "boolean" },
      description: "Show camera 2",
      defaultValue: false
    },
    cityVis: {
      control: { type: "boolean" },
      description: "Show city model",
      defaultValue: true
    },
    backgroundVis: {
      control: { type: "boolean" },
      description: "Show background",
      defaultValue: false
    },
    backgroundColor: {
      control: { type: "color" },
      description: "Background color",
      defaultValue: "gray"
    },
    backgroundOpacity: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
      description: "Background opacity",
      defaultValue: 0.5
    }
  }
};

export function CameraStory(args: any = {}): React.ReactElement {
  const { 
    autoRotate = false,
    cam1 = true,
    cam2 = false,
    cityVis = true,
    backgroundVis = false,
    backgroundColor = "gray",
    backgroundOpacity = 0.5
  } = args || {};

  return (
    <View3D
      style={STORY_STYLE}
      camera={{
        fov: 50,
        position: [0, 0, 100],
        target: [0, 0, 0]
      }}
      orbitControls
      controls={{ autoRotate }}
    >
      <Light />
      <Ground />
      {cityVis && (
        <GLTF
          gltfPath="gltf/"
          gltfURL="tokyo.glb"
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
        />
      )}
      {cam1 && (
        <Camera
          position={[-20, -80, 30]}
          target={[-8, 0, 0]}
          up={[0, 0, 1]}
          coverageColor="red"
          coverageOpacity={0.5}
          helper
          showUp
          showNormal
          showRoll
          showLabel
          showLookAt
        />
      )}
      {cam2 && (
        <Camera
          position={[80, 2, 30]}
          normal={[1, 0, 0.3]}
          up={[0, 1, 0]}
          quaternion={[0, 0, 0, 1]}
          coverageColor="blue"
          coverageOpacity={0.5}
          helper
          showUp
          showNormal
          showRoll
          showLabel
          showLookAt
        />
      )}
      <Background
        backgroundVis={backgroundVis}
        color={backgroundColor}
        opacity={backgroundOpacity}
      />
    </View3D>
  );
}

CameraStory.storyName = "Camera";
