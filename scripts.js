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
  document.getElementById("progress").style.width = `${(points / (level * 50)) * 100}%`;
}

// Notification Display Function
function showNotification(message) {
  const log = document.getElementById("notification-log");

  // Create a notification message
  const notification = document.createElement("p");
  notification.innerText = message;

  // Add the notification to the log
  log.appendChild(notification);

  // Automatically remove the message after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000); // Matches fade-in-out animation
}

// Leaderboard System
function updateLeaderboard() {
  leaderboard.push({ points, level, rebirths });
  leaderboard.sort((a, b) => b.points - a.points); // Sort by points in descending order

  const leaderboardList = document.getElementById("leaderboard-list");
  leaderboardList.innerHTML = ""; // Clear the current leaderboard

  leaderboard.slice(0, 5).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. Level: ${entry.level}, Points: ${entry.points}, Rebirths: ${entry.rebirths}`;
    leaderboardList.appendChild(listItem);
  });
}

// Auto-Clicker Upgrade
let autoClickerActive = false;

function buyAutoClicker() {
  const autoClickerCost = 100;
  if (points >= autoClickerCost && !autoClickerActive) {
    points -= autoClickerCost;
    autoClickerActive = true;
    showNotification("Auto-Clicker Purchased! Earning points automatically.");

    // Add points every second
    setInterval(() => {
      points += 1;
      updateUI();
    }, 1000);
  } else if (autoClickerActive) {
    showNotification("You already have an Auto-Clicker!");
  } else {
    showNotification(`Not enough points to buy Auto-Clicker. You need ${autoClickerCost} points.`);
  }
}

// Save and Load Game Data
function saveGame() {
  const gameData = {
    points,
    pointsPerClick,
    level,
    rebirths,
    upgradeCosts,
    rebirthCost,
    achievements
  };
  localStorage.setItem("clickerGameSave", JSON.stringify(gameData));
  showNotification("Game saved successfully!");
}

function loadGame() {
  const savedData = JSON.parse(localStorage.getItem("clickerGameSave"));
  if (savedData) {
    points = savedData.points;
    pointsPerClick = savedData.pointsPerClick;
    level = savedData.level;
    rebirths = savedData.rebirths;
    savedData.upgradeCosts.forEach((cost, index) => {
      upgradeCosts[index] = cost;
    });
    rebirthCost = savedData.rebirthCost;
    achievements = savedData.achievements;

    updateUI();
    const achievementsList = document.getElementById("achievements-list");
    achievementsList.innerHTML = ""; // Clear existing achievements
    achievements.forEach((achievement) => {
      const achievementItem = document.createElement("li");
      achievementItem.innerText = achievement;
      achievementsList.appendChild(achievementItem);
    });

    showNotification("Game loaded successfully!");
  } else {
    showNotification("No saved data found!");
  }
}

// Play Click Sound Effect
function playClickSound() {
  const audio = new Audio("https://www.soundjay.com/button/sounds/button-09.mp3");
  audio.volume = 0.5;
  audio.play().catch((error) => console.error("Sound playback failed:", error));
}
