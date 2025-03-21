let points = 0;
let pointsPerClick = 1;
let level = 1;
let rebirths = 0;
let achievements = [];
let leaderboard = [];
const upgradeCosts = [10, 20, 50];
const upgradeEffects = [2, 5, 10];
let rebirthCost = 100;
let autoClickerActive = false;

// Starts the game and hides the main menu
function startGame() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  loadGame(); // Load saved data (if any) when the game starts
}

// Adds points when the clickable area is clicked
function addPoint() {
  points += pointsPerClick;
  updateUI();
  playClickSound();
  checkAchievements();
  if (points >= level * 50) levelUp();
}

// Handles leveling up
function levelUp() {
  level++;
  showNotification(`Level up! You reached level ${level}.`);
  updateUI();
}

// Allows players to buy upgrades
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

// Activates an auto-clicker to generate points
function buyAutoClicker() {
  if (points >= 100 && !autoClickerActive) {
    points -= 100;
    autoClickerActive = true;
    setInterval(() => {
      points += 1;
      updateUI();
    }, 1000); // Adds 1 point every second
    showNotification("Auto-Clicker Activated!");
  } else if (autoClickerActive) {
    showNotification("Auto-Clicker is already active!");
  } else {
    showNotification("Not enough points to buy Auto-Clicker.");
  }
}

// Handles rebirth functionality
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

// Checks and unlocks achievements
function checkAchievements() {
  if (points >= 100 && !achievements.includes("100 Points")) {
    achievements.push("100 Points");
    const achievementItem = document.createElement("li");
    achievementItem.innerText = "100 Points";
    document.getElementById("achievements-list").appendChild(achievementItem);
    showNotification("Achievement Unlocked: 100 Points!");
  }
}

// Updates the game UI with the latest stats and saves progress
function updateUI() {
  document.getElementById("points").innerText = `Points: ${points}`;
  document.getElementById("level").innerText = `Level: ${level}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${rebirths}`;
  upgradeCosts.forEach((cost, index) => {
    document.getElementById(`upgrade-cost-${index}`).innerText = cost;
  });
  document.getElementById("progress").style.width = `${(points / (level * 50)) * 100}%`;
  saveGame(); // Auto-save after every UI update
}

// Saves the current game state to local storage
function saveGame() {
  const gameData = {
    points,
    pointsPerClick,
    level,
    rebirths,
    upgradeCosts,
    rebirthCost,
    autoClickerActive,
    achievements,
  };
  localStorage.setItem("clickerGameSave", JSON.stringify(gameData));
  console.log("Game progress saved.");
}

// Loads the game state from local storage (if available)
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
    autoClickerActive = savedData.autoClickerActive;
    achievements = savedData.achievements;

    // Restore achievements visually
    const achievementsList = document.getElementById("achievements-list");
    achievementsList.innerHTML = ""; // Clear existing achievements
    achievements.forEach((achievement) => {
      const achievementItem = document.createElement("li");
      achievementItem.innerText = achievement;
      achievementsList.appendChild(achievementItem);
    });

    updateUI();
    console.log("Game progress loaded.");
  }
}

// Resets the game progress
function resetProgress() {
  if (confirm("Are you sure you want to reset all progress?")) {
    localStorage.removeItem("clickerGameSave"); // Clear saved data
    points = 0;
    pointsPerClick = 1;
    level = 1;
    rebirths = 0;
    achievements = [];
    leaderboard = [];
    rebirthCost = 100;
    autoClickerActive = false;
    updateUI(); // Reset UI
    showNotification("Progress has been reset.");
  }
}

// Plays a click sound when the clickable area is clicked
function playClickSound() {
  const audio = new Audio("https://www.soundjay.com/button/sounds/button-09.mp3");
  audio.volume = 0.5;

  audio.play().then(() => {
    console.log("Click sound played successfully!");
  }).catch((error) => {
    console.error("Sound playback failed:", error);
  });
}

// Displays a notification in the notification log
function showNotification(message) {
  const notificationLog = document.getElementById("notification-log");
  const notification = document.createElement("p");
  notification.innerText = message;
  notificationLog.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Changes the background to a random gradient
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
  showNotification("Background changed!");
}

// Toggles the visibility of the settings menu
function toggleSettingsMenu() {
  const settingsMenu = document.getElementById("settings-menu");
  if (settingsMenu.style.display === "none" || settingsMenu.style.display === "") {
    settingsMenu.style.display = "block";
  } else {
    settingsMenu.style.display = "none";
  }
}

// Toggles sound on/off
function toggleSound() {
  soundOn = !soundOn;
  showNotification(`Sound is now ${soundOn ? "ON" : "OFF"}`);
}
