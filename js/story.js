var memory = document.getElementById("memory");
memory.width = W
memory.height = H
memory.style.position = "absolute";
memory.style.width = window.innerWidth + "px";
memory.style.height = window.innerHeight + "px";

var thisManyChapters = 0;


function beginStory(howManyChapters){
	if (!howManyChapters) {howManyChapters = 0};
	thisManyChapters = howManyChapters;
	var c = 1;
	disableButtons(true);
	storyTime = true;
	memory.style.display = "block";
	document.getElementById("textArea").innerHTML += "<p style='color:rgba(0,0,0,0);' id='sc" + storyChapter + "'>" + story[storyChapter] + "</p>";
	var animation = setInterval(function() {
		c = c+1;
		if (c<=100) {
			memory.style.backgroundColor = "rgba(255,255,255,"+ c/100 +")";
		};
		if (c > 100) {
			document.getElementById("textArea").firstChild.style.color = "rgba(0,0,0,"+ (c-100)/100 +")";
		};
		
	  if (c > 200) clearInterval(animation);
	}, 15);
	c=1;	
	storyChapter = storyChapter+1;
};

function storyPart() {
	if (storyTime) {
		if (storyChapter <= thisManyChapters) {
			document.getElementById("textArea").innerHTML += "<p style='color:rgba(0,0,0,0);' id='sc" + storyChapter + "'>" + story[storyChapter] + "</p>";
			var animation = setInterval(function() {
				c = c+1;
				if (c <= 100) {
					if (document.getElementById("textArea").lastChild) {
						document.getElementById("textArea").lastChild.style.color = "rgba(0,0,0,"+ c/100 +")";	
					};
				};
			  if (c > 100) clearInterval(animation);
			}, 15);
			c=1;
			storyChapter = storyChapter+1;
		}
		else {
			document.getElementById("textArea").innerHTML = "";
			memory.style.display = "none";
			memory.style.backgroundColor = "rgba(255,255,255,0)";
			storyTime = false;
			disableButtons(false);
			generalState();
		};
	};
};