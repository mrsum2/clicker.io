let points = 0;
let pointsPerClick = 1;
let level = 1;
let rebirths = 0;
const upgradeCosts = [10, 20, 50];
const upgradeEffects = [2, 5, 10];
let rebirthCost = 100;
let soundOn = true;

function startGame() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
}

function addPoint() {
  points += pointsPerClick;
  updateUI();
  if (soundOn) playClickSound();
  if (points >= level * 50) levelUp();
}

function levelUp() {
  level++;
  alert("Level up! Get ready for a challenge.");
  updateUI();
}

function buyUpgrade(index) {
  if (points >= upgradeCosts[index]) {
    points -= upgradeCosts[index];
    pointsPerClick += upgradeEffects[index];
    upgradeCosts[index] *= 2;
    updateUI();
    alert(`Upgrade ${index + 1} purchased!`);
  } else {
    alert("Not enough points!");
  }
}

function rebirth() {
  if (points >= rebirthCost) {
    rebirths++;
    points = 0;
    pointsPerClick += 5;
    rebirthCost *= 2;
    alert("Rebirth successful!");
    updateUI();
  } else {
    alert("Not enough points to rebirth!");
  }
}

function toggleSound() {
  soundOn = !soundOn;
  alert(`Sound is now ${soundOn ? "ON" : "OFF"}`);
}

function changeBackground() {
  const colors = [
    "#1e3c72, #2a5298",
    "#43cea2, #185a9d",
    "#ff7e5f, #feb47b",
    "#6a11cb, #2575fc",
    "#ff512f, #dd2476"
  ];
  const randomGradient = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = `linear-gradient(to right, ${randomGradient})`;
}

function updateUI() {
  document.getElementById("points").innerText = `Points: ${points}`;
  document.getElementById("level").innerText = `Level: ${level}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${rebirths}`;
  upgradeCosts.forEach((cost, index) => {
    document.getElementById(`upgrade-cost-${index}`).innerText = cost;
  });
  document.getElementById("progress").style.width = `${(points / (level * 50)) * 100}%`;
}

function playClickSound() {
  const audio = new Audio("https://www.soundjay.com/button/sounds/button-09.mp3");
  audio.volume = 0.5;
  audio.play().catch((error) => {
    console.error("Sound playback failed:", error);
  });
}
