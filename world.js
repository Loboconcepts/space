var worldArray = [];
var i = 0;
var x = 3;
var y = x*x;
var z = 1;
var currentLocation = 14;
var viewOrient = "BACK";
var zAxis = ["UP","E","DOWN","W"];
var yAxis = ["N","E","S","W"];
var xAxis = ["UP","S","DOWN","N"];
var direction = "N";
var topfacing = "UP";
// Canvas

var W = H = 1000;
var scale = Math.min(window.innerHeight/H, window.innerWidth/W);

var canvas = document.getElementById("shipView");
canvas.width = W;
canvas.height = H;
canvas.style.position = "relative";
canvas.style.width = (W * Math.min(window.innerWidth/W)) + "px";
canvas.style.height = ((H * Math.min(window.innerHeight/H))/2) + "px";
// canvas.style.left = (window.innerWidth * 0.5 - W * scale * 0.5) + "px";
// canvas.style.top = (window.innerHeight * 0.5 - H * scale * 0.5) + "px";

var ctx = canvas.getContext("2d");



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
	drawField(pos, fm, um, lm);

	document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
}


function shipRotation(rAxes, lr) {
	ctx.clearRect(0, 0, 1000, 1000);
	
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

function loopView(isWhat) {
	if (isWhat > worldArray.length) {
		return worldArray[(isWhat - worldArray.length)-1];
	}
	else if (isWhat < 1) {
		return worldArray[(isWhat + worldArray.length)-1];
	}
	else {
		return worldArray[(isWhat-1)];	
	}
}


function drawField(pos, fm, um, lm) {

	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();

	// Red Angle Lines
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(1000, 500);
	// ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	// ctx.stroke();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.moveTo(1000, 0);
	// ctx.lineTo(0, 500);
	// ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	// ctx.stroke();
	// ctx.closePath();

	// END

	// Center top back
	ctx.beginPath();
	ctx.rect(350, 50, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Left top Back
	ctx.beginPath();
	ctx.rect(50, 50, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Right top back
	ctx.beginPath();
	ctx.rect(650, 50, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Center middle back
	ctx.beginPath();
	ctx.rect(350, 350, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Left middle Back
	ctx.beginPath();
	ctx.rect(50, 350, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Right middle back
	ctx.beginPath();
	ctx.rect(650, 350, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Center bottom back
	ctx.beginPath();
	ctx.rect(350, 650, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Left bottom Back
	ctx.beginPath();
	ctx.rect(50, 650, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Right bottom back
	ctx.beginPath();
	ctx.rect(650, 650, 300, 300);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();


	// Middle center
	ctx.beginPath();
	ctx.rect(150, 150, 700, 700);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.fillStyle = "rgba(255, 255, 255, .1)";
	ctx.fill();
	ctx.closePath();

	// angle lines
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(350, 350);
	ctx.strokeStyle = "rgba(255, 255, 255)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(1000, 0);
	ctx.lineTo(650, 350);
	ctx.strokeStyle = "rgba(255, 255, 255)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(0, 1000);
	ctx.lineTo(350, 650);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(1000, 1000);
	ctx.lineTo(650, 650);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(0, 335);
	ctx.lineTo(50, 350);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(1000, 335);
	ctx.lineTo(950, 350);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(665, 0);
	ctx.lineTo(650, 50);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(335, 0);
	ctx.lineTo(350, 50);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(0, 665);
	ctx.lineTo(50, 650);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(1000, 665);
	ctx.lineTo(950, 650);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(665, 1000);
	ctx.lineTo(650, 950);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(335, 1000);
	ctx.lineTo(350, 950);
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	ctx.stroke();
	ctx.closePath();

	// Windshield
	ctx.beginPath();
	ctx.moveTo(200, 0);
	ctx.lineTo(450, 0);
	ctx.lineTo(250, 1000);
	ctx.lineTo(0, 1000);
	ctx.fillStyle = "rgba(255, 255, 255, .7)";
	ctx.fill();
	ctx.closePath();

	//SHIP CONSOLE
	ctx.beginPath();
	ctx.moveTo(0, 950);
	ctx.bezierCurveTo(500, 800, 500, 800, 1000, 950);
	ctx.lineTo(1000, 1000);
	ctx.lineTo(0, 1000);
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.closePath();

	// current pos
	ctx.font = '900px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .8)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos), 500, 800);
	// center center
	ctx.font = '600px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .4)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + fm), 500, 700);
	// top left
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + um + 2*fm - lm), 200, 270);
	// top middle
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + um + 2*fm), 500, 270);
	// top right
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + um + 2*fm + lm), 800, 270);
	// center left
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + 2*fm - lm), 200, 570);
	// center middle
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + 2*fm), 500, 570);
	// center right
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + 2*fm + lm), 800, 570);
	// bottom left
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos - um + 2*fm - lm), 200, 870);
	// bottom middle
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos - um + 2*fm), 500, 870);
	// bottom right
	ctx.font = '200px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .2)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos - um + 2*fm + lm), 800, 870);

	//SHIP CONSOLE
	ctx.beginPath();
	ctx.moveTo(0, 950);
	ctx.bezierCurveTo(500, 800, 500, 800, 1000, 950);
	ctx.lineTo(1000, 1000);
	ctx.lineTo(0, 1000);
	ctx.fillStyle = "#999999";
	ctx.fill();
	ctx.closePath();
}

generateWorld();
cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);