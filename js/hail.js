function alienReply(reply, time) {
		if (!time) {time = 1000;};
		return setTimeout(function(){document.getElementById("shipConsole").innerHTML += "<span style='color:#ff3333;'>" + reply + "</span><br>"; document.getElementById("shipConsole").scrollTop = document.getElementById("shipConsole").scrollHeight;}, time);
	};

function greetingOrTip() {
	if ((alienLocation > worldArray.length-200) || (alienLocation < 200)) {
		return alienReply("I think a black hole is nearby.");
	}
	else {
		switch (alienLocation.toString()[alienLocation.toString().length-3]) {
			case "0":
			return alienReply("Try CCON A in your ship console for speed.");
			break;
			case "1":
			return alienReply("It is less evil to hail an enemy before attacking them.");
			break;
			case "2":
			return alienReply("I have heard that you can harvest ETERNITY ORBS on some planets.");
			break;
			case "3":
			return alienReply("Rumor has it that brighter planets have more resources.");
			break;
			case "4":
			return alienReply("I have heard there is a black hole somewhere.");
			break;
			case "5":
			return alienReply("The SCANNER tells you in which direction something is the closest.");
			break;
			case "6":
			return alienReply("The RADAR tells you how far in front of you is the closest object.");
			break;
			case "7":
			return alienReply("You can CHARGE your solar energy when next to a star.");
			break;
			case "8":
			return alienReply("You must be facing DOWN towards a planet to land on it.");
			break;
			case "9":
			return alienReply(story[storyChapter]);
			break;
			default:
			return alienReply("I think a black hole is nearby.")
			break;
		};
	};
};

function hail() {
	switch (direction) {
		case "N":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*x))=="2" || loopView(currentLocation-(xi*x))=="3" || loopView(currentLocation-(xi*x))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation-(xi*x))=="x") {alienLocation = currentLocation-(xi*x); if (goodOrEvil < -100){takeDamage(Math.floor(Math.random()*70)+25);computerReply("Solar energy: " + inventory[0] + "%",1700);return alienReply("Die scum!",200)}else{alienConversation = true;return greetingOrTip();}}
				else {xi = xi + 1;}
			}
			break;
		case "S":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation+(xi*x))=="2" || loopView(currentLocation+(xi*x))=="3" || loopView(currentLocation+(xi*x))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation+(xi*x))=="x") {alienLocation = currentLocation+(xi*x); if (goodOrEvil < -100){takeDamage(Math.floor(Math.random()*70)+25);computerReply("Solar energy: " + inventory[0] + "%",1700);return alienReply("Die scum!",200)}else{alienConversation = true;return greetingOrTip();}}
				else {xi = xi + 1;}
			}
			break;
		case "W":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*z))=="2" || loopView(currentLocation-(xi*z))=="3" || loopView(currentLocation-(xi*z))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation-(xi*z))=="x") {alienLocation = currentLocation-(xi*z); if (goodOrEvil < -100){takeDamage(Math.floor(Math.random()*70)+25);computerReply("Solar energy: " + inventory[0] + "%",1700);return alienReply("Die scum!",200)}else{alienConversation = true;return greetingOrTip();}}
				else {xi = xi + 1;}
			}
			break;
		case "E":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation+(xi*z))=="2" || loopView(currentLocation+(xi*z))=="3" || loopView(currentLocation+(xi*z))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation+(xi*z))=="x") {alienLocation = currentLocation+(xi*z); if (goodOrEvil < -100){takeDamage(Math.floor(Math.random()*70)+25);computerReply("Solar energy: " + inventory[0] + "%",1700);return alienReply("Die scum!",200)}else{alienConversation = true;return greetingOrTip();}}
				else {xi = xi + 1;}
			}
			break;
		case "UP":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*y))=="2" || loopView(currentLocation-(xi*y))=="3" || loopView(currentLocation-(xi*y))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation-(xi*y))=="x") {alienLocation = currentLocation-(xi*y); if (goodOrEvil < -100){takeDamage(Math.floor(Math.random()*70)+25);computerReply("Solar energy: " + inventory[0] + "%",1700);return alienReply("Die scum!",200)}else{alienConversation = true;return greetingOrTip();}}
				else {xi = xi + 1;}
			}
			break;
		case "DOWN":
			var xi = 0;
			while (xi<3) {
				if (loopView(currentLocation+(xi*y))=="2" || loopView(currentLocation+(xi*y))=="3" || loopView(currentLocation+(xi*y))=="4") {return computerReply("Error. Nothing within hailing range.");}
				else if (loopView(currentLocation+(xi*y))=="x") {alienLocation = currentLocation+(xi*y); if (goodOrEvil < -100){takeDamage(Math.floor(Math.random()*70)+25);computerReply("Solar energy: " + inventory[0] + "%",1700);return alienReply("Die scum!",200)}else{alienConversation = true;return greetingOrTip();}}
				else {xi = xi + 1;}
			}
			break;
		default:
			return computerReply("Error. Nothing within hailing range.");
			break;
	};
	return computerReply("Error. Nothing within hailing range.");
};

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
		case "where am i":case "where are we":
			alienReply("In the galaxy.");
			break;
		case "cool":
			alienReply("Yes.");
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
			alienConversation = false;
			break;
		case "time":case "what time is it":case "whats the time":
			alienReply(new Date().toLocaleTimeString());
			break;
		case "clear":
			document.getElementById("shipConsole").innerHTML = "";
			break;
		case "trade":
			if (harvestedLocations.indexOf(alienLocation.toString(36)) == -1) {
				offer(alienLocation);
				alienReply("I require " + dealOrNoDeal[0] + " " + dealOrNoDeal[1] + " for " + dealOrNoDeal[2] + " " + dealOrNoDeal[3]);
				currentlyTrading = true;	
			}
			else {alienReply("We have already completed our trade.")}
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
			else if (!shipWare[1]) {
				computerReply("ERROR. BLASTER requires repair.");
			}
			else {
				soundEffect(138.6, 'sawtooth',2,[.1,.15,0,0]);
				alienReply("Glorious combat it is then!", 200);
				dishAndTakeDamageDogfight(Math.floor(Math.random()*70)+25);
				alienConversation = false;
				alienReply("Well fought.");
				destroyObject(direction);
				inventory[0] = inventory[0] - 5;
				computerReply("Solar energy: " + inventory[0] + "%",2700);
				didGoodOrEvil(0,15);
			};
			break;
		case "hail":
			alienReply("We are already talking.");
			break;
		case "":
			break;
		default:
			alienReply("I don't understand.");
	};
};

function offer(xLocation) {
	dealOrNoDeal = [];
	dealOrNoDeal.push((((xLocation.toString().split("").map(Number)[xLocation.toString().split("").length-1])+1)+((xLocation.toString().split("").map(Number)[xLocation.toString().split("").length-2])+1))*8)
	switch (xLocation.toString().split("").map(Number)[xLocation.toString().split("").length-1]) {
		case (0):case (5):
			dealOrNoDeal.push("IRON OXIDE");
			break;
		case (1):case (6):
			dealOrNoDeal.push("HYDROCARBON");
			break;
		case (2):case (7):
			dealOrNoDeal.push("HYDROXIDE");
			break;
		case (3):case (8):
			dealOrNoDeal.push("SOLAR ENERGY");
			break;
		case (4):case (9):
			dealOrNoDeal.push("ALL IRON OXIDE, HYDROCARBON, AND HYDROXIDE");
			break;
	};
	dealOrNoDeal.push((((xLocation.toString().split("").map(Number)[xLocation.toString().split("").length-1])+1)+((xLocation.toString().split("").map(Number)[xLocation.toString().split("").length-3])+1))*9)
	switch (xLocation.toString().split("").map(Number)[xLocation.toString().split("").length-2]) {
		case (0):case (5):
			dealOrNoDeal.push("IRON OXIDE");
			break;
		case (1):case (6):
			dealOrNoDeal.push("HYDROCARBON");
			break;
		case (2):case (7):
			dealOrNoDeal.push("HYDROXIDE");
			break;
		case (3):case (8):
			dealOrNoDeal.push("ETERNITY ORB");
			break;
		case (4):
			dealOrNoDeal.push("LETTING YOU PASS UNHARMED");
			break;
		case (9):
			dealOrNoDeal.push("MY UNDYING GRATITUDE");
			break;
	};
	if (dealOrNoDeal[1] == dealOrNoDeal[3]) {dealOrNoDeal.splice(1 , 1, "SOLAR ENERGY");};
	if (dealOrNoDeal[3] == "ETERNITY ORB") {dealOrNoDeal[0] = dealOrNoDeal[0]*2;dealOrNoDeal.splice(2 , 1, 1);};
	if (dealOrNoDeal[3] == "LETTING YOU PASS UNHARMED") {dealOrNoDeal.splice(2 , 1, "");};
	if (dealOrNoDeal[3] == "MY UNDYING GRATITUDE") {dealOrNoDeal.splice(2 , 1, "");};
	if (dealOrNoDeal[1] == "ALL IRON OXIDE, HYDROCARBON, AND HYDROXIDE") {dealOrNoDeal.splice(0 , 1, "");};
	if (dealOrNoDeal[1] == "SOLAR ENERGY") {dealOrNoDeal.splice(0 , 1, 95);};
	if (dealOrNoDeal[3] == "LETTING YOU PASS UNHARMED") {dealOrNoDeal.splice(0 , 1, 50);};
	if (dealOrNoDeal[3] == "MY UNDYING GRATITUDE") {dealOrNoDeal.splice(0 , 1, 50);};
};

function trading(ui) {
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
				case "SOLAR ENERGY":
					if (inventory[0] < dealOrNoDeal[0]) {
						currentlyTrading = false;
						return alienReply("You do not have enough SOLAR ENERGY.");
					}
					else {
						inventory[0] = inventory[0] - dealOrNoDeal[0];
					};
				break;
				case "ALL IRON OXIDE, HYDROCARBON, AND HYDROXIDE":
					inventory[1] = 0;
					inventory[2] = 0;
					inventory[3] = 0;
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
				case "LETTING YOU PASS UNHARMED":
					goodEvil = [true,false];
					didGoodOrEvil(5,0);
				break;
				case "MY UNDYING GRATITUDE":
					goodEvil = [true,false];
					didGoodOrEvil(20,0);
				break;
			}
			harvestedLocations.push(alienLocation.toString(36));
			currentlyTrading = false;
			alienReply("Thank you.");
			break;
		case "yl":case "yaw left":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Yawing Left");
				move(movArrArr[0]);
				shipRotation('YAW',-1);
				alienConversation = false;
				currentlyTrading = false;
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "check inventory": case "inventory":
			computerReply("SOLAR ENERGY: " + inventory[0] + "%");
			computerReply("IRON OXIDE: " + inventory[1], 1700);
			computerReply("HYDROCARBON: " + inventory[2], 2700);
			computerReply("HYDROXIDE: " + inventory[3], 3700);
			computerReply("ETERNITY ORBS: " + inventory[4], 4700);
			break;
		case "yr":case "yaw right":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Yawing Right");
				move(movArrArr[1]);
				shipRotation('YAW',1);
				alienConversation = false;
				currentlyTrading = false;
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
				currentlyTrading = false;
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
				currentlyTrading = false;
			}
			else {
				computerReply("Ignored");
			}
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
			else if (!shipWare[1]) {
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
		case "":
			break;
		default:
			alienReply("I do not understand.");
	};
};