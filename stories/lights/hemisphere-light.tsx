// hemisphere-light.tsx
import React from "react";
import { view3DProps, Ground, Balls } from "../utils/common";

// standard-view
import { View3D, HemisphereLight } from "../../src";

export default {
  title: "Lights/HemisphereLight",
  parameters: {
    docs: {
      description: {
        component: "Hemisphere light provides sky and ground illumination"
      }
    }
  },
  argTypes: {
    autoRotate: {
      control: { type: "boolean" },
      description: "Enable auto rotation",
      defaultValue: true
    },
    skyColor: {
      control: { type: "color" },
      description: "Sky color",
      defaultValue: "lightskyblue"
    },
    groundColor: {
      control: { type: "color" },
      description: "Ground color",
      defaultValue: "sandybrown"
    },
    position: {
      control: { type: "object" },
      description: "Light position",
      defaultValue: [0, 1, 0]
    },
    intensity: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
      description: "Light intensity",
      defaultValue: 1
    },
    helperSize: {
      control: { type: "number", min: 0.1, max: 5, step: 0.1 },
      description: "Helper size",
      defaultValue: 1
    },
    helper: {
      control: { type: "boolean" },
      description: "Show light helper",
      defaultValue: true
    }
  }
};

export function HemisphereLightStory(args: any = {}): React.ReactElement {
  const { 
    autoRotate = true, 
    skyColor = "lightskyblue", 
    groundColor = "sandybrown", 
    position = [0, 1, 0], 
    intensity = 1, 
    helperSize = 1, 
    helper = true 
  } = args || {};

  return (
    <View3D {...view3DProps} controls={{ autoRotate }}>
      <Balls />
      <Ground materialType="standard" />
      <HemisphereLight
        position={position}
        skyColor={skyColor}
        groundColor={groundColor}
        intensity={intensity}
        helperSize={helperSize}
        helper={helper}
      />
    </View3D>
  );
}

HemisphereLightStory.storyName = "HemisphereLight";
