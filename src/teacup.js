var scene;
var camera;
var renderer;

init();
animate();

function init() {
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor( 0xeeeeee );
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
  camera.position.set(5,5,0);
  scene.add(camera);

  var plane = new THREE.Mesh(
  new THREE.PlaneGeometry( 5, 5, 5, 5 ),
  new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
  );
  plane.rotateX(Math.PI/2);
  scene.add( plane );

  window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  });

  var light = new THREE.PointLight(0xffffff);
  light.position.set(20,20,20);
  scene.add(light);

  var loader = new THREE.JSONLoader();
  loader.load( "models/teacup.js", function(geometry){
    var material = new THREE.MeshLambertMaterial({color: 0xff6666});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,1.1,0);
    scene.add(mesh);
  });

  controls = new THREE.OrbitControls(camera, renderer.domElement);

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
