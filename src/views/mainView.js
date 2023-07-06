import * as THREE from 'three';
import { LoadGLTFByPath, getOBjectByName } from '../helpers/ModelHelper.js'
import { loadCurveFromJSON } from '../curveTools/CurveMethods.js'
import { setupRenderer } from '../helpers/RendererHelper.js'
import { getCameraList } from '../helpers/CameraHelper.js'

const scenePath = './src/models/scene.gltf'
const curvePath = './src/models/curvePath.json'

export async function setupScene(canvas) {

	//Scene is container for objects, cameras, and lights
	const scene = new THREE.Scene();

	await LoadGLTFByPath(scene, scenePath);

	let mazePath = await loadCurveFromJSON(curvePath);

	// Add the mesh to your scene
	scene.add(mazePath.mesh); //Comment this to remove curve visualization
	
	// Create a camera and set its position and orientation
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	const cameraList = getCameraList(scene);
	camera.position.copy(cameraList[0].position);
	camera.rotation.copy(cameraList[0].rotation);

	// Add the camera to the scene
	scene.add(camera);
	const renderer = setupRenderer();

	// Animate the scene
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
	animate();
};
