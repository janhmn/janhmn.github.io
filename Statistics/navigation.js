//manage the navigation within the statistics site
runTable();
const tableCol = document.getElementById("tableCol");
const locaCol = document.getElementById("locCol");
const gamesCol = document.getElementById("gamesCol");

tableCol.addEventListener("click", runTable);
tableCol.addEventListener("click", selectTableCol);

locaCol.addEventListener("click", runLocation);
locaCol.addEventListener("click", selectLocationCol);

gamesCol.addEventListener("click", runGames);
gamesCol.addEventListener("click", selectGamesCol);

function selectTableCol() {
  tableCol.classList.add("selected");
  locaCol.classList.remove("selected");
  gamesCol.classList.remove("selected");
}

function selectLocationCol() {
  tableCol.classList.remove("selected");
  locaCol.classList.add("selected");
  gamesCol.classList.remove("selected");
}

function selectGamesCol() {
  tableCol.classList.remove("selected");
  locaCol.classList.remove("selected");
  gamesCol.classList.add("selected");
}
