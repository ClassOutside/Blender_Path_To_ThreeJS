import * as THREE from 'three';
import { loadJSON } from '../helpers/JSONHelper.js';

export async function loadCurveFromJSON(scene, curvePathJSON) {
	
	let curveJSON = await loadJSON(curvePathJSON);
	let curve = createCurveFromJSON(curveJSON);
	let curveTubeMesh = getTubeFromCurveAndJSONData(curve, curveJSON);

	let curveAndMesh = {
		curve: curve,
		mesh: curveTubeMesh
	}
	return curveAndMesh
}

function createCurveFromJSON(json) {

	// Extract the vertices array from the JSON object
    const vertices = json.points;
    
    // Create an empty array to store THREE.Vector3 instances
    const points = [];

    // Iterate over the vertices and push THREE.Vector3 instances to the points array
    for (let i = 0; i < vertices.length; i += 3) {
		const x = vertices[i].x;
        const y = vertices[i].y;
        const z =  vertices[i].z;
        points.push(new THREE.Vector3(x, y, z));
    }
    
    // Create a CatmullRomCurve3 using the points array
    const curve = new THREE.CatmullRomCurve3(points);

	curve.closed = true;

	return curve;
}

function getTubeFromCurveAndJSONData(curve, json){
    const geometry = new THREE.TubeGeometry(curve, 100, .05, 8, true)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);

	return mesh
}