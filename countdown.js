const eventDate = new Date("2023-02-15T18:00:00+02:00");
const updateCountdown = () => {
  const timeLeft = eventDate - new Date();
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  document.getElementById(
    "counter"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
updateCountdown();

setInterval(() => {
  updateCountdown();
}, 1000);
document.h;
