var worldArray = [];
var i = 0;
var x = 3;
var y = x*x;
var z = 1;
var currentLocation = 23;
var viewOrient = "BACK";
var zAxis = ["UP","E","DOWN","W"];
var yAxis = ["N","E","S","W"];
var xAxis = ["UP","N","DOWN","S"];
var direction = "N";
var topfacing = "UP";


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
		if (topfacing == "UP" || topfacing == "DOWN") {
			axis = y;	
		}
		else {
			axis = x;
		}
		if (topfacing == "DOWN" || topfacing == "E") {
			axis = axis * -1;
		}
		
	}
	else if (direction == "W" || direction == "E") {
		if (topfacing == "UP" || topfacing == "DOWN") {
			axis = y;	
		}
		else {
			axis = z;
		}
		if (topfacing == "DOWN" || topfacing == "E") {
			axis = axis * -1;
		}
	}
	else if (direction == "UP" || direction == "DOWN") {
		if (topfacing == "N" || topfacing == "S") {
			axis = z;	
		}
		else {
			axis = x;
		}
		if (topfacing == "DOWN" || topfacing == "E") {
			axis = axis * -1;
		}

	}

	function loopThroughArray(rAxis, array, topOrDir, number) {
		if ((rAxis == "ROLL") && (direction == "S" || direction == "W" || direction == "DOWN")) {
			number = number * -1;
		}
		if ((rAxis == "YAW") && (topfacing == "S" || topfacing == "E")) {
			number = number * -1;
		}
		if (direction == "DOWN" || direction == "UP") {
			if (topfacing == "S" || topfacing == "N") {
				number = number * -1;
			}
		}
		console.log(rAxis + "\n" + array + "\n" + topOrDir + "\n" + number);
		var newDirection = array.indexOf(topOrDir) + number;
		if (newDirection > array.length - 1) {
			newDirection = 0;
		}
		if (newDirection < 0) {
			newDirection = array.length - 1;
		}
		console.log(newDirection);
		return newDirection;
	}

	console.log("axis * lr: " + axis * lr)

	switch(axis * lr) {
		case z:
			if (rAxes=="YAW") {direction = zAxis[loopThroughArray(rAxes, zAxis, direction, 1)]};
			if (rAxes=="ROLL") {if (direction == "UP" || direction == "DOWN"){topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, 1)]} else{topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, -1)]}};
			break;
		case -z:
			if (rAxes=="YAW") {direction = zAxis[loopThroughArray(rAxes, zAxis, direction, -1)]};
			if (rAxes=="ROLL") {if (direction == "UP" || direction == "DOWN"){topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, 1)]} else{topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, -1)]}};
			break;
		case x:
			if (rAxes=="YAW") {direction = xAxis[loopThroughArray(rAxes, xAxis, direction, 1)]};
			if (rAxes=="ROLL") {if (direction == "N" || direction == "S"){topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, 1)]} else{topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, -1)]}};
			break;
		case -x:
			if (rAxes=="YAW") {direction = xAxis[loopThroughArray(rAxes, xAxis, direction, -1)]};
			if (rAxes=="ROLL") {if (direction == "N" || direction == "S"){topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, 1)]} else{topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, -1)]}};
			break
		case y:
			if (rAxes=="YAW") {direction = yAxis[loopThroughArray(rAxes, yAxis, direction, 1)]};
			if (rAxes=="ROLL") {if (direction == "N" || direction == "S"){topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, 1)]} else{topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, -1)]}};
			break;
		case -y:
			if (rAxes=="YAW") {direction = yAxis[loopThroughArray(rAxes, yAxis, direction, -1)]};
			if (rAxes=="ROLL") {if (direction == "N" || direction == "S"){topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, 1)]} else{topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, -1)]}};
			break;
		default: console.log("error");
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