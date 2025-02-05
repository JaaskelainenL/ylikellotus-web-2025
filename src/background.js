// Depends on animejs
// Load this first:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>

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
