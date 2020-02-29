function onKeyDown(moveState, evt) {
  switch ( evt.code ) {
    case 'KeyW':
      moveState.forward = true;
      break;

    case 'KeyA':
      moveState.left = true;
      break;

    case 'KeyS':
      moveState.backward = true;
      break;

    case 'KeyD':
      moveState.right = true;
      break;

    case 'Space':
      if ( moveState.canJump === true ) {
        moveState.velocity.y += 200;
        moveState.canJump = false;
      }
      break;
  }
};

function onKeyUp(moveState, evt) {
  switch ( evt.code ) {
    case 'KeyW':
      moveState.forward = false;
      break;

    case 'KeyA':
      moveState.left = false;
      break;

    case 'KeyS':
      moveState.backward = false;
      break;

    case 'KeyD':
      moveState.right = false;
      break;
  }
};

export { onKeyDown, onKeyUp };