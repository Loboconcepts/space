function alienLife(xPos,yPos) {

	if (!xPos) {xPos = 0};
	if (!yPos) {yPos = 0};
	if (currentLocation.toString(10)[currentLocation.toString(10).length-1]>5){
		generateAlien(xPos,yPos);
	};
};

function landConvo(ui) {
	switch (ui.toLowerCase().replace(/\?|\!|\./g,'')) {
		case "where am i":case "where are we":
			alienReply("You are on " + planetNamer() + ".");
			break;
		case "thank you":case "thanks":
			alienReply("You're welcome.");
			break;
		case "hello":case "hi":case "yo":case "howdy":case "good morning":case "good midday":case "good afternoon":case "good evening":
			alienReply(timeOfDay() + ".");
			break;
		case "what is this":case "who are you":
			alienReply("I am an alien.");
			break;
		case "what is this":case "who are you":
			alienReply("I am an ally.");
			break;
		case "thanks":case "thanks you":case "okay thanks":
			alienReply("You're welcome.");
			break;
		case "how are you":case "how are you doing":case "hows it going":
			alienReply("I am well.");
			break;
		case "goodbye":case "bye":case "so long":case "fare well":case "farewell":case "signing off":case "end":case "stop":
			alienReply("Farewell.");
			break;
		case "time":case "what time is it":case "whats the time":
			alienReply(new Date().toLocaleTimeString());
			break;
		case "clear":
			document.getElementById("shipConsole").innerHTML = "";
			break;
		case "trade":
			if (harvestedLocations.indexOf(currentLocation.toString(36)) == -1) {
				offer(currentLocation);
				alienReply("I require " + dealOrNoDeal[0] + " " + dealOrNoDeal[1] + " for " + dealOrNoDeal[2] + " " + dealOrNoDeal[3]);
				currentlyTrading = true;	
			}
			else {alienReply("There's nothing more for us to discuss.")}
			break;
		case "check inventory":case "inventory":case "inv":
			computerReply("SOLAR ENERGY: " + inventory[0] + "%");
			computerReply("IRON OXIDE: " + inventory[1], 1700);
			computerReply("HYDROCARBON: " + inventory[2], 2700);
			computerReply("HYDROXIDE: " + inventory[3], 3700);
			computerReply("ETERNITY ORBS: " + inventory[4], 4700);
			break;
		case "fire":
			computerReply("ERROR. Don't be an asshole.");
			break;
		case "hail":
			alienReply("I'm not a spaceship.");
			break;
		case "mine":case "harvest":case "dig":
			harvestResources();
			alienReply("We will not trade with you now.");
			break;
		case "launch":
			computerReply("Launching sequence initiated...", 700);
			setTimeout(function() {launch(movArrArr[3])}, 1700);
			computerReply("Launch sequence successful.", 5800);
			isLanded = false;
			soundEffect(196.0, 'sine',4,[.3,.7,1,.5],1700);
			soundEffect(329.6, 'sine',4,[.3,.7,1,.5],1700);
			alienReply("Safe travels.");
			landConversation = false;
		case "":
			break;
		default:
			alienReply("I don't understand.");
	};
};