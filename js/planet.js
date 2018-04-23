var W = H = 1000;

var canvas2 = document.getElementById("planetFace");
canvas2.width = W;
canvas2.height = H;
canvas2.style.width = "1000px";
canvas2.style.height = "100px";
var ctx2 = canvas2.getContext("2d");

function drawPlanetFace() {
	
	ctx2.fillStyle = "#0000FF";
	ctx2.rect(0, 0, canvas2.width, canvas2.height);
	ctx2.fill();
	ctx2.closePath();
	ctx2.fillStyle = "#00FF00";
	ctx2.beginPath();
	ctx2.moveTo(0,150);
	ctx2.lineTo(400,150);
	ctx2.lineTo(400,350);
	ctx2.lineTo(200,1000);
	ctx2.lineTo(0,350);
	ctx2.fill();



	ctx2.closePath();
}

drawPlanetFace();

