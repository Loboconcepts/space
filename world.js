var worldArray = [];
var orientation = "BACK";
var x = 3;
var y = 1;
var z = x;
var currentLocation = 23;
var directionArray = ["N","E","S","W","UP","DOWN"];
var direction = directionArray[0];
var topfacing = directionArray[4];
var fieldOfViewBack = [currentLocation-(x*x)*2-y,currentLocation-(x*x)*2,currentLocation-(x*x)*2+y,currentLocation-(x*x)-y,currentLocation-(x*x),currentLocation-(x*x)+y,currentLocation-y,currentLocation,currentLocation+y];
var fieldOfViewFront = [currentLocation-(z*2)-1,currentLocation-(z*2),currentLocation-(z*2)+1,currentLocation+(x/z)-1,currentLocation+(x/z),currentLocation+(x/z)-z,currentLocation-(x/z),currentLocation,currentLocation+(x/z)];
var currentMoves = [];

////             y+ /z+
////             | /
////             |/
////  	x+_______*_______x-
////            /|
////           / |
////       z- /  y-



document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;

function fieldOfViewBasedOnDirection() {
	switch (direction) {
	case "N":
		y = 1;
		z = x;
		break;
	case "E":
		y = x;
		z = 1;
		break;
	case "S":
		y = -1;
		z = -x;
		break;
	case "W":
		y = -x;
		z = 1;
		break;
	default:
		console.alert("Error");
	}
	fieldOfViewBack = [currentLocation-(x*x)*2-y,currentLocation-(x*x)*2,currentLocation-(x*x)*2+y,currentLocation-(x*x)-y,currentLocation-(x*x),currentLocation-(x*x)+y,currentLocation-y,currentLocation,currentLocation+y];
	fieldOfViewFront = [currentLocation-(z*2)-1,currentLocation-(z*2),currentLocation-(z*2)+1,currentLocation+(x/z)-1,currentLocation+(x/z),currentLocation+(x/z)-z,currentLocation-(x/z),currentLocation,currentLocation+(x/z)];
}

function yaw(lr) {
	if (lr == "left") {
		switch (direction) {
		case "N":
			direction = directionArray[3];
			break;
		case "E":
			direction = directionArray[0];
			break;
		case "S":
			direction = directionArray[1];
			break;
		case "W":
			direction = directionArray[2];
			break;
		}
	}
	if (lr == "right") {
		switch (direction) {
		case "N":
			direction = directionArray[1];
			break;
		case "E":
			direction = directionArray[2];
			break;
		case "S":
			direction = directionArray[3];
			break;
		case "W":
			direction = directionArray[0];
			break;
		}
	}
	document.querySelector("#compass").innerHTML = "Direction: " + direction + "<br>Top Facing: " + topfacing;
	fieldOfViewBasedOnDirection();
	fieldOfView();
}

fieldOfViewBasedOnDirection()

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
		fieldOfView();
	}
	else {
		orientation = "BACK";
		fieldOfView();
	}
}

function fieldOfView() {
	if (orientation == "BACK") {
		tableView(0,0,fieldOfViewBack[0]); //7
		tableView(0,1,fieldOfViewBack[1]); //8
		tableView(0,2,fieldOfViewBack[2]); //9
		tableView(1,0,fieldOfViewBack[3]); //16
		tableView(1,1,fieldOfViewBack[4]); //17
		tableView(1,2,fieldOfViewBack[5]); //18
		tableView(2,0,fieldOfViewBack[6]); //25
		tableView(2,1,"&#8743;<br>&#9669;&#9677;&#9677;&#9677;&#9659;"); //26
		tableView(2,2,fieldOfViewBack[8]); //27
	}
	if (orientation == "TOP") {
		tableView(0,0,fieldOfViewFront[0]); //19
		tableView(0,1,fieldOfViewFront[1]); //20
		tableView(0,2,fieldOfViewFront[2]); //21
		tableView(1,0,fieldOfViewFront[3]); //22
		tableView(1,1,fieldOfViewFront[4]); //23
		tableView(1,2,fieldOfViewFront[5]); //24
		tableView(2,0,fieldOfViewFront[6]); //25
		tableView(2,1,"&#9651;<br>&#8834;&#8890;&#8835;<br>&#9677;&#9677;&#9677;"); //26
		tableView(2,2,fieldOfViewFront[8]); //27
	}
}

function tableView(tr,td,isWhat) {
	document.querySelector("#fieldOfView").childNodes[0].childNodes[tr].childNodes[td].innerHTML = isWhat;
}

generateWorld();
fieldOfView();
