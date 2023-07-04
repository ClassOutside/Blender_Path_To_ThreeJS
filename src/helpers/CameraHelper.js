import * as THREE from 'three';

export function getCameraList(scene){

    let cameraList = [];

    scene.traverse((object) => {
        if (object.isCamera) {
            cameraList.push(object);
          }
    })

    return cameraList;
}