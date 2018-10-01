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
			landOffer();
			alienReply("My people humbly offer " + dealOrNoDeal[2] + " " + dealOrNoDeal[3] + " for your " + dealOrNoDeal[0] + " " + dealOrNoDeal[1]);
			currentlyTrading = true;	
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
			alienReply("...");
			break;
		case "launch":case "l":
			computerReply("Launching sequence initiated...", 700);
			setTimeout(function() {launch(movArrArr[3])}, 1700);
			computerReply("Launch sequence successful.", 5800);
			isLanded = false;
			soundEffect(196.0, 'sine',4,[.3,.7,1,.5],1700);
			soundEffect(329.6, 'sine',4,[.3,.7,1,.5],1700);
			alienReply("Safe travels.");
			landConversation = false;
			break;
		case "":
			break;
		default:
			alienReply("I don't understand.");
	};
};

function landOffer() {
	dealOrNoDeal = [];
	dealOrNoDeal.push((((currentLocation.toString().split("").map(Number)[currentLocation.toString().split("").length-1])+1)+((currentLocation.toString().split("").map(Number)[currentLocation.toString().split("").length-2])+1))*5);
	switch (currentLocation.toString().split("").map(Number)[currentLocation.toString().split("").length-2]) {
		case (0):case (3):case (6):
			dealOrNoDeal.push("IRON OXIDE");
			break;
		case (1):case (4):case (7):
			dealOrNoDeal.push("HYDROCARBON");
			break;
		case (2):case (5):case (8):
			dealOrNoDeal.push("HYDROXIDE");
			break;
		case (9):
			dealOrNoDeal.push("ETERNITY ORB");
			break;
	};
	dealOrNoDeal.push((((currentLocation.toString().split("").map(Number)[currentLocation.toString().split("").length-1])+1)+((currentLocation.toString().split("").map(Number)[currentLocation.toString().split("").length-3])+1))*7);
	switch (currentLocation.toString().split("").map(Number)[currentLocation.toString().split("").length-1]) {
		case (0):case (3):case (6):
			dealOrNoDeal.push("IRON OXIDE");
			break;
		case (1):case (4):case (7):
			dealOrNoDeal.push("HYDROCARBON");
			break;
		case (2):case (5):case (8):
			dealOrNoDeal.push("HYDROXIDE");
			break;
		case (9):
			dealOrNoDeal.push("a REPAIR");
			break;
	};
	if (dealOrNoDeal[1] == dealOrNoDeal[3] && dealOrNoDeal[1] == "IRON OXIDE") {dealOrNoDeal.splice(1 , 1, "HYDROCARBON");};
	if (dealOrNoDeal[1] == dealOrNoDeal[3] && dealOrNoDeal[1] == "HYDROCARBON") {dealOrNoDeal.splice(1 , 1, "HYDROXIDE");};
	if (dealOrNoDeal[1] == dealOrNoDeal[3] && dealOrNoDeal[1] == "HYDROXIDE") {dealOrNoDeal.splice(1 , 1, "IRON OXIDE");};
	if (dealOrNoDeal[1] == "ETERNITY ORB") {dealOrNoDeal[0] = dealOrNoDeal.splice(3, 1, "an UPGRADE");dealOrNoDeal.splice(0, 1, 1);dealOrNoDeal.splice(2, 1, "");};
	if (dealOrNoDeal[3] == "a REPAIR") {dealOrNoDeal[0]=dealOrNoDeal[0]*10;dealOrNoDeal.splice(2, 1, "");};
};

function landTrading(ui) {
	switch (ui.toLowerCase().replace(/\?|\!|\./g,'')) {
		case "yes":case "okay":case "deal":case "agreed":case "sure":case "fine":
			switch (dealOrNoDeal[1]) {
				case "IRON OXIDE":
					if (inventory[1] < dealOrNoDeal[0]) {
						currentlyTrading = false;
						return alienReply("You do not have enough IRON OXIDE.");
					}
					else {
						inventory[1] = inventory[1] - dealOrNoDeal[0];
					};
				break;
				case "HYDROCARBON":
					if (inventory[2] < dealOrNoDeal[0]) {
						currentlyTrading = false;
						return alienReply("You do not have enough HYDROCARBON.");
					}
					else {
						inventory[2] = inventory[2] - dealOrNoDeal[0];
					};
				break;
				case "HYDROXIDE":
					if (inventory[3] < dealOrNoDeal[0]) {
						currentlyTrading = false;
						return alienReply("You do not have enough HYDROXIDE.");
					}
					else {
						inventory[3] = inventory[3] - dealOrNoDeal[0];
					};
				break;
				case "ETERNITY ORB":
					if (inventory[4] < dealOrNoDeal[0]) {
						currentlyTrading = false;
						return alienReply("You do not have enough ETERNITY ORBs.");
					}
					else {
						inventory[4] = inventory[4] - dealOrNoDeal[0];
					};
				break;
			}
			switch (dealOrNoDeal[3]) {
				case "IRON OXIDE":
					inventory[1] = inventory[1] + dealOrNoDeal[2];
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
				case "HYDROCARBON":
					inventory[2] = inventory[2] + dealOrNoDeal[2];
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
				case "HYDROXIDE":
					inventory[3] = inventory[3] + dealOrNoDeal[2];
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
				case "ETERNITY ORB":
					inventory[4] = inventory[4] + dealOrNoDeal[2];
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
				case "a REPAIR":
					let i=0;
					while (i<shipWare.length) {
						if (!shipWare[i]) {
							return shipWare[i] = true;
						}
						else {
							i++;
						};
					};
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
				case "an UPGRADE":
					maxSolarPower = maxSolarPower + 50;
					computerReply("MAXIMUM SOLAR POWER INCRESED BY 50%",1700);
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
			}
			alienReply("Thank you. Would you like to do that trade again?");
			break;
		case "check inventory": case "inventory":
			computerReply("SOLAR ENERGY: " + inventory[0] + "%");
			computerReply("IRON OXIDE: " + inventory[1], 1700);
			computerReply("HYDROCARBON: " + inventory[2], 2700);
			computerReply("HYDROXIDE: " + inventory[3], 3700);
			computerReply("ETERNITY ORBS: " + inventory[4], 4700);
			break;
		case "clear":
			document.getElementById("shipConsole").innerHTML = "";
			break;
		case "goodbye":case "bye":case "so long":case "fare well":case "farewell":case "signing off":case "end":case "stop":
			if (dealOrNoDeal[3] == "LETTING YOU PASS UNHARMED") {
				alienReply("Then die.");
				takeDamage(20);
				alienConversation = false;
				currentlyTrading = false;
			}
			else {
				alienReply("Farewell.");
				alienConversation = false;
				currentlyTrading = false;
			};
			break;
		case "nevermind":case "no":case "not right now":
			if (dealOrNoDeal[3] == "LETTING YOU PASS UNHARMED") {
				alienReply("Then die.");
				takeDamage(20);
				computerReply("Solar energy: " + inventory[0] + "%",200);
				alienConversation = false;
				currentlyTrading = false;
			}
			else {
				alienReply("Okay.");	
			};
			currentlyTrading = false;
			break;
		case "check inventory":case "inventory":case "inv":
			computerReply("SOLAR ENERGY: " + inventory[0] + "%");
			computerReply("IRON OXIDE: " + inventory[1], 1700);
			computerReply("HYDROCARBON: " + inventory[2], 2700);
			computerReply("HYDROXIDE: " + inventory[3], 3700);
			computerReply("ETERNITY ORBS: " + inventory[4], 4700);
			break;
		case "fire":
			if (weCruisin) {
				computerReply("ERROR. Disable cruise control first.");
			}
			else if (!shipWare[0]) {
				computerReply("ERROR. BLASTER requires repair.");
			}
			else {
				soundEffect(138.6, 'sawtooth',2,[.1,.15,0,0]);
				dishAndTakeDamageDogfight(Math.floor(Math.random()*70)+25);
				alienReply("NO!", 200);
				alienConversation = false;
				currentlyTrading = false;
				alienReply("Damn you.");
				destroyObject(direction);
				inventory[0] = inventory[0] - 5;
				computerReply("Solar energy: " + inventory[0] + "%",2700);
				if (dealOrNoDeal[3] == "LETTING YOU PASS UNHARMED") {didGoodOrEvil(10,0);}else {didGoodOrEvil(0,50);};
			};
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
			currentlyTrading = false;
			break;
		case "":
			break;
		default:
			alienReply("I do not understand.");
	};
};