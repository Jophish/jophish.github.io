
top = document.getElementById('header-stuff');
container = document.getElementById( 'bez' );

var test = $('#header-stuff').height();
console.log(test);
var width = container.clientWidth;
var height = Math.round((window.innerHeight - test)*.95);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);

container.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


var numpts = 20;
veclist = [];
for (x = 0; x < numpts; x++){
    veclist.push(randvec(30));
}
/*
col = Math.random()*0xffffff;
dodec = new THREE.DodecahedronGeometry(30, 2);
dodec = new THREE.TorusGeometry(15,5,10,10);
mat2 = new THREE.MeshNormalMaterial({color: col, opacity: .5, transparent: true});
scene.add(new THREE.Mesh(dodec, mat2))
mat = new THREE.MeshNormalMaterial({color: col, opacity: 1, transparent: true, wireframe: true});
scene.add(new THREE.Mesh(dodec, mat));

//var foo = new CustomObject(veclist, Math.random()*0xffffff, 400);
var foo = new CustomObject(dodec.vertices, col, 500);
//var foo = new CustomObject([new THREE.Vector3(0,0,0),new THREE.Vector3(0,0,1),new THREE.Vector3(0,1,0),new THREE.Vector3(0,1,1),new THREE.Vector3(1,0,0),new THREE.Vector3(1,0,1),new THREE.Vector3(1,1,0),new THREE.Vector3(1,1,1)],0xff0000,300)
scene.add( foo.group );
*/

    foo = new CustomObject(veclist, Math.random()*0xffffff, 200);
scene.add(foo.group);

 var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000, .5);
 camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(foo.avgLoc);
scene.add(camera);


var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );


    

controls = new THREE.OrbitControls( camera, renderer.domElement );
                //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = true;

var rendererStats  = new THREEx.RendererStats();

rendererStats.domElement.style.position = 'absolute'
rendererStats.domElement.style.left = '0px'
rendererStats.domElement.style.bottom   = '0px'
//document.body.appendChild( rendererStats.domElement )



var FizzyText = function() {
    this.numPoints = 20;
  this.speed = 0.8;
  this.showLines = false;
  this.showLines = true;
    this.showLines = false;
    this.showLines = true;
  this.showPoints = false;
  this.showCurve = true;
  this.showIntermediateCurves = false;
  this.showOutline = false;
  
};


  var text = new FizzyText();
var gui = new DAT.GUI({autoPlace: false, width: 240});
gui.domElement.style.position = 'absolute';
gui.domElement.style.top = '0px';
gui.domElement.style.right = '0px';
gui.domElement.style.overflow = "auto";

var customContainer = document.getElementById('bez');
customContainer.appendChild(gui.domElement);
  gui.add(text, 'showOutline').onChange(function(newValue){
    foo.toggleOutline(text.showOutline);
  });
  gui.add(text, 'showLines').onChange(function(newValue){
    foo.toggleLines(text.showLines, true);
  });
  gui.add(text, 'showPoints').onChange(function(newValue){
    foo.togglePoints(text.showPoints);
  });
  gui.add(text, 'showCurve').onChange(function(newValue){
    foo.toggleCurve(text.showCurve);
});
  gui.add(text, 'showIntermediateCurves').onChange(function(newValue){
    foo.toggleMidCurves(text.showIntermediateCurves);
});
  gui.add(text, "numPoints",2,80,1).onFinishChange(function(newValue) {


   veclist = [];
    for (x = 0; x < text.numPoints; x++){
    veclist.push(randvec(30));
    }
    console.log(scene);


    scene.remove(scene.children[2]);
    scene.remove(scene.children[1]);
    scene.remove(scene.children[0]);
    foo = new CustomObject(veclist, Math.random()*0xffffff, 200);
    scene.add(foo.group);

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000, .5);
 camera.position.x = 40;
camera.position.y = 40;
camera.position.z = 40;
camera.lookAt(foo.avgLoc);
scene.add(camera);

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

foo.toggleLines(text.showLines); 
foo.toggleOutline(text.showOutline); 
foo.toggleCurve(text.showCurve);
foo.toggleMidCurves(text.showIntermediateCurves);
foo.togglePoints(text.showPoints);   
});

foo.toggleLines(true, true); 
foo.toggleOutline(false); 
foo.toggleCurve(true);
foo.toggleMidCurves(false);
foo.togglePoints(false);
gui.close();
render();
function render() {
    lastnum = text.numPoints;
    rendererStats.update(renderer);
    controls.update()


    renderer.render(scene, camera);

	foo.moveBall(true);
    
    
    
    
    requestAnimationFrame(render);

    
}
 


function randvec(scale) {
    return new THREE.Vector3(scale*Math.random(), scale*Math.random(), scale*Math.random());
}
