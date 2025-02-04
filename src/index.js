const ufo = document.querySelector(".ufo");

ufo.style.transform = "translateY(500px) translateX(-1500px)";

const ufoLoop = anime({
    targets: ".ufo",
    translateY: 25,
    direction: "alternate",
    loop: true,
    autoplay: false,
    easing: "easeInOutSine",
    duration: 2000,
});

const ufoEntry = anime({
    targets: ".ufo",
    translateY: 0,
    translateX: 0,
    direction: "normal",
    easing: "spring(1, 80, 13, 10)",
    duration: 1000,
    delay: 300,
    loop: false,
    complete: function (anim) {
        ufo.style.transform = "translateY(0px) translateX(0px)";
        const ufoLoop = anime({
            targets: ".ufo",
            translateY: 25,
            direction: "alternate",
            loop: true,
            autoplay: true,
            easing: "easeInOutSine",
            duration: 2000,
        });
        ufoLoop.play();
    },
});

/*
anime({
    targets: '.ufo',
    translateY: 25,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 2000,
});*/

const lowerSky = anime({
    targets: ".ufo-sky-lower",
    translateY: 25,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 1500,
    delay: 300,
});

const upperSky = anime({
    targets: ".ufo-sky-upper",
    translateY: 25,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 1700,
    delay: 250,
});

anime({
    targets: ".ufo-sky-lower-upscreen",
    translateY: -25,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 1300,
    delay: 150,
});

anime({
    targets: ".down-arrow",
    translateY: 50,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 500,
});

const updateDate = () => {
    const target = new Date(Date.UTC(2025, 1, 26, 16, 0, 0));
    const now = new Date();

    const dif = target.getTime() - now.getTime();

    const days = Math.floor(dif / 86400000);
    const hours = Math.round((dif % 86400000) / 3600000);
    const minutes = Math.round(((dif % 86400000) % 3600000) / 60000);
    const seconds = Math.round(((dif % 86400000) % 60000) / 1000);

    document.getElementById("days").style.setProperty("--value", days);
    document.getElementById("hours").style.setProperty("--value", hours);
    document.getElementById("minutes").style.setProperty("--value", minutes);
    document.getElementById("seconds").style.setProperty("--value", seconds);

    requestAnimationFrame(updateDate);
};

updateDate();

const games = {
    bh: {
        width: "300px",
        height: "400px",
    },
    td: {
        width: "1152px",
        height: "648px",
    },
    kellotusSim: {
        width: "300px",
        height: "300px",
    },
};

const startGame = (game) => {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "games/" + game + "/index.html");
    ifrm.id = "gameFrame";
    ifrm.style.width = games[game].width;
    ifrm.style.height = games[game].height;
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("backToGameMenu").style.display = "flex";
    document.getElementById("gameHolder").appendChild(ifrm);
};

const backToGameMenu = () => {
    const gameFrame = document.getElementById("gameFrame");
    document.getElementById("gameHolder").removeChild(gameFrame);
    document.getElementById("backToGameMenu").style.display = "none";
    document.getElementById("gameMenu").style.display = "flex";
};

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    if (window.scrollY > (window.innerHeight * 5) / 8) {
        navbar.style.opacity = "1";
    } else {
        navbar.style.opacity = "0";
    }
});

//smooth scrollaamine
let anchorList = document.querySelectorAll('a[href^="#"]');
anchorList.forEach((link) => {
    link.onclick = function (e) {
        e.preventDefault();

        let destination = document.querySelector(this.hash);
        destination.scrollIntoView({
            behavior: "smooth",
        });
    };
});
