var audio = new Audio('1.mp3');
audio.play();

var stats;
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);




document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


var geometry = new THREE.CubeGeometry(50,50,50);
var rancol = Math.random()*0xffffff;

var text = THREE.ImageUtils.loadTexture("peter.png");
var material 


//for (i = 0; i < 11; i = i + 2){
//	tempcol = rancol + i*rancol/10
//	geometry.faces[i].color.setHex(rancol);
//	geometry.faces[i+1].color.setHex(rancol);
//}

console.log(geometry.faces[0].color.getHSL())
var material = new THREE.MeshLambertMaterial( { map: text} );
var cube = new THREE.Mesh(geometry, material);

var geometry = new THREE.SphereGeometry( 5,32,32);

var meshes = [];	
var meshx = [];
var meshy = [];			
var meshz = [];
var meshr = []	
				for ( var i = 0; i < 500; i ++ ) {
					var material =  new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff, shading: THREE.FlatShading } );
					var mesh = new THREE.Mesh( geometry, material );

					mesh.position.x = ( Math.random() - 0.5 ) * 1000;
					meshx.push(mesh.position.x);
					mesh.position.y = ( Math.random() - 0.5 ) * 1000;
					meshy.push(mesh.position.y);
					mesh.position.z = ( Math.random() - 0.5 ) * 1000;
					meshz.push(mesh.position.z);
					mesh.updateMatrix();
					meshr.push(Math.sqrt(Math.pow(mesh.position.x,2) +Math.pow(mesh.position.y,2)));
					mesh.matrixAutoUpdate = true;
					mesh.__dirtyPosition = true;
					meshes.push(mesh);
					scene.add( mesh );

				}


cube.rotation.y = Math.PI * 45 / 180;
 
scene.add(cube);


 var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);


camera.position.y = 160;
camera.position.z = 400;


camera.lookAt(cube.position);

scene.add(camera);

controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = true;

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, -150);
 
scene.add(pointLight);
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var clock = new THREE.Clock;

var xAxis = new THREE.Vector3(1,0,0);
var inc = .01;
var temp = 1;

var angleinc = 0;
function render() {
	angleinc += Math.PI/180;
	controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
   inc = 10/(Math.sqrt(Math.pow(meshes[0].position.x,2)+ Math.pow(meshes[0].position.z,2) +Math.pow(meshes[0].position.y,2)));
    t = clock.getDelta();
    for (i = 0; i < meshes.length; i++){

    	meshes[i].position.setX(meshx[i]*Math.cos(angleinc) - meshy[i]*Math.sin(angleinc));
    	meshes[i].position.setY(meshx[i]*Math.sin(angleinc) + meshy[i]*Math.cos(angleinc));
    	if (i == 1){

    	console.log(meshes[i].position.z);}
    }
    for (i = 0; i < 11; i = i + 2){

   		curcol = cube.geometry.faces[i].color.getHSL();
   		
    	cube.geometry.faces[i].color.setHSL((curcol.h + .01)% 1, curcol.s, curcol.l );
    	cube.geometry.faces[i+1].color.setHSL((curcol.h + .01)% 1, curcol.s, curcol.l );
    }
    temp = 1 + 5*Math.sin(angleinc);
    temp2 = 1 + 7*Math.sin(angleinc);
    temp3 = 1 + 2*Math.sin(angleinc*3);
    cube.scale.set(temp,temp3,temp2);
    cube.rotation.y -= t/2;


    requestAnimationFrame(render);
}
 
render();

var rotWorldMatrix;

// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);        // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}


var incrementColor = function(color, step){
    var colorToInt = parseInt(color.substr(1), 16),                     // Convert HEX color to integer
        nstep = parseInt(step);                                         // Convert step to integer
    if(!isNaN(colorToInt) && !isNaN(nstep)){                            // Make sure that color has been converted to integer
        colorToInt += nstep;                                            // Increment integer with step
        var ncolor = colorToInt.toString(16);                           // Convert back integer to HEX
        ncolor = '#' + (new Array(7-ncolor.length).join(0)) + ncolor;   // Left pad "0" to make HEX look like a color
        if(/^#[0-9a-f]{6}$/i.test(ncolor)){                             // Make sure that HEX is a valid color
            return ncolor;
        }
    }
    return color;
};