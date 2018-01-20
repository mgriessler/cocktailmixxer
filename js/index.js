var TOP_GLASS_Y = 30;
var BOTTOM_GLASS_Y = 490;
var LEFT_GLASS_X = 10.5;
var RIGHT_GLASS_X = 250.5;
var TOP_GAP = 50;
var GLASS_WIDTH = 3;
var c;
var ctx;
var ingredColors = {};

//this function is called when the DOM is ready apparently is equivalent to $(document).reday(function(){});
$(function() {
	c = $("#drink")[0];
	ctx = c.getContext("2d");
	colorizeIngredients();
	drawCollinsGlass();
	var testParts = [7, 4, 3];
	var testColors = ["blue", "green", "red"];
	var testText = ["creme de menthe","creme de cacao","fresh cream"];
	drawParts(testParts,testColors,testText);
});

function colorizeIngredients() {
	ingredColors["creme de menthe"] = [0,106,71];
	ingredColors["creme de cacao"] = [186,136,104];
	ingredColors["fresh cream"] = [195,193,198];
	ingredColors["vodka"] = [212,215,214];
	ingredColors["lime juice"] = [197,205,19];
	ingredColors["ginger beer"] = [230,166,3];
	ingredColors["tequila"] = [219,200,83];
	ingredColors["cointreau"] = [204,174,21];
	ingredColors["white rum"] = [187,187,200];
	ingredColors["mint"] = [93,198,4];
	ingredColors["sugar"] = [197,201,205];
	ingredColors["soda water"] = [196,199,191];
	ingredColors["triple sec"] = [203,204,208];
	ingredColors["gin"] = [191,193,194];
	ingredColors["lemon juice"] = [208,183,0];
	ingredColors["simple syrup"] = [183,183,179];
	ingredColors["coca-cola"] = [132,12,0];
}

//draws a Collins Glass. 3 lines
function drawCollinsGlass() {
	ctx.lineWidth = GLASS_WIDTH;
   	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y);
	ctx.lineTo(LEFT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo(RIGHT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo(RIGHT_GLASS_X, TOP_GLASS_Y);
	ctx.stroke();
	ctx.lineWidth = 1;
}

//takes in array with "parts" (n-numbers) Fills the glass with rectangles, size according to parts.
//not to the brim, leave gap
//3 arrays given
function drawParts(partsArr, colorArr, textArr) {
	var height = BOTTOM_GLASS_Y - TOP_GLASS_Y - TOP_GAP;	//height of glass for the parts
	var numParts = 0;		//total of how many parts there are
	for (var i = 0; i < partsArr.length; i++) {	//add up number of parts, store in numParts
		numParts = numParts + partsArr[i];
	}
	var eachPartSize = Math.ceil(height/numParts);	//size of each part
	var thisPartSize;	//size of this  part in the drink
	var runningPartTotal = 0;
	var adjustedBottom = BOTTOM_GLASS_Y - 0.5*GLASS_WIDTH;
	var textLocation_X = RIGHT_GLASS_X + 20;
	var partWidth = RIGHT_GLASS_X - LEFT_GLASS_X - GLASS_WIDTH;		//width of each part is distance between the glass sides minus the width
	for (var i = 0; i < partsArr.length; i++) {		//for each of the part
		thisPartSize = partsArr[i] * eachPartSize;		//this part size is size of the part * the size
		runningPartTotal = runningPartTotal + partsArr[i]/2;	//update runningPartTotal for text alignment halfway up
		ctx.fillStyle = 'black';		//text color is black
		//print name of part at shifted x and halfway up the new part
		ctx.fillText(textArr[i], textLocation_X, adjustedBottom - runningPartTotal*eachPartSize);
		runningPartTotal = runningPartTotal + partsArr[i]/2;	//finish updating runningPartTotal for part alignment
		ctx.fillStyle = 'rgb(' + ingredColors[textArr[i]][0] + ', ' + ingredColors[textArr[i]][1] + ', ' + ingredColors[textArr[i]][2] + ')';		//get color of this part
		//X: left side plus 1/2 of the width for no overlap, Y: Bottom, then up by number of part, then up by glass width for no overlap
		ctx.fillRect(LEFT_GLASS_X+0.5*GLASS_WIDTH, adjustedBottom - (runningPartTotal * eachPartSize), partWidth, thisPartSize); 
	}
	ctx.fillStyle = 'black';
	//addIce();
	//addStraw(adjustedBottom - (runningPartTotal*eachPartSize));
}

function addIce() {
	ctx.fillStyle = 'rgb(208,213,223)';
	ctx.globalAlpha = 0.3;
	var iceSize = 100;
	//var img = new Image();
	//img.onload = function() {
	//	ctx.drawImage(img, LEFT_GLASS_X, BOTTOM_GLASS_Y - iceSize, iceSize, iceSize);
	//}
	//img.src = "http://doughertysice.com/wp-content/uploads/2015/01/Ice-Pile-full-screen.jpg";
	moveAndRotate(LEFT_GLASS_X + 0.5*iceSize, BOTTOM_GLASS_Y - iceSize + iceSize*0.5, (Math.PI / 180)*25);
	ctx.fillRect(LEFT_GLASS_X + 10, BOTTOM_GLASS_Y - iceSize - 25, iceSize, iceSize);
	moveAndRotate(LEFT_GLASS_X + 0.5*iceSize, BOTTOM_GLASS_Y - iceSize + iceSize*0.5, -(Math.PI / 180)*25);
	ctx.fillRect(RIGHT_GLASS_X - 103, BOTTOM_GLASS_Y - iceSize, iceSize, iceSize);
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = 'black';
}

function moveAndRotate(moveX, moveY, rotateAngle) {
	ctx.translate(moveX, moveY);
	ctx.rotate(rotateAngle);
	ctx.translate(-moveX, -moveY);
}

function addStraw(topPart) {
	ctx.fillRect(RIGHT_GLASS_X - 30, TOP_GLASS_Y - 25, 20, topPart-5);
	ctx.fillRect(RIGHT_GLASS_X - 30, TOP_GLASS_Y - 25, 60, 20);
}

