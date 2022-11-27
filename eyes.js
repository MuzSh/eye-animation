const balls = document.getElementsByClassName('ball');
const eyes = document.getElementsByClassName('eye');
document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + '%';
  const y = (event.clientY * 100) / window.innerHeight + '%';

  for (let i = 0; i < 3; i++) {
    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
  for (let i = 0; i < 3; i++) {
    eyes[i].style.left = x;
    eyes[i].style.top = y;
    eyes[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
};
