var worldArray;
var i = 0;
var x = 7;
var y = x*x;
var z = 1;
var currentLocation = 155;
var viewOrient = "BACK";
var zAxis = ["UP","E","DOWN","W"];
var yAxis = ["N","E","S","W"];
var xAxis = ["UP","S","DOWN","N"];
var direction = "N";
var topfacing = "UP";
var yawAxis;
var rollAxis;
var pitchAxis;
var um;
var fm;
var lm;

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
	staticArt();
	// drawField(pos, fm, um, lm);
	// drawShipConsole();
	console.log(currentLocation);
	

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
	cubeShipPositioning(direction,topfacing,currentLocation,viewOrient);
	drawField(currentLocation, fm, um, lm);
}

function generateWorld() {
	// 1 - Nothing
	// 2 - Star
	// 3 - Livable Planet
	// 4 - Gaseous Planet
	// 5 - Liquid Planet
	// 6 - Asteroids
	// 7 - Space Dust
	// 8 - Worm Hole

	worldArray = [];

	for (i=0;i<(x*x*x);i++) {
		var rarityValue = 90;
		if ((i == 0) || ((i)%((x*x*x)-1) == 0)) {
			worldArray.push("8");
		}
		else if (i%rarityValue==0) {
			worldArray.push("2");
		}
		else if ((i>rarityValue/2) && (i%rarityValue==z || i%rarityValue==rarityValue-z || i%rarityValue==x || i%rarityValue==rarityValue-x || i%rarityValue==y || i%rarityValue==rarityValue-y)) {
			worldArray.push("3");
		}
		else {
			worldArray.push(1);	
		}
	}
	worldArray = worldArray.join("");
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
}

function loopView(isWhat) {
	if (isWhat > worldArray.length) {return worldArray[(isWhat - worldArray.length)-1];}
	else if (isWhat < 1) {return worldArray[(isWhat + worldArray.length)-1];}
	else {return worldArray[(isWhat-1)];	}
};

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

//for oganization
var n = 0;

var movArrArr = [
	[12,12,0,0,-12,12,12,12,12,12,0,-3,12,12,0,3,9,9,-6,6,6,6,-3,3,-12,-12,-12,12,0,0,-12,-12,-12,-12,-3,0,-12,-12,3,0,-6,-6,-3,3,-9,-9,-6,6,12,-1,12,-3,12,1,12,3,12,-2,12,0,12,0,12,0,12,2,12,-1,n,n,n,n,n,n],
	[-12,-12,-12,12,0,0,-12,-12,-12,-12,-3,0,-12,-12,3,0,-6,-6,-3,3,-9,-9,-6,6,12,12,0,0,-12,12,12,12,12,12,0,-3,12,12,0,3,9,9,-6,6,6,6,-3,3,-12,-3,-12,-1,-12,3,-12,1,-12,-2,-12,0,-12,0,-12,0,-12,2,-12,-3,n,n,n,n,n,n],
	[0,0,12,12,12,12,12,-12,-6,6,9,9,-6,6,6,6,0,-3,12,12,0,3,12,12,-12,12,-12,-12,-12,-12,0,0,-6,6,-6,-6,-6,6,-9,-9,-3,0,-12,-12,3,0,-12,-12,-1,12,1,12,-3,12,3,12,0,12,-2,12,2,12,0,12,0,12,-1,12,n,n,n,n,n,n],
	[-12,12,-12,-12,-12,-12,0,0,-6,6,-6,-6,-6,6,-9,-9,-3,0,-12,-12,3,0,-12,-12,0,0,12,12,12,12,12,-12,-6,6,9,9,-6,6,6,6,0,-3,12,12,0,3,12,12,-3,-12,3,-12,-1,-12,1,-12,0,-12,-2,-12,2,-12,0,-12,0,-12,-3,-12,n,n,n,n,n,n]
];

function move(a){
	var num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	angleLines("#000000");
	var movement = setInterval(function() {
		for (i=0;i<80;i++) {
			num[i]=num[i]+a[i];
		}
	  ctx.clearRect(0,0,1000,1000);
	  	// old space obj
		whichArt(oldPlanets[0].posNum,oldPlanets[0].xPos + num[48],oldPlanets[0].yPos + num[49],oldPlanets[0].size);
		whichArt(oldPlanets[1].posNum,oldPlanets[1].xPos + num[50],oldPlanets[1].yPos + num[51],oldPlanets[1].size);
		whichArt(oldPlanets[2].posNum,oldPlanets[2].xPos + num[56],oldPlanets[2].yPos + num[57],oldPlanets[2].size);
		whichArt(oldPlanets[3].posNum,oldPlanets[3].xPos + num[58],oldPlanets[3].yPos + num[59],oldPlanets[3].size);
		whichArt(oldPlanets[4].posNum,oldPlanets[4].xPos + num[60],oldPlanets[4].yPos + num[61],oldPlanets[4].size);
		whichArt(oldPlanets[5].posNum,oldPlanets[5].xPos + num[62],oldPlanets[5].yPos + num[63],oldPlanets[5].size);
		whichArt(oldPlanets[6].posNum,oldPlanets[6].xPos + num[52],oldPlanets[6].yPos + num[53],oldPlanets[6].size);
		whichArt(oldPlanets[7].posNum,oldPlanets[7].xPos + num[54],oldPlanets[7].yPos + num[55],oldPlanets[7].size);
		whichArt(oldPlanets[8].posNum,oldPlanets[8].xPos + num[64],oldPlanets[8].yPos + num[65],oldPlanets[8].size);
		whichArt(oldPlanets[9].posNum,oldPlanets[9].xPos + num[66],oldPlanets[9].yPos + num[67],oldPlanets[9].size);
		whichArt(oldPlanets[10].posNum,oldPlanets[10].xPos,oldPlanets[10].yPos,oldPlanets[10].size);
		whichArt(oldPlanets[11].posNum,oldPlanets[11].xPos,oldPlanets[11].yPos,oldPlanets[11].size);
		whichArt(oldPlanets[12].posNum,oldPlanets[12].xPos,oldPlanets[12].yPos,oldPlanets[12].size);
		whichArt(oldPlanets[13].posNum,oldPlanets[13].xPos,oldPlanets[13].yPos,oldPlanets[13].size);
		whichArt(oldPlanets[14].posNum,oldPlanets[14].xPos,oldPlanets[14].yPos,oldPlanets[14].size);
		whichArt(oldPlanets[15].posNum,oldPlanets[15].xPos,oldPlanets[15].yPos,oldPlanets[15].size);
		whichArt(oldPlanets[16].posNum,oldPlanets[16].xPos,oldPlanets[16].yPos,oldPlanets[16].size);
		whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size);
		whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos,oldPlanets[18].size);

		ctx.beginPath();
		ctx.moveTo(50 + num[0], 50 + num[2]);
		ctx.lineTo(950 + num[1], 50 + num[4]);
		ctx.lineTo(950 + num[6], 950 + num[5]);
		ctx.lineTo(50 + num[7], 950 + num[3]);
		ctx.lineTo(50 + num[0], 50 + num[2]);
		ctx.moveTo(50 + num[8], 350 + num[10]);
		ctx.lineTo(950 + num[9], 350 + num[11]);
		ctx.moveTo(50 + num[12], 650 + num[14]);
		ctx.lineTo(950 + num[13], 650 + num[15]);
		ctx.moveTo(350 + num[16], 50 + num[18]);
		ctx.lineTo(350 + num[17], 950 + num[19]);
		ctx.moveTo(650 + num[20], 50 + num[22]);
		ctx.lineTo(650 + num[21], 950 + num[23]);
		ctx.moveTo(50 + (a[24]*75) - num[24], 50 + (a[26]*75) - num[26]);
		ctx.lineTo(950 + (a[25]*75) - num[25], 50 + (a[28]*75) - num[28]);
		ctx.lineTo(950 + (a[30]*75) - num[30], 950 + (a[29]*75) - num[29]);
		ctx.lineTo(50 + (a[31]*75) - num[31], 950 + (a[27]*75) - num[27]);
		ctx.lineTo(50 + (a[24]*75) - num[24], 50 + (a[26]*75) - num[26]);
		ctx.moveTo(50 + (a[32]*75) - num[32], 350 + (a[34]*75) - num[34]);
		ctx.lineTo(950 + (a[33]*75) - num[33], 350 + (a[35]*75) - num[35]);
		ctx.moveTo(50 + (a[36]*75) - num[36], 650 + (a[38]*75) - num[38]);
		ctx.lineTo(950 + (a[37]*75) - num[37], 650 + (a[39]*75) - num[39]);
		ctx.moveTo(350 + (a[40]*75) - num[40], 50 + (a[42]*75) - num[42]);
		ctx.lineTo(350 + (a[41]*75) - num[41], 950 + (a[43]*75) - num[43]);
		ctx.moveTo(650 + (a[44]*75) - num[44], 50 + (a[46]*75) - num[46]);
		ctx.lineTo(650 + (a[45]*75) - num[45], 950 + (a[47]*75) - num[47]);
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 2;
		ctx.stroke();
		//
		


		//
		//back top left
		whichArt(loopView(currentLocation + um + 2*fm - lm),200 + (a[24]*75) - num[24],200 + (a[26]*75) - num[26],100);
		//back top right
		whichArt(loopView(currentLocation + um + 2*fm + lm),800 + (a[24]*75) - num[24],200 + (a[26]*75) - num[26],100);
		//back top center
		whichArt(loopView(currentLocation + um + 2*fm),500,200,100);
		//back middle left
		whichArt(loopView(currentLocation + 2*fm - lm),200,500,100);
		//back middle right
		whichArt(loopView(currentLocation + 2*fm + lm),800,500,100);
		//back middle center
		whichArt(loopView(currentLocation + 2*fm),500,500,150);
		//back bottom left
		whichArt(loopView(currentLocation - um + 2*fm - lm),200,800,100);
		//back bottom right
		whichArt(loopView(currentLocation - um + 2*fm + lm),800,800,100);
		//back bottom center
		whichArt(loopView(currentLocation - um + 2*fm),500,800,100);
		//top left
		whichArt(loopView(currentLocation + um + fm - lm),200,200,200);
		//top right
		whichArt(loopView(currentLocation + um + fm + lm),800,200,200);
		//top center
		whichArt(loopView(currentLocation + um + fm),500,200,200);
		//bottom left
		whichArt(loopView(currentLocation - um + fm - lm),200,800,200);
		//bottom right
		whichArt(loopView(currentLocation - um + fm + lm),800,800,200);
		//bottom center
		whichArt(loopView(currentLocation - um + fm),500,800,200);
		//middle left
		whichArt(loopView(currentLocation + fm - lm),200, 500, 200);
		//middle right
		whichArt(loopView(currentLocation + fm + lm),800, 500, 200);
		//middle center
		whichArt(loopView(currentLocation + fm),500,500,350);

		ctx.closePath();
	  if (num[0] > 890 || num[2] > 890 || num[0] < -890 || num[2] < -890) clearInterval(movement),angleLines("#000000"),staticArt(),drawField(currentLocation, fm, um, lm);
	}, 15);
};

function rotateShape(direction, rAxes, lr) {
	var a=0;
	var center = [500,500];
	ctx.save();
	var movement = setInterval(function() {		
		a=a+1
		ctx.clearRect(-200,-200,1200,1200);
		ctx.beginPath();		
		ctx.moveTo(50, 50);
		ctx.lineTo(950, 50);
		ctx.lineTo(950, 950);
		ctx.lineTo(50, 950);
		ctx.lineTo(50, 50);
		ctx.moveTo(50, 350);
		ctx.lineTo(950, 350);
		ctx.moveTo(50, 650);
		ctx.lineTo(950, 650);z
		ctx.moveTo(350, 50);
		ctx.lineTo(350, 950);
		ctx.moveTo(650, 50);
		ctx.lineTo(650, 950);
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
		drawField(currentLocation, fm, um, lm);
		ctx.translate(500,500);
	 	ctx.rotate(direction * Math.PI / 180);
		ctx.translate(-500,-500);
	  if (a > 90 || a < -90) clearInterval(movement),angleLines("#000000"),ctx.restore(),staticArt(),shipRotation(rAxes, lr),drawField(currentLocation, fm, um, lm);
	}, 10);
}

function angleLines(color) {
	// angle lines
	ctx.beginPath();
	// top left
	ctx.moveTo(0, 0);
	ctx.lineTo(50, 50);
	// top right
	ctx.moveTo(1000, 0);
	ctx.lineTo(950, 50);
	// bottom left
	ctx.moveTo(0, 1000);
	ctx.lineTo(50, 950);
	// bottom right
	ctx.moveTo(1000, 1000);
	ctx.lineTo(950, 950);
	//middle angles
	//left top
	ctx.moveTo(0, 335);
	ctx.lineTo(50, 350);
	//bottom maybe
	ctx.moveTo(1000, 335);
	ctx.lineTo(950, 350);
	// top right
	ctx.moveTo(665, 0);
	ctx.lineTo(650, 50);
	// top left
	ctx.moveTo(335, 0);
	ctx.lineTo(350, 50);
	// left bottom
	ctx.moveTo(0, 665);
	ctx.lineTo(50, 650);
	// right bottom
	ctx.moveTo(1000, 665);
	ctx.lineTo(950, 650);
	// bottom maybe
	ctx.moveTo(665, 1000);
	ctx.lineTo(650, 950);
	// no idea
	ctx.moveTo(335, 1000);
	ctx.lineTo(350, 950);
	ctx.strokeStyle = color;
	ctx.lineWidth = 6;
	ctx.stroke();
	ctx.closePath();
}

function staticArt() {
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();

	// Back items
	// for (var i = 0; i < 3; i++) {
 //    	for (var j = 0; j < 3; j++) {
	// 	ctx.save();
	// 	ctx.beginPath();
	// 	ctx.translate(j * 300, i * 300);
	// 	ctx.strokeStyle = "#ffffff";
	// 	ctx.rect(50, 50, 300, 300);
	// 	ctx.stroke();
	// 	ctx.closePath();
	// 	ctx.restore();
	// 	}
	// }

	//front
	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(950, 50);
	ctx.lineTo(950, 950);
	ctx.lineTo(50, 950);
	ctx.lineTo(50, 50);
	ctx.moveTo(50, 350);
	ctx.lineTo(950, 350);
	ctx.moveTo(50, 650);
	ctx.lineTo(950, 650);
	ctx.moveTo(350, 50);
	ctx.lineTo(350, 950);
	ctx.moveTo(650, 50);
	ctx.lineTo(650, 950);
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();

	// Middle items
	// for (var i = 0; i < 3; i++) {
 //    	for (var j = 0; j < 3; j++) {
	// 	ctx.save();
	// 	ctx.beginPath();
	// 	ctx.translate(j * 700, i * 700);
	// 	ctx.strokeStyle = "#ffffff";
	// 	ctx.rect(-550, -550, 700, 700);
	// 	ctx.stroke();
	// 	ctx.closePath();
	// 	ctx.restore();
	// 	}
	// }
	
	

	// Stars
	for (var j = 1; j < 100; j++) {
	    ctx.save();
	    ctx.fillStyle = '#ffffff';
	    ctx.translate(1000 - Math.floor(Math.random() * 1000),
	                  1000 - Math.floor(Math.random() * 1000));
	    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
	    ctx.restore();
	}

	

	// Windshield
	// ctx.beginPath();
	// ctx.moveTo(200, 0);
	// ctx.lineTo(450, 0);
	// ctx.lineTo(250, 1000);
	// ctx.lineTo(0, 1000);
	// ctx.fillStyle = "rgba(255, 255, 255, .7)";
	// ctx.fill();
	// ctx.closePath();

	

	}


// Only shapes here down
function drawField(pos, fm, um, lm) {
	oldPlanets.length = 0;
	//back top left
	whichArt(loopView(pos + um + 2*fm - lm),200,200,100);
	//back top right
	whichArt(loopView(pos + um + 2*fm + lm),800,200,100);
	//back top center
	whichArt(loopView(pos + um + 2*fm),500,200,100);
	//back middle left
	whichArt(loopView(pos + 2*fm - lm),200,500,100);
	//back middle right
	whichArt(loopView(pos + 2*fm + lm),800,500,100);
	//back middle center
	whichArt(loopView(pos + 2*fm),500,500,150);
	//back bottom left
	whichArt(loopView(pos - um + 2*fm - lm),200,800,100);
	//back bottom right
	whichArt(loopView(pos - um + 2*fm + lm),800,800,100);
	//back bottom center
	whichArt(loopView(pos - um + 2*fm),500,800,100);
	//top left
	whichArt(loopView(pos + um + fm - lm),200,200,200);
	//top right
	whichArt(loopView(pos + um + fm + lm),800,200,200);
	//top center
	whichArt(loopView(pos + um + fm),500,200,200);
	//bottom left
	whichArt(loopView(pos - um + fm - lm),200,800,200);
	//bottom right
	whichArt(loopView(pos - um + fm + lm),800,800,200);
	//bottom center
	whichArt(loopView(pos - um + fm),500,800,200);
	//middle left
	whichArt(loopView(pos + fm - lm),200, 500, 200);
	//middle right
	whichArt(loopView(pos + fm + lm),800, 500, 200);
	//middle center
	whichArt(loopView(pos + fm),500,500,350);

	
	//current pos
	switch (direction) {
		case ("DOWN"):
		whichArt(loopView(pos),500,500,1000);
		break;
		case ("UP"):
		break;
		case ("N"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000);
				break;
				case ("W"):
				whichArt(loopView(pos),-200,500,1000);
				break;
				case ("E"):
				whichArt(loopView(pos),1200,500,1000);
				break;

			}
		break;
		case ("S"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000);
				break;
				case ("E"):
				whichArt(loopView(pos),-200,500,1000);
				break;
				case ("W"):
				whichArt(loopView(pos),1200,500,1000);
				break;
			}
		break;
		case ("E"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000);
				break;
				case ("N"):
				whichArt(loopView(pos),-200,500,1000);
				break;
				case ("S"):
				whichArt(loopView(pos),1200,500,1000);
				break;
			}
		break;
		case ("W"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000);
				break;
				case ("S"):
				whichArt(loopView(pos),-200,500,1000);
				break;
				case ("N"):
				whichArt(loopView(pos),1200,500,1000);
				break;
			}
		break;
		default:console.log("Not set up yet");
	}
}

function SpaceObject(posNum,xPos,yPos,size) {
	this.posNum = posNum;
	this.xPos = xPos;
	this.yPos = yPos;
	this.size = size;
}

var oldPlanets = [];

	
function whichArt(posNum,xPos,yPos,size) {
	// 1 - Nothing
	// 2 - Star
	// 3 - Livable Planet
	// 4 - Gaseous Planet
	// 5 - Liquid Planet
	// 6 - Asteroids
	// 7 - Space Dust
	// 8 - Worm Hole
	switch (posNum) {
		case ("1"):
		break;
		case ("2"):
		ctx.beginPath();
	    ctx.arc(xPos, yPos, size, size, Math.PI * 2, true);
	    ctx.fillStyle = "rgba(255, 255, 0, 1)";
	    ctx.fill();
		ctx.closePath();
		break;
		case ("3"):
		ctx.beginPath();
	    ctx.arc(xPos, yPos, size/2, size/2, Math.PI * 2, true);
	    ctx.fillStyle = "rgba(0, 255, 0, 1)";
	    ctx.fill();
		ctx.closePath();
		break;
		case ("4"):
		ctx.beginPath();
	    ctx.arc(xPos, yPos, size/2, size/2, Math.PI * 2, true);
	    ctx.fillStyle = "rgba(0, 0, 255, 1)";
	    ctx.fill();
		ctx.closePath();
		break;
		default: console.log(posNum);
	};
	oldPlanets.push(new SpaceObject(posNum,xPos,yPos,size));	
}

function drawShipConsole() {
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
drawField(currentLocation, fm, um, lm);
