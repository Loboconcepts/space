var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = 'img/earth.jpg';
var CanvasXSize = 1000;
var CanvasYSize = 500;
var speed = 10; // lower is faster
var scale2 = 1;
var y2 = 0; // vertical offset

// Main program

var dx = 0.75;
var imgW;
var imgH;
var x2 = 0;
var clearX;
var clearY;
var efctx;

img.onload = function() {
    imgW = img.width * scale2;
    imgH = img.height * scale2;
    
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

