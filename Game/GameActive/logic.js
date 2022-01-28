// keeping GameScore
var team1Score = 10;
var team2Score = 10;

//variables for keeping track of the active player
var changingPlayerIndex = 1;
var activePlayer = localStorage.getItem(
  "player" + changingPlayerIndex.toString()
);

//set Up orignial orderBox
document.getElementById("orderBox").innerHTML = activePlayer + "'s turn!";

//set up the hit and the miss button
const hitButton = document.getElementById("hitButton");
const missButton = document.getElementById("missButton");
hitButton.addEventListener("click", playerHit);
missButton.addEventListener("click", playerMiss);

//get Modals
const redModal = document.getElementById("myRedModal");
const blueModal = document.getElementById("myBlueModal");

//get confirmbuttons in modals
const confirmRedButton = document.getElementById("confirmRedBtn");
const confirmBlueButton = document.getElementById("confirmBlueBtn");

var selectedCup = "none";

// get Red Cups
var redCups = new Array(10);
for (let i = 0; i < redCups.length; i++) {
  id = i + 1;
  redCups[i] = document.getElementById("red" + id);
}

//add events to Red Cups
redCups.forEach((element) => {
  element.addEventListener("click", chooseCupRed);
});

function chooseCupRed() {
  removeSelection(selectedCup);
  this.style.backgroundColor = "green";
  confirmRedButton.removeAttribute("disabled");
  confirmRedButton.classList.replace("btn-secondary", "btn-success");
  selectedCup = this.id;
  console.log(selectedCup);
}

// get Blue Cups
var blueCups = new Array(10);
for (let i = 0; i < blueCups.length; i++) {
  id = i + 1;
  blueCups[i] = document.getElementById("blue" + id);
}

//add events to blue Cups
blueCups.forEach((element) => {
  element.addEventListener("click", chooseCupBlue);
});

function chooseCupBlue() {
  removeSelection(selectedCup);
  this.style.backgroundColor = "green";
  confirmBlueButton.removeAttribute("disabled");
  confirmBlueButton.classList.replace("btn-secondary", "btn-success");
  selectedCup = this.id;
  console.log(this.id);
}

confirmRedButton.addEventListener("click", confirmShot);
confirmBlueButton.addEventListener("click", confirmShot);

// function that runs when the hit button is pressed
function playerHit() {
  showCupDialogue();
}

//opens the modal when a player hits a cup
function showCupDialogue() {
  if (
    activePlayer == localStorage.getItem("player1") ||
    activePlayer == localStorage.getItem("player3")
  ) {
    blueModal.style.display = "block";
  } else if (
    activePlayer == localStorage.getItem("player2") ||
    activePlayer == localStorage.getItem("player4")
  ) {
    redModal.style.display = "block";
  }
}

//function for a confirmed shot
function confirmShot() {
  closeModal();
  lockCups();
  writeHitData(activePlayer, selectedCup);
  updateScore();
  changeActivePlayer();
  checkIfWinningConditionIsMet();
  updateGameOrder();
}

//close the modals after a shot was hit
function closeModal() {
  redModal.style.display = "none";
  blueModal.style.display = "none";
  confirmRedButton.classList.replace("btn-success", "btn-secondary");
  confirmBlueButton.classList.replace("btn-success", "btn-secondary");
  confirmRedButton.setAttributeNode(document.createAttribute("disabled"));
  confirmBlueButton.setAttributeNode(document.createAttribute("disabled"));
}

// lock the cups after a hit shot, so the state of the cups is saved
function lockCups() {
  redCups.forEach((element) => {
    if (element.style.backgroundColor == "green") {
      element.style.backgroundColor = "white";
      element.removeEventListener("click", chooseCupRed);
    }
  });

  blueCups.forEach((element) => {
    if (element.style.backgroundColor == "green") {
      element.style.backgroundColor = "white";
      element.removeEventListener("click", chooseCupBlue);
    }
  });
}

//updating the score in the script and within the HTML DOM
function updateScore() {
  if (
    activePlayer == localStorage.getItem("player1") ||
    activePlayer == localStorage.getItem("player3")
  ) {
    team2Score = team2Score - 1;
    document.getElementById("team2score").innerHTML = team2Score;
  } else if (
    activePlayer == localStorage.getItem("player2") ||
    activePlayer == localStorage.getItem("player4")
  ) {
    team1Score = team1Score - 1;
    document.getElementById("team1score").innerHTML = team1Score;
  }

  selectedCup = "none";
}

// switch to the next player
function changeActivePlayer() {
  if (localStorage.getItem("gameMode") == 2) {
    if (activePlayer == localStorage.getItem("player1")) {
      activePlayer = localStorage.getItem("player3");
      return;
    } else if (activePlayer == localStorage.getItem("player3")) {
      activePlayer = localStorage.getItem("player2");
      return;
    } else if (activePlayer == localStorage.getItem("player2")) {
      activePlayer = localStorage.getItem("player4");
      return;
    } else if (activePlayer == localStorage.getItem("player4")) {
      activePlayer = localStorage.getItem("player1");
      return;
    }
  } else {
    if (activePlayer == localStorage.getItem("player1")) {
      activePlayer = localStorage.getItem("player2");
      return;
    } else if (activePlayer == localStorage.getItem("player2")) {
      activePlayer = localStorage.getItem("player1");
      return;
    }
  }
}

//updating the Box containing the orders for the game
function updateGameOrder() {
  document.getElementById("orderBox").innerHTML = activePlayer + "'s turn!";
  updateColor();
}

//switch the bk-color in case another teams turn commences
function updateColor() {
  if (
    activePlayer == localStorage.getItem("player1") ||
    activePlayer == localStorage.getItem("player3")
  ) {
    document.getElementById("orderBox").style.backgroundColor = "red";
  } else if (
    activePlayer == localStorage.getItem("player2") ||
    activePlayer == localStorage.getItem("player4")
  ) {
    document.getElementById("orderBox").style.backgroundColor = "blue";
  }
}

// runs when the miss button is clicked
function playerMiss() {
  writeMissData(activePlayer);
  changeActivePlayer();
  updateGameOrder();
}

function removeSelection(cup) {
  if(cup == "none"){
    return;
  }
  redCups.forEach((element) => {
    if (element.id == cup) {
      element.style.backgroundColor = "red";
    }
  });

  blueCups.forEach((element) => {
    if (element.id == cup) {
      element.style.backgroundColor = "blue";
    }
  });
}
