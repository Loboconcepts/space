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
// canvas.style.width = (W * Math.min(window.innerWidth/W)) + "px";
// canvas.style.height = ((H * Math.min(window.innerHeight/H))/2) + "px";
canvas.style.width = "100%";
canvas.style.maxWidth = "500px";
canvas.style.height = "auto";
canvas.style.maxHeight = "500px";
canvas.style.backgroundColor = "#000000";
// canvas.style.left = (window.innerWidth * 0.5 - W * scale * 0.5) + "px";
// canvas.style.top = (window.innerHeight * 0.5 - H * scale * 0.5) + "px";

var ctx = canvas.getContext("2d");

dataUrl = canvas.toDataURL();
// your_div.style.background='url('+dataUrl+')'

////             y- /x-
////             | /
////             |/
////  	z-_______*_______z+
////            /|
////           / |
////       x+ /  y+


// Determine axis

function generateWorld() {
	worldArray = [];
	for (i=0;i<(x*x*x);i++) {
		if (i == (x*x*x-1)) {
			worldArray.push("8");
		}
		else if (i%rarityValue==0 && i!=0) {
			worldArray.push("2");
		}
		// (currentLocation-1)%rarityValue = 17 & 114. All values = 131. Y axis not working because y > rarityValue.
		else if ((i%rarityValue==rarityValue-(z%rarityValue) || i%rarityValue==z%rarityValue || i%rarityValue==rarityValue-(x%rarityValue) || i%rarityValue==x%rarityValue || i%rarityValue==rarityValue-(y%rarityValue) || i%rarityValue==y%rarityValue)) {
			if (i%9==0 || i%6==0 || i%4==0) {
				worldArray.push("3")
			}
			else if (i%7==0) {
				worldArray.push("4")
			}
			else {
				worldArray.push("1");
			};
		}
		else if (i%256==0) {
				worldArray.push("x")
		}
		else if (i%244==0) {
				worldArray.push("z")
		}
		else {
			worldArray.push("1");	
		};
	};
	worldArray = worldArray.join("");
};

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
};

function cubeShipPositioning(direction, topfacing, pos, orient) {
	// ctx.clearRect(0, 0, 1000, 1000);
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
	// if (orient == "BACK") {
	// 	tableView("t0-0",(pos + 2*um - lm));
	// 	tableView("t0-1",(pos + 2*um));
	// 	tableView("t0-2",(pos + 2*um + lm));
	// 	tableView("t1-0",(pos + um - lm));
	// 	tableView("t1-1",(pos + um)); 
	// 	tableView("t1-2",(pos + um + lm));
	// 	tableView("t2-0",(pos - lm));
	// 	tableView("t2-1","&#8743;<br>&#9669;&#9677;&#9677;&#9677;&#9659;"); 
	// 	tableView("t2-2",(pos + lm)); 
	// }
	// if (orient == "TOP") {
	// 	tableView("t0-0",(pos + 2*fm - lm));
	// 	tableView("t0-1",(pos + 2*fm));
	// 	tableView("t0-2",(pos + 2*fm + lm));
	// 	tableView("t1-0",(pos + fm - lm));
	// 	tableView("t1-1",(pos + fm));
	// 	tableView("t1-2",(pos + fm + lm));
	// 	tableView("t2-0",(pos - lm));
	// 	tableView("t2-1","&#9651;<br>&#8834;&#8890;&#8835;<br>&#9677;&#9677;&#9677;");
	// 	tableView("t2-2",(pos + lm));
	// }
	// drawField(pos, fm, um, lm);
	// drawShipConsole();
	// console.log(currentLocation);
	

	// document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
}

function shipRotation(rAxes, lr) {
	
	axisFinder();

	function loopThroughArray(rAxis, array, topOrDir, lr) {
		// console.log("rAxis: " + rAxis + "\n" + "array: " + array + "\n" + "topOrDir: " + topOrDir + "\n" + "left right: " + lr);
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
	// document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
	cubeShipPositioning(direction, topfacing, currentLocation, viewOrient);
}

// function switchOrientation() {
// 	if (viewOrient == "BACK") {
// 		viewOrient = "TOP";
// 		cubeShipPositioning(direction, topfacing, currentLocation, viewOrient);
// 	}
// 	else {
// 		viewOrient = "BACK";
// 		cubeShipPositioning(direction, topfacing, currentLocation, viewOrient);
// 	}
// }

function disableButtons(bool) {
	if (bool) {
		if (!cruiseControl || !weCruisin) {
			document.getElementById("user").disabled = true;	
		}
		// for (i=0;i<document.querySelectorAll("button").length;i++) {
		// 	document.querySelectorAll("button")[i].disabled = true;
		// }
	};
	if (!bool) {
		document.getElementById("user").disabled = false;
		document.getElementById("user").focus();
		// for (i=0;i<document.querySelectorAll("button").length;i++) {
		// 	document.querySelectorAll("button")[i].disabled = false;
		// }
	};
}

function loopView(isWhat) {
	if (isWhat > worldArray.length) {return worldArray[(isWhat - worldArray.length)-1];}
	else if (isWhat < 1) {return worldArray[(isWhat + worldArray.length)-1];}
	else {return worldArray[(isWhat-1)];	}
};

//for oganization
var n = 0;

var movArrArr = [
	[12,12,0,0,-12,12,12,12,12,12,0,-3,12,12,0,3,9,9,-6,6,6,6,-3,3,-12,-12,-12,12,0,0,-12,-12,-12,-12,-3,0,-12,-12,3,0,-6,-6,-3,3,-9,-9,-6,6,12,0,8,0,9,0],
	[-12,-12,-12,12,0,0,-12,-12,-12,-12,-3,0,-12,-12,3,0,-6,-6,-3,3,-9,-9,-6,6,12,12,0,0,-12,12,12,12,12,12,0,-3,12,12,0,3,9,9,-6,6,6,6,-3,3,-12,0,-8,0,-9,0],
	[0,0,12,12,12,12,12,-12,-6,6,9,9,-6,6,6,6,0,-3,12,12,0,3,12,12,-12,12,-12,-12,-12,-12,0,0,-6,6,-6,-6,-6,6,-9,-9,-3,0,-12,-12,3,0,-12,-12,0,12,0,8,0,9],
	[-12,12,-12,-12,-12,-12,0,0,-6,6,-6,-6,-6,6,-9,-9,-3,0,-12,-12,3,0,-12,-12,0,0,12,12,12,12,12,-12,-6,6,9,9,-6,6,6,6,0,-3,12,12,0,3,12,12,0,-12,0,-8,0,-9]
];

// movefunc
function move(a){
	var num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var newYPos;
	var newXPos;
	var c = 0;
	oldStars = [...newStars];
	newStars.length=0;
	disableButtons(true);

	var movement = setInterval(function() {
		for (i=0;i<80;i++) {
			num[i]=num[i]+a[i];
		}
		c = c+1;
		
	  ctx.clearRect(0,0,1000,1000);

	  // background stars
	  oldStars.forEach(function(el) {
	  	function sizeMove() {if (Math.floor(11-el.size/2)<2) {return 2} else return Math.floor(11-el.size/2)};
	  	drawDistantStar(el.xPos+Math.floor(num[48]/2.5)*sizeMove(), el.yPos+Math.floor(num[49]/2.5)*sizeMove(), el.size);
	  });
	  if (c<2) {backgroundArt();outerBackgroundArt();};
	

	  newStars.forEach(function(el) {
	  	function sizeMove() {if (Math.floor(11-el.size/2)<2) {return 2} else return Math.floor(11-el.size/2)};
	  	drawDistantStar(el.xPos-Math.floor((a[48]*75)/2.5)*sizeMove()+Math.floor(num[48]/2.5)*sizeMove(), el.yPos-Math.floor((a[49]*75)/2.5)*sizeMove()+Math.floor(num[49]/2.5)*sizeMove(), el.size);
	  });



	  // drawDistantStar((500)+(num[48]*randarr[0]), (500)+(num[49]*randarr[0]), (15/(randarr[0]/2)));

	  	// GOING AWAY
		//back top left
		whichArt(oldPlanets[0].posNum,oldPlanets[0].xPos + num[48],oldPlanets[0].yPos + num[49],oldPlanets[0].size,oldPlanets[0].actPos);
		//back top right
		whichArt(oldPlanets[1].posNum,oldPlanets[1].xPos + num[48],oldPlanets[1].yPos + num[49],oldPlanets[1].size,oldPlanets[1].actPos);
		//back top center
		whichArt(oldPlanets[2].posNum,oldPlanets[2].xPos + num[48],oldPlanets[2].yPos + num[49],oldPlanets[2].size,oldPlanets[2].actPos);
		//back middle left
		whichArt(oldPlanets[3].posNum,oldPlanets[3].xPos + num[48],oldPlanets[3].yPos + num[49],oldPlanets[3].size,oldPlanets[3].actPos);
		//back middle right
		whichArt(oldPlanets[4].posNum,oldPlanets[4].xPos + num[48],oldPlanets[4].yPos + num[49],oldPlanets[4].size,oldPlanets[4].actPos);
		//back middle center
		whichArt(oldPlanets[5].posNum,oldPlanets[5].xPos + num[48],oldPlanets[5].yPos + num[49],oldPlanets[5].size,oldPlanets[5].actPos);
		//back bottom left
		whichArt(oldPlanets[6].posNum,oldPlanets[6].xPos + num[48],oldPlanets[6].yPos + num[49],oldPlanets[6].size,oldPlanets[6].actPos);
		//back bottom right
		whichArt(oldPlanets[7].posNum,oldPlanets[7].xPos + num[48],oldPlanets[7].yPos + num[49],oldPlanets[7].size,oldPlanets[7].actPos);
		//back bottom center
		whichArt(oldPlanets[8].posNum,oldPlanets[8].xPos + num[48],oldPlanets[8].yPos + num[49],oldPlanets[8].size,oldPlanets[8].actPos);

		// COMING IN
		//back top left
		whichArt(loopView(currentLocation + um + 2*fm - lm),300 + (a[48]*75*-1) - (num[48]*-1),300 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation + um + 2*fm - lm);
		//back top right
		whichArt(loopView(currentLocation + um + 2*fm + lm),700 + (a[48]*75*-1) - (num[48]*-1),300 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation + um + 2*fm + lm);
		//back top center
		whichArt(loopView(currentLocation + um + 2*fm),500 + (a[48]*75*-1) - (num[48]*-1),300 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation + um + 2*fm);
		//back middle left
		whichArt(loopView(currentLocation + 2*fm - lm),300 + (a[48]*75*-1) - (num[48]*-1),500 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation + 2*fm - lm);
		//back middle right
		whichArt(loopView(currentLocation + 2*fm + lm),700 + (a[48]*75*-1) - (num[48]*-1),500 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation + 2*fm + lm);
		//back middle center
		whichArt(loopView(currentLocation + 2*fm),500 + (a[48]*75*-1) - (num[48]*-1),500 + (a[49]*75*-1) - (num[49]*-1),150,currentLocation + 2*fm);
		//back bottom left
		whichArt(loopView(currentLocation - um + 2*fm - lm),300 + (a[48]*75*-1) - (num[48]*-1),700 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation - um + 2*fm - lm);
		//back bottom right
		whichArt(loopView(currentLocation - um + 2*fm + lm),700 + (a[48]*75*-1) - (num[48]*-1),700 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation - um + 2*fm + lm);
		//back bottom center
		whichArt(loopView(currentLocation - um + 2*fm),500 + (a[48]*75*-1) - (num[48]*-1),700 + (a[49]*75*-1) - (num[49]*-1),100,currentLocation - um + 2*fm);
		
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
		ctx.strokeStyle = "rgba(100, 100, 100,1)";
		ctx.lineWidth = 4;
		ctx.stroke();

		// GOING AWAY
		//top left
		whichArt(oldPlanets[9].posNum,oldPlanets[9].xPos + num[50],oldPlanets[9].yPos + num[51],oldPlanets[9].size,oldPlanets[9].actPos);
		//top right
		whichArt(oldPlanets[10].posNum,oldPlanets[10].xPos + num[50],oldPlanets[10].yPos + num[51],oldPlanets[10].size,oldPlanets[10].actPos);
		//top center
		whichArt(oldPlanets[11].posNum,oldPlanets[11].xPos + num[50],oldPlanets[11].yPos + num[51],oldPlanets[11].size,oldPlanets[11].actPos);
		//bottom left
		whichArt(oldPlanets[12].posNum,oldPlanets[12].xPos + num[50],oldPlanets[12].yPos + num[51],oldPlanets[12].size,oldPlanets[12].actPos);
		//bottom right
		whichArt(oldPlanets[13].posNum,oldPlanets[13].xPos + num[50],oldPlanets[13].yPos + num[51],oldPlanets[13].size,oldPlanets[13].actPos);
		//bottom center
		whichArt(oldPlanets[14].posNum,oldPlanets[14].xPos + num[50],oldPlanets[14].yPos + num[51],oldPlanets[14].size,oldPlanets[14].actPos);
		//middle left
		whichArt(oldPlanets[15].posNum,oldPlanets[15].xPos + num[50],oldPlanets[15].yPos + num[51],oldPlanets[15].size,oldPlanets[15].actPos);
		//middle right
		whichArt(oldPlanets[16].posNum,oldPlanets[16].xPos + num[50],oldPlanets[16].yPos + num[51],oldPlanets[16].size,oldPlanets[16].actPos);
		//middle center
		whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos + num[50],oldPlanets[17].yPos + num[51],oldPlanets[17].size,oldPlanets[17].actPos);

		// COMING IN
		//top left
		whichArt(loopView(currentLocation + um + fm - lm),200 + (a[50]*75*-1) - (num[50]*-1),200 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation + um + fm - lm);
		//top right
		whichArt(loopView(currentLocation + um + fm + lm),800 + (a[50]*75*-1) - (num[50]*-1),200 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation + um + fm + lm);
		//top center
		whichArt(loopView(currentLocation + um + fm),500 + (a[50]*75*-1) - (num[50]*-1),200 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation + um + fm);
		//bottom left
		whichArt(loopView(currentLocation - um + fm - lm),200 + (a[50]*75*-1) - (num[50]*-1),800 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation - um + fm - lm);
		//bottom right
		whichArt(loopView(currentLocation - um + fm + lm),800 + (a[50]*75*-1) - (num[50]*-1),800 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation - um + fm + lm);
		//bottom center
		whichArt(loopView(currentLocation - um + fm),500 + (a[50]*75*-1) - (num[50]*-1),800 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation - um + fm);
		//middle left
		whichArt(loopView(currentLocation + fm - lm),200 + (a[50]*75*-1) - (num[50]*-1), 500 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation + fm - lm);
		//middle right
		whichArt(loopView(currentLocation + fm + lm),800 + (a[50]*75*-1) - (num[50]*-1), 500 + (a[51]*75*-1) - (num[51]*-1),200,currentLocation + fm + lm);
		//middle center
		whichArt(loopView(currentLocation + fm),500 + (a[50]*75*-1) - (num[50]*-1),500 + (a[51]*75*-1) - (num[51]*-1),250,currentLocation + fm);

		
		switch (direction) {
			case ("DOWN"):
				newXPos = 500;
				newYPos = 500;
			break;
			case ("UP"):
				newXPos = -2000;
				newYPos = -2000;
			break;
			case ("N"):
				switch(topfacing) {
					case ("UP"):
					newXPos = 500;
					newYPos = 1200;
					break;
					case ("DOWN"):
					newXPos = 500;
					newYPos = -200;
					break;
					case ("W"):
					newXPos = -200;
					newYPos = 500;
					break;
					case ("E"):
					newXPos = 1200;
					newYPos = 500;
					break;
				}
			break;
			case ("S"):
				switch(topfacing) {
					case ("UP"):
					newXPos = 500;
					newYPos = 1200;
					break;
					case ("DOWN"):
					newXPos = 500;
					newYPos = -200;
					break;
					case ("E"):
					newXPos = -200;
					newYPos = 500;
					break;
					case ("W"):
					newXPos = 1200;
					newYPos = 500;
					break;
				}
			break;
			case ("E"):
				switch(topfacing) {
					case ("UP"):
					newXPos = 500;
					newYPos = 1200;
					break;
					case ("DOWN"):
					newXPos = 500;
					newYPos = -200;
					break;
					case ("N"):
					newXPos = -200;
					newYPos = 500;
					break;
					case ("S"):
					newXPos = 1200;
					newYPos = 500;
					break;
				}
			break;
			case ("W"):
				switch(topfacing) {
					case ("UP"):
					newXPos = 500;
					newYPos = 1200;
					break;
					case ("DOWN"):
					newXPos = 500;
					newYPos = -200;
					break;
					case ("S"):
					newXPos = -200;
					newYPos = 500;
					break;
					case ("N"):
					newXPos = 1200;
					newYPos = 500;
					break;
				}
			break;
			default:console.log("Not set up yet");
		}

		if (oldPlanets[18].xPos == newXPos && oldPlanets[18].yPos == newYPos) {
			whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos,oldPlanets[18].size,oldPlanets[18].actPos);
		}
		else {
			switch (direction) {
				case ("DOWN"):
				whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
				break;
				case ("UP"):
				whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos + num[52],oldPlanets[18].yPos + num[53],oldPlanets[18].size,oldPlanets[18].actPos);
				break;
				case ("N"):
					switch(topfacing) {
						case ("UP"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),1200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("DOWN"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),-200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("W"):
						whichArt(loopView(currentLocation),-200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("E"):
						whichArt(loopView(currentLocation),1200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
					}
				break;
				case ("S"):
					switch(topfacing) {
						case ("UP"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),1200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("DOWN"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),-200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("E"):
						whichArt(loopView(currentLocation),-200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("W"):
						whichArt(loopView(currentLocation),1200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
					}
				break;
				case ("E"):
					switch(topfacing) {
						case ("UP"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),1200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("DOWN"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),-200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("N"):
						whichArt(loopView(currentLocation),-200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("S"):
						whichArt(loopView(currentLocation),1200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
					}
				break;
				case ("W"):
					switch(topfacing) {
						case ("UP"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),1200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("DOWN"):
						whichArt(loopView(currentLocation),500 + (a[52]*75*-1) - (num[52]*-1),-200 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("S"):
						whichArt(loopView(currentLocation),-200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
						case ("N"):
						whichArt(loopView(currentLocation),1200 + (a[52]*75*-1) - (num[52]*-1),500 + (a[53]*75*-1) - (num[53]*-1),1000,currentLocation);
						break;
					}
				break;
				default:console.log("Not set up yet");
			}
		}
		ctx.closePath();
	  if (c > 75) clearInterval(movement),disableButtons(false),drawField(currentLocation),generalState();
	}, 15);
};

function land(a){
	var num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var newYPos;
	var newXPos;
	var c = 1;
	disableButtons(true);
	var movement = setInterval(function() {
		for (i=0;i<80;i++) {
			num[i]=num[i]+a[i];
		}
		c = c+1;
	  ctx.clearRect(0,0,1000,1000);
	  	// ctx.rect(0, 0, canvas.width, canvas.height);
	  	// ctx.fillStyle="rgba("+rgbGenerateFromCurPos(currentLocation)[2]+","+rgbGenerateFromCurPos(currentLocation)[0]+","+rgbGenerateFromCurPos(currentLocation)[1]+","+ c/255 +")";
	  	// ctx.fillStyle = "rgb(" + Math.floor(c/2) + ", " + Math.floor(c/2) + ", " + c + ")";
		// ctx.fill();
	  	whichArt(loopView(currentLocation),500,500+(c*29),1000+(c*57),currentLocation);

	  	
		
		ctx.closePath();

		// if (c > 206 ) {
	 //  		alienLife(0,(1000-((c-200)*20)))	
	 //  		console.log((3120-((c-200)*20)));
	 //  	};

	  if (c > 255) clearInterval(movement),disableButtons(false);
	}, 15);
};

function launch(a){
	var num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var newYPos;
	var newXPos;
	var c = 1;
	disableButtons(true);
	var movement = setInterval(function() {
		for (i=0;i<80;i++) {
			num[i]=num[i]+a[i];
		}
		c = c+1;
	  ctx.clearRect(0,0,1000,1000);
	 //  	ctx.rect(0, 0, canvas.width, canvas.height);
	 //  	ctx.fillStyle = "rgb(" + (128 -  Math.floor(c/2)) + ", " + (128 - Math.floor(c/2)) + ", " + (255 - c) + ")";
		// ctx.fill();
		whichArt(loopView(currentLocation),500,7895 - (c*29),15535-(c*57),currentLocation);
		ctx.closePath();

	  if (c > 255) clearInterval(movement),disableButtons(false),drawField(currentLocation),generalState();
	}, 15);
};

function solarBlasterAnimation(){
	var c = 1;
	disableButtons(true);
	var movement = setInterval(function() {
		c = c+1;
	  	ctx.beginPath();
	  	ctx.fillStyle = "#ffff99";
	  	ctx.strokeStyle = "#ff9999";
		ctx.moveTo(0, 800);
		ctx.lineTo(490,500);
		ctx.lineTo(0,820);
		ctx.moveTo(1000, 800);
		ctx.lineTo(510,500);
		ctx.lineTo(1000, 820);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	  if (c > 20) clearInterval(movement),disableButtons(false),drawField(currentLocation),generalState();
	}, 15);
};

function radarAnimation(){
	var c = 1;
	disableButtons(true);
	var movement = setInterval(function() {
		c = c+1;
		ctx.clearRect(0,0,1000,1000);
	  	drawField(currentLocation);
	  	ctx.beginPath();
	  	ctx.lineWidth=10-Math.floor(c/5);
	  	ctx.strokeStyle = "#aaaaff";
		ctx.moveTo(100+(c*2), 800-Math.floor(c*3.5));
		ctx.quadraticCurveTo(500, 600-Math.floor(c/10), 900-(c*2), 800-Math.floor(c*3.5));
		ctx.moveTo(200+(c*2), 700-(c*2));
		ctx.quadraticCurveTo(500, 600-Math.floor(c/5), 800-(c*2), 700-(c*2));
		ctx.moveTo(300+(c*2), 650-Math.floor(c*1.3));
		ctx.quadraticCurveTo(500, 600-Math.floor(c/3), 700-(c*2), 650-Math.floor(c*1.3));
		ctx.stroke();
		ctx.closePath();
	  if (c > 50) clearInterval(movement),disableButtons(false),generalState();
	}, 15);
};

function scannerAnimation() {
	var c = 1;
	disableButtons(true);
	var movement = setInterval(function() {
		c = c+1;
		ctx.clearRect(0,0,1000,1000);
	  	drawField(currentLocation);
	  	ctx.beginPath();
	  	ctx.lineWidth=10-Math.floor(c/5);
	  	ctx.strokeStyle = "#aaffaa";
	  	ctx.moveTo(0, 750-Math.floor(c*1.3));
		ctx.quadraticCurveTo(500, 650-Math.floor(c), 1000, 750-Math.floor(c*1.3));
		ctx.moveTo(0, 700-Math.floor(c*1.1));
		ctx.quadraticCurveTo(500, 620-Math.floor(c/4), 1000, 700-Math.floor(c*1.1));
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "rgba(180,255,180,.5)";
		ctx.moveTo(500,1000);
		ctx.lineTo(100+(c*10),680-Math.floor(c));
		ctx.quadraticCurveTo(250+(c*10),670-Math.floor(c),400+(c*10),660-Math.floor(c/2));
		ctx.lineTo(500,1000);
		ctx.fill();
		ctx.closePath();
	  if (c > 50) clearInterval(movement),disableButtons(false),generalState();
	}, 15);
};

function takeDamage(howMuch){
	var c = 1;
	reduceSolarEnergy(howMuch);
	disableButtons(true);
	var movement = setInterval(function() {
		c = c+1;
	  	// ctx.clearRect(0,0,1000,1000);
	  	ctx.beginPath();
	  	ctx.fillStyle = "rgba(150, 150, 255, .1)";
		ctx.fillRect(0,0,1000,1000);
		ctx.closePath();
	  if (c > 20) clearInterval(movement),disableButtons(false),drawField(currentLocation),generalState();
	}, 15);
};

function dishAndTakeDamageDogfight(howMuch) {
	var c = 1;
	reduceSolarEnergy(howMuch);
	disableButtons(true);
	var movement = setInterval(function() {
		c = c+1;
		ctx.beginPath();
		ctx.fillStyle = "rgba(150, 150, 255, .1)";
		ctx.fillRect(0,0,1000,1000);
		ctx.closePath();
		ctx.beginPath();
		ctx.fillStyle = "#ffff99";
		ctx.strokeStyle = "#ff9999";
		ctx.moveTo(0, 800);
		ctx.lineTo(490,500);
		ctx.lineTo(0,820);
		ctx.moveTo(1000, 800);
		ctx.lineTo(510,500);
		ctx.lineTo(1000, 820);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		if (c > 20) clearInterval(movement),disableButtons(false),drawField(currentLocation),generalState();
	}, 15);
};

function warpAnimation(){	
	cubeShipPositioning(direction,topfacing,currentLocation,viewOrient);
	var num = [0,0,0,0,0,0,0,0,0,0,0,0];
	var a = [-3,3,1,-1,6,-6,1.34,1,-1,10,15];
	var newYPos;
	var newXPos;
	var c = 0;
	disableButtons(true);
	ctx.clearRect(0,0,1000,1000);
	var movement = setInterval(function() {
		// drawField(currentLocation);
		for (i=0;i<11;i++) {
			num[i]=num[i]+a[i];
		}
		c = c+1;
		if (c<2) {backgroundArt();outerBackgroundArt();};
		ctx.beginPath();
		ctx.moveTo(50 + (a[1]*75) - num[1], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 950 + (a[0]*75) - num[0]);
		ctx.lineTo(50 + (a[1]*75) - num[1], 950 + (a[0]*75) - num[0]);
		ctx.lineTo(50 + (a[1]*75) - num[1], 50 + (a[1]*75) - num[1]);
		ctx.moveTo(50 + (a[1]*75) - num[1], 350 + (a[2]*75) - num[2]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 350 + (a[2]*75) - num[2]);
		ctx.moveTo(50 + (a[1]*75) - num[1], 650 + (a[3]*75) - num[3]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 650 + (a[3]*75) - num[3]);
		ctx.moveTo(350 + (a[2]*75) - num[2], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(350 + (a[2]*75) - num[2], 950 + (a[0]*75) - num[0]);
		ctx.moveTo(650 + (a[3]*75) - num[3], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(650 + (a[3]*75) - num[3], 950 + (a[0]*75) - num[0]);
		ctx.moveTo(50 + num[5], 50 + num[5]);
		ctx.lineTo(950 + num[4], 50 + num[5]);
		ctx.lineTo(950 + num[4], 950 + num[4]);
		ctx.lineTo(50 + num[5], 950 + num[4]);
		ctx.lineTo(50 + num[5], 50 + num[5]);
		ctx.moveTo(50 + num[5], 350 + num[0]);
		ctx.lineTo(950 + num[4], 350 + num[0]);
		ctx.moveTo(50 + num[5], 650 + num[1]);
		ctx.lineTo(950 + num[4], 650 + num[1]);
		ctx.moveTo(350 + num[0], 50 + num[5]);
		ctx.lineTo(350 + num[0], 950 + num[4]);
		ctx.moveTo(650 + num[1], 50 + num[5]);
		ctx.lineTo(650 + num[1], 950 + num[4]);
		ctx.strokeStyle = "rgba(255, 255, 255,.5)";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.closePath();
	  if (c > 120) clearInterval(movement),disableButtons(false),autoAccel(movement);
	}, 15);
};

// accelfun
function accelerate(){
	newStars.length=0;
	// clearInterval(stalled);
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
	else {currentLocation = (currentLocation);	};
	// cubeShipPositioning(direction,topfacing,currentLocation,viewOrient);
	var num = [0,0,0,0,0,0,0,0,0,0,0,0];
	var a = [-3,3,1,-1,6,-6,1.34,1,-1,10,15];
	var newYPos;
	var newXPos;
	var c = 0;
	backgroundArt();
	outerBackgroundArt();
	disableButtons(true);
	var movement = setInterval(function() {
		// drawField(currentLocation);
		for (i=0;i<11;i++) {
			num[i]=num[i]+a[i];
		}
		c = c+1;

		if (c<2) {backgroundArt();outerBackgroundArt();};

		
	  ctx.clearRect(0,0,1000,1000);
	  
	  
	  ctx.beginPath();


	  newStars.forEach(function(el) {drawDistantStar(el.xPos, el.yPos, el.size);});
	  


		if (loopView(currentLocation+((0*fm)+(um*2)))=="2") {drawDistantStar(500, 250-(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)+(lm*2)))=="2") {drawDistantStar(750+(c*4), 500, 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(um*2)))=="2") {drawDistantStar(500, 750+(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(lm*2)))=="2") {drawDistantStar(250-(c*4), 500, 15+Math.floor(c/2));}
		if (loopView(currentLocation+(((0*fm)+(lm*2))+(um*2)))=="2") {drawDistantStar(750+(c*4), 250-(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+(((0*fm)+(lm*2))-(um*2)))=="2") {drawDistantStar(750+(c*4), 750+(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(lm*2))-(um*2))=="2") {drawDistantStar(250-(c*4), 750+(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(lm*2))+(um*2))=="2") {drawDistantStar(250-(c*4), 250-(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)+(um*3)))=="2") {drawDistantStar(500, 125-(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)+(lm*3)))=="2") {drawDistantStar(875+(c*4), 500, 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(um*3)))=="2") {drawDistantStar(500, 875+(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(lm*3)))=="2") {drawDistantStar(125-(c*4), 500, 15+Math.floor(c/2));}
		if (loopView(currentLocation+(((0*fm)+(lm*3))+(um*3)))=="2") {drawDistantStar(875+(c*4), 125-(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+(((0*fm)+(lm*3))-(um*3)))=="2") {drawDistantStar(875+(c*4), 875+(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(lm*3))-(um*3))=="2") {drawDistantStar(125-(c*4), 875+(c*4), 15+Math.floor(c/2));}
		if (loopView(currentLocation+((0*fm)-(lm*3))+(um*3))=="2") {drawDistantStar(125-(c*4), 125-(c*4), 15+Math.floor(c/2));}
		// NEW ART BEING POSITIONED WHERE OLD ART WAS AND MOVING TO POSITION
		//back top left
		whichArt(loopView(currentLocation + um + 2*fm - lm),300 + (a[7]*75) - (num[7]),300 + (a[7]*75) - (num[7]),100 + (a[8]*75) - (num[8]),currentLocation + um + 2*fm - lm);
		//back top right
		whichArt(loopView(currentLocation + um + 2*fm + lm),700 + (a[8]*75) - (num[8]),300 + (a[7]*75) - (num[7]),100 + (a[8]*75) - (num[8]),currentLocation + um + 2*fm + lm);
		//back top center
		whichArt(loopView(currentLocation + um + 2*fm),500,300 + (a[7]*75) - (num[7]),100 + (a[8]*75) - (num[8]),currentLocation + um + 2*fm);
		//back middle left
		whichArt(loopView(currentLocation + 2*fm - lm),300 + (a[7]*75) - (num[7]),500,100 + (a[8]*75) - (num[8]),currentLocation + 2*fm - lm);
		//back middle right
		whichArt(loopView(currentLocation + 2*fm + lm),700 + (a[8]*75) - (num[8]),500,100 + (a[8]*75) - (num[8]),currentLocation + 2*fm + lm);
		//back middle center
		whichArt(loopView(currentLocation + 2*fm),500,500,150 + (a[8]*75) - (num[8]),currentLocation + 2*fm);
		//back bottom left
		whichArt(loopView(currentLocation - um + 2*fm - lm),300 + (a[7]*75) - (num[7]),700 + (a[8]*75) - (num[8]),100 + (a[8]*75) - (num[8]),currentLocation - um + 2*fm - lm);
		//back bottom right
		whichArt(loopView(currentLocation - um + 2*fm + lm),700 + (a[8]*75) - (num[8]),700 + (a[8]*75) - (num[8]),100 + (a[8]*75) - (num[8]),currentLocation - um + 2*fm + lm);
		//back bottom center
		whichArt(loopView(currentLocation - um + 2*fm),500,700 + (a[8]*75) - (num[8]),100 + (a[8]*75) - (num[8]),currentLocation - um + 2*fm);
		ctx.closePath();
		
		ctx.beginPath();
		ctx.moveTo(50 + (a[1]*75) - num[1], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 950 + (a[0]*75) - num[0]);
		ctx.lineTo(50 + (a[1]*75) - num[1], 950 + (a[0]*75) - num[0]);
		ctx.lineTo(50 + (a[1]*75) - num[1], 50 + (a[1]*75) - num[1]);
		ctx.moveTo(50 + (a[1]*75) - num[1], 350 + (a[2]*75) - num[2]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 350 + (a[2]*75) - num[2]);
		ctx.moveTo(50 + (a[1]*75) - num[1], 650 + (a[3]*75) - num[3]);
		ctx.lineTo(950 + (a[0]*75) - num[0], 650 + (a[3]*75) - num[3]);
		ctx.moveTo(350 + (a[2]*75) - num[2], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(350 + (a[2]*75) - num[2], 950 + (a[0]*75) - num[0]);
		ctx.moveTo(650 + (a[3]*75) - num[3], 50 + (a[1]*75) - num[1]);
		ctx.lineTo(650 + (a[3]*75) - num[3], 950 + (a[0]*75) - num[0]);
		ctx.strokeStyle = "rgba(100, 100, 100,"+ (c/75).toFixed(2) +")";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		//   0 1 2  3 4  5
		// [-3,3,1,-1,2,-2]
		

		// NEW ART BEING POSITIONED WHERE OLD ART WAS AND MOVING TO POSITION
		//top left
		whichArt(loopView(currentLocation + um + fm - lm),300-Math.floor(num[6]),300-Math.floor(num[6]),100 + Math.floor(num[6]),currentLocation + um + fm - lm);
		//top right
		whichArt(loopView(currentLocation + um + fm + lm),700+Math.floor(num[6]),300-Math.floor(num[6]),100 + Math.floor(num[6]),currentLocation + um + fm + lm);
		//top center
		whichArt(loopView(currentLocation + um + fm),500,300-Math.floor(num[6]),100 + Math.floor(num[6]),currentLocation + um + fm);
		//bottom left
		whichArt(loopView(currentLocation - um + fm - lm),300-Math.floor(num[6]),700+Math.floor(num[6]),100 + Math.floor(num[6]),currentLocation - um + fm - lm);
		//bottom right
		whichArt(loopView(currentLocation - um + fm + lm),700+Math.floor(num[6]),700+Math.floor(num[6]),100 + Math.floor(num[6]),currentLocation - um + fm + lm);
		//bottom center
		whichArt(loopView(currentLocation - um + fm),500,700+Math.floor(num[6]),100 + Math.floor(num[6]),currentLocation - um + fm);
		//middle left
		whichArt(loopView(currentLocation + fm - lm),300-Math.floor(num[6]), 500, 100 + Math.floor(num[6]),currentLocation + fm - lm);
		//middle right
		whichArt(loopView(currentLocation + fm + lm),700+Math.floor(num[6]), 500, 100 + Math.floor(num[6]),currentLocation + fm + lm);
		//middle center
		whichArt(loopView(currentLocation + fm),500,500,150 + Math.floor(num[6]),currentLocation + fm);

		// OLD ART MOVING TO NEW P0SITION
		// top left
		whichArt(oldPlanets[9].posNum,oldPlanets[9].xPos + num[5],oldPlanets[9].yPos + num[0],oldPlanets[9].size + num[1],oldPlanets[9].actPos);
		//top right
		whichArt(oldPlanets[10].posNum,oldPlanets[10].xPos + num[4],oldPlanets[10].yPos + num[0],oldPlanets[10].size + num[1],oldPlanets[10].actPos);
		//top center
		whichArt(oldPlanets[11].posNum,oldPlanets[11].xPos,oldPlanets[11].yPos + num[5],oldPlanets[11].size + num[1],oldPlanets[11].actPos);
		//bottom left
		whichArt(oldPlanets[12].posNum,oldPlanets[12].xPos + num[5],oldPlanets[12].yPos + num[1],oldPlanets[12].size + num[1],oldPlanets[12].actPos);
		//bottom right
		whichArt(oldPlanets[13].posNum,oldPlanets[13].xPos + num[4],oldPlanets[13].yPos + num[1],oldPlanets[13].size + num[1],oldPlanets[13].actPos);
		//bottom center
		whichArt(oldPlanets[14].posNum,oldPlanets[14].xPos,oldPlanets[14].yPos + num[4],oldPlanets[14].size + num[1],oldPlanets[14].actPos);
		//middle left
		whichArt(oldPlanets[15].posNum,oldPlanets[15].xPos + num[5],oldPlanets[15].yPos,oldPlanets[15].size + num[1],oldPlanets[15].actPos);
		//middle right
		whichArt(oldPlanets[16].posNum,oldPlanets[16].xPos + num[4],oldPlanets[16].yPos,oldPlanets[16].size + num[1],oldPlanets[16].actPos);
		
		ctx.closePath();
		ctx.beginPath();
		ctx.moveTo(50 + num[5], 50 + num[5]);
		ctx.lineTo(950 + num[4], 50 + num[5]);
		ctx.lineTo(950 + num[4], 950 + num[4]);
		ctx.lineTo(50 + num[5], 950 + num[4]);
		ctx.lineTo(50 + num[5], 50 + num[5]);
		ctx.moveTo(50 + num[5], 350 + num[0]);
		ctx.lineTo(950 + num[4], 350 + num[0]);
		ctx.moveTo(50 + num[5], 650 + num[1]);
		ctx.lineTo(950 + num[4], 650 + num[1]);
		ctx.moveTo(350 + num[0], 50 + num[5]);
		ctx.lineTo(350 + num[0], 950 + num[4]);
		ctx.moveTo(650 + num[1], 50 + num[5]);
		ctx.lineTo(650 + num[1], 950 + num[4]);
		ctx.strokeStyle = "rgba(100, 100, 100,"+ ((75-c)/75).toFixed(2) +")";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();

		//middle center

			switch (direction) {
				case ("DOWN"):
					whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);
					whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
				break;
				case ("UP"):
					if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos - 450 + num[10]*1.3,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
				break;
				case ("N"):
					switch(topfacing) {
						case ("UP"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos - 450 + num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos + num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("DOWN"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos + 450 - num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos - num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("W"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos + 450 - num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos - num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("E"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos - 450 + num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos + num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
					}
				break;
				case ("S"):
					switch(topfacing) {
						case ("UP"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos - 450 + num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos + num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("DOWN"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos + 450 - num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos - num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("E"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos + 450 - num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos - num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("W"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos - 450 + num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos + num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
					}
				break;
				case ("E"):
					switch(topfacing) {
						case ("UP"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos - 450 + num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos + num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("DOWN"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos + 450 - num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos - num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("N"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos + 450 - num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos - num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("S"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos - 450 + num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos + num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
					}
				break;
				case ("W"):
					switch(topfacing) {
						case ("UP"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos - 450 + num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos + num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("DOWN"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos + 450 - num[10],oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos,oldPlanets[18].yPos - num[10],oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("S"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos + 450 - num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos - num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
						case ("N"):
						if (c < 30) {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos,oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						else {
							whichArt(oldPlanets[17].posNum,oldPlanets[17].xPos - 450 + num[10],oldPlanets[17].yPos,oldPlanets[17].size + num[9],oldPlanets[17].actPos);	
						}
						whichArt(oldPlanets[18].posNum,oldPlanets[18].xPos + num[10],oldPlanets[18].yPos,oldPlanets[18].size + num[9],oldPlanets[18].actPos);
						break;
					}
				break;
				default:console.log("Not set up yet");
			};
			ctx.closePath();
			

	  if (c > 75) clearInterval(movement),disableButtons(false),autoAccel(movement);
	}, 15);
};

function autoAccel(intFunc) {
	oldPlanets.length = 0;
	oldStars.length = 0;
	newStars.length = 0;
	if (cruiseControl) {
		if (worldArray[currentLocation-1] != "1" && direction == "DOWN") {
			weCruisin = false;
			drawField(currentLocation);
			generalState();
			computerReply("Error. Collision course detected.");
			return cruiseControl = false;
		}
		else if (collideableObjects.indexOf(worldArray[currentLocation-1]) > -1) {
			weCruisin = false;
			drawField(currentLocation);
			generalState();
			takeDamage(20);
			computerReply("Solar energy: " + inventory[0] + "%",100);
			return cruiseControl = false;
		}
		else {
			weCruisin = true;
			clearInterval(intFunc);
			drawField(currentLocation);
			moves = moves+1;
			console.log(moves);
			return accelerate();
		}
	}
	else if (collideableObjects.indexOf(worldArray[currentLocation-1]) > -1) {
		weCruisin = false;
		drawField(currentLocation);
		generalState();
		takeDamage(20);
		computerReply("Solar energy: " + inventory[0] + "%",100);
	}
	else {
		weCruisin = false;
		drawField(currentLocation);
		generalState();
	}
};

function nebulaBackground() {
	// The canvas element we are drawing into.      
	var	img = new Image();	
	
	// A puff.
	function Puff(p) {				
		var	opacity,
			sy = (Math.random()*285)>>0,
			sx = (Math.random()*285)>>0;
		
		this.p = p;
				
		this.move = function(timeFac) {						
			p = this.p + 0.3 * timeFac;				
			opacity = (Math.sin(p*0.05)*0.5);						
			if(opacity <0) {
				p = opacity = 0;
				sy = (Math.random()*285)>>0;
				sx = (Math.random()*285)>>0;
			}
			this.p = p;
			ctx.globalAlpha = opacity;						
			ctx.drawImage(ctx, sy+p, sy+p, 285-(p*2),285-(p*2), 0,0, w, h);								
		};
	};
	
	var	puffs = [];			
	var	sortPuff = function(p1,p2) { return p1.p-p2.p; };	
	puffs.push( new Puff(0) );
	puffs.push( new Puff(20) );
	puffs.push( new Puff(40) );
	
	var	newTime, oldTime = 0, timeFac;
			
	// var	loop = function() {								
	// 	newTime = new Date().getTime();				
	// 	if(oldTime === 0 ) {
	// 		oldTime=newTime;
	// 	}
	// 	timeFac = (newTime-oldTime) * 0.1;
	// 	if(timeFac>3) {timeFac=3;}
	// 	oldTime = newTime;						
	// 	puffs.sort(sortPuff);							
		
	// 	for(var i=0;i<puffs.length;i++)
	// 	{
	// 		puffs[i].move(timeFac);	
	// 	}					
	// 	ctx2.drawImage( $canvas[0] ,0,0,570,570);				
	// 	setTimeout(loop, 10 );				
	// };
	// loop();
	// Turns out Chrome is much faster doing bitmap work if the bitmap is in an existing canvas rather
	// than an IMG, VIDEO etc. So draw the big nebula image into canvas3
	ctx.drawImage(img, 0,0, 570, 570);	
	
	ctx.drawImage(img, 0,0,1000,1000);
	img.src = 'img/nebula.jpg';

};

function rotateShape(direction, rAxes, lr) {
	var c=0;
	disableButtons(true);
	ctx.save();
	var movement = setInterval(function() {		
		c=c+1;
		ctx.clearRect(-200,-200,1200,1200);
		newStars.forEach(function(el) {drawDistantStar(el.xPos, el.yPos, el.size);});
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
		ctx.strokeStyle = "rgba(100, 100, 100,1)";
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.closePath();
		drawField(currentLocation);
		ctx.translate(500,500);
	 	ctx.rotate(direction * Math.PI / 180);
		ctx.translate(-500,-500);
	  if (c > 90 || c < -90) clearInterval(movement),ctx.restore(),shipRotation(rAxes, lr),disableButtons(false),generalState();
	}, 10);
};

//Check if needed
// function angleLines(color) {
	// 	// angle lines
	// 	ctx.beginPath();
	// 	// top left
	// 	ctx.moveTo(0, 0);
	// 	ctx.lineTo(50, 50);
	// 	// top right
	// 	ctx.moveTo(1000, 0);
	// 	ctx.lineTo(950, 50);
	// 	// bottom left
	// 	ctx.moveTo(0, 1000);
	// 	ctx.lineTo(50, 950);
	// 	// bottom right
	// 	ctx.moveTo(1000, 1000);
	// 	ctx.lineTo(950, 950);
	// 	//middle angles
	// 	//left top
	// 	ctx.moveTo(0, 335);
	// 	ctx.lineTo(50, 350);
	// 	//bottom maybe
	// 	ctx.moveTo(1000, 335);
	// 	ctx.lineTo(950, 350);
	// 	// top right
	// 	ctx.moveTo(665, 0);
	// 	ctx.lineTo(650, 50);
	// 	// top left
	// 	ctx.moveTo(335, 0);
	// 	ctx.lineTo(350, 50);
	// 	// left bottom
	// 	ctx.moveTo(0, 665);
	// 	ctx.lineTo(50, 650);
	// 	// right bottom
	// 	ctx.moveTo(1000, 665);
	// 	ctx.lineTo(950, 650);
	// 	// bottom maybe
	// 	ctx.moveTo(665, 1000);
	// 	ctx.lineTo(650, 950);
	// 	// no idea
	// 	ctx.moveTo(335, 1000);
	// 	ctx.lineTo(350, 950);
	// 	ctx.strokeStyle = color;
	// 	ctx.lineWidth = 6;
	// 	ctx.stroke();
	// 	ctx.closePath();
// }

// function staticArt() {
	// ctx.rect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = "#000000";
	// ctx.fill();

	// Back items
	// for (var i = 0; i < 3; i++) {
 	//	for (var j = 0; j < 3; j++) {
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
	// ctx.beginPath();
	// ctx.moveTo(50, 50);
	// ctx.lineTo(950, 50);
	// ctx.lineTo(950, 950);
	// ctx.lineTo(50, 950);
	// ctx.lineTo(50, 50);
	// ctx.moveTo(50, 350);
	// ctx.lineTo(950, 350);
	// ctx.moveTo(50, 650);
	// ctx.lineTo(950, 650);
	// ctx.moveTo(350, 50);
	// ctx.lineTo(350, 950);
	// ctx.moveTo(650, 50);
	// ctx.lineTo(650, 950);
	// ctx.strokeStyle = "#ffffff";
	// ctx.lineWidth = 2;
	// ctx.stroke();
	// ctx.closePath();

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
	// for (var j = 1; j < 100; j++) {
	//     ctx.save();
	//     ctx.fillStyle = '#ffffff';
	//     ctx.translate(1000 - Math.floor(Math.random() * 1000),
	//                   1000 - Math.floor(Math.random() * 1000));
	//     drawStar(ctx, Math.floor(Math.random() * 4) + 2);
	//     ctx.restore();
	// }

	

	// Windshield
	// ctx.beginPath();
	// ctx.moveTo(200, 0);
	// ctx.lineTo(450, 0);
	// ctx.lineTo(250, 1000);
	// ctx.lineTo(0, 1000);
	// ctx.fillStyle = "rgba(255, 255, 255, .7)";
	// ctx.fill();
	// ctx.closePath();
	// }

// Only shapes here down
function drawField(pos) {
	newStars.forEach(function(el) {drawDistantStar(el.xPos, el.yPos, el.size);});


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
	ctx.strokeStyle = "rgba(100, 100, 100,1)";
	ctx.lineWidth = 4;
	ctx.stroke();
	//back top left
	whichArt(loopView(pos + um + 2*fm - lm),300,300,100,pos + um + 2*fm - lm);
	//back top right
	whichArt(loopView(pos + um + 2*fm + lm),700,300,100,pos + um + 2*fm + lm);
	//back top center
	whichArt(loopView(pos + um + 2*fm),500,300,100,pos + um + 2*fm);
	//back middle left
	whichArt(loopView(pos + 2*fm - lm),300,500,100,pos + 2*fm - lm);
	//back middle right
	whichArt(loopView(pos + 2*fm + lm),700,500,100,pos + 2*fm + lm);
	//back middle center
	whichArt(loopView(pos + 2*fm),500,500,150,pos + 2*fm);
	//back bottom left
	whichArt(loopView(pos - um + 2*fm - lm),300,700,100,pos - um + 2*fm - lm);
	//back bottom right
	whichArt(loopView(pos - um + 2*fm + lm),700,700,100,pos - um + 2*fm + lm);
	//back bottom center
	whichArt(loopView(pos - um + 2*fm),500,700,100,pos - um + 2*fm);
	//top left
	whichArt(loopView(pos + um + fm - lm),200,200,200,pos + um + fm - lm);
	//top right
	whichArt(loopView(pos + um + fm + lm),800,200,200,pos + um + fm + lm);
	//top center
	whichArt(loopView(pos + um + fm),500,200,200,pos + um + fm);
	//bottom left
	whichArt(loopView(pos - um + fm - lm),200,800,200,pos - um + fm - lm);
	//bottom right
	whichArt(loopView(pos - um + fm + lm),800,800,200,pos - um + fm + lm);
	//bottom center
	whichArt(loopView(pos - um + fm),500,800,200,pos - um + fm);
	//middle left
	whichArt(loopView(pos + fm - lm),200, 500, 200,pos + fm - lm);
	//middle right
	whichArt(loopView(pos + fm + lm),800, 500, 200,pos + fm + lm);
	//middle center
	whichArt(loopView(pos + fm),500,500,250,pos + fm);

	//current pos
	switch (direction) {
		case ("DOWN"):
		whichArt(loopView(pos),500,500,1000,pos);
		break;
		case ("UP"):
		break;
		case ("N"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000,pos);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000,pos);
				break;
				case ("W"):
				whichArt(loopView(pos),-200,500,1000,pos);
				break;
				case ("E"):
				whichArt(loopView(pos),1200,500,1000,pos);
				break;
			}
		break;
		case ("S"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000,pos);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000,pos);
				break;
				case ("E"):
				whichArt(loopView(pos),-200,500,1000,pos);
				break;
				case ("W"):
				whichArt(loopView(pos),1200,500,1000,pos);
				break;
			}
		break;
		case ("E"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000,pos);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000,pos);
				break;
				case ("N"):
				whichArt(loopView(pos),-200,500,1000,pos);
				break;
				case ("S"):
				whichArt(loopView(pos),1200,500,1000,pos);
				break;
			}
		break;
		case ("W"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(pos),500,1200,1000,pos);
				break;
				case ("DOWN"):
				whichArt(loopView(pos),500,-200,1000,pos);
				break;
				case ("S"):
				whichArt(loopView(pos),-200,500,1000,pos);
				break;
				case ("N"):
				whichArt(loopView(pos),1200,500,1000,pos);
				break;
			}
		break;
		default:console.log("Not set up yet");
	}
};

function SpaceObject(posNum,xPos,yPos,size,actPos) {
	this.posNum = posNum;
	this.xPos = xPos;
	this.yPos = yPos;
	this.size = size;
	this.actPos = actPos;
};
var oldPlanets = [];

function rgbGenerateFromCurPos(curPos) {
	if (curPos > worldArray.length) {var temp = (curPos - worldArray.length).toString();}
	else if (curPos < 1) {var temp = (curPos + worldArray.length).toString();}
	else {var temp = curPos.toString();};
	return [(((temp[temp.length-1]+1)*(temp[temp.length-2]+1)*(temp[temp.length-3]+1)*12)%206)+50,(((temp[temp.length-1]+1)*(temp[temp.length-2]+1)*(temp[temp.length-3]+1)*21)%206)+50,(((temp[temp.length-1]+1)*(temp[temp.length-2]+1)*(temp[temp.length-3]+1)*16)%206)+50]
};

// ART DRAWN HERE
function whichArt(posNum,xPos,yPos,size,actPos) {
	// 1 - Nothing
	// 2 - Star
	// 3 - Solid Planet
	// 4 - Gaseous Planet
	// 7 - Space Dust
	// 8 - Worm Hole
	// a - Space Station
	switch (posNum) {
		case ("1"):
			break;
		case ("2"):
			ctx.save();
			var rot = Math.PI / 2 * 3;
		    var x = xPos;
		    var y = yPos;
		    var step = Math.PI / 20;
		    ctx.strokeSyle = "#000";
		    ctx.beginPath();
		    ctx.moveTo(xPos, yPos - size/2)
		    for (i = 0; i < 20; i++) {
		        x = xPos + Math.cos(rot) * size/2;
		        y = yPos + Math.sin(rot) * size/2;
		        ctx.lineTo(x, y)
		        rot += step

		        x = xPos + Math.cos(rot) * size/2.5;
		        y = yPos + Math.sin(rot) * size/2.5;
		        ctx.lineTo(x, y)
		        rot += step
		    }
		    ctx.lineTo(xPos, yPos - size/2)
		    ctx.closePath();
		    ctx.lineWidth=Math.floor(size/30);
		    ctx.strokeStyle='#FFFF00';
		    ctx.stroke();
		    ctx.fillStyle="rgba(255, 255, 245, 1)";
		    ctx.fill();
			ctx.restore();
			break;
		case ("3"):
			ctx.save();
			ctx.beginPath();
		    ctx.arc(xPos, yPos, size/2, size/2, Math.PI * 2, true);
		    ctx.fillStyle = "rgba("+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+","+rgbGenerateFromCurPos(actPos)[2]+", 1)";
		    // ctx.shadowColor = "#0000FF" 
		    // ctx.shadowOffsetX = 0;
			// ctx.shadowOffsetY = 0;
			// ctx.shadowBlur = 100;
		    ctx.fill();
		    ctx.strokeStyle="rgba("+rgbGenerateFromCurPos(actPos)[2]+","+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+", 1)";
		    ctx.lineWidth=Math.floor(size/30);
		    ctx.stroke();
			ctx.closePath();
			ctx.restore();
			break;
		case ("4"):
			ctx.save();
			ctx.beginPath();
		    ctx.arc(xPos, yPos, size/2, size/2, Math.PI * 2, true)
		    ctx.fillStyle = "rgba("+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+","+rgbGenerateFromCurPos(actPos)[2]+", .5)";
		 //    ctx.shadowColor = "rgba("+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+","+rgbGenerateFromCurPos(actPos)[2]+", 1)";
		 //    ctx.shadowOffsetX = 0;
			// ctx.shadowOffsetY = 0;
			// ctx.shadowBlur = 100;
		    ctx.fill();
			ctx.closePath();
			ctx.restore();
			break;
		case ("z"):
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "rgba("+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+","+rgbGenerateFromCurPos(actPos)[2]+", 1)";
		    ctx.fillRect(xPos - size/4, yPos,size/2, size/4);
		    ctx.closePath();
		    ctx.beginPath();
			ctx.arc((xPos - size/4)+1, yPos+size/8, size/8,.5*Math.PI,1.5*Math.PI);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.arc((xPos + size/4)-1, yPos+size/8, size/8,1.5*Math.PI,.5*Math.PI);
			ctx.fill();
			ctx.closePath();
		    ctx.beginPath();
			ctx.arc(xPos, yPos, size/6, Math.PI, false);
			ctx.fillStyle = "rgba(200, 200, 255, 1)";
			ctx.fill();
			ctx.closePath();
			ctx.restore();
			break;
		case ("x"):
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "rgba("+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+","+rgbGenerateFromCurPos(actPos)[2]+", 1)";
		    ctx.moveTo(xPos - size/2, yPos - size/4);
		    ctx.lineTo(xPos, yPos - size/10);
		    ctx.lineTo(xPos + size/2, yPos + size/4);
		    ctx.moveTo(xPos + size/2, yPos - size/4);
		    ctx.lineTo(xPos, yPos - size/10);
		    ctx.lineTo(xPos - size/2, yPos + size/4);
		    ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.arc(xPos, yPos - size/15, size/12, 2 * Math.PI, false);
			ctx.fillStyle = "rgba(200, 200, 255, 1)";
			ctx.fill();
			ctx.closePath();
			ctx.restore();
			break;
		case ("a"):
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "rgba(100, 100, 100, 1)";
		    ctx.fillRect(xPos - size/4, yPos - size/4,size/2, size/2);
		    ctx.closePath();
		    ctx.beginPath();
		    ctx.arc(xPos, yPos, size/6, size/6, Math.PI * 2, true);
		    ctx.fillStyle = "rgba(255, 0, 0, 1)";
		    ctx.fill();
			ctx.closePath();
			ctx.restore();
			break;
		case ("d"):
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "rgba("+rgbGenerateFromCurPos(actPos)[0]+","+rgbGenerateFromCurPos(actPos)[1]+","+rgbGenerateFromCurPos(actPos)[2]+", 1)";
			ctx.fillRect(xPos, yPos,size/20, size/20);
		    ctx.fillRect(xPos - size/10, yPos - size/10,size/20, size/20);
		    ctx.fillRect(xPos - size/4, yPos + size/3,size/20, size/20);
		    ctx.fillRect(xPos + size/3, yPos - size/9,size/20, size/20);
		    ctx.fillRect(xPos + size/4, yPos + size/3,size/20, size/20);
		    ctx.fillRect(xPos - size/9, yPos - size/3,size/20, size/20);
		    ctx.fillRect(xPos - size/3, yPos + size/4,size/20, size/20);
		    ctx.fillRect(xPos + size/2, yPos - size/3,size/20, size/20);
		    ctx.fillRect(xPos + size/3, yPos + size/3,size/20, size/20);
		    ctx.fill();
		    ctx.closePath();
			ctx.restore();
			break;
		case ("8"):
			drawBlackHole(posNum,xPos,yPos,size);
			break;
		default: 
			break;
	};
	if (oldPlanets.length < 19) {oldPlanets.push(new SpaceObject(posNum,xPos,yPos,size,actPos));};
};

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

function drawBlackHole(posNum,xPos,yPos,size) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.arc(xPos, yPos, size/2, size/2, Math.PI * 2, true);
    ctx.shadowColor = "#ffffff" 
    ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 100;
    ctx.fill();
	ctx.closePath();
	ctx.clip();
	blackHole(xPos,yPos,size);
	ctx.restore();
}

var blhole = new Image(500,500);
blhole = document.getElementById("shipView");



function blackHole(xPos,yPos,size) {
	ctx.drawImage(blhole,xPos-size, yPos-size, size*2, size*2)
}



axisFinder();
generateWorld();
cubeShipPositioning(direction,topfacing, currentLocation, viewOrient);

function generalState() {
	moves = moves+1;
	console.log(moves);
	oldPlanets.length = 0;
	oldStars.length = 0;
	newStars.length = 0;
	ctx.clearRect(0,0,1000,1000);
	// ctx.rect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = "rgba(0,0,0,1)";
	// ctx.fill();
	backgroundArt();
	outerBackgroundArt();
	newStars.forEach(function(el) {drawDistantStar(el.xPos, el.yPos, el.size);});
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
	ctx.strokeStyle = "rgba(100, 100, 100,1)";
	ctx.lineWidth = 4;
	ctx.stroke();

  	// GOING AWAY
	//back top left
	whichArt(loopView(currentLocation + um + 2*fm - lm),300,300,100,currentLocation + um + 2*fm - lm);
	//back top right
	whichArt(loopView(currentLocation + um + 2*fm + lm),700,300,100,currentLocation + um + 2*fm + lm);
	//back top center
	whichArt(loopView(currentLocation + um + 2*fm),500,300,100,currentLocation + um + 2*fm);
	//back middle left
	whichArt(loopView(currentLocation + 2*fm - lm),300,500,100,currentLocation + 2*fm - lm);
	//back middle right
	whichArt(loopView(currentLocation + 2*fm + lm),700,500,100,currentLocation + 2*fm + lm);
	//back middle center
	whichArt(loopView(currentLocation + 2*fm),500,500,150,currentLocation + 2*fm);
	//back bottom left
	whichArt(loopView(currentLocation - um + 2*fm - lm),300,700,100,currentLocation - um + 2*fm - lm);
	//back bottom right
	whichArt(loopView(currentLocation - um + 2*fm + lm),700,700,100,currentLocation - um + 2*fm + lm);
	//back bottom center
	whichArt(loopView(currentLocation - um + 2*fm),500,700,100,currentLocation - um + 2*fm);
	//top left
	whichArt(loopView(currentLocation + um + fm - lm),200,200,200,currentLocation + um + fm - lm);
	//top right
	whichArt(loopView(currentLocation + um + fm + lm),800,200,200,currentLocation + um + fm + lm);
	//top center
	whichArt(loopView(currentLocation + um + fm),500,200,200,currentLocation + um + fm);
	//bottom left
	whichArt(loopView(currentLocation - um + fm - lm),200,800,200,currentLocation - um + fm - lm);
	//bottom right
	whichArt(loopView(currentLocation - um + fm + lm),800,800,200,currentLocation - um + fm + lm);
	//bottom center
	whichArt(loopView(currentLocation - um + fm),500,800,200,currentLocation - um + fm);
	//middle left
	whichArt(loopView(currentLocation + fm - lm),200, 500, 200,currentLocation + fm - lm);
	//middle right
	whichArt(loopView(currentLocation + fm + lm),800, 500, 200,currentLocation + fm + lm);
	//middle center
	whichArt(loopView(currentLocation + fm),500,500,250,currentLocation + fm);
	
	switch (direction) {
		case ("DOWN"):
		whichArt(loopView(currentLocation),500,500,1000,currentLocation);
		break;
		case ("UP"):
		break;
		case ("N"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(currentLocation),500,1200,1000,currentLocation);
				break;
				case ("DOWN"):
				whichArt(loopView(currentLocation),500,-200,1000,currentLocation);
				break;
				case ("W"):
				whichArt(loopView(currentLocation),-200,500,1000,currentLocation);
				break;
				case ("E"):
				whichArt(loopView(currentLocation),1200,500,1000,currentLocation);
				break;
			}
		break;
		case ("S"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(currentLocation),500,1200,1000,currentLocation);
				break;
				case ("DOWN"):
				whichArt(loopView(currentLocation),500,-200,1000,currentLocation);
				break;
				case ("E"):
				whichArt(loopView(currentLocation),-200,500,1000,currentLocation);
				break;
				case ("W"):
				whichArt(loopView(currentLocation),1200,500,1000,currentLocation);
				break;
			}
		break;
		case ("E"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(currentLocation),500,1200,1000,currentLocation);
				break;
				case ("DOWN"):
				whichArt(loopView(currentLocation),500,-200,1000,currentLocation);
				break;
				case ("N"):
				whichArt(loopView(currentLocation),-200,500,1000,currentLocation);
				break;
				case ("S"):
				whichArt(loopView(currentLocation),1200,500,1000,currentLocation);
				break;
			}
		break;
		case ("W"):
			switch(topfacing) {
				case ("UP"):
				whichArt(loopView(currentLocation),500,1200,1000,currentLocation);
				break;
				case ("DOWN"):
				whichArt(loopView(currentLocation),500,-200,1000,currentLocation);
				break;
				case ("S"):
				whichArt(loopView(currentLocation),-200,500,1000,currentLocation);
				break;
				case ("N"):
				whichArt(loopView(currentLocation),1200,500,1000,currentLocation);
				break;
			}
		break;
		default:console.log("Not set up yet");
	}
	ctx.closePath();
};

function recordDistantStar(xPos, yPos, size) {
	newStars.push(new SpaceObject(0,xPos,yPos,size));
};

function drawDistantStar(xPos, yPos, size) {
	ctx.save();
	ctx.beginPath();
	ctx.arc(xPos, yPos, size, size, (62.8) , false);
	ctx.fillStyle = "rgba(255,255,225,1)";
	// ctx.fillRect(xPos, yPos,size, size);
	// ctx.shadowColor = "#FFFF00" 
 //    ctx.shadowOffsetX = 0;
	// ctx.shadowOffsetY = 0;
	// ctx.shadowBlur = 10; 
    ctx.fill();
    ctx.strokeStyle='#FFFF00';
    ctx.lineWidth=1
    ctx.stroke();
    ctx.closePath();
	ctx.restore();
};

var oldStars = [];

var newStars = [];

function backgroundArt() {
	var xi = 3;
	while (xi<51) {
		if (loopView(currentLocation+(xi*fm))=="2") {recordDistantStar(500, 500, 5+(30-(Math.floor(xi/5)*3)));}
		if (loopView(currentLocation+((xi*fm)-um))=="2") {recordDistantStar(500, 625, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-lm))=="2") {recordDistantStar(375, 500, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+um))=="2") {recordDistantStar(500, 375, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+lm))=="2") {recordDistantStar(625, 500, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+(((xi*fm)-lm)-um))=="2") {recordDistantStar(375, 625, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+(((xi*fm)-lm)+um))=="2") {recordDistantStar(375, 375, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+lm)-um)=="2") {recordDistantStar(625, 625, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+lm)+um)=="2") {recordDistantStar(625, 375, 5+(10-Math.floor(xi/5)));}
		xi = xi + 1;
	};
};

function outerBackgroundArt() {
	var xi = 1;
	while (xi<51) {
		if (loopView(currentLocation+((xi*fm)+(um*2)))=="2") {recordDistantStar(500, 250, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+(lm*2)))=="2") {recordDistantStar(750, 500, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(um*2)))=="2") {recordDistantStar(500, 750, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(lm*2)))=="2") {recordDistantStar(250, 500, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+(((xi*fm)+(lm*2))+(um*2)))=="2") {recordDistantStar(750, 250, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+(((xi*fm)+(lm*2))-(um*2)))=="2") {recordDistantStar(750, 750, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(lm*2))-(um*2))=="2") {recordDistantStar(250, 750, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(lm*2))+(um*2))=="2") {recordDistantStar(250, 250, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+(um*3)))=="2") {recordDistantStar(500, 125, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)+(lm*3)))=="2") {recordDistantStar(875, 500, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(um*3)))=="2") {recordDistantStar(500, 875, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(lm*3)))=="2") {recordDistantStar(125, 500, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+(((xi*fm)+(lm*3))+(um*3)))=="2") {recordDistantStar(875, 125, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+(((xi*fm)+(lm*3))-(um*3)))=="2") {recordDistantStar(875, 875, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(lm*3))-(um*3))=="2") {recordDistantStar(125, 875, 5+(10-Math.floor(xi/5)));}
		if (loopView(currentLocation+((xi*fm)-(lm*3))+(um*3))=="2") {recordDistantStar(125, 125, 5+(10-Math.floor(xi/5)));}
		xi = xi + 1;
	};
};

generalState();


// var stalled = setInterval(generalState, 1000);
