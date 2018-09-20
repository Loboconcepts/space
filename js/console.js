function submitUserInput(x) {
	understandUserInput(x);
	document.getElementById("shipConsole").scrollTop = document.getElementById("shipConsole").scrollHeight;
	document.getElementById("user").value = "";
};

function understandUserInput(ui) {
	document.getElementById("shipConsole").innerHTML += "&dash;" + ui + "<br>";
	if (alienConversation && currentlyTrading) {return trading(ui)}
	else if (landConversation && currentlyTrading) {return landTrading(ui)}
	else if (alienConversation) {return conversation(ui)}
	else if (landConversation) {return landConvo(ui)}
	switch (ui.toLowerCase().replace(/\?|\!|\./g,'')) {
		case "yl":case "yaw left":
			if (!weCruisin && !isLanded) {
				computerReply("Yawing Left");
				move(movArrArr[0]);
				shipRotation('YAW',-1);
				soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',2,[.5,.8,.1,0]);
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "yr":case "yaw right":
			if (!weCruisin && !isLanded) {
				computerReply("Yawing Right");
				move(movArrArr[1]);
				shipRotation('YAW',1);
				soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',2,[.5,.8,.1,0]);
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "pu":case "pitch up":
			if (!weCruisin && !isLanded) {
				computerReply("Pitching Up");
				move(movArrArr[2]);
				shipRotation('PITCH',1);
				soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',3,[.5,.8,.1,0]);
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "pd":case "pitch down":
			if (!weCruisin && !isLanded) {
				computerReply("Pitching Down");
				move(movArrArr[3]);
				shipRotation('PITCH',-1);
				soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',3,[.5,.8,.1,0]);
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "rl":case "roll left":
			if (!weCruisin && !isLanded) {
				computerReply("Rolling Left");
				rotateShape(1,'ROLL', -1);
				soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',2,[.5,.8,.1,0]);
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "rr":case "roll right":
			if (!weCruisin && !isLanded) {
				computerReply("Rolling Right");
				rotateShape(-1,'ROLL', 1);
				soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',2,[.5,.8,.1,0]);
			}
			else {
				computerReply("Ignored");
			};
			break;
		case "accelerate":case "accel":case "a":
			if (!weCruisin && !isLanded) {
				if (worldArray[currentLocation-1] == "d" && direction == "DOWN") {
					computerReply("Error. Flying through shrapnel will damage craft.");
				}
				// else if (worldArray[currentLocation-1] != "1" && direction == "DOWN") {
				// 	computerReply("Error. Collision course detected.");
				// }
				else {
					soundEffect([130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6][Math.floor(Math.random()*[130.8,146.8,164.8,174.6,196.0,220.0,246.9,261.6].length)], 'sine',2,[.8,1,.8,0.3])
					computerReply("Accelerating.");
					accelerate();
				};
			}
			else {
				computerReply("Ignored");
			};
			break;
		case "warp":
			if (!weCruisin && !isLanded) {
				if (worldArray[currentLocation-1] == "d" && direction == "DOWN") {
					computerReply("Error. Intitiating warp through shrapnel will damage craft.");
				}
				else if (inventory[0]<11) {
					computerReply("Not enough solar energy.");
				}
				else if (worldArray[currentLocation-1] != "1" && direction == "DOWN") {
					computerReply("Error. Collision course detected.");
				}
				else {
					inventory[0] = inventory[0]-10;
					computerReply("Warping.");
					computerReply("SOLAR ENERGY: " + inventory[0] + "%", 2000);
					warp(5);
					warpAnimation();
				};
			}
			else {
				computerReply("Ignored");
			};
			break;
		case "charge":
			if (worldArray[currentLocation-1] == "2") {
				computerReply("Charging...");
				computerReply("SOLAR ENERGY fully charged.", 1700);
				inventory[0] = 100;
				soundEffect(196.0, 'sine',2,[.7,1,.3,0]);
				soundEffect(329.6, 'sine',2,[.7,1,.3,0]);

				soundEffect(220.0, 'sine',2,[.7,1,.3,0],700);
				soundEffect(370.0, 'sine',2,[.7,1,.3,0],700);

				soundEffect(246.9, 'sine',2,[.7,1,.3,0],1400);
				soundEffect(392.0, 'sine',2,[.7,1,.3,0],1400);
			}
			else {
				computerReply("No energy source detected.");
			}
			break;
		case "land":
			if (!weCruisin) {
				if (!isLanded && (worldArray[currentLocation-1] == "3" || worldArray[currentLocation-1] == "5" || worldArray[currentLocation-1] == "6") && direction == "DOWN") {
					computerReply("Landing sequence initiated...");
					land(movArrArr[2]);
					isLanded = true;
					computerReply("Land sequence completed successfully.", 3800);
					computerReply(scanPlanet(), 4800);
					if ((currentLocation.toString()[currentLocation.toString().length-1]%3==0) || (currentLocation.toString()[currentLocation.toString().length-1]%4<2)){
			  			landConversation = true;
			  			alienReply("Greetings! Welcome to " + planetNamer() + ".", 5800);
			  		}
			  		else {
			  			computerReply("Welcome to " + planetNamer() + ".", 5800);
			  		};
					// setTimeout(function() {alienLife(0,0)}, 5200);
					soundEffect(130.8, 'sine',4,[.3,.7,1,.5]);
					soundEffect(196.0, 'sine',4,[.3,.7,1,.5]);
				}
				else if (isLanded) {
					computerReply("Error. We are currently landed.");
				}
				else {
					computerReply("Error. I am unable to detect a suitable landing surface.");
				}
			}
			break;
		case "launch":
			if (isLanded) {
				computerReply("Launching sequence initiated...", 700);
				setTimeout(function() {launch(movArrArr[3])}, 1700);
				computerReply("Launch sequence successful.", 5800);
				isLanded = false;
				soundEffect(196.0, 'sine',4,[.3,.7,1,.5],1700);
				soundEffect(329.6, 'sine',4,[.3,.7,1,.5],1700);
			}
			else {
				computerReply("Error. Already launched.");
			}
			break;
		case "cc on accel":case "ccon a":
			cruiseControl=true;
			if (!weCruisin && !isLanded) {
				if (worldArray[currentLocation-1] == "d" && direction == "DOWN") {
					computerReply("Error. Flying through shrapnel will damage craft.");
				}
				// else if (worldArray[currentLocation-1] != "1" && direction == "DOWN") {
				// 	computerReply("Error. Collision course detected.");
				// }
				else {
					computerReply("Accelerating.");
					accelerate();
				}
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "cruise control on":case "cc on":case "ccon":
			cruiseControl=true;
			computerReply("Cruise control is enabled.");
			break;
		case "cruise control off":case "cc off":case "ccoff":case "stop":case "s":
			cruiseControl=false;
			computerReply("Cruise control is disabled.");
			break;
		case "where am i":case "current location":case "location":case "where are we":case "position":case "current position":case "pos":case "loc":
			computerReply("We are currently at galacube " + currentLocation);
			break;
		case "help":case "what":case "instructions":case "manual":
			computerReply("You are in the universe. Capital letters usually implies a console command. Helpful commands: CONTROLS, COMMANDS, STATUS");
			break;
		case "controls":case "nav":case "nav commands":case "navigation commands":
			computerReply("nav controls: ACCELERATE, YAW LEFT, YAW RIGHT, PITCH UP, PITCH DOWN, ROLL LEFT, ROLL RIGHT, CRUISE CONTROL ON, CRUISE CONTROL OFF, STOP or 'S', LAND, LAUNCH, SCAN, FIRE, HAIL, HARVEST. Most commands have obvious shortcuts.");
			break;
		case "actions":case "commands":case "interaction":case "navigation commands":
			computerReply("commands: SCAN, FIRE, HAIL, HARVEST, CHARGE, RADAR, WARP. You can TRADE with aliens.");
			break;
		case "hello":case "hi":case "yo":case "howdy":case "good morning":case "good midday":case "good afternoon":case "good evening":
			computerReply(timeOfDay() + " Commander.");
			break;
		case "what is this":case "who are you":
			computerReply("ACCESS DENIED. Input HELP for help.");
			break;
		case "direction":case "compass":case "dir":case "orientation":
			computerReply("Direction: " + direction);
			computerReply("Orientation: " + topfacing);
			break;
		case "scan":
			if (isLanded) {computerReply("Scanning...");computerReply(scanPlanet());}
			else if (!weCruisin) {soundEffect(329.6,'triangle',2,[1,.8,.3,.1]);scannerAnimation();scanUniverse();}
			else {computerReply("Ignored.")};
			break;
		case "thanks":case "thanks you":case "okay thanks":
			computerReply("You're welcome.");
			break;
		case "repair":
			computerReply("Repair what?");
			break;
		case "repair gun":case "repair guns":case "repair blaster":case "repair blasters":case "repair weapon":case "repair weapons":
			if (shipWare[0]) {computerReply("ERROR. Ship BLASTER has no need for repair.");}
			else if (inventory[4] < 1) {computerReply("ERROR. BLASTER repair requires 1 ETERNITY ORB.");}
			else {computerReply("BLASTER repaired.");shipWare[0] = true;inventory[4] = inventory[4] - 1;};
			break;
		case "repair comm":case "repair hail":case "repair communicator":case "repair communications":case "repair com":
			if (shipWare[1]) {computerReply("ERROR. Ship COMM has no need for repair.");}
			else if (inventory[4] < 1) {computerReply("ERROR. COMM repair requires 1 ETERNITY ORB.");}
			else {computerReply("COMM repaired.");shipWare[1] = true;inventory[4] = inventory[4] - 1;};
			break;
		case "open the pod bay doors":case "open the pod bay doors hal":
			computerReply("I'm afraid I can't do that, Commander.");
			break;
		case "time":case "what time is it":case "whats the time":
			computerReply(new Date());
			break;
		case "clear":
			document.getElementById("shipConsole").innerHTML = "";
			break;
		case "radar":
			if (!weCruisin && !isLanded) {
				soundEffect(440,'triangle',2,[1,.8,.3,.1]);
				radarAnimation();
				computerReply("Scanning...");
				radar();
			}
			else {
				computerReply("Ignored.")
			}
			break;
		case "solar energy": case "energy":
			computerReply("SOLAR ENERGY: " + inventory[0] + "%");
			break;
		case "check inventory":case "inventory":case "inv":
			computerReply("SOLAR ENERGY: " + inventory[0] + "%");
			computerReply("IRON OXIDE: " + inventory[1], 1700);
			computerReply("HYDROCARBON: " + inventory[2], 2700);
			computerReply("HYDROXIDE: " + inventory[3], 3700);
			computerReply("ETERNITY ORBS: " + inventory[4], 4700);
			break;
		case "status":
			computerReply("Direction: " + direction);
			computerReply("Orientation: " + topfacing, 1700);
			computerReply("SOLAR ENERGY: " + inventory[0] + "%",2700);
			computerReply("IRON OXIDE: " + inventory[1], 3700);
			computerReply("HYDROCARBON: " + inventory[2], 4700);
			computerReply("HYDROXIDE: " + inventory[3], 5700);
			computerReply("ETERNITY ORBS: " + inventory[4], 6700);
			if (shipWare[0]) {computerReply("BLASTER: Good.", 7700);}else{computerReply("BLASTER: ERROR.", 7700);};
			if (shipWare[1]) {computerReply("COMM: Good.", 8700);}else{computerReply("COMM: ERROR.", 8700);};
			if (shipWare[2]) {computerReply("CRUISE CONTROL: Good.", 9700);}else{computerReply("CRUISE CONTROL: ERROR.", 9700);};
			if (shipWare[3]) {computerReply("SCANNER: Good.", 10700);}else{computerReply("SCANNER: ERROR.", 10700);};
			break;
		case "ship status":
			if (shipWare[0]) {computerReply("BLASTER: Good.");}else{computerReply("BLASTER malfunctional.");};
			if (shipWare[1]) {computerReply("COMM: Good.", 1700);}else{computerReply("COMM malfunctional.", 1700);};
			if (shipWare[2]) {computerReply("CRUISE CONTROL: Good.", 2700);}else{computerReply("CRUISE CONTROL malfunctional.", 2700);};
			if (shipWare[3]) {computerReply("SCANNER: Good.", 3700);}else{computerReply("SCANNER malfunctional.", 3700);};
			break;
		case "fire":
			if (weCruisin) {
				computerReply("ERROR. Disable cruise control first.");
			}
			else if (!shipWare[0]) {
				computerReply("ERROR. Check STATUS.");
			}
			else {
				soundEffect(138.6, 'sawtooth',2,[.1,.15,0,0]);
				solarBlasterAnimation();
				destroyObject(direction);
				didGoodOrEvil(0,70);
				inventory[0] = inventory[0] - 5;
				computerReply("SOLAR ENERGY: " + inventory[0] + "%",200);
			};
			break;
		case "mine":case "harvest":case "dig":
			if (isLanded) {harvestResources();}
			else if (worldArray[currentLocation-1] == "d") {harvestRemains();}
			else {computerReply("ERROR. Must be landed to harvest.");};
			break;
		case "hail":
			if (!weCruisin && !isLanded && shipWare[1]) {hail();}
			else {computerReply("ERROR. Check STATUS.");};
			break;
		case "":
			break;
		default:
			computerReply("Does not compute.");
	};
};
function didGoodOrEvil(good,evil) {
	if (goodEvil[0] || goodEvil[1]) {
		goodOrEvil = goodOrEvil + good - evil;
		goodEvil = [false,false];	
	};
	switch (true) {
		case goodOrEvil < -100:
			return computerReply("Legends of your evil span galaxies...", 2700);
			break;
		case goodOrEvil < -50:
			return computerReply("You've done terrible things...", 2700)
			break;
		case goodOrEvil > 50:
			return computerReply("Your good deeds are known...", 2700)
			break;
		case goodOrEvil > 100:
			return computerReply("Legends of your good span galaxies...", 2700)
			break;
		default:
			return;
			break;
	};
};
function computerReply(reply, time) {
	if (!time) {time = 700;};
	return setTimeout(function(){document.getElementById("shipConsole").innerHTML += reply + "<br>"; document.getElementById("shipConsole").scrollTop = document.getElementById("shipConsole").scrollHeight;}, time);
};
function scanUniverse() {
	var xi = 1;
	while (xi<5) {
		if (loopView(currentLocation-(xi*x))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation+(xi*x))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation-(xi*z))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation+(xi*z))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation-(xi*y))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation+(xi*y))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation-(((xi*x)-z)-y))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-((xi*x)-z))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-(((xi*x)-z)+y))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-((xi*x)-y))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-((xi*x)+y))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-((xi*x)+z)-y)!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-((xi*x)+z))!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation-((xi*x)+z)+y)!="1") {return computerReply("The nearest object is NORTH.");}
		else if (loopView(currentLocation+(((xi*x)-z)-y))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+((xi*x)-z))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+(((xi*x)-z)+y))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+((xi*x)-y))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+((xi*x)+y))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+((xi*x)+z)-y)!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+((xi*x)+z))!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation+((xi*x)+z)+y)!="1") {return computerReply("The nearest object is SOUTH.");}
		else if (loopView(currentLocation-(((xi*z)-x)-y))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-((xi*z)-x))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-(((xi*z)-x)+y))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-((xi*z)-y))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-((xi*z)+y))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-((xi*z)+x)-y)!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-((xi*z)+x))!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation-((xi*z)+x)+y)!="1") {return computerReply("The nearest object is WEST.");}
		else if (loopView(currentLocation+(((xi*z)-x)-y))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+((xi*z)-x))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+(((xi*z)-x)+y))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+((xi*z)-y))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+((xi*z)+y))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+((xi*z)+x)-y)!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+((xi*z)+x))!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation+((xi*z)+x)+y)!="1") {return computerReply("The nearest object is EAST.");}
		else if (loopView(currentLocation-(((xi*y)-x)-z))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-((xi*y)-x))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-(((xi*y)-x)+z))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-((xi*y)-z))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-((xi*y)+z))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-((xi*y)+x)-z)!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-((xi*y)+x))!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation-((xi*y)+x)+z)!="1") {return computerReply("The nearest object is UP.");}
		else if (loopView(currentLocation+(((xi*y)-x)-z))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+((xi*y)-x))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+(((xi*y)-x)+z))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+((xi*y)-z))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+((xi*y)+z))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+((xi*y)+x)-z)!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+((xi*y)+x))!="1") {return computerReply("The nearest object is DOWN.");}
		else if (loopView(currentLocation+((xi*y)+x)+z)!="1") {return computerReply("The nearest object is DOWN.");}
		else {xi = xi + 1;};
	};
};

function radar() {
	var xi = 1;
	while (xi<10) {
		switch (direction) {
			case "N":
				if (loopView(currentLocation-(xi*x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-(((xi*x)-z)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*x)-z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-(((xi*x)-z)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*x)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*x)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*x)+z)-y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*x)+z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*x)+z)+y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else {xi = xi + 1;};
				break;
			case "S":
				if (loopView(currentLocation+(xi*x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+(((xi*x)-z)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*x)-z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+(((xi*x)-z)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*x)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*x)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*x)+z)-y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*x)+z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*x)+z)+y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else {xi = xi + 1;};
				break;
			case "W":
				if (loopView(currentLocation-(xi*z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-(((xi*z)-x)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*z)-x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-(((xi*z)-x)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*z)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*z)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*z)+x)-y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*z)+x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*z)+x)+y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else {xi = xi + 1;};
				break;
			case "E":
				if (loopView(currentLocation+(xi*z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+(((xi*z)-x)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*z)-x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+(((xi*z)-x)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*z)-y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*z)+y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*z)+x)-y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*z)+x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*z)+x)+y)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else {xi = xi + 1;};
				break;
			case "UP":
				if (loopView(currentLocation-(xi*y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-(((xi*y)-x)-z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*y)-x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-(((xi*y)-x)+z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*y)-z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*y)+z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*y)+x)-z)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*y)+x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation-((xi*y)+x)+z)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else {xi = xi + 1;};
				break;
			case "DOWN":
				if (loopView(currentLocation+(xi*y))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+(((xi*y)-x)-z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*y)-x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+(((xi*y)-x)+z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*y)-z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*y)+z))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*y)+x)-z)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*y)+x))!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else if (loopView(currentLocation+((xi*y)+x)+z)!="1") {return computerReply("The nearest object is " + xi + " light years ahead.");}
				else {xi = xi + 1;};
				break;
			default: console.log("OK");
		};
	};
};

function warp(power) {
	let warpLocation;
	switch (direction) {
		case "N":
			warpLocation = currentLocation-(power*x);
			break;
		case "S":
			warpLocation = currentLocation+(power*x);
			break;
		case "W":
			warpLocation = currentLocation-(power*z);
			break;
		case "E":
			warpLocation = currentLocation+(power*z);
			break;
		case "UP":
			warpLocation = currentLocation-(power*y);
			break;
		case "DOWN":
			warpLocation = currentLocation+(power*y);
			break;
		default: console.log("OK");
	};
	if (warpLocation > worldArray.length) {return currentLocation = warpLocation - worldArray.length;}
	else if (warpLocation < 1) {return currentLocation = warpLocation + worldArray.length;}
	else {return currentLocation = warpLocation;	}
};

function timeOfDay() {
	switch (true) {
		case new Date().getHours() >= 5 && new Date().getHours() < 11:
			return "Good morning";
			break;
		case new Date().getHours() >= 11 && new Date().getHours() < 14:
			return "Good day";
			break;
		case new Date().getHours() >= 14 && new Date().getHours() < 18:
			return "Good afternoon";
			break;
		case new Date().getHours() >= 18 || new Date().getHours() < 5:
			return "Good evening";
			break;
		default:
			return "Hello";
			break;
	}
};

function harvestRemains() {
	var temp = Math.floor(Math.random() * 3) + 1;
	var temp2 = Math.floor(Math.random() * 54) + 1;
	var temp3;
	inventory[temp] = inventory[temp] + temp2;
	switch (temp) {
		case 1:
			temp3 = "IRON OXIDE";
			break;
		case 2:
			temp3 = "HYDROCARBON";
			break;
		case 3:
			temp3 = "HYDROXIDE";
			break;
	}
	computerReply(temp3 + ": " + temp2 + " (" + inventory[temp] + ").")
	spliceWorldArray(currentLocation-1,"1");
	return generalState();
}

function harvestResources() {
	var increase = "";
	if (harvestedLocations.indexOf(currentLocation.toString(36)) == -1){
		if (rgbGenerateFromCurPos(currentLocation)[0] > (rgbGenerateFromCurPos(currentLocation)[1] + 2) && rgbGenerateFromCurPos(currentLocation)[0] > (rgbGenerateFromCurPos(currentLocation)[2] + 2)) {
				harvestedLocations.push(currentLocation.toString(36));
				if (rgbGenerateFromCurPos(currentLocation)[0] > 200) {increase = Math.floor(Math.random() * 90) + 90; inventory[1] = inventory[1] + increase;return computerReply("IRON OXIDE: " + increase + " (" + inventory[1] + ").");}
				else if (rgbGenerateFromCurPos(currentLocation)[0] > 110) {increase = Math.floor(Math.random() * 70) + 54;inventory[1] = inventory[1] + increase;return computerReply("IRON OXIDE: " + increase + " (" + inventory[1] + ").");}
				else {increase = Math.floor(Math.random() * 50) + 18;inventory[1] = inventory[1] + increase;return computerReply("IRON OXIDE: " + increase + " (" + inventory[1] + ").");};
			}
			else if (rgbGenerateFromCurPos(currentLocation)[1] > (rgbGenerateFromCurPos(currentLocation)[0] + 2) && rgbGenerateFromCurPos(currentLocation)[1] > (rgbGenerateFromCurPos(currentLocation)[2] + 2)) {
				harvestedLocations.push(currentLocation.toString(36));
				if (rgbGenerateFromCurPos(currentLocation)[1] > 200) {increase = Math.floor(Math.random() * 90) + 90;inventory[2] = inventory[2] + increase; return computerReply("HYDROCARBON: " + increase + " (" + inventory[2] + ").");}
				else if (rgbGenerateFromCurPos(currentLocation)[1] > 110) {increase = Math.floor(Math.random() * 70) + 54;inventory[2] = inventory[2] + increase; return computerReply("HYDROCARBON: " + increase + " (" + inventory[2] + ").");}
				else {increase = Math.floor(Math.random() * 50) + 18;inventory[2] = inventory[2] + increase; return computerReply("HYDROCARBON: " + increase + " (" + inventory[2] + ").");};
			}
			else if (rgbGenerateFromCurPos(currentLocation)[2] > (rgbGenerateFromCurPos(currentLocation)[0] + 2) && rgbGenerateFromCurPos(currentLocation)[2] > (rgbGenerateFromCurPos(currentLocation)[1] + 2)) {
				harvestedLocations.push(currentLocation.toString(36));
				if (rgbGenerateFromCurPos(currentLocation)[2] > 200) {increase = Math.floor(Math.random() * 90) + 90;inventory[3] = inventory[3] + increase; return computerReply("HYDROXIDE: " + increase + " (" + inventory[3] + ").");}
				else if (rgbGenerateFromCurPos(currentLocation)[2] > 110) {increase = Math.floor(Math.random() * 70) + 54;inventory[3] = inventory[3] + increase; return computerReply("HYDROXIDE: " + increase + " (" + inventory[2] + ").");}
				else {increase = Math.floor(Math.random() * 50) + 18;inventory[3] = inventory[3] + increase; return computerReply("HYDROXIDE: " + increase + " (" + inventory[3] + ").");};
			}
			else {harvestedLocations.push(currentLocation.toString(36));inventory[4] = inventory[4] + 1;return computerReply("ETERNITY ORB: " + 1 + " (" + inventory[4] + ").");};}
		else {computerReply("Planet fully harvested.");
	};
};

function destroyObject(dx) {
	switch (dx) {
		case "N":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*x))=="2" || loopView(currentLocation-(xi*x))=="3" || loopView(currentLocation-(xi*x))=="4") {return;}
				else if (collideableObjects.indexOf(loopView(currentLocation-(xi*x))) > -1) {goodEvil = [false,true];soundEffect(50.6, 'sawtooth',2,[.8,1,.4,0],500);return spliceWorldArray(currentLocation-(xi*x)-1,"d");}
				else {xi = xi + 1;};
			};
			break;
		case "S":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation+(xi*x))=="2" || loopView(currentLocation+(xi*x))=="3" || loopView(currentLocation+(xi*x))=="4") {return;}
				else if (collideableObjects.indexOf(loopView(currentLocation+(xi*x))) > -1) {goodEvil = [false,true];soundEffect(50.6, 'sawtooth',2,[.8,1,.4,0],500);return spliceWorldArray(currentLocation+(xi*x)-1,"d");}
				else {xi = xi + 1;};
			};
			break;
		case "W":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*z))=="2" || loopView(currentLocation-(xi*z))=="3" || loopView(currentLocation-(xi*z))=="4") {return;}
				else if (collideableObjects.indexOf(loopView(currentLocation-(xi*z))) > -1) {goodEvil = [false,true];soundEffect(50.6, 'sawtooth',2,[.8,1,.4,0],500);return spliceWorldArray(currentLocation-(xi*z)-1,"d");}
				else {xi = xi + 1;};
			};
			break;
		case "E":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation+(xi*z))=="2" || loopView(currentLocation+(xi*z))=="3" || loopView(currentLocation+(xi*z))=="4") {return;}
				else if (collideableObjects.indexOf(loopView(currentLocation+(xi*z))) > -1) {goodEvil = [false,true];soundEffect(50.6, 'sawtooth',2,[.8,1,.4,0],500);return spliceWorldArray(currentLocation+(xi*z)-1,"d");}
				else {xi = xi + 1;};
			};
			break;
		case "UP":
			var xi = 1;
			while (xi<3) {
				if (loopView(currentLocation-(xi*y))=="2" || loopView(currentLocation-(xi*y))=="3" || loopView(currentLocation-(xi*y))=="4") {return;}
				else if (collideableObjects.indexOf(loopView(currentLocation-(xi*y))) > -1) {goodEvil = [false,true];soundEffect(50.6, 'sawtooth',2,[.8,1,.4,0],500);return spliceWorldArray(currentLocation-(xi*y)-1,"d");}
				else {xi = xi + 1;};
			};
			break;
		case "DOWN":
			var xi = 0;
			while (xi<3) {
				if (loopView(currentLocation+(xi*y))=="2" || loopView(currentLocation+(xi*y))=="3" || loopView(currentLocation+(xi*y))=="4") {return;}
				else if (collideableObjects.indexOf(loopView(currentLocation+(xi*y))) > -1) {goodEvil = [false,true];soundEffect(50.6, 'sawtooth',2,[.8,1,.4,0],500);return spliceWorldArray(currentLocation+(xi*y)-1,"d");}
				else {xi = xi + 1;};
			};
			break;
		default:
			break;
	}
};

function spliceWorldArray(where, withWhat) {
	var tempArray;
	tempArray = [worldArray.substring(0, where),worldArray.substring(where, where+1),worldArray.substring(where+1)];
	tempArray.splice(1,1,withWhat);
	oldPlanets = [];
	return worldArray = tempArray.join("");
};

function reduceSolarEnergy(howMuch) {
	inventory[0] = inventory[0] - howMuch;
	if (inventory[0] < 1) {
		computerReply("Solar energy: " + inventory[0] + "%",100);
		computerReply("*CRITICAL DAMAGE*",200);
		inventory[0] = 0;
		inventory[1] = 0;
		inventory[2] = 0;
		inventory[3] = 0;
		inventory[4] = 0;
		computerReply("*INVENTORY LOST*",1700);
		if (shipWare[0]) {
			shipWare[0] = false;
			computerReply("*BLASTER CRITICALLY DAMAGED*",2700);
		}
		else if (shipWare[1]) {
			shipWare[1] = false;
			computerReply("*COMMUNICATIONS CRITICALLY DAMAGED*",2700);
		}
		else if (shipWare[2]) {
			shipWare[2] = false;
			computerReply("*CRUISE CONTROL CRITICALLY DAMAGED*",2700);
		}
		else if (shipWare[3]) {
			shipWare[3] = false;
			computerReply("*SCANNER CRITICALLY DAMAGED*",2700);
		};
	};
};

function scanPlanet() {
	if (worldArray[currentLocation-1] == "3") {
		if (rgbGenerateFromCurPos(currentLocation)[0] > (rgbGenerateFromCurPos(currentLocation)[1] + 2) && rgbGenerateFromCurPos(currentLocation)[0] > (rgbGenerateFromCurPos(currentLocation)[2] + 2)) {
			return "Planet is primarily IRON OXIDE.";
		}
		else if (rgbGenerateFromCurPos(currentLocation)[1] > (rgbGenerateFromCurPos(currentLocation)[0] + 2) && rgbGenerateFromCurPos(currentLocation)[1] > (rgbGenerateFromCurPos(currentLocation)[2] + 2)) {
			return "Planet is primarily HYDROCARBON.";
		}
		else if (rgbGenerateFromCurPos(currentLocation)[2] > (rgbGenerateFromCurPos(currentLocation)[0] + 2) && rgbGenerateFromCurPos(currentLocation)[2] > (rgbGenerateFromCurPos(currentLocation)[1] + 2)) {
			return "Planet is primarily HYDROXIDE.";
		}
		else {
			return "Sensors blocked by strange radiation.";
		};
	};
	
};

function planetNamer() {
	var sp = currentLocation.toString().split("");
	var v1 = ['br','','cr','dr','','fr','gr','','pr','','str','','tr','bl','','cl','fl','','gl','','pl','sl','sc','sk','sm','sn','sp','st','sw','ch','','sh','th','wh','','ex','b','c','d','','f','g','h','','i','j','','k','l','m','n','','p','q','r','s','t','','v','w','x','y','z'];
	var vv = ['a','ae','ai','ao','au','e','ea','ee','ei','eo','eu','i','ia','ie','io','iu','o','oa','oe','oi','oo','ou','u','ua','ue','ui','uo'];
	var v2 = ['th','','he','an','','in','','er','on','re','','ed','nd','ha','','at','en','es','','of','nt','','ti','','to','le','','is','','ou','ar','','as','de','rt','','ve','the','','and','tha','','ent','ion','tio','for','nde','has','nce','tis','oft','men',''];
	var name = v1[(findLetter(0) + findLetter(1) + findLetter(3) + findLetter(4) + findLetter(5) + findLetter(6) + findLetter(7))%v1.length] + "" + vv[(findLetter(5) + findLetter(4) + findLetter(3))%vv.length] + "" + v2[(findLetter(0) + findLetter(2) + findLetter(5) + findLetter(4))%v2.length];
	// console.log(name.charAt(0).toUpperCase() + name.substr(1));
	// console.log(v1.length + " " + vv.length + " " + v2.length);
	function findLetter(num) {
		if (sp[num]) {
			return Number(sp[num]);	
		}
		else return "";
	}
	return name.toUpperCase();
};





