var worldArray;
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
var yawAxis;
var rollAxis;
var pitchAxis;

// Disable scrolling.
document.ontouchmove = function (e) {
  e.preventDefault();
}

function preventZoom(e) {
  var t2 = e.timeStamp;
  var t1 = e.currentTarget.dataset.lastTouch || t2;
  var dt = t2 - t1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = t2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
}
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


// Determine axis

function axisFinder() {
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
}

function cubeShipPositioning(direction, topfacing, pos, orient) {
	ctx.clearRect(0, 0, 1000, 1000);
	// upward movement UM || forward movement FM || lateral movement LM
	var um;
	var fm;
	var lm;

	switch (direction) {
		case "N":fm = -x;break;
		case "S":fm = x;break;
		case "E":fm = z;break;
		case "W":fm = -z;break;
		case "UP":fm = -y;break;
		case "DOWN":fm = y;break;
		default:console.log("error");
	};
	switch (topfacing) {
		case "N":um = -x;break;
		case "S":um = x;break;
		case "E":um = z;break;
		case "W":um = -z;break;
		case "UP":um = -y;break;
		case "DOWN":um = y;break;
		default:console.log("error");
	};
	switch (Math.abs(fm) + Math.abs(um)) {
		case (x+y):
			if (fm*um < 0) {lm = -z;}
			else {lm = z;}
			break;
		case (z+y):
			if (fm*um < 0) {lm = x;}
			else {lm = -x;}
			break;
		case (z+x):
			if (fm*um < 0) {lm = y;}
			else {lm = -y;}
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
	
	axisFinder();

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
		case z:direction = zAxis[loopThroughArray(rAxes, zAxis, direction, lr)];break;
		case x:direction = xAxis[loopThroughArray(rAxes, xAxis, direction, lr)];break;
		case y:direction = yAxis[loopThroughArray(rAxes, yAxis, direction, lr)];break;
		default: console.log("error");
		}
	}
	if (rAxes == "ROLL") {
		if (direction == "S" || direction == "UP" || direction == "W") {lr = lr * -1};
		switch(rollAxis) {
		case z:topfacing = zAxis[loopThroughArray(rAxes, zAxis, topfacing, lr)];break;
		case x:topfacing = xAxis[loopThroughArray(rAxes, xAxis, topfacing, lr)];break;
		case y:topfacing = yAxis[loopThroughArray(rAxes, yAxis, topfacing, lr)];break;
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

function accelerate() {
	switch (direction) {
		case "N":currentLocation = currentLocation - x;break;
		case "S":currentLocation = currentLocation + x;break;
		case "E":currentLocation = currentLocation + z;break;
		case "W":currentLocation = currentLocation - z;break;
		case "UP":currentLocation = currentLocation - y;break;
		case "DOWN":currentLocation = currentLocation + y;break;
		default: console.log("OK");
	}
	if (currentLocation > worldArray.length) {currentLocation = (currentLocation - worldArray.length);}
	else if (currentLocation < 1) {currentLocation = (currentLocation + worldArray.length);}
	else {currentLocation = (currentLocation);	}
	cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);
}

function generateWorld() {
	// 1 - Nothing
	// 2 - Star
	// 3 - Planet
	// 4 - Asteroids
	// 5 - Worm Hole

	worldArray = [];

	for (i=0;i<(x*x*x);i++) {
		var rarityValue = 60;
		if ((i == 0) || ((i)%((x*x*x)-1) == 0)) {
			worldArray.push("5");
		}
		// else if (i%rarityValue==0) {
		// 	worldArray.push("2");
		// }
		// else if ((i>rarityValue/2) && (i%rarityValue==z || i%rarityValue==rarityValue-z || i%rarityValue==x || i%rarityValue==rarityValue-x || i%rarityValue==y || i%rarityValue==rarityValue-y)) {
		// 	worldArray.push("3");
		// }
		else {
			worldArray.push(i+1);	
		}
	}
	// worldArray = worldArray.join("");
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
			case "BACK":document.querySelector("#" + id).innerHTML = isWhat;break;
			case "TOP":document.querySelector("#" + id).innerHTML = isWhat;break;
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
	console.log(isWhat);
}

function loopView(isWhat) {
	if (isWhat > worldArray.length) {return worldArray[(isWhat - worldArray.length)-1];}
	else if (isWhat < 1) {return worldArray[(isWhat + worldArray.length)-1];}
	else {return worldArray[(isWhat-1)];	}
}

// Only shapes here down
function drawField(pos, fm, um, lm) {

	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();

// Back items
	for (var i = 0; i < 3; i++) {
    	for (var j = 0; j < 3; j++) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(j * 300, i * 300);
		ctx.strokeStyle = "rgba(255, 255, 255, 1)";
		ctx.rect(50, 50, 300, 300);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		}
	}
// For animation table
	// for (var i = 0; i < 3; i++) {
 //    	for (var j = 0; j < 3; j++) {
	// 	ctx.save();
	// 	ctx.beginPath();
	// 	ctx.translate(j * 150, i * 150);
	// 	ctx.strokeStyle = "rgba(255, 0, 255, 1)";
	// 	ctx.rect(300, 300, 150, 150);
	// 	ctx.stroke();
	// 	ctx.closePath();
	// 	ctx.restore();

	// 	}
	// }
// Stars
	for (var j = 1; j < 100; j++) {
	    ctx.save();
	    ctx.fillStyle = '#fff';
	    ctx.translate(1000 - Math.floor(Math.random() * 1000),
	                  1000 - Math.floor(Math.random() * 1000));
	    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
	    ctx.restore();
	}

	function drawStar(ctx, r) {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(r, 0);
		for (var i = 0; i < 9; i++) {
			ctx.rotate(Math.PI / 5);
			if (i % 2 === 0) {
			  ctx.lineTo((r / 0.525731) * 0.200811, 0);
			} else {
			  ctx.lineTo(r, 0);
			}
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

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
	// ctx.beginPath();
	// ctx.moveTo(200, 0);
	// ctx.lineTo(450, 0);
	// ctx.lineTo(250, 1000);
	// ctx.lineTo(0, 1000);
	// ctx.fillStyle = "rgba(255, 255, 255, .7)";
	// ctx.fill();
	// ctx.closePath();

	// current pos
	ctx.font = '900px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .8)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos), 500, 800);
	// center left
	ctx.font = '600px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .4)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + fm - lm), 100, 700);
	// center center
	ctx.font = '600px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .4)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + fm), 500, 700);
	// center right
	ctx.font = '600px sans-serif';
	ctx.fillStyle = "rgba(255, 255, 255, .4)"
	ctx.textAlign="center";
	ctx.fillText(loopView(pos + fm + lm), 900, 700);
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

axisFinder();
generateWorld();
cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);