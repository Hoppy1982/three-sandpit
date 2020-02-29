/*
To do - move object dimensions to variables & have the texture repeats determined by those rather than set each chuffing thing manually.
*/

import {
	TextureLoader,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  RepeatWrapping
} from "./three.module.js";

const loader = new TextureLoader();

//--------------------------------------------------------------------------------
// floor
const floorGeometry = new BoxGeometry(100, 10, 100); //width, height, depth
const floorMaterials = [
  new MeshBasicMaterial({map: loader.load('assets/images/grass_block_side.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/grass_block_side.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/grass_block_top.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/grass_path_top.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/grass_block_side.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/grass_block_side.png')})
];

for (let i=0; i<6; i++) {
  switch(i) {
    // top
    case 2:
      floorMaterials[i].map.wrapS = RepeatWrapping;
      floorMaterials[i].map.wrapT = RepeatWrapping;
      floorMaterials[i].map.repeat.set( 10, 10 );
      break;
    // bottom
    case 3:
      floorMaterials[i].map.wrapS = RepeatWrapping;
      floorMaterials[i].map.wrapT = RepeatWrapping;
      floorMaterials[i].map.repeat.set( 10, 10 );
      break;
    // sides
    default: 
    floorMaterials[i].map.wrapS = RepeatWrapping;
    floorMaterials[i].map.wrapT = RepeatWrapping;
    floorMaterials[i].map.repeat.set( 10, 1 );
  }
}

const floor = new Mesh(floorGeometry, floorMaterials);
floor.position.y = -5;

//--------------------------------------------------------------------------------
// wall1
const wall1Geometry = new BoxGeometry(5, 20, 100); //width, height, depth
const wall1Materials = [
  new MeshBasicMaterial({map: loader.load('assets/images/bedrock.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/bedrock.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/bedrock.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/bedrock.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/bedrock.png')}),
  new MeshBasicMaterial({map: loader.load('assets/images/bedrock.png')})
];

for (let i=0; i<6; i++) {
  switch(i) {
    // top
    case 2:
      wall1Materials[i].map.wrapS = RepeatWrapping;
      wall1Materials[i].map.wrapT = RepeatWrapping;
      wall1Materials[i].map.repeat.set( 1, 1 );
      break;
    // bottom
    case 3:
      wall1Materials[i].map.wrapS = RepeatWrapping;
      wall1Materials[i].map.wrapT = RepeatWrapping;
      wall1Materials[i].map.repeat.set( 1, 1 );
      break;
    // short sides
    case 4:
      wall1Materials[i].map.wrapS = RepeatWrapping;
      wall1Materials[i].map.wrapT = RepeatWrapping;
      wall1Materials[i].map.repeat.set( 0.25, 1 );
      break;
    case 5:
      wall1Materials[i].map.wrapS = RepeatWrapping;
      wall1Materials[i].map.wrapT = RepeatWrapping;
      wall1Materials[i].map.repeat.set( 0.25, 1 );
      break;
    // wide sides
    default: 
    wall1Materials[i].map.wrapS = RepeatWrapping;
    wall1Materials[i].map.wrapT = RepeatWrapping;
    wall1Materials[i].map.repeat.set( 5, 1 );
  }
}

const wall1 = new Mesh(wall1Geometry, wall1Materials);
wall1.position.y = 10;
wall1.position.x = 47.5;


export { floor, wall1 };