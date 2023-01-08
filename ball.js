function isOnMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
const ball = document.getElementById("ball");
const ballStyle = ball.style;
height = document.getElementById("body").offsetHeight;
width = document.body.clientWidth;
const radius = ball.offsetWidth / 2;
const isMobile = isOnMobile();
let touchX;
let touchY;
let speedX;
let speedY;
let x = width / 2 - radius;
let y = 100;
let dx = 0;
let dy = 0;
let rotation = 0;
let lastTouchTime = new Date();
ballStyle.left = `${x}px`;
ballStyle.top = `${y}px`;
const calculateSpeed = (touchPoint, centerPoint) => {
  const distanceFromCenter = touchPoint - centerPoint - radius;
  const normalizedDistance = distanceFromCenter / radius;
  const speed = normalizedDistance * 10;
  return speed;
};
function handleTouch(e) {
  if (
    e.type == "touchstart" ||
    e.type == "touchmove" ||
    e.type == "touchend" ||
    e.type == "touchcancel"
  ) {
    const evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    const touch = evt.touches[0] || evt.changedTouches[0];
    touchX = touch.pageX;
    touchY = touch.pageY;
    speedX = calculateSpeed(touch.pageX, x);
    speedY = -calculateSpeed(touch.pageY, y);
  } else if (e.type === "mousemove") {
    touchX = e.pageX;
    touchY = e.pageY;
    const mouseSpeedMultiplier = 0.5;
    speedX = e.movementX * mouseSpeedMultiplier;
    speedY = e.movementY * mouseSpeedMultiplier;
  }
  const isValid = touchX && touchY && speedX && speedY;
  const isInBall =
    touchX > x &&
    touchX < x + 2 * radius &&
    touchY > y &&
    touchY < y + 2 * radius;
  const timeNow = new Date();
  const timeSinceLastTouch = timeNow - lastTouchTime;
  const isSomeTimeAfterLastTouch = timeSinceLastTouch > 100;
  if (isValid && isInBall && isSomeTimeAfterLastTouch) {
    lastTouchTime = timeNow;
    const speedMultiplier = 2;
    dx = speedX * speedMultiplier;
    dy = speedY * speedMultiplier;
  }
}
const el = document.getElementById("body");
el.addEventListener("touchmove", handleTouch);
el.addEventListener("touchstart", handleTouch);
el.addEventListener("touchend", handleTouch);
el.addEventListener("touchcancel", handleTouch);
el.addEventListener("mousemove", handleTouch);
function update() {
  height = document.getElementById("body").offsetHeight;
  width = document.body.clientWidth;
  const slowdownRate = 100;
  dx -= dx / slowdownRate;
  dy -= dy / slowdownRate;
  const gravity = 0.05;
  dy += gravity;
  x += dx;
  y += dy;
  const maxX = width - 2 * radius;
  const maxY = height - 2 * radius;
  if (x > maxX) {
    x = maxX;
    dx = -dx;
  }
  if (y > maxY) {
    y = maxY;
    dy = -dy;
  }
  if (x < 0) {
    x = 0;
    dx = -dx;
  }
  if (y < 0) {
    y = 0;
    dy = -dy;
  }
  ballStyle.left = `${x}px`;
  ballStyle.top = `${y}px`;
  const minRotation = y + 20 >= maxY ? 0 : 2;
  rotation += Math.max(Math.abs(dx), Math.abs(dy), minRotation);
  ballStyle.transform = `rotate(${rotation}deg)`;
  window.requestAnimationFrame(update);
}
const timeToAnimationStart = 0; //3000;
setTimeout(function () {
  window.requestAnimationFrame(update);
}, timeToAnimationStart);
