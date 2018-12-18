var storyChapter = 0;
var story = ["You have something stuck in your teeth, friend."];

function quest(ui) {
	switch (ui) {
		case "yl":case "yaw left":
			if (!weCruisin && !isLanded) {
				alienReply("Farewell");
				computerReply("Yawing Left");
				move(movArrArr[0]);
				shipRotation('YAW',-1);
				questing = false;
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
				questing = false;
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
				questing = false;
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
				questing = false;
			}
			else {
				computerReply("Ignored");
			}
			break;
		case "hail":
			alienReply("We are already talking.");
			break;
		case "thanks":case "thanks you":case "okay thanks":
			alienReply("You're welcome.");
			break;
		case "goodbye":case "bye":case "so long":case "fare well":case "farewell":case "signing off":case "end":case "stop":
			alienReply("Godspeed.");
			questing = false;
			break;

		case "help":case "help me":case "i need help":
			switch (storyChapter) {
				case 0:
					let questPlanet = scanUniverseSpecific(9,"3","Planet");
					storyLocations.push(questPlanet[3].toString(36));
					alienReply("I do not have a toothpick. However...");
					alienReply("I think you may find what you are looking for on Planet " + planetNamer(questPlanet[3]),2200);
					alienReply(planetNamer(questPlanet[3]) + " is approximately " + questPlanet[1] + " galacubes " + questPlanet[2],3200);
				break;
				default:
					return alienReply("Hmmm.");
				break;
			};
		case "":
			break;
		default:
			return alienReply("Hmmm.");
		break;
	};
};