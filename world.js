var worldArray = [];
var i = 0;
var x = 4;
var y = x*x;
var z = 1;
var currentLocation = 64;
var viewOrient = "BACK";
var directionArray = ["N","E","S","W","UP","DOWN"];
var direction = directionArray[0];
var topfacing = directionArray[4];

////             y+ /z+
////             | /
////             |/
////  	x+_______*_______x-
////            /|
////           / |
////       z- /  y-





function cubeShipPositioning(direction, topfacing, pos, orient) {
	// upward movement UM || forward movement FM || lateral movement LM
	var um;
	var fm;
	var lm;

	switch (direction) {
		case "N":
			fm = -x;
			break;
		case "S":
			fm = x;
			break;
		case "E":
			fm = z;
			break;
		case "W":
			fm = -z;
			break;
		case "UP":
			fm = -y;
			break;
		case "down":
			fm = y;
			break;
		default:
			console.log("error");
	};
	switch (topfacing) {
		case "N":
			um = -x;
			break;
		case "S":
			um = x;
			break;
		case "E":
			um = z;
			break;
		case "W":
			um = -z;
			break;
		case "UP":
			um = -y;
			break;
		case "down":
			um = y;
			break;
		default:
			console.log("error");
	};
	switch (Math.abs(fm) + Math.abs(um)) {
		case (x+y):
			if (fm*um < 0) {
				lm = -z;
			}
			else {
				lm = z;
			}
			break;
		case (z+y):
			if (fm*um < 0) {
				lm = x;
			}
			else {
				lm = -x;
			}
			break;
		case (z+x):
			if (fm*um < 0) {
				lm = y;
			}
			else {
				lm = -y;
			}
			break;
		default:
			console.log("error");
	}
	if (orient == "BACK") {
		tableView("t0-0",(pos + 2*um - lm));
		tableView("t0-1",(pos + 2*um));
		tableView("t0-2",(pos + 2*um + lm));
		tableView("t1-0",(pos + um - lm));
		tableView("t1-1",(pos + um)); 
		tableView("t1-2",(pos + um + lm));
		tableView("t2-0",(pos - lm));
		tableView("t2-1","&#8743;<br>&#9669;&#9677;&#9677;&#9677;&#9659;"); 
		tableView("t2-2",(pos + lm)); 
	}
	if (orient == "TOP") {
		tableView("t0-0",(pos + 2*fm - lm));
		tableView("t0-1",(pos + 2*fm));
		tableView("t0-2",(pos + 2*fm + lm));
		tableView("t1-0",(pos + fm - lm));
		tableView("t1-1",(pos + fm));
		tableView("t1-2",(pos + fm + lm));
		tableView("t2-0",(pos - lm));
		tableView("t2-1","&#9651;<br>&#8834;&#8890;&#8835;<br>&#9677;&#9677;&#9677;");
		tableView("t2-2",(pos + lm));
	}
	document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
}

function pitch(lr) {
	console.log(lr);
}

function yaw(lr) {
	if (lr == "left") {
		switch (direction) {
		case "N":
			direction = "W";
			break;
		case "E":
			direction = "N";
			break;
		case "S":
			direction = "E";
			break;
		case "W":
			direction = "S";
			break;
		}
	}
	if (lr == "right") {
		switch (direction) {
		case "N":
			direction = "E";
			break;
		case "E":
			direction = "S";
			break;
		case "S":
			direction = "W";
			break;
		case "W":
			direction = "N";
			break;
		}
	}
	document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
	cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);
}

function generateWorld() {
	for (i=0;i<(x*x*x);i++) {
		worldArray.push(0);		
	}
}

function switchOrientation() {
	if (viewOrient == "BACK") {
		viewOrient = "TOP";
		cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);
	}
	else {
		viewOrient = "BACK";
		cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);
	}
}

function tableView(id,isWhat) {
	if (isWhat > worldArray.length) {
		document.querySelector("#" + id).innerHTML = isWhat - worldArray.length;
	}
	else if (isWhat < 1) {
		document.querySelector("#" + id).innerHTML = isWhat + worldArray.length;
	}
	else {
		document.querySelector("#" + id).innerHTML = isWhat;	
	}
	
}

generateWorld();
cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);
