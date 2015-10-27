
var stats;
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);




document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


var numpts = 10;
veclist = [];
for (x = 0; x < numpts; x++){
    veclist.push(randvec(10));
}




var foo = new CustomObject(veclist, Math.random()*0xffffff);

scene.add( foo.group );
console.log(foo);

 var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
 camera.position.x = 20;
camera.position.y = 20;
camera.position.z = 20;
camera.lookAt(foo.avgLoc);
scene.add(camera);


var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );


var SUB = 200;
var count = 0

controls = new THREE.OrbitControls( camera, renderer.domElement );
                //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = true;

function render() {

    controls.update()


    count = (count + 1) % SUB;
    frac = count/ SUB
 
    renderer.render(scene, camera);

	foo.moveBall(frac);
    requestAnimationFrame(render);


}
 
render();

function randvec(scale) {
    return new THREE.Vector3(scale*Math.random(), scale*Math.random(), scale*Math.random());
}