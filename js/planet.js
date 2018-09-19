function alienLife(xPos,yPos) {

	if (!xPos) {xPos = 0};
	if (!yPos) {yPos = 0};
	if (isLanded && (currentLocation.toString(10)[currentLocation.toString(10).length-1]>5)){
		generateAlien(xPos,yPos);
		console.log("generating");
	};
};