var worldArray;
// Size of the universe
// x=(Math.floor(Math.random()*85)+20)
// 101
var x = 101;
// Density of the universe
var rarityValue = 131;
//x*x
// 152717
var currentLocation = 152717;
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


var bgColors = ["1a061e","1a061d","1b061b","1b061a","1b0518","1b0517","1c0515","1c0514","1c0512","1c0511","1d050f","1d050e","1d040c","1d040b","1e0409","1e0408","1e0508","1d0607","1d0707","1d0806","1c0906","1c0a06","1c0b05","1c0c05","1b0d05","1b0e04","1b0f04","1a1003","1a1103","191203","181303","171303","171403","161503","151503","151602","141602","131702","131802","121802","111902","101a02","0f1a03","0e1a04","0d1a05","0d1a07","0c1a08","0b1a09","0a1a0a","091a0b","081a0c","071a0d","061a0e","061a10","051a11","041a12","031a13","031913","031914","031814","031815","031715","031616","031517","031418","031318","031319","031219","03121a","03111a","03101a","030f1a","030e1a","030d1a","030c1a","030b1a","030a1a","03091a","03081a","03071a","03061a","03051a","03041a","04041a","05041a","06041b","07041b","08041b","09051b","0b051b","0c051c","0e051c","0f051c","11051c","12051d","14051d","15061d","17061d","18061e","19061e"];

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
var maxWarp = 10;
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






