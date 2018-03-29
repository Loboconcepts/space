var worldArray = [];
var i = 0;
var x = 3;
var y = x*x;
var z = 1;
var currentLocation = 23;
var viewOrient = "BACK";
var dArr = ["UP","N","DOWN","W","UP","S","DOWN","E"];
var direction = dArr[1];
var topfacing = dArr[0];


////             y- /x-
////             | /
////             |/
////  	z-_______*_______z+
////            /|
////           / |
////       x+ /  y+





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
		case "DOWN":
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
		case "DOWN":
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
		default: console.log("error");
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


function shipRotation(rAxes, lr) {
	var axis
	if (direction == "N" || direction == "S") {
		axis = x;
	}
	else if (direction == "W" || direction == "E") {
		axis = z;
	}
	else if (direction == "UP" || direction == "DOWN") {
		axis = y;
	}
	if (direction == "S" || direction == "E" || direction == "DOWN") {
		axis = axis * -1;
	}

	if (topfacing == "N") {
		axis = axis * -1;
	}
	if (topfacing == "UP") {
		axis = axis * -1;
	}
	if (topfacing == "W") {
		axis = axis * 3;
	}

	switch(axis * lr) {
		case z:
			if (rAxes=="YAW") {direction = "S"};
			console.log("z");
			break;
		case -z:
			if (rAxes=="YAW") {direction = "N"};
			console.log("-z");
			break;
		case x:
			if (rAxes=="YAW") {direction = "E"};
			if (rAxes=="ROLL") {topfacing = "E"};
			console.log("x");
			break;
		case -x:
			if (rAxes=="YAW") {direction = "E"};
			if (rAxes=="ROLL") {topfacing = "E"};
			console.log("-x");
			break
		case y:
			console.log("y");
			if (rAxes=="ROLL") {topfacing = "DOWN"};
			break;
		case -y:
			if (rAxes=="ROLL") {topfacing = "UP"};
			console.log("-y");
			break;
		default: console.log("error");
	}

	console.log(axis + " " + rAxes + " " + lr);
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