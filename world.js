var worldArray = [];
var orientation = "BACK";
var x = 5;


function generateWorld() {
	for (i=0;i<125;i++) {
		if (worldArray.length%6==0) {
			worldArray.push(1);	
		}
		else {
			worldArray.push(0);	
		}
		
	}
}

function fieldOfView() {
	if (orientation == "BACK") {
		tableView(0,0,"1");
		tableView(0,1,"2");
		tableView(0,2,"3");
		tableView(1,0,"4");
		tableView(1,1,"5");
		tableView(1,2,"6");
		tableView(2,0,"7");
		tableView(2,1,"SHIP BACK");
		tableView(2,2,"9");
	}
}

function tableView(tr,td,isWhat) {
	document.querySelector("#fieldOfView").childNodes[0].childNodes[tr].childNodes[td].innerHTML = isWhat;
}

generateWorld();
fieldOfView();
