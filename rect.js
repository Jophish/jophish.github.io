 
 var offset = 500;
 var rect = two.makeRectangle(offset, offset,200,100), place = 0;
 rect.fill = "#1800a0";

function rectMove(s){
	return (Math.cos(s * Math.PI / 180)*100)
}


two.bind("update", function (frameCount) {
    var pos = rectMove((place++)*5);
    rect.translation.x = pos + offset;
    rect.translation.y = offset;
    rect.rotation = rectMove(place)/10;
});
 two.play()
