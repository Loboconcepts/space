var worldArray = [];
var i = 0;
var x = 3;
var y = x*x;
var z = 1;
var currentLocation = 23;
var viewOrient = "BACK";
var zAxis = ["UP","E","DOWN","W"];
var yAxis = ["N","E","S","W"];
var xAxis = ["UP","S","DOWN","N"];
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
	// Here needs work!!!
	if ((direction == "E" || direction == "W") && (topfacing == "N" || topfacing == "S")) {lm = lm * -1};
	if (direction == "DOWN" || direction == "UP") {lm = lm * -1};
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
	var yawAxis;
	var rollAxis;
	var pitchAxis;
	var xyz = [0,0,0];
	if (topfacing == "UP" || topfacing == "DOWN") {yawAxis = y;xyz[1]=1;};
	if (topfacing == "E" || topfacing == "W") {yawAxis = x;xyz[0]=1;};
	if (topfacing == "N" || topfacing == "S") {yawAxis = z;xyz[2]=1;};
	if (direction == "UP" || direction == "DOWN") {rollAxis = y;xyz[1]=1;};
	if (direction == "E" || direction == "W") {rollAxis = x;xyz[0]=1;};
	if (direction == "N" || direction == "S") {rollAxis = z;xyz[2]=1;};
	if (xyz[0] == 1 && xyz[1] == 1) {pitchAxis = z;};
	if (xyz[0] == 1 && xyz[2] == 1) {pitchAxis = y;};
	if (xyz[1] == 1 && xyz[2] == 1) {pitchAxis = x;};

	function loopThroughArray(rAxis, array, topOrDir, lr) {
		console.log("rAxis: " + rAxis + "\n" + "array: " + array + "\n" + "topOrDir: " + topOrDir + "\n" + "left right: " + lr);
		var newDirection = array.indexOf(topOrDir) + lr;
		if (newDirection > array.length - 1) {
			newDirection = 0;
		}
		if (newDirection < 0) {
			newDirection = array.length - 1;
		}
		return newDirection;
	}
	if (rAxes == "YAW") {
		if (topfacing == "N" || topfacing == "DOWN" || topfacing == "E") {lr = lr * -1};
		switch(yawAxis) {
		case z:
			direction = zAxis[loopThroughArray(rAxes, zAxis, direction, lr)];
			break;
		case x:
			direction = xAxis[loopThroughArray(rAxes, xAxis, direction, lr)];
			break;
		case y:
			direction = yAxis[loopThroughArray(rAxes, yAxis, direction, lr)];
			break;
		default: console.log("error");
		}
	}
	if (rAxes == "ROLL") {
		if (direction == "S" || direction == "UP" || direction == "W") {lr = lr * -1};
		switch(rollAxis) {
		case z:
			topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, lr)];
			break;
		case x:
			topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, lr)];
			break;
		case y:
			topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, lr)];
			break;
		default: console.log("error");
		}
	}
	if (rAxes == "PITCH") {
		switch(pitchAxis) {
		case z:
			if ((zAxis.indexOf(direction) - zAxis.indexOf(topfacing) == 1) || (zAxis.indexOf(direction) - zAxis.indexOf(topfacing) == -3)) {lr = lr * -1;};
			topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, lr)];
			direction = zAxis[loopThroughArray(rAxes, zAxis, direction, lr)];
			break;
		case x:
			if ((xAxis.indexOf(direction) - xAxis.indexOf(topfacing) == 1) || (xAxis.indexOf(direction) - xAxis.indexOf(topfacing) == -3)) {lr = lr * -1;};
			topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, lr)];
			direction = xAxis[loopThroughArray(rAxes, xAxis, direction, lr)];
			break;
		case y:
			if ((yAxis.indexOf(direction) - yAxis.indexOf(topfacing) == 1) || (yAxis.indexOf(direction) - yAxis.indexOf(topfacing) == -3)) {lr = lr * -1;};
			topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, lr)];
			direction = yAxis[loopThroughArray(rAxes, yAxis, direction, lr)];
			break;
		default: console.log("error");
		}
	}
	document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
	cubeShipPositioning(direction, topfacing, currentLocation, viewOrient);
}

function generateWorld() {
	for (i=0;i<(x*x*x);i++) {
		if ((i+1 == 1) || ((i+1)%(x*x*x)==0)) {
			worldArray.push("WH");
		}
		else {
			worldArray.push(i+1);	
		}	
	}
}

function switchOrientation() {
	if (viewOrient == "BACK") {
		viewOrient = "TOP";
		cubeShipPositioning(direction, topfacing, currentLocation, viewOrient);
	}
	else {
		viewOrient = "BACK";
		cubeShipPositioning(direction, topfacing, currentLocation, viewOrient);
	}
}

function tableView(id,isWhat) {
	if (id == "t2-1") {
		switch (viewOrient) {
			case "BACK":
				document.querySelector("#" + id).innerHTML = isWhat;
				break;
			case "TOP":
				document.querySelector("#" + id).innerHTML = isWhat;
				break;
			default: console.log("error ship");
		}
	}
	else {
		if (isWhat > worldArray.length) {
		document.querySelector("#" + id).innerHTML = worldArray[(isWhat - worldArray.length)-1];
		}
		else if (isWhat < 1) {
			document.querySelector("#" + id).innerHTML = worldArray[(isWhat + worldArray.length)-1];
		}
		else {
			document.querySelector("#" + id).innerHTML = worldArray[(isWhat-1)];	
		}
	}	
}
// Canvas

var canvas = document.getElementById("shipView");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(255, 255, 255, 1)";
ctx.stroke();
ctx.closePath();


generateWorld();
cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);