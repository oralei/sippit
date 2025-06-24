let exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", exitApp);

let minimizeButton = document.getElementById("minimizeButton");
minimizeButton.addEventListener("click", minimizeApp);

let checkButton = document.getElementById("info-btn");
checkButton.addEventListener("change", activateInfoMenu);

let sipButton  = document.getElementById("sip-btn");
sipButton.addEventListener("click", openSipMenu);

let confirmButton  = document.getElementById("yes-btn");
confirmButton.addEventListener("click", closeSip);
confirmButton.addEventListener("click", sipWater);

let noButton = document.getElementById("no-btn");
noButton.addEventListener("click", closeSip);

let noFillButton = document.getElementById("no-btn2");
noFillButton.addEventListener("click", toggleOverlay);

let confirmSetFill = document.getElementById("yes-btn2");
confirmSetFill.addEventListener("click", setMenuFill);

document.addEventListener("keydown", (event) => {
  if (event.key === "o" || event.key === "O") {
    toggleOverlay();
  }
});

let bottle = document.getElementById("bottle-container");
bottle.addEventListener("click", toggleOverlay);

let darkScreen = document.getElementById("darkscreen1");
darkScreen.addEventListener("click", toggleOverlay);

inputFilter(document.getElementById("sip-amount-input"), function(value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
});