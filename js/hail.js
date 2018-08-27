function alienReply(reply, time) {
		if (!time) {time = 1000;};
		return setTimeout(function(){document.getElementById("shipConsole").innerHTML += "<span style='color:#ff0000;'>" + reply + "</span><br>"; document.getElementById("shipConsole").scrollTop = document.getElementById("shipConsole").scrollHeight;}, time);
	}

function hail() {
	switch (direction) {
		case "N":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*x))=="2" || loopView(currentLocation-(xi*x))=="3" || loopView(currentLocation-(xi*x))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation-(xi*x))=="a" || loopView(currentLocation-(xi*x))=="z" || loopView(currentLocation-(xi*x))=="x") {alienConversation = true;return alienReply("Greetings.");}
				else {xi = xi + 1;}
			}
			break;
		case "S":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation+(xi*x))=="2" || loopView(currentLocation+(xi*x))=="3" || loopView(currentLocation+(xi*x))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation+(xi*x))=="a" || loopView(currentLocation+(xi*x))=="z" || loopView(currentLocation+(xi*x))=="x") {alienConversation = true;return alienReply("Greetings.");}
				else {xi = xi + 1;}
			}
			break;
		case "W":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*z))=="2" || loopView(currentLocation-(xi*z))=="3" || loopView(currentLocation-(xi*z))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation-(xi*z))=="a" || loopView(currentLocation-(xi*z))=="z" || loopView(currentLocation-(xi*z))=="x") {alienConversation = true;return alienReply("Greetings.");}
				else {xi = xi + 1;}
			}
			break;
		case "E":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation+(xi*z))=="2" || loopView(currentLocation+(xi*z))=="3" || loopView(currentLocation+(xi*z))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation+(xi*z))=="a" || loopView(currentLocation+(xi*z))=="z" || loopView(currentLocation+(xi*z))=="x") {alienConversation = true;return alienReply("Greetings.");}
				else {xi = xi + 1;}
			}
			break;
		case "UP":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*y))=="2" || loopView(currentLocation-(xi*y))=="3" || loopView(currentLocation-(xi*y))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation-(xi*y))=="a" || loopView(currentLocation-(xi*y))=="z" || loopView(currentLocation-(xi*y))=="x") {alienConversation = true;return alienReply("Greetings.");}
				else {xi = xi + 1;}
			}
			break;
		case "DOWN":
			var xi = 0;
			while (xi<3) {
				if (loopView(currentLocation+(xi*y))=="2" || loopView(currentLocation+(xi*y))=="3" || loopView(currentLocation+(xi*y))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation+(xi*y))=="a" || loopView(currentLocation+(xi*y))=="z" || loopView(currentLocation+(xi*y))=="x") {alienConversation = true;return alienReply("Greetings.");}
				else {xi = xi + 1;}
			}
			break;
		default:
			return computerReply("Error. Nothing within hailing range.");
			break;
	}
	return computerReply("Error. Nothing within hailing range.");
}

function conversation(ui) {
	switch (ui.toLowerCase().replace(/\?|\!|\./g,'')) {
		case "yl":case "yaw left":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Yawing Left");
				move(movArrArr[0]);
				shipRotation('YAW',-1);
				alienConversation = false;
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "yr":case "yaw right":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Yawing Right");
				move(movArrArr[1]);
				shipRotation('YAW',1);
				alienConversation = false;
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "pu":case "pitch up":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Pitching Up");
				move(movArrArr[2]);
				shipRotation('PITCH',1);
				alienConversation = false;
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "pd":case "pitch down":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Pitching Down");
				move(movArrArr[3]);
				shipRotation('PITCH',-1);	
				alienConversation = false;
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "rl":case "roll left":
			if (!weCruisin && !isLanded) {
				computerReply("Rolling Left");
				rotateShape(1,'ROLL', -1);	
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "rr":case "roll right":
			if (!weCruisin && !isLanded) {
				computerReply("Rolling Right");
				rotateShape(-1,'ROLL', 1);	
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "where am i":case "where are we":
			alienReply("In the galaxy.");
			break;
		case "help":case "controls":case "what":case "instructions":case "manual":case "commands":case "nav commands":
			alienReply("How can I be of assistance?");
			break;
		case "hello":case "hi":case "yo":case "howdy":case "good morning":case "good midday":case "good afternoon":case "good evening":
			alienReply(timeOfDay());
			break;
		case "what is this":case "who are you":
			alienReply("I am an alien.");
			break;
		case "what is this":case "who are you":
			alienReply("I am an alien.");
			break;
		case "thanks":case "thanks you":case "okay thanks":
			alienReply("You're welcome.");
			break;
		case "goodbye":case "bye":case "so long":case "fare well":case "farewell":case "signing off":case "end":case "stop":
			alienReply("Farewell.");
			alienConversation = false;
			break;
		case "time":case "what time is it":case "whats the time":
			alienReply(new Date().toLocaleTimeString());
			break;
		case "clear":
			document.getElementById("shipConsole").innerHTML = "";
			break;
		case (ui.toLowerCase().replace(/\?|\!|\./g,'').match(/\btrade\b/) || {}).input:
			alienReply("Do you have any IRON OXIDE?");
			break;
		case "fire":
			if (!weCruisin) {
				alienConversation = false;
				alienReply("Damn you.");
				solarBlaster();
				destroyObject(direction);
				inventory[0] = inventory[0] - 5;
				computerReply("Solar energy: " + inventory[0] + "%",200);
			}
			else {
				computerReply("Error. Disable cruise control first.");
			}
			break;
		case "hail":
			alienReply("We are already talking.");
			break;
		case "":
			break;
		default:
			alienReply("I don't understand.");
	}
}