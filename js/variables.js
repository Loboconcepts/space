var worldArray;
// Size of the universe
// x=(Math.floor(Math.random()*85)+20)
// 101
var x = 101;
// Density of the universe
var rarityValue = 131;
//x*x
// 152717
var currentLocation = 148980;
var moves = 0;
var i = 0;
var y = x*x;
var z = 1;

function generateWorld() {
	worldArray = [];
	for (i=0;i<(x*x*x);i++) {
		if (i == (x*x*x-1)) {
			worldArray.push("8");
		}
		else if (i%rarityValue==0 && i!=0) {
			worldArray.push("2");
		}
		// (currentLocation-1)%rarityValue = 17 & 114. All values = 131. Y axis not working because y > rarityValue.
		else if ((i%rarityValue==rarityValue-(z%rarityValue) || i%rarityValue==z%rarityValue || i%rarityValue==rarityValue-(x%rarityValue) || i%rarityValue==x%rarityValue || i%rarityValue==rarityValue-(y%rarityValue) || i%rarityValue==y%rarityValue)) {
			if (rarityValue < x*x*x) {
				if (i%9==0 || i%6==0 || i%4==0) {
					worldArray.push("3")
				}
				else if (i%7==0) {
					worldArray.push("4")
				}
				else {
					worldArray.push("1");
				};
			};
		}
		else if (i%65==0) {
				worldArray.push("x")
		}
		else {
			worldArray.push("1");	
		};
	};
	worldArray = worldArray.join("");
};


var bgColors = ["0a1034","0a1232","091430","09162e","08182c","081a2a","071c29","071e27","062025","062223","052421","05261f","04281d","042a1b","032c19","032e17","023016","023214","013412","013610","00380e","003a0c","033a0c","06390c","08390b","0b390b","0e380b","11380b","13380a","16370a","19370a","1c370a","1e3609","213609","243609","273509","293508","2c3508","2f3408","323408","343407","373307","3a3307","3a3108","3a2f08","3b2d09","3b2b0a","3b290a","3b280b","3b260c","3c240c","3c220d","3c200e","3c1e0e","3c1c0f","3c1a10","3d1810","3d1611","3d1512","3d1312","3d1113","3e0f14","3e0d14","3e0b15","3e0b17","3d0b19","3d0b1a","3d0b1c","3d0b1e","3c0a20","3c0a22","3c0a23","3b0a25","3b0a27","3b0a29","3b0a2b","3a0a2d","3a0a2e","3a0a30","390932","390934","390936","390937","380939","38093b","36093b","340a3a","2d0b39","2b0b39","290b39","260c38","240c38","220c38","200d37","1e0d37","1c0d37","190e36","170e36","0e0f35","0c1034"];

var viewOrient = "BACK";
var zAxis = ["UP","E","DOWN","W"];
var yAxis = ["N","E","S","W"];
var xAxis = ["UP","S","DOWN","N"];
var direction = "N";
var topfacing = "UP";
var yawAxis;
var rollAxis;
var pitchAxis;
var um;
var fm;
var lm;
var weCruisin = false;
var collideableObjects = ["a","z","x"];

var lastCommand = [];
var commandChoice = -1;
var cruiseControl = false;
var isLanded = false;
var alienConversation = false;
var landConversation = false;
var currentlyTrading = false;
var dealOrNoDeal = [];
var harvestedLocations = [];
var maxSolarPower = 100;
var maxWarp = 5;
// [SOLARPOWER, IRON OXIDE, HYDROCARBON, HYDROXIDE, ETERNITY ORB]
var inventory = [100,0,0,0,0];
// [[0]-COMM, [1]-BLASTER, [2]-CRUISE CONTROL, [3]-SCANNER, [4]-RADAR, [5]-WARP]
var shipWare = [true,false,true,false,false,false];
var goodOrEvil = 0;
var goodEvil = [false,false];
var storyTime = false;
var storyChapter = 0;
var story = ["What initially hits you is an intense smell of ozone, like Earth just following a thunderstorm.<br><br>You open your eyes, unsure of where you are.","1","2","3","4","5"];


var alienLocation;

var context=new AudioContext();

// function sound(frequency,type,duration,wv){
// 	var odd=null;
// 	var gdd=null;
// 	var waveArray = new Float32Array(5);
// 	waveArray[0] = wv[0];
// 	waveArray[1] = wv[1];
// 	waveArray[2] = wv[2];
// 	waveArray[3] = wv[3];
// 	waveArray[4] = 0;
// 	odd=context.createOscillator();
// 	gdd=context.createGain();
// 	odd.type=type;
// 	odd.connect(gdd);
// 	odd.frequency.value=frequency;
// 	gdd.connect(context.destination);
// 	odd.start(0);
// 	gdd.gain.setValueCurveAtTime(waveArray, context.currentTime, duration);
// };
// function soundEffect(frequency,type,duration,wv,delay) {
// 	if (!delay) {delay = 0;};
// 	return setTimeout(function(){sound(frequency,type,duration,wv)}, delay);
// };
function soundEffect() {
	console.log("disabled");
};

function consoleInput(event) {
	if (event.keyCode === 13) {
		if (lastCommand[0] != document.getElementById('user').value) {
			lastCommand.unshift(document.getElementById('user').value);
			if (lastCommand.length>6) {
				lastCommand.splice(-1,1);
			}
		}
		submitUserInput(document.getElementById('user').value);
		commandChoice = -1;
	};
	if (event.keyCode === 38) {
		if (commandChoice<lastCommand.length-1) {
			commandChoice = commandChoice+1;	
		}
		document.getElementById('user').value = lastCommand[commandChoice];
	};
	if (event.keyCode === 40) {
		if (commandChoice>0) {
			commandChoice = commandChoice-1;	
		}
		document.getElementById('user').value = lastCommand[commandChoice];
	};
};

// if (!storyTime) {
// 	document.getElementById("user").addEventListener("keyup", function(event) {event.preventDefault();
// 		if (event.keyCode === 13) {
// 			if (lastCommand[0] != document.getElementById('user').value) {
// 				lastCommand.unshift(document.getElementById('user').value);
// 				if (lastCommand.length>6) {
// 					lastCommand.splice(-1,1);
// 				}
// 			}
// 			submitUserInput(document.getElementById('user').value);
// 			commandChoice = -1;
// 		}
// 		if (event.keyCode === 38) {
// 			if (commandChoice<lastCommand.length-1) {
// 				commandChoice = commandChoice+1;	
// 			}
// 			document.getElementById('user').value = lastCommand[commandChoice];
// 		}
// 		if (event.keyCode === 40) {
// 			if (commandChoice>0) {
// 				commandChoice = commandChoice-1;	
// 			}
// 			document.getElementById('user').value = lastCommand[commandChoice];
// 		}
// 	});
// }
// else {
// 	document.getElementById("user").addEventListener("keyup", function(event) {event.preventDefault();
// 		if (event.keyCode === 13) {
			
// 		}
// 	});
// };




