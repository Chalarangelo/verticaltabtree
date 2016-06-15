addon.port.on("vtt alter", function(tabData) {
  console.log("sidebar script got the event with value"+tabData);
  document.getElementById("messenger").textContent = tabData;
});