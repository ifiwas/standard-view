// all_example.stories.js

// Example Stories
export { default as SamplePlatter } from './examples/sample-platter';
export { default as DamagedHelmet } from './examples/damaged-helmet';
import { default as StandardCube } from './examples/standard-cube';
export { default as Hello } from './examples/hello';
export { default as Rotation } from './examples/rotation';

// Default export for Storybook
export default {
  title: 'Standard View Core Examples',
};

export const StandardCubeStory = {
  render: StandardCube,
  name: 'Standard Cube',
  args: StandardCube.args,
  argTypes: StandardCube.argTypes,
};
