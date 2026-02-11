const button = document.getElementById("search-button");
const input = document.getElementById("city-input");

const cityName = document.getElementById("city-Name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");

button.addEventListener("click", async () => {
  console.log(input.value);
});
async function getData(lat, long) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=c67e5677998f4f7eac662807261701&q=${cityName}}&aqi=yes`,
  );
  return await promise.json();
}
button.addEventListener("click", async () => {
  const value = input.value;
  const result = await getData(value);
  cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
  cityTime.innerText = result.location.localtime;
  cityTemp.innerText = result.current.temp_c;
});
async function getData(lat, long) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=c67e5677998f4f7eac662807261701&q=${lat}, ${long}&aqi=yes`,
  );
  return await promise.json();
}
const button1 = document.getElementById("Get-Location-button");

async function gotlocation(position) {
  const result = await getData(
    position.coords.latitude,
    position.coords.longitude,
  );
  console.log(result);
}
function failedToGet() {
  console.log("failed to get location");
}
button1.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotlocation, failedToGet);
});
