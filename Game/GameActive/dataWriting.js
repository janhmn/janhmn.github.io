const redWinBtn = document.getElementById("redWonBtn");
const blueWinBtn = document.getElementById("blueWonBtn");

var gameData = {
  id: "0001",
  gameMode: localStorage.getItem("gameMode"),
  location: localStorage.getItem("location"),
  players: [
    localStorage.getItem("player1"),
    localStorage.getItem("player2"),
    localStorage.getItem("player3"),
    localStorage.getItem("player4"),
  ],
  winners: [],
  game: [],
};

redWinBtn.addEventListener("click", logGameRed);
blueWinBtn.addEventListener("click", logGameBlue);

function writeHitData(player, cup_id) {
  console.log(player + " " + getCupNumber(cup_id));
  gameData.game.push({
    p: player,
    cup: getCupNumber(cup_id),
  });
  console.log(gameData.game);
}

function writeMissData(player) {
  console.log(player + " " + 0);
  gameData.game.push({
    p: player,
    cup: 0,
  });
  console.log(gameData.game);
}

function getCupNumber(id) {
  return id.replace(/^\D+/g, "");
}

function logGameRed() {
  gameData.winners.push(gameData.players[0]);
  gameData.winners.push(gameData.players[2]);
  var currentGameData = JSON.parse(localStorage.getItem("pastGames"));
  currentGameData.push(gameData);
  localStorage.setItem("pastGames", JSON.stringify(currentGameData));
  localStorage.setItem("gameData", JSON.stringify(gameData));
  console.log(JSON.parse(localStorage.getItem("gameData")));
}

function logGameBlue() {
  gameData.winners.push(gameData.players[1]);
  gameData.winners.push(gameData.players[3]);
  var currentGameData = JSON.parse(localStorage.getItem("pastGames"));
  currentGameData.push(gameData);
  localStorage.setItem("pastGames", JSON.stringify(currentGameData));
  localStorage.setItem("gameData", JSON.stringify(gameData));
  console.log(JSON.parse(localStorage.getItem("gameData")));
}
