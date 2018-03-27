var worldArray = [];
var orientation = "BACK";
var x = 3;
var y = 1;
var currentLocation = 24;
var yawArray = ["N","E","S","W"];
var yaw = yawArray[3];
var pitchArray = ["UP","F","DOWN"];
var pitch = pitchArray[1];
var rollArray = ["UPSIDEUP","RIGHT","UPSIDEDOWN","LEFT"]
var fieldOfViewBack = [currentLocation-Math.pow(x,2)*2-y,currentLocation-Math.pow(x,2)*2,currentLocation-Math.pow(x,2)*2+y,currentLocation-Math.pow(x,2)-y,currentLocation-Math.pow(x,2),currentLocation-Math.pow(x,2)+y,currentLocation-y,currentLocation,currentLocation+y];
var fieldOfViewFront = []
var currentMoves = [];

////             y+ /z+
////             | /
////             |/
////  	x+_______*_______x-
////            /|
////           / |
////       z- /  y-



document.querySelector("#compass").innerHTML = "Direction: " + yaw;

function fieldOfViewBasedOnFacingDirection() {
	switch (yaw) {
		case "N":
			y = 1;
			break;
		case "E":
			y = x;
			break;
		case "S":
			y = -1;
			break;
		case "W":
			y = -x;
			break;
		default:
			console.alert("Error");
	}
	fieldOfViewBack = [currentLocation-Math.pow(x,2)*2-y,currentLocation-Math.pow(x,2)*2,currentLocation-Math.pow(x,2)*2+y,currentLocation-Math.pow(x,2)-y,currentLocation-Math.pow(x,2),currentLocation-Math.pow(x,2)+y,currentLocation-y,currentLocation,currentLocation+y];
}

fieldOfViewBasedOnFacingDirection()

function generateWorld() {
	for (i=0;i<Math.pow(x,3);i++) {
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
		tableView(0,0,"1"); //19
		tableView(0,1,"2"); //20
		tableView(0,2,"3"); //21
		tableView(1,0,"4"); //22
		tableView(1,1,"5"); //23
		tableView(1,2,"6"); //24
		tableView(2,0,"7"); //25
		tableView(2,1,"&#9651;<br>&#8834;&#8890;&#8835;<br>&#9677;&#9677;&#9677;"); //26
		tableView(2,2,"9"); //27
	}
}

function tableView(tr,td,isWhat) {
	document.querySelector("#fieldOfView").childNodes[0].childNodes[tr].childNodes[td].innerHTML = isWhat;
}

generateWorld();
fieldOfView();
