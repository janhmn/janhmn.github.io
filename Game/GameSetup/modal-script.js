// Get the modal
var modal = document.getElementById("myModal");

// Get the buttons that opens the modal
var btn = document.getElementById("player1btn");
var secondBtn = document.getElementById("player2btn");
var thirdBtn = document.getElementById("player3btn");
var fourthBtn = document.getElementById("player4btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

secondBtn.onclick = function () {
  modal.style.display = "block";
};

thirdBtn.onclick = function () {
  modal.style.display = "block";
};

fourthBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
