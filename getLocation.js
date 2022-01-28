const locCol = document.getElementById("locationCol");

var lat;
var long;
var savedLocs;
receiveFromLocalJSON();

findLocation();



//function that checks if location is near a defined Location
async function findLocation() {
  console.log(savedLocs);
  await navigatorHandling();
}

async function navigatorHandling() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(calculatePosition);
  }
  return;
}

function calculatePosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  console.log(
    "The current location is: " + lat + " latitude " + long + " longitude"
  );

  savedLocs.locs.forEach((element) => {
    if (
      Math.abs(element.latitude - lat) < 0.2 &&
      Math.abs(element.longitude - long) < 0.2
    ) {
      console.log(element.name);
      document.getElementById("locationText").innerHTML = element.name;
      localStorage.setItem('location' , element.name)
    } else {
      document.getElementById("locationText").innerHTML = "unknown";
    }
  });
}

function receiveFromLocalJSON() {
  $.ajax({
    url: "Data/locations.json",
    dataType: "json",
    type: "get",
    cache: false,
    success: function (data) {
      savedLocs = data;
    },
  });
}
