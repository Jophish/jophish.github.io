

function CustomObject(points, col, steps, opacity) {




    this.type = 'CustomObject';

    this.steps = steps;
    this.count = 0;
    this.donemid = 0;
    this.points = points;
    this.numpoints = points.length;
    this.col = col;
    this.lastball = []
    this.done = 0;

    this.opacity = opacity;

    this.balls = [];
    this.lines = [];
    this.line3 = [];

    this.group = new THREE.Object3D();

    for (x = 0; x < this.numpoints-1; x++){
    	temp = new THREE.Object3D();
    	this.lines.push(this.makeLine(this.points[x], this.points[x+1], this.col));
    	this.balls.push(this.makeBall(this.points[x]));
    	this.line3.push(this.makeLine3(this.points[x], this.points[x+1]));

    	temp.add(this.lines[x]);
    	temp.add(this.balls[x]);
    	this.group.add(temp);

    	

    }
    
    for (x = 0; x < this.numpoints -1; x++){

		this.group.children[x].children[1].position.set(this.points[x]);

		}

    

    if (this.numpoints >2){
    	
    	this.child = this.makeChildCurve();
    
    	this.group.children[this.numpoints -1] = this.getChildObjects();

    	

    }
    this.midbezlines = this.makeMidBezLines();

    this.group.add(this.midbezlines);
 
    this.avgLoc = this.getAvgLoc();
   
    if (this.numpoints <3){
    	this.bez = this.createBezCurve();
    	this.group.add(this.bez);
    	


    }
    return this;



};


CustomObject.prototype.constructor = CustomObject;

CustomObject.prototype.makeLine3 = function(p1,p2){
	return new THREE.Line3(p1,p2);
};

CustomObject.prototype.makeLine = function(p1, p2, col) {
	geometry = new THREE.Geometry();
	geometry.needsUpdate = true;

    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    material = new THREE.LineBasicMaterial( { color: col, } );
    return new THREE.Line(geometry, material);
};


CustomObject.prototype.makeBall = function(point) {

	geometry = new THREE.SphereGeometry(.1,.1,1);
    material = new THREE.MeshPhongMaterial({color: this.col, transparent: true});
	sphere = new THREE.Mesh(geometry, material);
	sphere.position = point;
    
    return sphere;
};


CustomObject.prototype.moveBall = function(parent) {
	this.count = (this.count +1) % this.steps;
	t = this.count/this.steps;
	for (x = 0; x < this.numpoints -1; x++){
	
	this.group.children[x].children[1].position.setX(this.line3[x].at(t).x);
	this.group.children[x].children[1].position.setY(this.line3[x].at(t).y);
	this.group.children[x].children[1].position.setZ(this.line3[x].at(t).z);

}
	

	if (this.numpoints > 2){
		//console.log(this.child.lines);
		
		for (x = 0; x < this.balls.length -1; x++){
			this.child.group.children[x].children[0].geometry.dynamic = true
			this.child.group.children[x].children[0].geometry.vertices[0] = this.group.children[x].children[1].position;
			this.child.group.children[x].children[0].geometry.vertices[1] = this.group.children[x+1].children[1].position;
			this.child.group.children[x].children[0].geometry.verticesNeedUpdate = true;
			
			
		}

		this.child.moveBall(false);

		if (parent == false){
			this.addMidBezPoint();
		}
		
		
	}
	if (this.numpoints < 3){
		if (this.done == 0){
		this.addBezPoint();
	}
	}
};


CustomObject.prototype.getBallPosition = function() {
	
	return this.group.children[1].position;

};

CustomObject.prototype.getAvgLoc = function() {

	xsum = 0;
	ysum = 0;
	zsum = 0;

	for (a = 0; a < this.numpoints; a++){
		xsum += this.points[a].x;
		ysum += this.points[a].y;
		zsum += this.points[a].z;
	}

	return new THREE.Vector3(xsum/this.numpoints, ysum/this.numpoints, zsum/this.numpoints);
};

CustomObject.prototype.makeChildCurve = function() {
	points = [];
	for (x = 0; x < this.numpoints-1; x++){
		points.push(this.group.children[x].children[1].position);
	};

	return new CustomObject(points, this.col, this.steps, this.opacity);
};


CustomObject.prototype.getChildObjects = function() {
	if (this.numpoints >2){
		return this.child.group;
	}
}

CustomObject.prototype.createBezCurve = function(){
	
    var newgeometry = new THREE.BufferGeometry();
    var lineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000} );

   var verts = new Float32Array(this.steps*3);

   for (x = 0; x < this.steps; x++){
   verts[x*3+ 0] = this.balls[0].position.x;
   verts[x*3 + 1] = this.balls[0].position.y;
   verts[x*3 + 2] = this.balls[0].position.z;

}

       
    newgeometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
    

    myLine = new THREE.Line(newgeometry, lineMaterial);

    
    myLine.geometry.dynamic = true;
    
    return myLine
}

CustomObject.prototype.addBezPoint = function(){
	if (this.done == 0){

	if (this.count == 1){
	this.bez.geometry.attributes.position.array[0]= this.balls[0].position.x; //add the point to the end of the array
    this.bez.geometry.attributes.position.array[1]= this.balls[0].position.y;
    this.bez.geometry.attributes.position.array[2]= this.balls[0].position.z;
	}
	
	//temp = this.bez.geometry.vertices.push(this.bez.geometry.vertices.shift()); //shift the array

	for (x = this.count; x < this.steps; x++){
    this.bez.geometry.attributes.position.array[x*3]= this.balls[0].position.x; //add the point to the end of the array
    this.bez.geometry.attributes.position.array[x*3 +1]= this.balls[0].position.y;
    this.bez.geometry.attributes.position.array[x*3 +2]= this.balls[0].position.z;
}
    this.bez.geometry.attributes.position.needsUpdate = true;
    this.bez.geometry.verticesNeedUpdate = true;
    if (this.count == this.steps){
    	this.done = 1;
    }

}
}

//CustomObject.prototype.addMidBezPoint = function(){
//	//new
//	if (this.donemid == 0){
//
//
//	for (a = 0; a <this.balls.length-1; a++){
//		this.group.children[this.group.children.length-1].children[a].children[this.count].geometry.dynamic = true;
//		for (y = this.count; y < this.steps; y++){
//			if (this.count == 1){
//			this.group.children[this.group.children.length-1].children[a].children[0].geometry.vertices[0] = new THREE.Vector3(this.balls[a].position.x, this.balls[a].position.y, this.balls[a].position.z); //add the point to the end of the array
 //   		this.group.children[this.group.children.length-1].children[a].children[0].geometry.vertices[1] = new THREE.Vector3(this.balls[a].position.x, this.balls[a].position.y, this.balls[a].position.z); //add the point to the end of the array
//
//
//		}
//
//			if (this.count == 0){
//
//				for (x = 0; x < this.count; x++){
//					this.group.children[this.group.children.length-1].children[a].children[x].visible = false;
//
//				}
//			}
//
//		else{
 //   	this.group.children[this.group.children.length-1].children[a].children[this.count].geometry.vertices[0] = this.group.children[this.group.children.length-1].children[a].children[this.count-1].geometry.vertices[1]; //add the point to the end of the array
//        this.group.children[this.group.children.length-1].children[a].children[this.count].geometry.vertices[1] = new THREE.Vector3(this.balls[a].position.x, this.balls[a].position.y, this.balls[a].position.z);
//		this.group.children[this.group.children.length-1].children[a].children[this.count].visible = true;
//		this.group.children[this.group.children.length-1].children[a].children[this.count].geometry.verticesNeedUpdate  = true;
//			}
//		}
//		
//	}
//	if (this.count == this.steps){
//    	this.donemid = 1;
//    }
//}
//}

CustomObject.prototype.addMidBezPoint = function(){

	if (this.donemid == 0){


	for (a = 0; a <this.balls.length; a++){

		
			if (this.count == 1){
			this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.array[0]= this.balls[a].position.x; //add the point to the end of the array
    		this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.array[1]= this.balls[a].position.y;
  			this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.array[2]= this.balls[a].position.z;


		}
		
    	this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.array[this.count*3]= this.balls[a].position.x; //add the point to the end of the array
        this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.array[this.count*3+1]= this.balls[a].position.y;
        this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.array[this.count*3+2]= this.balls[a].position.z;
		
		this.group.children[this.group.children.length-1].children[a].geometry.attributes.position.needsUpdate = true;
		this.group.children[this.group.children.length-1].children[a].geometry.verticesNeedUpdate = true;
		}
		
	
	if (this.count == this.steps-1){
		

    	this.donemid = 1;
    }
}
}

CustomObject.prototype.toggleLines = function(bool, parent){
	if (parent == false){
	for(x = 0; x< this.numpoints-1; x++){

		this.group.children[x].children[0].visible = bool;
	}
}
	if (this.numpoints > 2){
		this.child.toggleLines(bool, false);
	}


}

CustomObject.prototype.toggleOutline = function(bool){
	for(x = 0; x< this.numpoints-1; x++){

		this.group.children[x].children[0].visible = bool;
	}
}
CustomObject.prototype.togglePoints = function(bool){

	for(x = 0; x< this.numpoints-1; x++){

		this.group.children[x].children[1].visible = bool;
	}

	if (this.numpoints > 2){
		this.child.togglePoints(bool);
	}


}

CustomObject.prototype.toggleCurve = function(bool){

	if (this.numpoints > 2){
		this.child.toggleCurve(bool);
	}

	else{
		this.bez.visible = bool;
	}


}

CustomObject.prototype.toggleMidCurves = function(bool){

	for(x = 0; x< this.balls.length; x++){

		this.group.children[this.group.children.length-1].children[x].visible = bool;
	}

	if (this.numpoints > 3){
		this.child.toggleMidCurves(bool);
	}



}
//CustomObject.prototype.makeMidBezLines = function(){
//
//	temp = new THREE.Object3D();
//
//	for (y = 0; y < this.balls.length-1;y++){
//
//		newline = new THREE.Object3D();
//		geometry = new THREE.Geometry();
//		geometry.needsUpdate = true;
//
//
 //   	geometry.vertices.push(new THREE.Vector3(this.balls[y].position.x, this.balls[y].position.y, this.balls[y].position.z));
 //   	geometry.vertices.push(new THREE.Vector3(this.balls[y].position.x, this.balls[y].position.y, this.balls[y].position.z));
//    	material = new THREE.LineBasicMaterial( { color: this.col, } );
 //   	line = new THREE.Line(geometry, material);
 //   	line.visible = false;
//		for (x=0; x < this.steps+5; x++){
//
 //  			newline.add(line.clone());
 //  		}
//
 //  		temp.add(newline);
//	}
//
//
//    return temp
    
//}
CustomObject.prototype.makeMidBezLines = function(){

	temp = new THREE.Object3D();

    for (y = 0; y < this.balls.length;y++){
		newgeometry = new THREE.BufferGeometry();
   	lineMaterial = new THREE.LineBasicMaterial( { color: this.col} );
    	verts = new Float32Array(this.steps*3);

    	verts[0] = this.points[0].x;
   		verts[1] = this.points[0].y;
   		verts[2] = this.points[0].z;
   		
    	for (x=0; x < this.steps; x++){
    		
    		verts[x*3+ 0] = verts[0];
   			verts[x*3 + 1] = verts[1];
   			verts[x*3 + 2] = verts[2];


		}
	newgeometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
	myLine = new THREE.Line(newgeometry, lineMaterial);
	myLine.geometry.dynamic = true;
	myLine.geometry.numItems = this.steps;
	temp.add(myLine);
}
	
    return temp
    
}