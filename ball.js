function isOnMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
const ball = document.getElementById("ball").style;
let height = document.body.scrollHeight;
let width = document.body.clientWidth;
const radius = 50;
const isMobile = isOnMobile();
let touchX;
let touchY;
let speedX;
let speedY;
let x = isMobile ? 0 : width / 3;
let y = 0;
let dx = 2;
let dy = 2;
let rotation = 0;
let lastTouchTime = new Date();
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
    speedX = e.movementX;
    speedY = e.movementY;
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
  height = document.body.scrollHeight;
  width = document.body.clientWidth;
  const slowdownRate = 100;
  dx -= dx / slowdownRate;
  dy -= dy / slowdownRate;
  x += dx;
  y += dy;
  const maxX = width - 2 * radius - (isMobile ? 0 : 20);
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
  ball.left = `${x}px`;
  ball.top = `${y}px`;
  rotation += Math.max(Math.abs(dx), Math.abs(dy));
  ball.transform = `rotate(${rotation}deg)`;
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
