var worldArray = [];
var i = 0;
var x = 3;
var y = 9;
var z = 1;
var currentLocation = 23;
var orientation = "BACK"
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
		case 12:
			if (fm*um < 0) {
				lm = -z;
			}
			else {
				lm = z;
			}
			break;
		case 10:
			if (fm*um < 0) {
				lm = x;
			}
			else {
				lm = -x;
			}
			break;
		case 4:
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
		tableView(0,0,(pos + 2*um - lm));
		tableView(0,1,(pos + 2*um));
		tableView(0,2,(pos + 2*um + lm));
		tableView(1,0,(pos + um - lm));
		tableView(1,1,(pos + um)); 
		tableView(1,2,(pos + um + lm));
		tableView(2,0,(pos - lm));
		tableView(2,1,"&#8743;<br>&#9669;&#9677;&#9677;&#9677;&#9659;"); 
		tableView(2,2,(pos + lm)); 
	}
	if (orient == "TOP") {
		tableView(0,0,(pos + 2*fm - lm)); //19
		tableView(0,1,(pos + 2*fm)); //20
		tableView(0,2,(pos + 2*fm + lm)); //21
		tableView(1,0,(pos + fm - lm)); //22
		tableView(1,1,(pos + fm)); //23
		tableView(1,2,(pos + fm + lm)); //24
		tableView(2,0,(pos - lm)); //25
		tableView(2,1,"&#9651;<br>&#8834;&#8890;&#8835;<br>&#9677;&#9677;&#9677;"); //26
		tableView(2,2,(pos + lm)); //27
	}
	document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
}

cubeShipPositioning(direction,"UP", 23, orientation);

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
	cubeShipPositioning(direction,"UP", 23, orientation);
}

function generateWorld() {
	for (i=0;i<(x*x*x);i++) {
		if (worldArray.length%6==0) {
			worldArray.push(1);	
		}
		else {
			worldArray.push(0);	
		}
	}
}

function switchOrientation() {
	if (orientation == "BACK") {
		orientation = "TOP";
		cubeShipPositioning(direction,"UP", 23, orientation);
	}
	else {
		orientation = "BACK";
		cubeShipPositioning(direction,"UP", 23, orientation);
	}
}

function tableView(tr,td,isWhat) {
	document.querySelector("#fieldOfView").childNodes[0].childNodes[tr].childNodes[td].innerHTML = isWhat;
}

generateWorld();
