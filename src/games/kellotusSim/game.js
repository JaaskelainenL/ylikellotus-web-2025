const draw = async () => {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    ctx.font = "18px Trebuchet MS";

    const uudelleenNappi = new Image();
    const kellotaNappi = new Image();
    const aloitaNappi = new Image();
    const olut = new Image();
    const ylikellottaja = new Image();
    const kellottaja = new Image();
    const kulta = new Image();
    const hopea = new Image();
    const pronssi = new Image();
    const huono = new Image();
    uudelleenNappi.src = "uudelleennappi.png";
    kellotaNappi.src = "kellotanappi.png";
    aloitaNappi.src = "aloitanappi.png";
    olut.src = "olut.png";
    ylikellottaja.src = "ylikellottajatulos.png";
    kellottaja.src = "kellottajatulos.png";
    kulta.src = "kultatulos.png";
    hopea.src = "hopeatulos.png";
    pronssi.src = "pronssitulos.png";
    huono.src = "huonotulos.png";
    const images = [
        uudelleenNappi,
        kellotaNappi,
        aloitaNappi,
        olut,
        ylikellottaja,
        kellottaja,
        kulta,
        hopea,
        pronssi,
        huono,
    ];

    await Promise.all(
        images.map(
            (image) =>
                new Promise((resolve) =>
                    image.addEventListener("load", resolve)
                )
        )
    );

    ctx.textAlign = "center";

    var gt = 0;
    var wt = 0;
    var score = 0;
    var won = false;
    var lost = false;
    var started = false;
    var startTime = new Date();
    var endTime = new Date();
    var glugs = [];
    var startOffset = Math.floor(Math.random() * 100);
    canvas.addEventListener("mousedown", (event) => {
        const [x, y] = [event.offsetX, event.offsetY];
        if (!lost && !won && started) {
            if (90 <= x && x <= 210 && 180 <= y && y <= 240) {
                if (gt < 150 + startOffset) {
                    lost = true;
                } else {
                    score += 1;
                    glugs.push({
                        age: 1,
                        x: Math.floor(Math.random() * 500),
                        y: Math.floor(Math.random() * 500),
                    });
                }
            }
        } else if (lost) {
            if (90 <= x && x <= 210 && 180 <= y && y <= 240) {
                lost = false;
                score = 0;
                gt = 0;
                startOffset = Math.floor(Math.random() * 100);
            }
        } else if (won && wt > 180) {
            if (90 <= x && x <= 210 && 219 <= y && y <= 270) {
                won = false;
                score = 0;
                gt = 0;
                startOffset = Math.floor(Math.random() * 100);
            }
        } else if (!started) {
            if (90 <= x && x <= 210 && 180 <= y && y <= 240) {
                started = true;
            }
        }
    });
    const drawGame = () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 300, 300);
        ctx.fillStyle = "white";
        if (!started) {
            ctx.font = "30px Trebuchet MS";
            ctx.fillText("Kellotussimulaattori", 150, 48);
            ctx.font = "18px Trebuchet MS";
            ctx.fillText("Kellota, kun ajastin alkaa juosta", 150, 84);
            ctx.drawImage(aloitaNappi, 90, 180, 120, 60);
        } else if (!won && !lost) {
            ctx.drawImage(kellotaNappi, 90, 180, 120, 60);
            ctx.strokeRect(60, 120, 60, 30);
            if (gt < 150 + startOffset) {
                ctx.font = "30px Trebuchet MS";
                ctx.fillText("00:00:00", 150, 78);
                ctx.font = "42px Trebuchet MS";
                ctx.fillText(Math.max(3 - Math.floor(gt / 50), 1), 150, 138);
                ctx.font = "18px Trebuchet MS";
            } else if (gt == 150 + startOffset) {
                startTime = Date.now();
            } else if (score < 10) {
                const time = new Date(Date.now() - startTime);
                ctx.font = "30px Trebuchet MS";
                ctx.fillText(
                    `${
                        time.getMinutes() < 10
                            ? "0" + time.getMinutes()
                            : time.getMinutes()
                    }:${
                        time.getSeconds() < 10
                            ? "0" + time.getSeconds()
                            : time.getSeconds()
                    }:${time.getMilliseconds()}`,
                    150,
                    78
                );
                ctx.font = "18px Trebuchet MS";
                ctx.drawImage(olut, 6, 6, 78, 150);
                ctx.fillStyle = "black";
                ctx.fillRect(6, 6, 78, 150 * (score / 10));
                ctx.fillStyle = "white";
                glugs = glugs
                    .map((glug) => {
                        ctx.fillText("glug!", glug.x, glug.y);
                        return { ...glug, age: glug.age + 1 };
                    })
                    .filter((glug) => glug.age < 10);
            } else {
                endTime = new Date(Date.now() - startTime);
                wt = 0;
                won = true;
            }
            gt++;
        } else if (lost) {
            ctx.fillText("Aloitit kellotuksen", 150, 60);
            ctx.fillText("liian aikaisin!", 150, 84);
            ctx.drawImage(uudelleenNappi, 90, 180, 120, 60);
        } else if (won) {
            playWinningAnimation();
        }
        window.requestAnimationFrame(drawGame);
    };
    const playWinningAnimation = () => {
        ctx.font = "18px Trebuchet MS";
        ctx.fillText("Kellotettu!", 150, 33);
        if (wt > 45) {
            ctx.fillText("Aikasi:", 150, 66);
            ctx.fillText(
                `${
                    endTime.getMinutes() < 10
                        ? "0" + endTime.getMinutes()
                        : endTime.getMinutes()
                }:${
                    endTime.getSeconds() < 10
                        ? "0" + endTime.getSeconds()
                        : endTime.getSeconds()
                }:${endTime.getMilliseconds()}`,
                150,
                99
            );
        }
        if (wt > 90) {
            ctx.fillText("Tulos:", 150, 132);
        }
        if (wt > 120) {
            var tulos = huono;
            if (endTime < 1000) {
                tulos = ylikellottaja;
            } else if (endTime < 1500) {
                tulos = kellottaja;
            } else if (endTime < 2000) {
                tulos = kulta;
            } else if (endTime < 2500) {
                tulos = hopea;
            } else if (endTime < 3000) {
                tulos = pronssi;
            }
            ctx.globalAlpha = Math.min((wt - 120) / 100, 1);
            ctx.drawImage(tulos, 30, 141, 240, 60);
            ctx.globalAlpha = 1;
        }
        if (wt > 220) {
            ctx.drawImage(uudelleenNappi, 90, 210, 120, 60);
        }
        ctx.font = "18px Trebuchet MS";
        wt++;
    };
    drawGame();
};

window.addEventListener("load", draw);
