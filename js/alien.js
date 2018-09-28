//http://www.collectedwebs.com/art/colors/hair/
var hairColors = ['#090806','#2C222B','#71635A','#B7A69E','#D6C4C2','#CABFB1','#DCD0BA','#FFF5E1','#E6CEA8','#E5C8A8','#DEBC99','#B89778','#A56B46','#B55239','#8D4A43','#91553D','#533D32','#3B3024','#554838','#4E433F','#504444','#6A4E42','#A7856A','#977961',];
var eyeColors = ['#181818','#906048','#784830','#000000','#601800','#f0f0f0','#7890d8','#c0d8f0','#607860','#a89060','#a8c0f0','#60a8d8','#d8f0a8','#483018','#786060','#90a8d8','#307890','#181848','#301878','#000030','#601818','#90d878','#78d8d8','#a8a878','#fffff0','#d8c078','#609078','#f0d890','#78c060','#f0ffff','#60a8a8','#d8a830','#d87848','#a8f0f0','#f0fff0','#903000','#4890a8'];
function generateAlien(xPos,yPos) {
	if (!xPos) {xPos = 0};
	if (!yPos) {yPos = 0};

	var bald = currentLocation.toString(2)[currentLocation.toString(2).length-2]>0;
	var tail = currentLocation.toString(2)[currentLocation.toString(2).length-3]>0;
	var genChoice = currentLocation.toString(2)[currentLocation.toString(2).length-4];
	var thirdEye = currentLocation.toString(2)[currentLocation.toString(2).length-5]>0;
	var scaryEyes = currentLocation.toString(2)[currentLocation.toString(2).length-6]>0;
	
	var topheadWidth = 230 + currentLocation%90;
	var jawHeight = currentLocation%285;
	var jawWidth = 250 + currentLocation%160;
	var noseWidth = 40 + currentLocation%[80,40][genChoice];
	var noseHeight = 40 + currentLocation%80;
	var mouthArr = [150 + currentLocation%50,150 + currentLocation%70,150 + currentLocation%50]
	var eyesSize = 150 + currentLocation%50;
	var hairWidth = topheadWidth + [currentLocation%50,currentLocation%150][genChoice];
	var neckWidth = 70 + currentLocation%[110,50][genChoice];
	var sexyness = 500 + currentLocation%500;
	var bodyWidth = 270 + currentLocation%[200,80][genChoice];
	var lookDirection = (eyesSize+50)/2;
	var hairLength = [200,400][genChoice] + currentLocation%[300,500][genChoice];
	var bangs = currentLocation%300;
	var bangsHeight = 300;
	var hairPart = currentLocation%220;
	hairPart *= currentLocation%2 == 1 ? 1 : -1;
	var eyeShadow = [5,8][genChoice];
	var hairPuff = Math.max(topheadWidth,jawWidth) + currentLocation%350;
	var mouthOpen = 20 + currentLocation%80;
	var hairColor = hairColors[currentLocation%hairColors.length];
	var skinColor = "rgba("+rgbGenerateFromCurPos(currentLocation)[1]%256+","+rgbGenerateFromCurPos(currentLocation)[2]%256+","+rgbGenerateFromCurPos(currentLocation)[0]%256+", 1)";
	var shirtColor = "rgba("+Math.floor(rgbGenerateFromCurPos(currentLocation*moves)[2]/2)+","+Math.floor(rgbGenerateFromCurPos(currentLocation*moves)[0]/2)+","+Math.floor(rgbGenerateFromCurPos(currentLocation*moves)[1]/2)+", 1)";
	var eyeColor = eyeColors[currentLocation%eyeColors.length];
	var lipColor = [skinColor,"#770000"][genChoice];
	var hairHeight = 270 + currentLocation%150;
	var chinHeight = 300 + currentLocation%100;
	var chinWidth = 75 + currentLocation%50;
	var eyeHeight = currentLocation%50;


	var physicalAttributes = [topheadWidth,jawHeight,jawWidth,noseWidth,noseHeight,mouthArr,eyesSize,hairWidth,neckWidth,sexyness,bodyWidth,lookDirection,hairLength,bangs,bangsHeight,hairPart,eyeShadow,hairPuff,mouthOpen,hairColor,skinColor,shirtColor,eyeColor,lipColor,hairHeight,chinHeight,chinWidth];
	
	ctx.save();
	ctx.translate(canvas.width/2+xPos, canvas.height/2+yPos);
	ctx.strokeStyle="#000000";
	ctx.lineWidth=5;

	if (tail==true) {
		//tail
		ctx.beginPath();
		ctx.fillStyle = skinColor;
		ctx.moveTo(0,500);
		ctx.bezierCurveTo(-700,250,-200,-250,-400,-400);
		ctx.quadraticCurveTo(-490,-450,-500,-350);
		ctx.bezierCurveTo(-300,-250,-800,250,-0,500);
		// ctx.quadraticCurveTo(-400,-500,-500,-150);
		// ctx.quadraticCurveTo(-500,0,-400,100);
		
		// ctx.quadraticCurveTo(-250,100,0,500);
	    ctx.fill();
	    ctx.stroke();
	}

    if (bald==true) {
		//hair
		ctx.beginPath();
		ctx.fillStyle = hairColor;
		ctx.moveTo(-hairWidth, -hairHeight);
		ctx.bezierCurveTo(-hairPuff,hairLength,hairPuff,hairLength,hairWidth,-hairHeight);
		ctx.quadraticCurveTo(0,-600,-hairWidth,-hairHeight);
	    ctx.fill();
	    ctx.stroke();
	}

    //shirt/body
    ctx.beginPath();
	ctx.fillStyle = shirtColor;
	ctx.moveTo(0, 300);//leave this height for slouch
	ctx.quadraticCurveTo(-300,300,-bodyWidth,500);
	ctx.lineTo(bodyWidth,500);
	ctx.quadraticCurveTo(300,300,-0,300);
    ctx.fill();
    ctx.stroke();

    //neck
    ctx.beginPath();
	ctx.fillStyle = skinColor;
	ctx.moveTo(-neckWidth, 0);
	ctx.lineTo(-neckWidth,350);
	ctx.quadraticCurveTo(0,sexyness,neckWidth,350);
	ctx.lineTo(neckWidth,0);
    ctx.fill();
    ctx.stroke();
    
	//outer face
	ctx.beginPath();
	if (bald==true) {
		ctx.moveTo(hairPart, -bangsHeight);
		ctx.quadraticCurveTo(-topheadWidth, -bangs,-topheadWidth, -100);	
		ctx.quadraticCurveTo(-jawWidth, jawHeight, -chinWidth, 300);
		ctx.quadraticCurveTo(0, chinHeight, chinWidth, 300);
		ctx.quadraticCurveTo(jawWidth, jawHeight, topheadWidth, -100);
		ctx.quadraticCurveTo(topheadWidth, -bangs,hairPart, -bangsHeight);	
	}
	else {
		ctx.moveTo(-topheadWidth, -200);
		ctx.quadraticCurveTo(-jawWidth, jawHeight, -chinWidth, 300);
		ctx.quadraticCurveTo(0, chinHeight, chinWidth, 300);
		ctx.quadraticCurveTo(jawWidth, jawHeight, topheadWidth, -200);
		ctx.bezierCurveTo(200, -500,-200, -500,-topheadWidth, -200);
	};

    ctx.fill();
    ctx.stroke();
    ctx.clip();

    //nose
    ctx.beginPath();
    switch (currentLocation%3) {
    	case 0:
			ctx.moveTo(20, -100+eyeHeight);
			ctx.quadraticCurveTo(noseWidth, 0, noseWidth, noseHeight+eyeHeight);
			ctx.lineTo(0, noseHeight+eyeHeight);
	    	break;
    	case 1:
			ctx.arc(0, 0+eyeHeight, 40, 0, Math.PI * 2, true);
    	break;
    	case 2:
    	console.log("no nose");
    	break;
    	default:
    	console.log("default");
    	break;
    };
    ctx.stroke();
    
    //mouth
    ctx.beginPath();
    ctx.fillStyle = "#000000"
    ctx.strokeStyle=lipColor;
	ctx.lineWidth=5;
	ctx.moveTo(-100, mouthArr[0]);
	ctx.quadraticCurveTo(0, mouthArr[1], 100, mouthArr[2]);
	ctx.quadraticCurveTo(0, mouthArr[1]+mouthOpen, -100, mouthArr[0]);
	ctx.fill();
    ctx.stroke();

    //eyebrows
    ctx.beginPath();
    ctx.strokeStyle=hairColor;
    ctx.lineWidth=15;
    ctx.moveTo(-eyesSize, -170+eyeHeight);
    ctx.quadraticCurveTo(-100,-200+eyeHeight,-50,-170+eyeHeight);
    ctx.moveTo(eyesSize, -170+eyeHeight);
    ctx.quadraticCurveTo(100,-200+eyeHeight,50,-170+eyeHeight);
    ctx.stroke();

    //eye shadow
    ctx.beginPath();
    ctx.strokeStyle="#000000";
    ctx.lineWidth=5;
	ctx.moveTo(-eyesSize-eyeShadow, -100+eyeHeight-eyeShadow);
	ctx.quadraticCurveTo(-100-eyeShadow, -eyesSize+eyeHeight-eyeShadow, -50 + eyeShadow, -100+eyeHeight-eyeShadow);
	ctx.quadraticCurveTo(-80, -50+eyeHeight+eyeShadow, -eyesSize-eyeShadow, -100+eyeHeight+eyeShadow);
	ctx.moveTo(eyesSize+eyeShadow, -100+eyeHeight-eyeShadow);
	ctx.quadraticCurveTo(100+eyeShadow, -eyesSize+eyeHeight-eyeShadow, 50 - eyeShadow, -100+eyeHeight-eyeShadow);
	ctx.quadraticCurveTo(80, -50+eyeHeight + eyeShadow, eyesSize+eyeShadow, -100+eyeHeight+eyeShadow);
	if (thirdEye==true) {
		ctx.moveTo(-60, -200);
		ctx.quadraticCurveTo(0, -150+eyeShadow, 60, -200);
		ctx.quadraticCurveTo(0, -250-eyeShadow, -60, -200);
	}
	ctx.fill();
    //eyes
    if (scaryEyes==true) {
    	ctx.fillStyle = "#555555"	
    }
    else {
    	ctx.fillStyle = "#ffffff"	
    };
    ctx.beginPath();
	ctx.moveTo(-eyesSize, -100+eyeHeight);
	ctx.quadraticCurveTo(-100, -eyesSize+eyeHeight, -50, -100+eyeHeight);
	ctx.quadraticCurveTo(-100, -50+eyeHeight, -eyesSize, -100+eyeHeight);
	ctx.moveTo(eyesSize, -100+eyeHeight);
	ctx.quadraticCurveTo(100, -eyesSize+eyeHeight, 50, -100+eyeHeight);
	ctx.quadraticCurveTo(100, -50+eyeHeight, eyesSize, -100+eyeHeight);

	if (thirdEye==true) {
		ctx.moveTo(-50, -200);
		ctx.quadraticCurveTo(0, -150, 50, -200);
		ctx.quadraticCurveTo(0, -250, -50, -200);
	};
	
	ctx.fill();
    ctx.clip();

    //cornea
    
    ctx.beginPath();
    ctx.fillStyle = eyeColor;
    ctx.arc(-lookDirection, -100+eyeHeight, 30, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(lookDirection, -100+eyeHeight, 30, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

	if (thirdEye==true) {
	    ctx.beginPath();
	    ctx.arc(0, -200, 20, 0, Math.PI * 2, true);
	    ctx.fill();
	    ctx.stroke();
	}
    // ctx.closePath();

    ctx.restore();
}