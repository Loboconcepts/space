var storyChapter = 0;
var story = ["You have something stuck in your teeth, friend.","How should I help you?","Why don't you ask what you can do for me?"];

function quest(ui) {
	switch (storyChapter) {
		case 0:
			switch (ui) {
				case "help":case "help me":case "i need help":
					storyChapter = 1;
					return alienReply(story[storyChapter]);
					break;
				default:
					storyChapter = 0;
					return alienReply("Hmmm.");
					break;
			}
			break;
		case 1:
			switch (ui) {
				case "help":case "help me":case "i need help":
					storyChapter = 2;
					return alienReply(story[storyChapter]);
					break;
				default:
					questing = false;
					return computerReply("Found no chapter");
				break;
			}
			break;
		case 2:
			switch (ui) {
				case "help":case "help me":case "i need help":
					storyChapter = 2;
					return alienReply(story[storyChapter]);
					break;
				default:
					questing = false;
					return computerReply("Found no chapter");
				break;

			}
			break;
		default:
			questing = false;
			return computerReply("Found no chapter");
			break;
	}

}