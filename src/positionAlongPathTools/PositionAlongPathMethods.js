export function handleScroll(event, positionAlongPathState) {

	positionAlongPathState.lastScrollTime = performance.now();

	//When a new scroll starts, set the starting distance along the path to whatever the object's current distance is. 
	positionAlongPathState.startingDistance = positionAlongPathState.currentDistanceOnPath;

	const changeInScroll = Math.sign(event.deltaY);
	
	positionAlongPathState.targetDistance += changeInScroll / positionAlongPathState.lengthToScroll; 
}

export function updatePosition(curvePath, object, positionAlongPathState) {

	let timeElapsed = performance.now() - positionAlongPathState.lastScrollTime;

	if(timeElapsed < positionAlongPathState.movementDuration) {

		let interpolatedPositionOnPath;
	
		// The percentage complete towards the total time to animate, movementDuration.
		const timeLeftPercentage = timeElapsed / positionAlongPathState.movementDuration;
		
		const minimumDegreeOfChange = 0.005;
		const maximumDegreeOfChange = 0.9;

		let interpolationFactor = Math.max(timeLeftPercentage, minimumDegreeOfChange);
		interpolationFactor = Math.min(interpolationFactor, maximumDegreeOfChange);

		interpolatedPositionOnPath = (1 - interpolationFactor) * positionAlongPathState.startingDistance + interpolationFactor * positionAlongPathState.targetDistance;

		positionAlongPathState.currentDistanceOnPath = interpolatedPositionOnPath;
		positionAlongPathState.currentPercentageOnPath = positionAlongPathState.currentDistanceOnPath < 0 ? (1 - (Math.abs(positionAlongPathState.currentDistanceOnPath) % 1)) : positionAlongPathState.currentDistanceOnPath % 1;

		if (typeof positionAlongPathState.currentPercentageOnPath === 'undefined') {
			currentPercentageOnPath = 0.001;
		}
	
		let lookAtPosition = positionAlongPathState.currentPercentageOnPath - 0.0000001;
		if (typeof lookAtPosition === 'undefined') {
			lookAtPosition = 0.001;
		}
	
		const newPosition = curvePath.curve.getPointAt(positionAlongPathState.currentPercentageOnPath);
		const newLookAt = curvePath.curve.getPointAt(lookAtPosition);
		
		object.position.copy(newPosition);
		object.lookAt(newLookAt);
	}

}