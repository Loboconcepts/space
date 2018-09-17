var worldArray;
// Size of the universe
// x=(Math.floor(Math.random()*85)+20)
var x = 101;
// Density of the universe
var rarityValue = 131;
//x*x
// 142516
var currentLocation = 152717;
var moves = 0;
var i = 0;
var y = x*x;
var z = 1;
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
var currentlyTrading = false;
var harvestedLocations = [];
// [SOLARPOWER, IRON OXIDE, HYDROCARBON, HYDROXIDE, ETERNITY ORB]
var inventory = [100,0,0,0,0];
// [BLASTER, COMM, CRUISE CONTROL, SCANNER, SONAR]
var shipWare = [true,true,true,true,true];
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




