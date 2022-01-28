const player1 = localStorage.getItem("player1");
const player2 = localStorage.getItem("player2");
const player3 = localStorage.getItem("player3");
const player4 = localStorage.getItem("player4");

document.getElementById("redTag").innerHTML = player1;
document.getElementById("blueTag").innerHTML = player2;

if (localStorage.getItem("gameMode") == 2) {
    document.getElementById("redTag").innerHTML += "&" + player3;
document.getElementById("blueTag").innerHTML += "&" + player4;
}

const loc = localStorage.getItem('location');
const locationText = document.getElementById('locationText');
locationText.innerHTML = loc;
