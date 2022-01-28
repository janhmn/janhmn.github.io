//save the initial state for the game mode
var state = 2;

const btn1 = document.getElementById("2v2btn");
const btn2 = document.getElementById("1v1btn");

btn1.addEventListener("click", changeState);
btn2.addEventListener("click", changeState);

function changeState() {
  //create the disabled attribute for buttons
  const att = document.createAttribute("disabled");
  //toggle the css-styles of the selection
  btn1.classList.toggle("btn-success");
  btn1.classList.toggle("btn-secondary");
  btn2.classList.toggle("btn-success");
  btn2.classList.toggle("btn-secondary");

  //change the state of the variable
  if (state == 2) {
    state = 1;
    setModeOnePlayer();
    btn1.removeAttribute("disabled");
    btn2.setAttributeNode(att);
  } else {
    state = 2;
    setModeTwoPlayers();
    btn2.removeAttribute("disabled");
    btn1.setAttributeNode(att);
  }
}

function setModeOnePlayer() {
  const player3btn = document.getElementById("player3btn");
  const player4btn = document.getElementById("player4btn");

  player3btn.style.opacity = "0%";
  player4btn.style.opacity = "0%";
  player3btn.setAttributeNode(document.createAttribute("disabled"));
  player4btn.setAttributeNode(document.createAttribute("disabled"));
}

function setModeTwoPlayers() {
  const player3btn = document.getElementById("player3btn");
  const player4btn = document.getElementById("player4btn");

  player3btn.style.opacity = "100%";
  player4btn.style.opacity = "100%";
  player3btn.attributes.removeNamedItem("disabled");
  player4btn.attributes.removeNamedItem("disabled");
}

function getState() {
  return state;
}
