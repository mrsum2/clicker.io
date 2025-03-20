let points = 0;
let pointsPerClick = 1;
let level = 1;
let rebirths = 0;
let soundOn = true;
let achievements = [];
let leaderboard = [];
const upgradeCosts = [10, 20, 50];
const upgradeEffects = [2, 5, 10];
let rebirthCost = 100;
let autoClickerActive = false;

function startGame() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
}

function addPoint() {
  points += pointsPerClick;
  updateUI();
  playClickSound();
  checkAchievements();
  if (points >= level * 50) levelUp();
}

function levelUp() {
  level++;
  showNotification(`Level up! You reached level ${level}.`);
  updateUI();
}

function buyUpgrade(index) {
  if (points >= upgradeCosts[index]) {
    points -= upgradeCosts[index];
    pointsPerClick += upgradeEffects[index];
    upgradeCosts[index] *= 2;
    showNotification(`Upgrade ${index + 1} purchased!`);
    updateUI();
  } else {
    showNotification(`Not enough points to purchase Upgrade ${index + 1}.`);
  }
}

function buyAutoClicker() {
  if (points >= 100 && !autoClickerActive) {
    points -= 100;
    autoClickerActive = true;
    setInterval(() => {
      points += 1;
      updateUI();
    }, 1000);
    showNotification("Auto-Clicker Activated!");
  } else if (autoClickerActive) {
    showNotification("Auto-Clicker is already active!");
  } else {
    showNotification("Not enough points to buy Auto-Clicker.");
  }
}

function rebirth() {
  if (points >= rebirthCost) {
    rebirths++;
    points = 0;
    pointsPerClick += 5;
    rebirthCost *= 2;
    showNotification(`Rebirth successful!`);
    updateUI();
  } else {
    showNotification(`Not enough points to rebirth.`);
  }
}

function checkAchievements() {
  if (points >= 100 && !achievements.includes("100 Points")) {
    achievements.push("100 Points");
    const achievementItem = document.createElement("li");
    achievementItem.innerText = "100 Points";
    document.getElementById("achievements-list").appendChild(achievementItem);
    showNotification("Achievement Unlocked: 100 Points!");
  }
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
  audio.play().catch((error) => console.error("Sound playback failed:", error));
}

function showNotification(message) {
  const notificationLog = document.getElementById("notification-log");
  const notification = document.createElement("p");
  notification.innerText = message;
  notificationLog.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}
