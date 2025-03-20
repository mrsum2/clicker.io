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

function startGame() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  const bgMusic = document.getElementById("bg-music");
  bgMusic.play();
}

function addPoint() {
  points += pointsPerClick;
  updateUI();
  if (soundOn) playClickSound();
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

function toggleSound() {
  soundOn = !soundOn;
  showNotification(`Sound is now ${soundOn ? "ON" : "OFF"}.`);
  const bgMusic = document.getElementById("bg-music");
  if (soundOn) bgMusic.play();
  else bgMusic.pause();
}

function changeBackground() {
  const colors = [
    "#1e3c72, #2a5298", "#43cea2, #185a9d", "#ff7e5f, #feb47b", "#6a11cb, #2575fc", "#ff512f, #dd2476"
  ];
  const randomGradient = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = `linear-gradient(to right, ${randomGradient})`;
  showNotification("Background changed!");
}

function giveDailyReward() {
  const rewardPoints = 50;
  points += rewardPoints;
  showNotification(`Daily Reward: +${rewardPoints} Points!`);
  updateUI();
}

function checkAchievements() {
  if (points >= 100 && !achievements.includes("100 Points")) {
    achievements.push("100 Points");
    showNotification("Achievement Unlocked: 100 Points!");
    const achievementLog = document.getElementById("achievements-list");
    const newAchievement = document.createElement("li");
    newAchievement.innerText = "100 Points";
    achievementLog.appendChild(newAchievement);
  }
}

function updateUI() {
  document.getElementById("points").innerText = `Points: ${points}`;
  document.getElementById("level").innerText = `Level: ${level}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${rebirths}`;
  upgradeCosts.forEach((cost, index) => {
    document.getElementById(`upgrade-cost-${index}`).innerText = cost;
  });
