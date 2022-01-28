const button = document.getElementById("losBtn");

button.addEventListener("click", writeToLocalStorage);

function getGameMode() {
  if (!document.getElementById("1v1btn").hasAttribute("disabled")) {
    return 2;
  } else {
    return 1;
  }
}

function writeToLocalStorage() {
  const gameMode = getGameMode();
  const player1 = document.getElementById("player1btn").innerHTML;
  const player2 = document.getElementById("player2btn").innerHTML;
  const player3 = document.getElementById("player3btn").innerHTML;
  const player4 = document.getElementById("player4btn").innerHTML;
  localStorage.setItem("gameMode", gameMode);

  localStorage.setItem("player1", player1);
  localStorage.setItem("player2", player2);

  if (gameMode == 2) {
    localStorage.setItem("player3", player3);
    localStorage.setItem("player4", player4);
  }
}
