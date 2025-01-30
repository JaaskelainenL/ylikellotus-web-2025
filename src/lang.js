function langFI() {
	const html = document.documentElement;
	html.lang = "fi";
	html.classList.remove("inEnglish");
	html.classList.add("inFinnish");
}
function langEN() {
	const html = document.documentElement;
	html.lang = "en";
	html.classList.remove("inFinnish");
	html.classList.add("inEnglish");
}
