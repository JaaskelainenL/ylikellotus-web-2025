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
