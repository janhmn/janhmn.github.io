var gameData;
var playerData;
var locations;

function runLocation() {
  console.log("running location");
  gameData = JSON.parse(localStorage.getItem("pastGames"));
  playerData = JSON.parse(localStorage.getItem("players"));
  locations = JSON.parse(localStorage.getItem("locations"));
  const content = document.getElementById("content");
  content.innerHTML = "";
  replaceContentWithLocation();
}

function replaceContentWithLocation() {
  var locationTables = new Array();
  locations.locs.forEach((location) => {
    locationTables.push(makeTableForLoc(location));
  });
  locationTables.forEach((table) => {
    content.innerHTML += table;
  });
}

function makeTableForLoc(loc) {
  var result = "<h1>" + loc.name + "</h1>";
  var locGames = new Array();
  gameData.games.forEach((game) => {
    if (game.location == loc.name) {
      locGames.push(game);
    }
  });
  var players = new Array();
  playerData.players.forEach((element) => {
    players.push(element.name);
  });
  var playersTabledata = new Array();
  players.forEach((player) => {
    const wins = calculatePlayerWins(player, locGames);
    const gamesPlayed = calculatePlayerGames(player, locGames);
    const losses = gamesPlayed - wins;
    const quote = (wins / gamesPlayed) * 100;
    const hits = calculatePlayerHits(player, locGames);
    const misses = calculatePlayerMisses(player, locGames);
    const actions = hits + misses;
    const hitRatio = (hits / actions) * 100;
    console.log(
      player +
        " " +
        wins +
        " " +
        losses +
        " " +
        quote +
        "% " +
        hitRatio +
        "%" +
        " in " +
        loc
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
  result += generateContent(sortedData);
  return result;
}
