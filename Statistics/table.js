var gameData;
var playerData;

function runTable() {
  var content = document.getElementById("content");
  content.innerHTML = "<h2>Loading...</h2>";
  loadData();
}

function loadData() {
  gameData = JSON.parse(localStorage.getItem("pastGames"));
  playerData = JSON.parse(localStorage.getItem("players"));
  buildContent();
}

function buildContent() {
  var players = new Array();
  playerData.players.forEach((element) => {
    players.push(element.name);
  });
  console.log(players);
  var playersTabledata = new Array();
  players.forEach((player) => {
    const wins = calculatePlayerWins(player, gameData.games);
    const gamesPlayed = calculatePlayerGames(player, gameData.games);
    const losses = gamesPlayed - wins;
    const quote = (wins / gamesPlayed) * 100;
    const hits = calculatePlayerHits(player, gameData.games);
    const misses = calculatePlayerMisses(player, gameData.games);
    const actions = hits + misses;
    const hitRatio = (hits / actions) * 100;
    console.log(
      player + " " + wins + " " + losses + " " + quote + "% " + hitRatio + "%"
    );
    playersTabledata.push({
      player: player,
      wins: wins,
      losses: losses,
      quote: quote,
      hitRatio: hitRatio,
    });
  });
  sortedData = sortData(playersTabledata);
  console.log(sortedData);
  content.innerHTML = generateContent(sortedData);
}

function calculatePlayerWins(player, selectedGames) {
  var result = 0;
  selectedGames.forEach((game) => {
    game.winners.forEach((winner) => {
      if (winner == player) {
        result++;
      }
    });
  });
  return result;
}

function calculatePlayerGames(player, selectedGames) {
  var result = 0;
  selectedGames.forEach((game) => {
    game.players.forEach((gamePlayer) => {
      if (gamePlayer == player) {
        result++;
      }
    });
  });
  return result;
}

function calculatePlayerHits(player, selectedGames) {
  var result = 0;
  selectedGames.forEach((game) => {
    game.game.forEach((action) => {
      if (action.p == player && action.cup != 0) {
        result++;
      }
    });
  });
  return result;
}

function calculatePlayerMisses(player, selectedGames) {
  var result = 0;
  selectedGames.forEach((game) => {
    game.game.forEach((action) => {
      if (action.p == player && action.cup == 0) {
        result++;
      }
    });
  });
  return result;
}

function sortData(data) {
  var result = new Array();
  data.forEach((element) => {
    console.log(element.wins + element.losses);
    if (element.wins + element.losses != 0) {
      result.push(element);
    }
  });
  result.sort(function (a, b) {
    return b.quote - a.quote;
  });
  return result;
}

function generateContent(tableContent) {
  var result = "<div>";
  result += '<table class="table tableba">';
  result += '<thead> <tr><th scope="col">Name</th>';
  result += '<th scope="col">Record</th>';
  result += '<th scope="col">Quote</th>';
  result += '<th scope="col">Hitratio</th></tr></head>';
  result += '<tbody id="bodyTable">';
  tableContent.forEach((element) => {
    result += "<tr>";
    result +=
      "<td>" +
      element.player +
      "</td><td>" +
      element.wins +
      "-" +
      element.losses +
      "</td><td>" +
      element.quote.toString().substring(0, 5) +
      "%</td><td>" +
      element.hitRatio.toString().substring(0, 5) +
      "%</td>";
    result += "</tr>";
  });
  result += "</tbody></table></div>";
  return result;
}
