// var W = H = 1000;

// var earthFace = document.getElementById("earthFace");
// earthFace.width = W;
// earthFace.height = H;
// earthFace.style.width = "1000px";
// earthFace.style.height = "100px";
// var efctx = earthFace.getContext("2d");

// function drawPlanetFace() {
	
// 	efctx.fillStyle = "#0000FF";
// 	efctx.rect(0, 0, earthFace.width, earthFace.height);
// 	efctx.fill();
// 	efctx.closePath();
// 	efctx.fillStyle = "#00FF00";
// 	efctx.beginPath();
// 	efctx.moveTo(0,150);
// 	efctx.lineTo(400,150);
// 	efctx.lineTo(400,350);
// 	efctx.lineTo(200,1000);
// 	efctx.lineTo(0,350);
// 	efctx.fill();



// 	efctx.closePath();
// }

// drawPlanetFace();


var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = 'img/earth.jpg';
var CanvasXSize = 1000;
var CanvasYSize = 500;
var speed = 60; // lower is faster
var scale = 1;
var y2 = -5; // vertical offset

// Main program

var dx = 0.75;
var imgW;
var imgH;
var x2 = 0;
var clearX;
var clearY;
var efctx;

img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;
    
    if (imgW > CanvasXSize) {
        // image larger than canvas
        x2 = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        // image width larger than canvas
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        // image height larger than canvas
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }
    
    // get canvas context
    efctx = document.getElementById('earthFace').getContext('2d');
 	console.log("Changes");
    // set refresh rate
    return setInterval(draw, speed);

}

function draw() {
    efctx.clearRect(0, 0, clearX, clearY); // clear the canvas
    
    // if image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        // reset, start from beginning
        if (x2 > CanvasXSize) {
            x2 = -imgW + x2;
        }
        // draw additional image1
        if (x2 > 0) {
            efctx.drawImage(img, -imgW + x2, y2, imgW, imgH);
        }
        // draw additional image2
        if (x2 - imgW > 0) {
            efctx.drawImage(img, -imgW * 2 + x2, y2, imgW, imgH);
        }
    }

    // image is > Canvas Size
    else {
        // reset, start from beginning
        if (x2 > (CanvasXSize)) {
            x2 = CanvasXSize - imgW;
        }
        // draw aditional image
        if (x2 > (CanvasXSize-imgW)) {
            efctx.drawImage(img, x2 - imgW + 1, y2, imgW, imgH);
        }
    }
    // draw image
    efctx.drawImage(img, x2, y2,imgW, imgH);
    // amount to move
    x2 += dx;
}

