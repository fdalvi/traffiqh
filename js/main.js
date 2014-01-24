// for cross-compatibility
window.requestAnimationFrame = function() {
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	function(f) {
		window.setTimeout(f,1e3/60);
	}
}();
var canvas;
var ctx;
var W, H;
var x, y;
var img;
var car;
var keys = {};

$( document ).ready(function() {
	canvas = $('#gameBoard')[0];
	

	console.log(canvas.width + " " + canvas.height);
	/*canvas.width = $("#gameBoard").width();
	canvas.height = $("#gameBoard").height();*/
	canvas.width = 600;
	canvas.height = 400;
	W = 600;
	H = 400;

	ctx = canvas.getContext('2d');
	// We want to move/slide/scroll the background
	// as the player moves or the game progresses

	// Velocity X
	x = 0;
	y = 0;

	img = new Image();
	car = new Image();
	img.src = '/media/map.png';
	car.src = '/media/cars/camaro.png';

	renderGame();

	$(document).keydown(function (e) {
		keys[e.which] = true;
		if(e.which >= 37 && e.which <=40)
	    	e.preventDefault(); // prevent the default action (scroll / move caret)
	    
	    processKeys();
	});

	$(document).keyup(function (e) {
		delete keys[e.which];
	    if(e.which >= 37 && e.which <=40)
	    	e.preventDefault(); // prevent the default action (scroll / move caret)

	    processKeys();
	});
});

function processKeys() {
	console.log(keys);
	for (var i in keys) {
		if (!keys.hasOwnProperty(i)) continue;
		var currKey = parseInt(i);
		switch(currKey) {
			case 37: // left
			console.log("lefty");
			x+=1;
			break;

			case 38: // up
			y+=1;
			break;

			case 39: // right
			x-=1;
			break;

			case 40: // down
			y-=1;
			break;
		}
	}
}

function renderGame() {
	window.requestAnimationFrame(renderGame);
	
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(0, y); 
	ctx.rotate(Math.PI / 180 * (x));
	ctx.drawImage(img, -300, -200, 600,400); 
	ctx.restore();

	ctx.drawImage(car,50,50);
	//ctx.drawImage(img, x, y);
};