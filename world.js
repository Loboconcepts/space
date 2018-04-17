var worldArray;
var i = 0;
var x = 7;
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
	staticArt();
	drawField(pos, fm, um, lm);
	// drawShipConsole();
	

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

function move(a){
	console.log(a);
	var num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var movement = setInterval(function() {
		for (i=0;i<24;i++) {
			num[i]=num[i]+a[i];
		}
	  ctx.clearRect(0,0,1000,1000);
	  staticArt();
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
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth=2;
		ctx.stroke();
		ctx.closePath();
	  if (num[0] > 890 || num[2] > 890 || num[0] < -890 || num[2] < -890) clearInterval(movement);
	}, 15);
};

function staticArt() {
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();

	// Back items
	for (var i = 0; i < 3; i++) {
    	for (var j = 0; j < 3; j++) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(j * 300, i * 300);
		ctx.strokeStyle = "#ffffff";
		ctx.rect(50, 50, 300, 300);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		}
	}

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
	ctx.stroke();
	ctx.closePath();

	// Middle items
	for (var i = 0; i < 3; i++) {
    	for (var j = 0; j < 3; j++) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(j * 700, i * 700);
		ctx.strokeStyle = "#ffffff";
		ctx.rect(-550, -550, 700, 700);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		}
	}

	// angle lines
	ctx.beginPath();
	ctx.moveTo(0, 0);
	// top left
	ctx.lineTo(50, 50);
	ctx.moveTo(150, 150);
	ctx.lineTo(350, 350);
	// top right
	ctx.moveTo(1000, 0);
	ctx.lineTo(950, 50);
	ctx.moveTo(850, 150);
	ctx.lineTo(650, 350);
	// bottom left
	ctx.moveTo(0, 1000);
	ctx.lineTo(50, 950);
	ctx.moveTo(150, 850);
	ctx.lineTo(350, 650);
	// bottom right
	ctx.moveTo(1000, 1000);
	ctx.lineTo(950, 950);
	ctx.moveTo(850, 850);
	ctx.lineTo(650, 650);
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

	ctx.strokeStyle = "#ffffff";
	ctx.stroke();
	ctx.closePath();

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
	//back top left
	whichArt(loopView(pos + um + 2*fm - lm),200,200,100);
	//back top center
	whichArt(loopView(pos + um + 2*fm),500,200,100);
	//back top right
	whichArt(loopView(pos + um + 2*fm + lm),800,200,100);
	//back middle left
	whichArt(loopView(pos + 2*fm - lm),200,500,100);
	//back middle center
	whichArt(loopView(pos + 2*fm),500,500,150);
	//back middle right
	whichArt(loopView(pos + 2*fm + lm),800,500,100);
	//back bottom left
	whichArt(loopView(pos - um + 2*fm - lm),200,800,100);
	//back bottom center
	whichArt(loopView(pos - um + 2*fm),500,800,100);
	//back bottom right
	whichArt(loopView(pos - um + 2*fm + lm),800,800,100);
	//top center
	whichArt(loopView(pos + um + fm),500,100,200);
	//top left
	whichArt(loopView(pos + um + fm - lm),100,100,200);
	//top right
	whichArt(loopView(pos + um + fm + lm),800,100,200);
	//bottom center
	whichArt(loopView(pos - um + fm),500,800,200);
	//bottom left
	whichArt(loopView(pos - um + fm - lm),100,800,200);
	//bottom right
	whichArt(loopView(pos - um + fm + lm),800,800,200);
	//middle left
	whichArt(loopView(pos + fm - lm),100, 500, 200);
	//middle center
	whichArt(loopView(pos + fm),500,500,350);
	//middle right
	whichArt(loopView(pos + fm + lm),900, 500, 200);
	//current pos
	switch (direction) {
		case ("DOWN"):
		whichArt(loopView(pos),500,500,1000);
		break;
		case ("UP"):
		console.log("facing up");
		break;
		case ("N"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1100,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-100,1000);
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
				whichArt(loopView(pos),500,1100,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-100,1000);
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
				whichArt(loopView(pos),500,1100,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-100,1000);
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
				whichArt(loopView(pos),500,1100,1000);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-100,1000);
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

