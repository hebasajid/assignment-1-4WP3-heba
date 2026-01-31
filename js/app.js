let map;
let markers = [];

document.addEventListener("DOMContentLoaded", () => {

  const landmarks = [];
  let selectedLocation = null;

  const form = document.getElementById("landmarkForm");
  const landmarkList = document.getElementById("landmarkList");
  const useLocationBtn = document.getElementById("useLocation");


  // using browser geolocation
  useLocationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        selectedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        alert("Location captured!");
      },
      () => alert("Unable to retrieve location")
    );
  });

  //  form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const photoFile = document.getElementById("photo").files[0];

    const latInput = document.getElementById("lat").value;
    const lngInput = document.getElementById("lng").value;

    let location = selectedLocation;

    if (!location && latInput && lngInput) {
      location = {
        lat: parseFloat(latInput),
        lng: parseFloat(lngInput)
      };
    }

    if (!location) {
      alert("Please provide a location");
      return;
    }

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
    map.setCenter(location);
    map.setZoom(14);


    form.reset();
    selectedLocation = null;
  });

  function renderLandmarks() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    landmarkList.innerHTML = "";

    landmarks.forEach((lm) => {
  
  const li = document.createElement("li");
  li.innerHTML = `
    <h3>${lm.title}</h3>
    <p>${lm.description}</p>
    <p>Lat: ${lm.location.lat.toFixed(4)}, Lng: ${lm.location.lng.toFixed(4)}</p>
    <img src="${lm.imageURL}" width="200">
  `;
  landmarkList.appendChild(li);

  // creating the map marker
  const marker = new google.maps.Marker({
    position: lm.location,
    map: map,
    title: lm.title,
  });

  //info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <h3>${lm.title}</h3>
      <p>${lm.description}</p>
      <img src="${lm.imageURL}" width="200">
    `
  });


  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });


  markers.push(marker);
});
  }

});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.2557, lng: -79.8711 }, // starting frmo hamilton
    zoom: 12,
  });
}

