
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
 
var scene = new THREE.Scene;


var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var urls = ["square.jpg","square.jpg","square.jpg","square.jpg","square.jpg","square.jpg"];
var textureCube = THREE.ImageUtils.loadTextureCube( urls );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
var cube = new THREE.Mesh(cubeGeometry, material);




cube.rotation.y = Math.PI * 45 / 180;
 
scene.add(cube);


 var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);


camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(cube.position);

scene.add(camera);




var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);
 
scene.add(pointLight);

var clock = new THREE.Clock;

function render() {
    renderer.render(scene, camera);
     

    cube.rotation.y -= clock.getDelta();


    requestAnimationFrame(render);
}
 
render();