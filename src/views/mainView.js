import * as THREE from 'three';
import { LoadGLTFByPath } from '../helpers/ModelHelper.js'
import PositionAlongPathState from '../positionAlongPathTools/PositionAlongPathState.js';
import { handleScroll, updatePosition } from '../positionAlongPathTools/PositionAlongPathMethods.js'
import { loadCurveFromJSON } from '../curveTools/CurveMethods.js'
import { setupRenderer } from '../helpers/RendererHelper.js'

const startingModelPath = './src/models/scene.gltf'
const curvePathJSON = './src/models/curvePath.json'

export async function setupScene(canvas) {

	//Scene is container for objects, cameras, and lights
	const scene = new THREE.Scene();

	await LoadGLTFByPath(scene, startingModelPath);

	let curvePath = await loadCurveFromJSON(scene, curvePathJSON);

	// Comment to remove curve visualization
	// scene.add(curvePath.mesh); 
	
	// Create a camera and set its position and orientation
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	// camera.position.set(6, 3, 10);
	camera.position.copy(curvePath.curve.getPointAt(0))
	camera.lookAt(curvePath.curve.getPointAt(0.99))

	// Add the camera to the scene
	scene.add(camera);
	const renderer = setupRenderer();

	let positionAlongPathState = new PositionAlongPathState();

	window.addEventListener('wheel', onMouseScroll, false);

	function onMouseScroll(event){
		handleScroll(event, positionAlongPathState);
	}

	// Animate the scene
	function animate() {
		requestAnimationFrame(animate);
		updatePosition(curvePath, camera, positionAlongPathState);
		renderer.render(scene, camera);
	}
	animate();
};