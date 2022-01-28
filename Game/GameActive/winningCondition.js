var scoreRed = document.getElementById("team1score");
var scoreBlue = document.getElementById("team2score");

function checkIfWinningConditionIsMet() {
  scoreRed = document.getElementById("team1score");
  scoreBlue = document.getElementById("team2score");

  console.log(scoreRed.innerHTML + " " + scoreBlue.innerHTML);

  winningCheck("red");
  winningCheck("blue");
}

function winningCheck(team) {
  if (team == "red") {
    checkBlueScore();
  } else if (team == "blue") {
    checkRedScore();
  }
}

function checkRedScore() {
  if (scoreRed.innerHTML == "0") {
    displayBlueWin();
  }
}

function checkBlueScore() {
  if (scoreBlue.innerHTML == "0") {
    displayRedWin();
  }
}

function displayBlueWin() {
  document.getElementById("myBlueWinModal").style.display = "block";
}

function displayRedWin() {
  document.getElementById("myRedWinModal").style.display = "block";
}
