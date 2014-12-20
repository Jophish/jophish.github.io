
var numCircles = 200,
	circleVect = new Array(),
	scaleOffsets = new Array(),
	increment = 0,
	place = 0;
var offset = 500, colorNum = 0 ;
var back = two.makeGroup();
var circs = two.makeGroup();
var FRAMECOUNT = 0;

function rectMove(s){
	return (Math.cos(s * Math.PI / 180)*100)
}

var rect2 = two.makeRectangle(offset+300, offset-100 ,200,100), place = 0;
rect2.fill = "#00FF00";

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

back.add(rect2);

for (x = 0; x < numCircles; x++){
circle = two.makeCircle(Math.random()*1400 + 100, Math.random()*700 + 100, Math.random()*75+10);
circle.fill = getRandomColor();
circleVect[x] = circle;
scaleOffsets[x] = Math.random()*360;
circs.add(circle);
}

//circs.center(500);


mousePosition = {x: -500, y: -500};

var updatePosition = function(event) {
	mousePosition.x = event.clientX;
	mousePosition.y = event.clientY;
	//console.log(mousePosition);
};
window.addEventListener("mousemove", updatePosition, false);
window.addEventListener("touchmove", updatePosition, false);


function makeCirc(event) {
	var x = mousePosition.x;
	var y = mousePosition.y;
	if (event) {
		x = event.clientX;
		y = event.clientY;
	}
	circle = two.makeCircle(x, y, (Math.cos(FRAMECOUNT /50) + 1) * 100);
	circle.fill = getRandomColor();
	circle.opacity = 0.4;
	//circleVect[numCircles] = circle;
	//numCircles += 1;
	//circs.add(circle);
}

two.bind("update", function (frameCount){
	FRAMECOUNT = frameCount;
	makeCirc();


	var pos = rectMove((place++)*5);
	
	rect2.translation.x = pos + offset + 300;
    rect2.translation.y = offset - 100;
    rect2.rotation = rectMove(place)/10;
	circs.scale +=  Math.cos((scaleOffsets[x] + increment++/100.0)*(Math.PI / 180)*10);
	for (x = 0; x < numCircles; x++){
		circleVect[x].scale = Math.cos((scaleOffsets[x] + increment++/100.0)*(Math.PI / 180)*10);
		circleVect[x].fill = getRandomColor();
		circleVect[x].translation.x += Math.cos(increment*10)*30
		circleVect[x].translation.y += Math.sin(increment*10)*30
	}
	rect2.scale = 10 + Math.cos((increment/50.0)*(Math.PI / 180)*80);
	colorNum++;
	if (colorNum == 20){
		rect2.fill = getRandomColor();
		colorNum = 0;
	}
	
});

two.play()