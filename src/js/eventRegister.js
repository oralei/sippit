let exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", exitApp);

let minimizeButton = document.getElementById("minimizeButton");
minimizeButton.addEventListener("click", minimizeApp);

let checkButton = document.getElementById("info-btn");
checkButton.addEventListener("change", activateInfoMenu);

let sipButton  = document.getElementById("sip-btn");
sipButton.addEventListener("click", openSipMenu);

let refillButton  = document.getElementById("refill-btn");
refillButton.addEventListener("click", refillWater);

let confirmButton  = document.getElementById("yes-btn");
confirmButton.addEventListener("click", closeSip);
confirmButton.addEventListener("click", sipWater);

let noButton  = document.getElementById("no-btn");
noButton.addEventListener("click", closeSip);