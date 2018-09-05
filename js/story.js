var memory = document.getElementById("memory");
memory.width = W
memory.height = H
memory.style.position = "absolute";
memory.style.width = window.innerWidth + "px";
memory.style.height = window.innerHeight + "px";


function beginStory(howManyChapters){
	clearInterval(stalled);
	var c = 1;
	disableButtons(true);
	storyTime = true;
	memory.style.display = "block";
	document.getElementById("memory").innerHTML += "<p style='color:rgba(0,0,0,0);' id='sc" + storyChapter + "'>" + story[storyChapter] + "</p>";
	var animation = setInterval(function() {
		c = c+1;
		if (c<=100) {
			memory.style.backgroundColor = "rgba(255,255,255,"+ c/100 +")";
		};
		if (c > 100) {
			document.getElementById("memory").firstChild.style.color = "rgba(0,0,0,"+ (c-100)/100 +")";
		};
		
	  if (c > 200) clearInterval(animation);
	}, 15);
	c=1;
	storyChapter = storyChapter+1;
	document.getElementById("memory").addEventListener("keyup", function(event) {event.preventDefault();
		console.log(event.keyCode);
		if (event.keyCode === 13) {
			if (storyChapter <= howManyChapters) {
				document.getElementById("memory").innerHTML += "<p style='color:rgba(0,0,0,0);' id='sc" + storyChapter + "'>" + story[storyChapter] + "</p>";
				var animation = setInterval(function() {
					console.log(c);
					c = c+1;
					if (c <= 100) {
						document.getElementById("memory").lastChild.style.color = "rgba(0,0,0,"+ c/100 +")";
					};
				  if (c > 100) clearInterval(animation);
				}, 15);
				c=1;
				storyChapter = storyChapter+1;
			}
			else {
				document.getElementById("memory").innerHTML = "";
				memory.style.display = "none";
				memory.style.backgroundColor = "rgba(255,255,255,0)";
				storyTime = false;
				disableButtons(false);
				generalState();
			};
		};
	});
	return console.log("Yay done!");
};

// canvas.style.left = (window.innerWidth * 0.5 - W * scale * 0.5) + "px";
// canvas.style.top = (window.innerHeight * 0.5 - H * scale * 0.5) + "px";

// var mctx = memory.getContext("2d");

// mctx.rect(0, 0, memory.width, memory.height);
// mctx.fillStyle = "#ffffff";
// mctx.fill();