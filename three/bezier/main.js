



var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);




document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


var numpts = 20;
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
  this.showLines = true;
  this.showPoints = true;
  this.showCurve = true;
};


  var text = new FizzyText();
  var gui = new DAT.GUI();
  gui.add(text, 'showLines');
  gui.add(text, 'showPoints');
  gui.add(text, 'showCurve');
    
render();
function render() {
    rendererStats.update(renderer);
    controls.update()


    renderer.render(scene, camera);
    console.log(text.hideLines);
	foo.moveBall();
    foo.toggleLines(text.showLines);
    foo.togglePoints(text.showPoints);
    foo.toggleCurve(text.showCurve);
    requestAnimationFrame(render);


}
 


function randvec(scale) {
    return new THREE.Vector3(scale*Math.random(), scale*Math.random(), scale*Math.random());
}