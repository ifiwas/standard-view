// standard-cube.tsx
import React from 'react';

// standard-view
import View3D from '../../src/views/View3D';
import Box from '../../src/primitives/Box';
import { view3DProps } from '../utils/common';

const StandardCube = (args: any = {}): React.ReactElement => {
  function spin({ state, mesh }) {
    // Euler Rotation over X and Y axes.
    state.spinSpeed = args.autoRotate ? args.spinSpeed : 0;
    state.r = (state.r + 0.01 * state.spinSpeed) % (2 * Math.PI);
    mesh.current.rotation.y = state.r;
    mesh.current.rotation.x = state.r;
  }

  function toggleSpin() {
    args.autoRotate = !args.autoRotate;
  }

  return (
    <div className="App">
      Standard Cube
      <View3D
        style={{
          height: 'stretch',
          width: 'stretch',
          minHeight: '80vh',
        }}
      >
        <Box
          textureURL="/standard-cube/sc.jpg"
          color="white"
          scale={args.scale}
          animation={spin}
          state={{ r: 0 }}
          onClick={toggleSpin}
        />
      </View3D>
    </div>
  );
};

StandardCube.args = {
  autoRotate: true,
  spinSpeed: 1,
  scale: [2, 2, 2],
};

StandardCube.argTypes = {
  autoRotate: {
    control: { type: 'boolean' },
    description: 'Enable auto rotation',
    defaultValue: true,
  },
  spinSpeed: {
    control: { type: 'number', min: 0, max: 5, step: 0.1 },
    description: 'Spin animation speed',
    defaultValue: 1,
  },
  scale: {
    control: { type: 'object' },
    description: 'Cube scale',
    defaultValue: [2, 2, 2],
  },
};

export default StandardCube;
