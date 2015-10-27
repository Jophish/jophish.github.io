

function CustomObject(points, col) {

    this.type = 'CustomObject';

    this.points = points;
    this.numpoints = points.length;
    this.col = col;



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

    

    if (this.numpoints >2){
    	
    	this.child = this.makeChildCurve();
    
    	this.group.children[this.numpoints -1] = this.getChildObjects();

    }
 
    this.avgLoc = this.getAvgLoc();
   
    
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
    material = new THREE.LineBasicMaterial( { color: col, linewidth: 30 } );
    return new THREE.Line(geometry, material);
};


CustomObject.prototype.makeBall = function(point) {

	geometry = new THREE.SphereGeometry(.1,.1,1);
    material = new THREE.MeshLambertMaterial({color: this.col});
	sphere = new THREE.Mesh(geometry, material);
	sphere.position = point;
    
    return sphere;
};


CustomObject.prototype.moveBall = function(t) {

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
		this.child.moveBall(t);
		
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

	return new CustomObject(points, this.col);
};


CustomObject.prototype.getChildObjects = function() {
	if (this.numpoints >2){
		return this.child.group;
	}
}

