function init(){

canvas = document.getElementById("test");
height = canvas.height = window.innerHeight;
length = canvas.width = window.innerWidth;  
ctx = canvas.getContext("2d");
cellSize = Math.ceil(Math.max(length, height) / 75);
gridSize = {height : Math.ceil(height/cellSize), length : Math.ceil(length/cellSize)};
  
}

function createRandomCell (x,y) {
var cellTypes = [createGrass(x,y), createPerson(x,y), createEmpty(x,y)];
var cellWeights = [.7,.01,.3];


return getRandomItem(cellTypes, cellWeights);

}
function createEmpty(xpos,ypos){
  return {col: "black" , x : xpos, y: ypos}
  
}

function createGrass(xpos, ypos){ 
  return { col : "green", genProb: .4, x : xpos, y: ypos};
}

function createPerson(xpos, ypos){
  return { col : "brown", x : xpos, y: ypos}
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
init();
createEnv();
displayEnv();
}

start();