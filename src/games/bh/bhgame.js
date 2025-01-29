const bulletSpeed = 2;
const bullets = []
const enemies = []
var player;
var wave = 0;
var lastWave = 0;
var waitingForWave = false;
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };


function startGame() {
    player = new playerComponent(30, 30, 120, 350);
    
    gameCanvas.start();
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 300;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.getElementById("canvasHolder").appendChild(this.canvas);
        if(typeof this.interval !== "undefined"){
            clearInterval(this.interval);
        }
        document.getElementById("gamingButton").hidden = true;
        document.getElementById("placeHolder").hidden = true;


        this.interval = setInterval(updateGameArea, 20);
    },
    
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};



function summonWave(){
    wave+=1;
    const max=7
    var newWave = Math.floor(Math.random()*max)
    if(lastWave===newWave){
        newWave = newWave+1 %max
    }

    switch(newWave){
        case 0:
            enemies.push(new spinner(270,0));
            enemies.push(new spinner(270,370));
            enemies.push(new spinner(0,370));
            break;

        case 1:
            enemies.push(new spinner(125,30));
            enemies.push(new gunner(125,30,[bulletSpeed*(-0.5),0]));
            enemies.push(new gunner(125,30,[bulletSpeed*(0.5),0]));
            break;

        case 2:
            enemies.push(new mover(269,15,[bulletSpeed*2+Math.random()*0.5,0]));
            enemies.push(new mover(30,55,[bulletSpeed*2+Math.random()*0.5,0]));
            enemies.push(new mover(150,105,[bulletSpeed*2+Math.random()*0.5,0]));
            break;
        case 3:
            enemies.push(new spinner(50, 30));
            enemies.push(new circler(125, 30));
            enemies.push(new spinner(220, 30,-1));
            break;

        case 4:
            enemies.push(new gunner(125,30,[bulletSpeed*(-1),0]));
            enemies.push(new gunner(125,30,[bulletSpeed*(1),0]));
            enemies.push(new gunner(125,30))
            break;

        case 5:
            enemies.push(new mover(30,30,[0,bulletSpeed*1.5+Math.random()*0.5]));
            enemies.push(new mover(250,330,[0,bulletSpeed*1.5+Math.random()*0.5]));
            break;

        case 6:
            enemies.push(new circler(125, 50, [bulletSpeed*0.33, -0.33*bulletSpeed]));
            break

        default:
            enemies.push(new circler(125,15));
            enemies.push(new gunner(270,30));
            enemies.push(new gunner(0,30));
            break;  
    }

    lastWave=newWave

}




function playerComponent(width, height, x, y) {
    this.img = new Image()
    this.img.src = "player.jpg"
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameCanvas.context;
        ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > gameCanvas.canvas.width) this.x = gameCanvas.canvas.width - this.width;
        if (this.y + this.height > gameCanvas.canvas.height) this.y = gameCanvas.canvas.height - this.height;

    };
}

function gunner(x,y,v=[0,0]){
    this.img = new Image()
    this.img.src = "enemy.webp"
    this.x = x
    this.y = y
    this.width=30
    this.height=30
    this.ttl = 500
    this.maxNext = 25;
    this.next = this.maxNext
    this.velocity = v
    this.update = function(){
        this.next--
        if(this.next <= 0){
            this.next = this.maxNext;
            const dx = player.x + player.width / 2 - this.x;
            const dy = player.y + player.height / 2 - this.y;
            const magnitude = Math.sqrt(dx * dx + dy * dy);
            const bulletDx = (dx / magnitude) * bulletSpeed;
            const bulletDy = (dy / magnitude) * bulletSpeed;

            bullets.push(new bullet(this.x+this.width/2, this.y+this.height, bulletDx, bulletDy));

        }
        this.ttl--
        if(this.ttl<0){
            enemies.splice(enemies.indexOf(this),1)
        }

        this.x+=this.velocity[0]
        if(this.x+this.width>=gameCanvas.canvas.width || this.x <= this.width)
                this.velocity[0] *= -1

        this.y+=this.velocity[1]
        if(this.y+this.height>=gameCanvas.canvas.height || this.y <= this.height)
                this.velocity[1] *= -1        

        ctx = gameCanvas.context;
        ctx.drawImage(this.img,this.x, this.y, this.width, this.height);

    }

}


function mover(x,y,v=[bulletSpeed,0]){
    this.img = new Image()
    this.img.src = "enemy.webp"
    this.x = x
    this.y = y
    this.width=30
    this.height=30
    this.ttl = 500
    this.maxNext = 15;
    this.next = this.maxNext
    this.velocity = v
    this.update = function(){
        this.next--
        if(this.next <= 0){
            var by = this.velocity[1] == 0 ? 0 : bulletSpeed
            if(this.x < gameCanvas.canvas.width*0.25 && by < 0){
                by *= -1
            } else if(this.x > gameCanvas.canvas.width*0.75 && by > 0){
                by *= -1
            }
            bullets.push(new bullet(this.x+this.width/2, this.y+this.height, by, this.velocity[0] == 0 ? 0 : bulletSpeed));
            this.next = this.maxNext

        }

        this.x+=this.velocity[0]
        if(this.x+this.width>=gameCanvas.canvas.width || this.x <= this.width)
                this.velocity[0] *= -1

        this.y+=this.velocity[1]
        if(this.y+this.height>=gameCanvas.canvas.height || this.y <= this.height)
                this.velocity[1] *= -1   

        this.ttl--
        if(this.ttl<0){
            enemies.splice(enemies.indexOf(this),1)
        }

        ctx = gameCanvas.context;
        ctx.drawImage(this.img,this.x, this.y, this.width, this.height);

    }

}



function circler(x,y,v=[0,0]){
    this.img = new Image()
    this.img.src = "enemy.webp"
    this.x = x
    this.y = y
    this.ttl = 500
    this.width=30
    this.height=30
    this.maxNext = 25;
    this.next = this.maxNext
    this.velocity = v
    this.update = function(){
        this.next--
        if(this.next <= 0){
            this.next = this.maxNext;

            const circleSize = 15;
            const step = (2*Math.PI)/circleSize
            for(let i=0;i<circleSize;i++){
                
                const angle = i*step;
                const bulletDx = Math.cos(angle) * bulletSpeed;
                const bulletDy = Math.sin(angle) * bulletSpeed;
    
                bullets.push(new bullet(this.x+(this.width/2), this.y+(this.height/2), bulletDx, bulletDy));
            }

        }
        this.ttl--
        if(this.ttl<0){
            enemies.splice(enemies.indexOf(this),1)
        }

        this.x+=this.velocity[0]
        if(this.x+this.width>=gameCanvas.canvas.width || this.x <= this.width)
                this.velocity[0] *= -1

        this.y+=this.velocity[1]
        if(this.y+this.height>=gameCanvas.canvas.height || this.y <= this.height)
                this.velocity[1] *= -1   

        ctx = gameCanvas.context;
        ctx.drawImage(this.img,this.x, this.y, this.width, this.height);

    }

}


function spinner(x,y,r=1){
    this.img = new Image()
    this.img.src = "enemy.webp"
    this.x = x;
    this.y = y;
    this.ttl = 500;
    this.width=30;
    this.height=30;
    this.maxNext = 5;
    this.next = this.maxNext
    this.circleSize=30
    this.step=(2*Math.PI)/this.circleSize;
    this.state = 0;
    this.adder=r
    this.update = function(){
        this.next--
        if(this.next <= 0){
            this.next = this.maxNext;
                this.state+=this.adder
                const angle = this.step*(this.state);
                const bulletDx = Math.cos(angle) * bulletSpeed;
                const bulletDy = Math.sin(angle) * bulletSpeed;
    
                bullets.push(new bullet(this.x+(this.width/2), this.y+(this.height/2), bulletDx, bulletDy));
        }
        this.ttl--
        if(this.ttl<0){
            enemies.splice(enemies.indexOf(this),1)
        }

        ctx = gameCanvas.context;
        ctx.drawImage(this.img,this.x, this.y, this.width, this.height);

    }

}






function bullet(x,y,dx,dy){
    this.width = 5
    this.height = 5
    this.dx = dx
    this.dy = dy
    this.x = x
    this.y = y
    this.ttl=200
    this.update = function(){
        ctx = gameCanvas.context;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ttl--;
        this.x += this.dx;
        this.y += this.dy;
        if(this.ttl < 0){
            bullets.splice(bullets.indexOf(this),1);
        }
    }

}



let isTouchingPlayer = false;
let offsetX, offsetY;

function on_canvas_touch_start(e) {
    const rect = gameCanvas.canvas.getBoundingClientRect();
    const touch = e.touches[0];

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    if (
        touchX >= player.x &&
        touchX <= player.x + player.width &&
        touchY >= player.y &&
        touchY <= player.y + player.height
    ) {
        isTouchingPlayer = true;
        offsetX = touchX - player.x;
        offsetY = touchY - player.y;
    }
}

function on_canvas_touch_move(e) {
    e.preventDefault();
    if (!isTouchingPlayer) return;

    const rect = gameCanvas.canvas.getBoundingClientRect();
    const touch = e.touches[0];

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    player.x = touchX - offsetX;
    player.y = touchY - offsetY;

    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > gameCanvas.canvas.width) player.x = gameCanvas.canvas.width - player.width;
    if (player.y + player.height > gameCanvas.canvas.height) player.y = gameCanvas.canvas.height - player.height;
}

function on_canvas_touch_end() {
    isTouchingPlayer = false;
}

function updateGameArea() {
    gameCanvas.clear();
    updatePlayerSpeed();
    player.update();
    enemies.forEach(e => {e.update()});
    bullets.forEach(e => {
        e.update();
        if(collisionCheck(e)){
            gameOver();
        }
    });

    if(enemies.length == 0 && !waitingForWave){
        if(wave===0){
            summonWave();
            return;
        }

        waitingForWave = true;
        setTimeout(() =>{
            waitingForWave = false;
            summonWave();
        },2500);
    }
}


function gameOver(){
    enemies.splice(0,enemies.length)
    bullets.splice(0,bullets.length)
    clearInterval(gameCanvas.interval)
    wave-=1;
    gameCanvas.context.font = "20px Comic Sans MS";
    gameCanvas.context.fillStyle = "red";
    gameCanvas.context.fillText("The little alien guy is dead!",20,100)
    gameCanvas.context.fillText("Points: "+wave,100,140)
    document.getElementById("gamingButton").hidden = false;
    wave=0;
}


function collisionCheck(bullet){
    return bullet.x < player.x + player.width * 0.5 &&
    bullet.x + bullet.width > player.x + player.width * 0.2 &&
    bullet.y < player.y + player.height * 0.5 &&
    bullet.y + bullet.height > player.y + player.height * 0.2;

}



function updatePlayerSpeed() {
    player.speedX = 0;
    player.speedY = 0;

    if (keys.ArrowUp) player.speedY = -2;
    if (keys.ArrowDown) player.speedY = 2;
    if (keys.ArrowLeft) player.speedX = -2;
    if (keys.ArrowRight) player.speedX = 2;

    player.newPos()

}




gameCanvas.canvas.addEventListener("touchstart", on_canvas_touch_start, false);
gameCanvas.canvas.addEventListener("touchmove", on_canvas_touch_move, false);
gameCanvas.canvas.addEventListener("touchend", on_canvas_touch_end, false);

document.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) {
        e.preventDefault();
        keys[e.key] = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) {
        e.preventDefault();
        keys[e.key] = false;
    }
});