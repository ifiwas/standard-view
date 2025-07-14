#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of story files that need conversion
const storyFiles = [
  'stories/lights/hemisphere-light.jsx',
  'stories/lights/shadows.jsx',
  'stories/lights/view3D-envmap.jsx',
  'stories/lines/bounding-box.jsx',
  'stories/views/nested-contexts.jsx',
  'stories/views/controls.jsx',
  'stories/groups/gltf.jsx',
  'stories/groups/pcd.jsx',
  'stories/groups/obj.jsx',
  'stories/groups/fbx.jsx',
  'stories/groups/arrow.jsx',
  'stories/groups/axis.jsx',
  'stories/groups/camera.jsx',
  'stories/groups/capsule.jsx',
  'stories/groups/path.jsx',
  'stories/lights/directional-light.jsx',
  'stories/lights/point-light.jsx',
  'stories/lights/rect-area-light.jsx',
  'stories/lights/spot-light.jsx',
  'stories/lines/line.jsx',
  'stories/meshes/box.jsx',
  'stories/meshes/circle.jsx',
  'stories/meshes/cylinder.jsx',
  'stories/meshes/label.jsx',
  'stories/meshes/plane.jsx',
  'stories/meshes/polygon.jsx',
  'stories/meshes/quad.jsx',
  'stories/meshes/sphere.jsx',
  'stories/meshes/text.jsx',
  'stories/meshes/triangle.jsx',
  'stories/events/group-events.jsx',
  'stories/events/mouse-events.jsx'
];

console.log('Converting story files from knobs to modern Storybook controls...');

storyFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Converting ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove knobs imports
    content = content.replace(/import\s*{[^}]*}\s*from\s*["']@storybook\/addon-knobs["'];?\s*\n?/g, '');
    
    // Remove KNOB_GROUP imports from common
    content = content.replace(/import\s*{[^}]*KNOB_GROUP[^}]*}\s*from\s*["']\.\.\/utils\/common["'];?\s*\n?/g, '');
    content = content.replace(/,\s*KNOB_GROUP\s*/g, '');
    
    // Convert function components to modern format
    if (content.includes('export default function')) {
      // Extract component name
      const componentMatch = content.match(/export default function\s+(\w+)/);
      if (componentMatch) {
        const componentName = componentMatch[1];
        
        // Convert to function component with props
        content = content.replace(/export default function\s+(\w+)/g, 'function $1Component');
        
        // Remove knob calls and replace with props
        content = content.replace(/boolean\(["']([^'"]+)["'],\s*([^,]+),\s*[^)]+\)/g, '$1: $2');
        content = content.replace(/number\(["']([^'"]+)["'],\s*([^,]+),\s*[^)]+\)/g, '$1: $2');
        content = content.replace(/text\(["']([^'"]+)["'],\s*([^,]+),\s*[^)]+\)/g, '$1: $2');
        content = content.replace(/color\(["']([^'"]+)["'],\s*([^,]+),\s*[^)]+\)/g, '$1: $2');
        content = content.replace(/select\(["']([^'"]+)["'],\s*([^,]+),\s*([^,]+),\s*[^)]+\)/g, '$1: $3');
        
        // Add default props
        content = content.replace(/function\s+(\w+)Component\s*\(\s*\)/g, 'function $1Component({ autoRotate = true, color = "white", intensity = 1, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], ...props })');
        
        // Add default export at the end
        const title = componentName.replace(/Story$/, '').replace(/([A-Z])/g, ' $1').trim();
        content += `\n\nexport default {\n  title: '${title}',\n  component: ${componentName}Component,\n  parameters: {\n    layout: 'fullscreen',\n  },\n  argTypes: {\n    autoRotate: {\n      control: { type: 'boolean' },\n      defaultValue: true,\n    },\n    color: {\n      control: { type: 'color' },\n      defaultValue: 'white',\n    },\n    intensity: {\n      control: { type: 'number', min: 0, max: 5, step: 0.1 },\n      defaultValue: 1,\n    },\n    position: {\n      control: { type: 'object' },\n      defaultValue: [0, 0, 0],\n    },\n    rotation: {\n      control: { type: 'object' },\n      defaultValue: [0, 0, 0],\n    },\n    scale: {\n      control: { type: 'object' },\n      defaultValue: [1, 1, 1],\n    }\n  }\n};\n\nexport const Default = (args) => <${componentName}Component {...args} />;`;
      }
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`  Updated ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('Conversion complete!'); 