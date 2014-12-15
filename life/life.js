function init(){

canvas = document.getElementById("test");

cellSize = 50;
height = canvas.height = window.innerHeight;
length = canvas.width = window.innerWidth; 
ctx = canvas.getContext("2d");
//canvas.style.marginTop = (window.innerHeight%cellSize)/2;
//canvas.style.marginLeft = (window.innerWidth%cellSize)/2;
gridSize = {height : Math.ceil(height/cellSize), length : Math.ceil(length/cellSize)};
console.log(height%cellSize);
console.log(length%cellSize);
}   

function createRandomCell (x,y) {
var cellTypes = [createGrass(x,y), createPerson(x,y), createEmpty(x,y)];
var cellWeights = [70,.1,30];


return getRandomItem(cellTypes, cellWeights);

}

function createEmpty(xpos,ypos){
  return {type : "empty", col: "black" , x : xpos, y: ypos}
  
}

function createGrass(xpos, ypos){ 
    var color = new tinycolor("#00FF00").toHsv();
    color.s = 70;
    color.v = Math.random()*40 + 30;
  return {type: "grass", col : rgbtostr(tinycolor(color).toRgb()), genProb: .4, x : xpos, y: ypos};
}

function createPerson(xpos, ypos){
  return {type: "person", col : "brown", x : xpos, y: ypos}
}

function createEnv(){
environment = { cells : new Array()};

for (y = 0; y < gridSize.height; y++){
	for (x = 0; x < gridSize.length; x++){
		environment.cells.push(createRandomCell(x,y));
				
	}  
}
}

function displayEnv(){

for (i = 0; i < environment.cells.length; i++){
	ctx.fillStyle = environment.cells[i].col;
	ctx.fillRect(environment.cells[i].x*cellSize,environment.cells[i].y*cellSize, cellSize, cellSize);

}
}


var rand = function(min, max) {
    return Math.random() * (max - min) + min;
};
 
var getRandomItem = function(list, weight) {
    var total_weight = weight.reduce(function (prev, cur, i, arr) {
        return prev + cur;
    });
     
    var random_num = rand(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
         
        if (random_num <= weight_sum) {
            return list[i];
        }
    }
     
    // end of function
};

function start(){
setTimeout(function() { requestAnimationFrame(start)}, 250);
init();
createEnv();
displayEnv();
}

start();

//window.addEventListener("resize", start);