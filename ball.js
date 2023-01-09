function isOnMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
height = document.getElementById('body').offsetHeight
width = document.body.clientWidth
const ballSize = 200
const radius = 100
const isMobile = isOnMobile()
const ballImage = new Image()
ballImage.src = 'ball.png'
let touchX
let touchY
let speedX
let speedY
let x = width / 2 - radius
let y = 100
let dx = 0
let dy = 0
let rotation = 0
let hasStarted = false
let lastTouchTime = new Date()
const calculateSpeed = (touchPoint, centerPoint) => {
  const distanceFromCenter = touchPoint - centerPoint - radius
  const normalizedDistance = distanceFromCenter / radius
  const speed = normalizedDistance * 10
  return speed
}
function handleTouch(e) {
  if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
    const evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent
    const touch = evt.touches[0] || evt.changedTouches[0]
    touchX = touch.pageX
    touchY = touch.pageY
    speedX = calculateSpeed(touch.pageX, x)
    speedY = -calculateSpeed(touch.pageY, y)
  } else if (e.type === 'mousemove') {
    touchX = e.pageX
    touchY = e.pageY
    const mouseSpeedMultiplier = 0.5
    speedX = e.movementX * mouseSpeedMultiplier
    speedY = e.movementY * mouseSpeedMultiplier
  }
  const isValid = touchX && touchY && speedX && speedY
  const isInBall = touchX > x && touchX < x + 2 * radius && touchY > y && touchY < y + 2 * radius
  const timeNow = new Date()
  const timeSinceLastTouch = timeNow - lastTouchTime
  const isSomeTimeAfterLastTouch = timeSinceLastTouch > 100
  if (isValid && isInBall && isSomeTimeAfterLastTouch) {
    lastTouchTime = timeNow
    const speedMultiplier = 2
    dx = speedX * speedMultiplier
    dy = speedY * speedMultiplier
  }
}
const el = document.getElementById('body')
el.addEventListener('touchmove', handleTouch)
el.addEventListener('touchstart', handleTouch)
el.addEventListener('touchend', handleTouch)
el.addEventListener('touchcancel', handleTouch)
el.addEventListener('mousemove', handleTouch)

function drawRotatedBall(x, y, w, h, degrees) {
  ctx.save()
  ctx.translate(x + w / 2, y + h / 2)
  ctx.rotate((degrees * Math.PI) / 180.0)
  ctx.translate(-x - w / 2, -y - h / 2)
  ctx.drawImage(ballImage, x, y, w, h)
  ctx.restore()
}

function update() {
  canvas.width = width * window.devicePixelRatio
  canvas.height = height * window.devicePixelRatio
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  height = document.getElementById('body').offsetHeight
  width = document.body.clientWidth
  const slowdownRate = 100
  dx -= dx / slowdownRate
  dy -= dy / slowdownRate
  const gravity = hasStarted ? 0.05 : 0
  dy += gravity
  x += dx
  y += dy
  const maxX = width - 2 * radius
  const maxY = height - 2 * radius
  if (x > maxX) {
    x = maxX
    dx = -dx
  }
  if (y > maxY) {
    y = maxY
    dy = -dy
  }
  if (x < 0) {
    x = 0
    dx = -dx
  }
  if (y < 0) {
    y = 0
    dy = -dy
  }
  const minRotation = y + 20 >= maxY || !hasStarted ? 0 : 2
  rotation += Math.max(Math.abs(dx), Math.abs(dy), minRotation)
  const scaledBallSize = ballSize * window.devicePixelRatio
  drawRotatedBall(x * window.devicePixelRatio, y * window.devicePixelRatio, scaledBallSize, scaledBallSize, rotation)
  window.requestAnimationFrame(update)
}
const timeToAnimationStart = 3000
setTimeout(function () {
  hasStarted = true
}, timeToAnimationStart)

window.requestAnimationFrame(update)
