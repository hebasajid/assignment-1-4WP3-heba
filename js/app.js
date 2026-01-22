const landmarks = [];

function initApp() {
  console.log("Walking Tour App Loaded");
}

window.onload = initApp;

const form = document.getElementById("landmarkForm");
const landmarkList = document.getElementById("landmarkList");
const useLocationBtn = document.getElementById("useLocation");

//form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const photoFile = document.getElementById("photo").files[0];

  let lat = document.getElementById("lat").value;
  let lng = document.getElementById("lng").value;

  // Determine location source
  let location = selectedLocation;

  if (!location && lat && lng) {
    location = {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
  }

  if (!location) {
    alert("Please provide a location");
    return;
  }

  //storing image in memory:
    const imageURL = URL.createObjectURL(photoFile);
    const landmark = {
    id: Date.now(),
    title,
    description,
    imageURL,
    location
  };
   landmarks.push(landmark);
  renderLandmarks();

  form.reset();
  selectedLocation = null;
});