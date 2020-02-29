import * as THREE from './three.module.js';
import { PointerLockControls } from './PointerLockControls.js';
import { onKeyDown, onKeyUp } from './KeyboardControls.js';
import { floor, wall1 } from './level.js';


const renderer = new THREE.WebGLRenderer( { antialias: true } );
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const controls = new PointerLockControls(camera, document.body);
const raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );
const direction = new THREE.Vector3();
const moveState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  canJump: false,
  velocity: new THREE.Vector3()
}
let prevTime = performance.now();


init();
animate();


function init() {
  light.position.set( 0.5, 1, 0.75 );
  camera.position.y = 10;
  scene.background = new THREE.Color( 0xffffff );
  scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
  scene.add(light);

  instructions.addEventListener('click', function() {
    controls.lock();
  }, false );

  controls.addEventListener('lock', function() {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
  });

  controls.addEventListener('unlock', function() {
    blocker.style.display = 'block';
    instructions.style.display = '';
  });

  document.addEventListener('keydown', onKeyDown.bind(this, moveState), false);
  document.addEventListener('keyup', onKeyUp.bind(this, moveState), false);


  // level objects
  scene.add( floor );
  scene.add( wall1 );
  
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
  requestAnimationFrame( animate );

  if (controls.isLocked === true) {

    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    let time = performance.now();
    let delta = ( time - prevTime ) / 1000;

    moveState.velocity.x -= moveState.velocity.x * 10.0 * delta;
    moveState.velocity.z -= moveState.velocity.z * 10.0 * delta;
    moveState.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveState.forward ) - Number( moveState.backward );
    direction.x = Number( moveState.right ) - Number( moveState.left );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveState.forward || moveState.backward ) moveState.velocity.z -= direction.z * 400.0 * delta;
    if ( moveState.left || moveState.right ) moveState.velocity.x -= direction.x * 400.0 * delta;

    controls.moveRight( - moveState.velocity.x * delta );
    controls.moveForward( - moveState.velocity.z * delta );
    controls.getObject().position.y += ( moveState.velocity.y * delta );

    if ( controls.getObject().position.y < 10 ) {
      moveState.velocity.y = 0;
      controls.getObject().position.y = 10;
      moveState.canJump = true;
    }

    prevTime = time;

  }

  renderer.render( scene, camera );
}