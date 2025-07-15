// sample-platter.tsx
import React from 'react';
import * as THREE from 'three';

// standard-view
import {
  View3D,
  Box,
  Capsule,
  Cylinder,
  Group,
  Plane,
  Sphere,
  Text,
} from '../../src/';

const SamplePlatter = (args: any = {}): React.ReactElement => {
  const {
    autoRotate = true,
    cameraPosition = [0, 0, 5],
    ballSpeed = 1,
    spinSpeed = 1,
  } = args || {};

  // --------------------------//
  // -----   Animations   -----//
  // --------------------------//
  function spinText({ state, mesh }: any): void {
    state.r = (state.r + 0.01 * spinSpeed) % (2 * Math.PI);
    mesh.current.rotation.x = state.r;
  }

  function spin({ state, mesh }: any): void {
    // Euler Rotation over X and Y axes.
    const speed = state.speed == null ? spinSpeed : state.speed;
    state.r = (state.r + 0.01 * speed) % (2 * Math.PI);
    mesh.current.rotation.x = state.r;
    mesh.current.rotation.y = state.r;
  }

  function bounce({ props, state, mesh }: any): void {
    if (state.px > 1 || state.px < -1) {
      state.dir *= -1;
    }
    state.px += (state.dir / 60) * ballSpeed;
    state.py += (-state.dir / 60) * ballSpeed;
    mesh.current.position.x = state.px0 + state.px;
    mesh.current.position.y = state.py0 + state.py;
  }

  function reset({ camera }: any) {
    camera.controls.reset();
  }

  // -----------------------//
  // -----   Objects   -----//
  // -----------------------//
  const Paddle = (): React.ReactNode => {
    return (
      <Group
        position={[0, 0.5, 0]}
        scale={[1.5, 1.5, 1.5]}
        rotation={[-Math.PI * 0.25, -Math.PI * 0.2, -Math.PI * 0.33]}
      >
        <Cylinder
          start={[0, 0, 0]}
          end={[0, 0, 0.1]}
          color="black"
          radialSegments={32}
        />
        <Cylinder
          start={[0, 0, 0]}
          end={[0, 0, -0.1]}
          color="red"
          radialSegments={32}
        />
        <Cylinder
          start={[0, 1, 0]}
          end={[0, 2.15, 0]}
          radius={0.2}
          color="white"
          textureURL="/sample-platter/wood.jpg"
        />
      </Group>
    );
  };

  const Ball = (): React.ReactNode => (
    <Sphere
      position={[-1.55, 1.55, 0]}
      color="orange"
      hoverColor="gray"
      radius={0.5}
      animation={bounce}
      state={{ px: 0, py: 0, px0: -1.55, py0: 1.55, dir: 1 }}
    />
  );

  const Logo = (): React.ReactNode => {
    return (
      <Text
        text="Standard View"
        fontName="gentilisBold"
        position={[-5, -2, 0]}
        color="navy"
        hoverColor="red"
        wireframe={false}
        size={1}
        height={0.2}
        animation={spinText}
        state={{ r: 0 }}
      />
    );
  };

  const CustomaryCube = (): React.ReactNode => {
    return (
      <Box
        position={[650, 200, -600]}
        scale={[400, 400, 400]}
        color="white"
        hoverColor="red"
        textureURL="/sample-platter/sc.jpg"
        animation={spin}
        state={{ r: 0 }}
      />
    );
  };

  const Sc = (): React.ReactNode => {
    return (
      <Plane
        position={[-2, 1, 3]}
        scale={[1.5, 1, 1]}
        textureURL="/sample-platter/sc.jpg"
        color="white"
        hoverColor="magenta"
        onClick={reset}
        billboard
      />
    );
  };

  return (
    <View3D
      orbitControls
      camera={{ position: cameraPosition }}
      style={{
        height: 'stretch',
        width: 'stretch',
        minHeight: '80vh',
      }}
      controls={{ autoRotate }}
    >
      <Logo />
      <Paddle />
      <Ball />
      <CustomaryCube />
      <Capsule
        start={[-0.4, -0.05, 4.5]}
        end={[-0.45, 0, 4.5]}
        radius={0.05}
        color="yellowgreen"
        animation={spin}
        state={{ r: 0, speed: 4 }}
      />
      <Sc />
    </View3D>
  );
};

SamplePlatter.args = {
  autoRotate: true,
  cameraPosition: [0, 0, 5],
  ballSpeed: 1,
  spinSpeed: 1,
};

SamplePlatter.argTypes = {
  autoRotate: {
    control: { type: 'boolean' },
    description: 'Enable auto rotation',
    defaultValue: true,
  },
  cameraPosition: {
    control: { type: 'object' },
    description: 'Camera position',
    defaultValue: [0, 0, 5],
  },
  ballSpeed: {
    control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
    description: 'Ball bounce speed',
    defaultValue: 1,
  },
  spinSpeed: {
    control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
    description: 'Spin animation speed',
    defaultValue: 1,
  },
};

export default SamplePlatter;
