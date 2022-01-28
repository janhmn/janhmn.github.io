receiveFromLocalJSON().then(function (data) {
  localStorage.setItem("players", JSON.stringify(data));
  console.log(data);
});

function receiveFromLocalJSON() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "Data/players.json",
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

console.log(localStorage.getItem("gameData"));
