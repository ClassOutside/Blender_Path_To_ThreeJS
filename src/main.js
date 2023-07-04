import { setupScene } from './views/mainView.js'; // import the setupScene function from your main.js file

const canvas = document.createElement('canvas');
// set up your canvas here
document.body.appendChild(canvas);

// pass any necessary data to the setupScene function
setupScene(canvas);