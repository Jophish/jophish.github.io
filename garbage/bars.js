var rects = new Array(),
	offsets = new Array(),
	increment = 0,
	divisor = 40, // 180/phase difference
	x = 500,
	numRecs = 40;

var offset = 180.0/divisor; //phase difference between bars


for (i = 0; i < numRecs; i++){

	var rect = two.makeRectangle(x, 50+ i*15, 200,10);
	rect.opacity = .25;
	rect.linewidth = 1;
	rects[i] = rect;
	rects[i].fill = "#90be41";

}


for (i = 0; i < numRecs; i++){
	offsets[i] = i*offset;
}

function rectMove(s){
	return (Math.cos(s * Math.PI / 180))
}


two.bind("update", function (frameCount) {

    var pos = rectMove(offsets[increment]);
    var rectMoves = new Array();

    for (j = 0; j < numRecs; j++)
    {
    rectMoves[j] = x + rectMove(offsets[j]+offset*increment)*200;
	}

	for (j = 0; j < numRecs; j++){
	rects[j].translation.x = rectMoves[j];
	}
    increment += 1;

    //if (increment == divisor){
    //	increment = 0;
    //}
});

two.play()