var gameData;

function runGames() {
  var content = document.getElementById("content");
  content.innerHTML = "<h2>Loading...</h2>";
  loadGameData();
}

function loadGameData() {
  receiveGameData().then(function (data) {
    gameData = data;
    setTimeout(() => {
      listGames();
    }, 300);
  });
}

function listGames() {
  var result = '<div class="centeredTable" style="overflow-x: auto">';
  result += '<table class="table tableba">';
  result += '<thead> <tr><th scope="col">Team1</th>';
  result += '<th scope="col">Team2</th>';
  result += '<th scope="col">Endstand</th>';
  result += '<th scope="col">Location</th></tr></head>';
  result += '<tbody id="bodyTable">';
  const games = gameData.games.reverse();
  games.forEach((game) => {
    const player1 = game.players[0];
    const player2 = game.players[1];
    const player3 = game.players[2];
    const player4 = game.players[3];
    const team1 = player1 + "&" + player3;
    const team2 = player2 + "&" + player4;
    const endstand = calculateResult(game, player1, player2, player3, player4);
    result +=
      "<r> <td>" +
      team1 +
      "</td> <td>" +
      team2 +
      "</td><td>" +
      endstand +
      "</td><td>" +
      game.location +
      "</td></tr>";
  });
  content.innerHTML = result;
}

function calculateResult(singleGame, player1, player2, player3, player4) {
  var team1score = 0;
  var team2score = 0;
  singleGame.game.forEach((element) => {
    if ((element.p == player1 || element.p == player3) && !element.cup == 0) {
      team1score++;
    }
    if ((element.p == player2 || element.p == player4) && !element.cup == 0) {
      team2score++;
    }
  });
  return team1score + ":" + team2score;
}
