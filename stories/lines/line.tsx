// line.tsx
import React from "react";

// standard-view
import View3D from "../../src/views/View3D";
import Line from "../../src/primitives/Line";
import { Light, Ground, view3DProps } from "../utils/common";

export default {
  title: "Lines/Line",
  parameters: {
    docs: {
      description: {
        component: "3D line primitive with customizable properties"
      }
    }
  },
  argTypes: {
    autoRotate: {
      control: { type: "boolean" },
      description: "Enable auto rotation",
      defaultValue: false
    },
    color: {
      control: { type: "color" },
      description: "Line color",
      defaultValue: "red"
    },
    start: {
      control: { type: "object" },
      description: "Start point",
      defaultValue: [0, 0, 0]
    },
    end: {
      control: { type: "object" },
      description: "End point",
      defaultValue: [1, 0, 0]
    },
    points: {
      control: { type: "object" },
      description: "Points array",
      defaultValue: []
    },
    castShadow: {
      control: { type: "boolean" },
      description: "Cast shadows",
      defaultValue: false
    }
  }
};

export function LineStory(args: any = {}): React.ReactElement {
  const { 
    autoRotate = false,
    color = "red",
    start = [0, 0, 0],
    end = [1, 0, 0],
    points = [],
    castShadow = false
  } = args || {};

  return (
    <View3D {...view3DProps} controls={{ autoRotate }}>
      <Light />
      <Ground />
      <Line
        start={start}
        end={end}
        points={points}
        color={color}
        hoverColor="yellow"
        castShadow={castShadow}
      />
    </View3D>
  );
}

LineStory.storyName = "Line";
