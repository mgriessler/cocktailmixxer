var TOP_GLASS_Y;
var BOTTOM_GLASS_Y;
var LEFT_GLASS_X;
var RIGHT_GLASS_X;
var TOP_GAP = 30;
var GLASS_WIDTH = 3;
var c;
var ctx;
var ingredColors = {};
var TOP_PART;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var GLASS = "collins";

//this function is called when the DOM is ready apparently is equivalent to $(document).reday(function(){});
$(function() {
	c = $("#drink")[0];
	ctx = c.getContext("2d");
	ctx.font = '14px sans-serif';
	colorizeIngredients();
    consoleDrink();
    genDrinkList();
});

function colorizeIngredients() {
	ingredColors["creme de menthe"] = '#058605';
	ingredColors["creme de cacao"] = '#693D23';
	ingredColors["fresh cream"] = '#E9E6E1';
	ingredColors["vodka"] = '#D6D8DD';
	ingredColors["lime juice"] = '#82C731';
	ingredColors["ginger beer"] = '#FEA521';
	ingredColors["tequila"] = '#FDE8B1';
	ingredColors["cointreau"] = '#A6A8AD';
	ingredColors["white rum"] = '#D7D6DE';
	ingredColors["mint"] = '#7AB120';
	ingredColors["sugar"] = '#E5E5E3';
	ingredColors["soda water"] = '#E3E4E6';
	ingredColors["triple sec"] = '#320906';
	ingredColors["gin"] = '#E0E0E0';
	ingredColors["lemon juice"] = '#E2A624';
	ingredColors["simple syrup"] = '#C7752B';
	ingredColors["coca-cola"] = '#66130B';
	ingredColors["sweet red vermouth"] = '#BE697F';
	ingredColors["compari"] = '#840000';
	ingredColors["grenadine"] = '#E80000';
	ingredColors["orange juice"] = '#FFB500';
	ingredColors["cherry"] = '#A60707';
	ingredColors["ice"] = '#71C4D9';
}

function drawGlass(nameOfGlass) {
	switch (nameOfGlass) {
		case "collins":
			GLASS = "collins";
			drawCollinsGlass();
			break;
		case "old fashioned":
			GLASS = "old fashioned";
			drawOldFashionedGlass();
			break;
		case "cocktail":
			GLASS = "cocktail";
			drawCocktailGlass();
			break;
		case "highball":
			GLASS = "highball";
			drawCollinsGlass();
			break;
		case "copper mug":
			GLASS = "copper mug";
			drawOldFashionedGlass();
			break;
		case "margarita":
			GLASS = "margarita";
			drawCocktailGlass();
		default:
			GLASS = "collins";
			drawCollinsGlass();
	}
}

//draws a Collins Glass. 3 lines
function drawCollinsGlass() {
	ctx.lineWidth = GLASS_WIDTH;
	TOP_GLASS_Y = 30;
	BOTTOM_GLASS_Y = 490;
	LEFT_GLASS_X = 60.5;
	RIGHT_GLASS_X = 300.5;
	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y);
	ctx.lineTo(LEFT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo(RIGHT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo(RIGHT_GLASS_X, TOP_GLASS_Y);
	ctx.stroke();
	ctx.lineWidth = 1;
}

function drawOldFashionedGlass() {
	ctx.lineWidth = GLASS_WIDTH;
	TOP_GLASS_Y = 260;
	BOTTOM_GLASS_Y = 490;
	LEFT_GLASS_X = 60.5;
	RIGHT_GLASS_X = 300.5;
	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y);
	ctx.lineTo(LEFT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo(RIGHT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo(RIGHT_GLASS_X, TOP_GLASS_Y);
	ctx.stroke();
	ctx.lineWidth = 1;
}

function drawCocktailGlass() {
	ctx.lineWidth = GLASS_WIDTH;
	TOP_GLASS_Y = 30;
	LEFT_GLASS_X = 60.5;
	RIGHT_GLASS_X = 320.5;
	BOTTOM_GLASS_Y = 213;
	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y);
	ctx.lineTo((RIGHT_GLASS_X - LEFT_GLASS_X)/2 + LEFT_GLASS_X, BOTTOM_GLASS_Y);
	ctx.lineTo((RIGHT_GLASS_X-LEFT_GLASS_X)/2 + LEFT_GLASS_X, BOTTOM_GLASS_Y);
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
	var eachPartSize = height/numParts;	//size of each part
	var thisPartSize;	//size of this  part in the drink
	var runningPartTotal = 0;
	var adjustedBottom = BOTTOM_GLASS_Y - 0.5*GLASS_WIDTH;
	var textLocation_X = RIGHT_GLASS_X + 20;
	//var x;
	//var y;
	var partWidth = RIGHT_GLASS_X - LEFT_GLASS_X - GLASS_WIDTH;		//width of each part is distance between the glass sides minus the width
	for (var i = 0; i < partsArr.length; i++) {		//for each of the part
		thisPartSize = partsArr[i] * eachPartSize;		//this part size is size of the part * the size
		runningPartTotal = runningPartTotal + partsArr[i]/2;	//update runningPartTotal for text alignment halfway up
		ctx.fillStyle = 'black';		//text color is black
		//print name of part at shifted x and halfway up the new part
		ctx.fillText(textArr[i], textLocation_X, adjustedBottom - runningPartTotal*eachPartSize);
		runningPartTotal = runningPartTotal + partsArr[i]/2;	//finish updating runningPartTotal for part alignment
		//ctx.fillStyle = 'rgb(' + ingredColors[colorArr[i]][0] + ', ' + ingredColors[colorArr[i]][1] + ', ' + ingredColors[colorArr[i]][2] + ')';		//get color of this part
		ctx.fillStyle = ingredColors[colorArr[i]];
		//X: left side plus 1/2 of the width for no overlap, Y: Bottom, then up by number of part, then up by glass width for no overlap
		ctx.fillRect(LEFT_GLASS_X+0.5*GLASS_WIDTH, adjustedBottom - (runningPartTotal * eachPartSize), partWidth, thisPartSize);
		//ctx.beginPath();
		//y = getY(thisPartSize, numParts, runningPartTotal, eachPartSize, adjustedBottom);
		//top left
		//ctx.moveTo(getX(y, 0), y);
		//top line
		//ctx.lineTo(getX(y, 1), y);
		//right line
		//ctx.lineTo(getX(adjustedBottom - (runningPartTotal-partsArr[i])*eachPartSize, 1), adjustedBottom - (runningPartTotal - partsArr[i])*eachPartSize);
		//bottom line
		//ctx.lineTo(getX(adjustedBottom - (runningPartTotal-partsArr[i])*eachPartSize, 0), adjustedBottom - (runningPartTotal - partsArr[i])*eachPartSize);
		//left line
		//ctx.lineTo(getX(adjustedBottom - (runningPartTotal*eachPartSize), 0), adjustedBottom - (runningPartTotal * eachPartSize));
		//ctx.fill();
		//ctx.stroke();
	}
	ctx.fillStyle = 'black';
}

function getX(newH, rightIsT_leftIsF) {
	if (GLASS == "collins" || GLASS == "old fashioned") {
		if (rightIsT_leftIsF) {
			return(RIGHT_GLASS_X);
		} else {
			return(LEFT_GLASS_X+0.5*GLASS_WIDTH);
		}
	} else if (GLASS == "cocktail") {
		if (rightIsT_leftIsF) {
			return((newH-(125103/260))*(-130/183));
		} else {
			return((newH+(14343/260))*(130/183));
		}
	}
}

function getY(partInd, partTot, currentPartTotal, eachPartWeight, adjustedFromBottom) {
	if (GLASS == "collins" || GLASS == "old fashioned") {
		return (adjustedFromBottom - (currentPartTotal*eachPartWeight));
	} else if (GLASS == "cocktail glass") {
		return (Math.sqrt(partInd/(partTot/2)) * (BOTTOM_GLASS_Y - TOP_GLASS_Y - TOP_GAP))-BOTTOM_GLASS_Y;
	}
}

function addIce() {
	ctx.fillStyle = ingredColors["ice"];
	ctx.globalAlpha = 0.5;
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
	if (GLASS == "collins" || GLASS == "highball") {
		moveAndRotate(LEFT_GLASS_X + 0.5*iceSize, BOTTOM_GLASS_Y - iceSize + iceSize*0.5, -(Math.PI / 180)*25);
		ctx.fillRect(RIGHT_GLASS_X - 80, BOTTOM_GLASS_Y - 1.45*iceSize - 10, iceSize, iceSize);
		moveAndRotate(LEFT_GLASS_X + 0.5*iceSize, BOTTOM_GLASS_Y - iceSize + iceSize*0.5, -(Math.PI / 180)*5);
		ctx.fillRect(LEFT_GLASS_X + 110, BOTTOM_GLASS_Y - 2.5*iceSize + 5, iceSize, iceSize);
		moveAndRotate(LEFT_GLASS_X + 0.5*iceSize, BOTTOM_GLASS_Y - iceSize + iceSize*0.5, (Math.PI / 180)*30);
	}
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = 'black';
}

function moveAndRotate(moveX, moveY, rotateAngle) {
	ctx.translate(moveX, moveY);
	ctx.rotate(rotateAngle);
	ctx.translate(-moveX, -moveY);
}

function addStraw() {
	ctx.fillRect(RIGHT_GLASS_X - 30, TOP_GLASS_Y - 25, 20, 25+TOP_GAP);
	ctx.fillRect(RIGHT_GLASS_X - 30, TOP_GLASS_Y - 25, 60, 20);
}

function reset() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function addLemon(lemIs0_limeIs1_orangeIs2) {
	if (lemIs0_limeIs1_orangeIs2 == 0) {
		ctx.fillStyle = ingredColors['lemon juice'];
	} else if (lemIs0_limeIs1_orangeIs2 == 1) {
		ctx.fillStyle = ingredColors['lime juice'];
	} else {
		ctx.fillStyle = ingredColors['orange juice'];
	}
	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y + 25);
	ctx.arc(LEFT_GLASS_X, TOP_GLASS_Y + 25, 50,  (Math.PI/180)*160, (Math.PI/180)*-20, 0);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(LEFT_GLASS_X, TOP_GLASS_Y + 35);
	ctx.lineWidth = GLASS_WIDTH;
	ctx.lineTo(LEFT_GLASS_X, TOP_GLASS_Y);
	ctx.stroke();
	ctx.lineWidth = 1;
}

function addCherry() {
	ctx.fillStyle = ingredColors['cherry'];
	ctx.beginPath();
	ctx.moveTo(2*(RIGHT_GLASS_X - LEFT_GLASS_X) / 3 + 20, TOP_GLASS_Y + TOP_GAP);
	ctx.arc(2*(RIGHT_GLASS_X - LEFT_GLASS_X) / 3, TOP_GLASS_Y + TOP_GAP, 20, 0, 2*Math.PI, 0);
	ctx.fill();
	ctx.fillStyle = 'black';
}
