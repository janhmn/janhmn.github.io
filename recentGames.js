const tableBody = document.getElementById("bodyTable");

receiveFromLocalGames()
  .then(function (data) {
    localStorage.setItem("pastGames", JSON.stringify(data));
  })
  .then(function () {
    console.log(localStorage.getItem("pastGames"));
    fillTable(JSON.parse(localStorage.getItem("pastGames")));
  });

function receiveFromLocalGames() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "Data/games.json",
      dataType: "json",
      type: "get",
      cache: false,
      success: function (data) {
        resolve(data);
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}

function fillTable(pastGamesData) {
  var index = 0;
  pastGamesData;
  pastGamesData.games.reverse().forEach((game) => {
    if (index < 4) {
      const player1 = game.players[0];
      const player2 = game.players[1];
      const player3 = game.players[2];
      const player4 = game.players[3];
      const team1 = player1 + "&" + player3;
      const team2 = player2 + "&" + player4;
      const endstand = calculateResult(
        game,
        player1,
        player2,
        player3,
        player4
      );
      tableBody.innerHTML +=
        "<tr> <td>" +
        team1 +
        "</td> <td>" +
        team2 +
        "</td><td>" +
        endstand +
        "</td></tr>";
      index++;
    }
  });
  tableBody.innerHTML +=
    "<tr> <td>" + "</td> <td class='centered'>" + "..." + "</td><td>" + "</td></tr>";
  index++;
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
