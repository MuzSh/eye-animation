const balls = document.getElementsByClassName('ball');
const eyes = document.getElementsByClassName('eye');
var resize = document.getElementById("ball");
var isResizing = false;


// mousemoving code - working
document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + '%';
  const y = (event.clientY * 100) / window.innerHeight + '%';

  for (let i = 0; i < 2; i++) {
    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
};

// animate eyball movement when the user goes off screen,
// function animatePosition() {
//   // Get the position of the WebGL object
//   var rect = resize.getBoundingClientRect();
//   var x = rect.left + (rect.width / 2);
//   var y = rect.top + (rect.height / 2);

//   // Update the position of the ball
//   updatePosition(x, y);

//   // Call the animatePosition function again
//   requestAnimationFrame(animatePosition);
// }

// // Call the animatePosition function to start the animation
// animatePosition();