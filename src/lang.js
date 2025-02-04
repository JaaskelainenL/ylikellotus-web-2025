function langFI() {
    const fiButton = document.getElementById("fiButton");
    const enButton = document.getElementById("enButton");
    fiButton.style.display = "none";
    enButton.style.display = "flex";
    const html = document.documentElement;
    html.lang = "fi";
    html.classList.remove("inEnglish");
    html.classList.add("inFinnish");
}
function langEN() {
    const fiButton = document.getElementById("fiButton");
    const enButton = document.getElementById("enButton");
    fiButton.style.display = "flex";
    enButton.style.display = "none";
    const html = document.documentElement;
    html.lang = "en";
    html.classList.remove("inFinnish");
    html.classList.add("inEnglish");
}
