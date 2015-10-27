



var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);




document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


var numpts = 5;
veclist = [];
for (x = 0; x < numpts; x++){
    veclist.push(randvec(30));
}


var foo = new CustomObject(veclist, Math.random()*0xffffff, 500);

scene.add( foo.group );

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
document.body.appendChild( rendererStats.domElement )



var FizzyText = function() {

  this.speed = 0.8;
  this.showLines = false;
  this.showLines = true;
  this.showLines = false;
  this.showPoints = false;
  this.showCurve = true;
  this.showIntermediateCurves = false;
  this.numPoints = 5;
};


  var text = new FizzyText();
  var gui = new DAT.GUI();
  gui.add(text, 'showLines').onChange(function(newValue){
    foo.toggleLines(text.showLines);
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
    foo = new CustomObject(veclist, Math.random()*0xffffff, 400);
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
foo.toggleCurve(text.showCurve);
foo.toggleMidCurves(text.showIntermediateCurves);
foo.togglePoints(text.showPoints);   
});

foo.toggleLines(false); 
foo.toggleCurve(true);
foo.toggleMidCurves(false);
foo.togglePoints(false);   
render();
function render() {
    lastnum = text.numPoints;
    rendererStats.update(renderer);
    controls.update()


    renderer.render(scene, camera);

	foo.moveBall();
    
    
    
    
    requestAnimationFrame(render);

    
}
 


function randvec(scale) {
    return new THREE.Vector3(scale*Math.random(), scale*Math.random(), scale*Math.random());
}