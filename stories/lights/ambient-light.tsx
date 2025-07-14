// ambient-light.tsx
import React from "react";
import { view3DProps, Ground, Balls } from "../utils/common";

// standard-view
import { View3D, AmbientLight } from "../../src";

export default {
  title: "Lights/AmbientLight",
  parameters: {
    docs: {
      description: {
        component: "Ambient light provides uniform illumination from all directions"
      }
    }
  },
  argTypes: {
    autoRotate: {
      control: { type: "boolean" },
      description: "Enable auto rotation",
      defaultValue: true
    },
    color: {
      control: { type: "color" },
      description: "Light color",
      defaultValue: "white"
    },
    intensity: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
      description: "Light intensity",
      defaultValue: 1
    }
  }
};

export function AmbientLightStory(args: any = {}): React.ReactElement {
  const { 
    autoRotate = true, 
    color = "white", 
    intensity = 1 
  } = args || {};
  
  return (
    <View3D {...view3DProps} controls={{ autoRotate }}>
      <Balls />
      <Ground />
      <AmbientLight color={color} intensity={intensity} />
    </View3D>
  );
}

AmbientLightStory.storyName = "AmbientLight";
