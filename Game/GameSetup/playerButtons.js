//getting the buttons that choose the players
const firstPlayerButton = document.getElementById("player1btn");
const secondPlayerButton = document.getElementById("player2btn");
const thirdPlayerButton = document.getElementById("player3btn");
const fourthPlayerButton = document.getElementById("player4btn");

const button1 = document.getElementById("1v1btn");
const button2 = document.getElementById("2v2btn");

//declaring variables that will be the final names inserted into the game
var firstPlayer;
var secondPlayer;
var thirdPlayer;
var fourthPlayer;

var playerNames = getPlayersFromStorage();

// declaring a variable that will hold the id of the button that opened the modal
var modalOrigin;

//declaring variables keeping track if a full game is set
var gameMode = 2;

var player1set = false;
var player2set = false;
var player3set = false;
var player4set = false;

firstPlayerButton.addEventListener("click", generatePlayerButtons);
secondPlayerButton.addEventListener("click", generatePlayerButtons);
thirdPlayerButton.addEventListener("click", generatePlayerButtons);
fourthPlayerButton.addEventListener("click", generatePlayerButtons);

button1.addEventListener("click", switchGameMode);
button2.addEventListener("click", switchGameMode);

function generatePlayerButtons() {
  setModalOrigin(this.id);
  const modalContent = document.getElementById("modal-body");
  modalContent.innerHTML = "<p>Players to choose from:</p>";
  const availablePlayers = playerNames;
  modalContent.innerHTML = generateHTML(availablePlayers);
  addEvents(availablePlayers);
}

//this function checks which button opened the modal
function setModalOrigin(id) {
  if (id == "player1btn") {
    modalOrigin = 1;
  } else if (id == "player2btn") {
    modalOrigin = 2;
  } else if (id == "player3btn") {
    modalOrigin = 3;
  } else if (id == "player4btn") {
    modalOrigin = 4;
  }
}

// generiert für jeden möglichen Spieler einen Button im Modal
function generateHTML(players) {
  var result = "";
  players.forEach((element) => {
    result += '<div class="row button-list">';
    result +=
      '<button class="btn btn-primary btn-lg" id="' +
      element +
      '">' +
      element +
      "</button>";
    result += "</div>";
  });
  return result;
}

function addEvents(playerIds) {
  playerIds.forEach((element) => {
    const button = document.getElementById(element);
    button.addEventListener("click", playerSelected);
  });
}

//insert the player chosen into the variable
//TO-DO : write data into JSON file
function playerSelected() {
  if (modalOrigin == 1) {
    firstPlayer = this.id;
    firstPlayerButton.innerHTML = this.id;
    player1set = true;
  } else if (modalOrigin == 2) {
    secondPlayer = this.id;
    secondPlayerButton.innerHTML = this.id;
    player2set = true;
  } else if (modalOrigin == 3) {
    thirdPlayer = this.id;
    thirdPlayerButton.innerHTML = this.id;
    player3set = true;
  } else if (modalOrigin == 4) {
    fourthPlayer = this.id;
    fourthPlayerButton.innerHTML = this.id;
    player4set = true;
  }
  console.log(this.id);
  document.getElementById("myModal").style.display = "none";
  removeSelectedPlayer(this.id);
  checkIfGameCanStart();
}

function checkIfGameFull() {
  if (gameMode == 1) {
    return player1set && player2set;
  } else {
    return player1set && player2set && player3set && player4set;
  }
}

function switchGameMode() {
  if (gameMode == 2) {
    gameMode = 1;
    console.log(1);
  } else {
    gameMode = 2;
    console.log(2);
  }
  checkIfGameCanStart();
}

function checkIfGameCanStart() {
  if (checkIfGameFull()) {
    document.getElementById("losBtn").classList.remove("noClick");
    document.getElementById("losBtn").classList.remove("btn-secondary");
    document.getElementById("losBtn").classList.add("btn-primary");
  }
}

function getPlayersFromStorage() {
  var result = new Array();
  players = JSON.parse(localStorage.getItem("players"));
  players.players.forEach((element) => {
    result.push(element.name);
  });
  return result;
}

function removeSelectedPlayer(name) {
  playerNames.forEach((element) => {
    const index = playerNames.indexOf(element);
    if (element == name) {
      playerNames.splice(index, 1);
    }
  });
}
