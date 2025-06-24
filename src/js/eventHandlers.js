// Event handlers for registered events from eventRegister.js
console.log("Testing, testing, I'm just suggesting. You and I might not be the best thing!"); 

const bottleState = {
	totalWater: 1182.94,
	remainingWater: 1182.94,
	percent: 15,
};

var sipMenuOpen = false;

function exitApp()
{
	console.log("does this work?");
	window.electronAPI.closeApp();
}

function minimizeApp()
{
	window.electronAPI.minimizeApp();
}

function activateInfoMenu(event)
{
	if (event.target.checked) {
			window.electronAPI.unfoldInfo();
			document.getElementById("background2").style.visibility = "visible";
			console.log("flip"); 
	} else {
			window.electronAPI.foldInfo();
			document.getElementById("background2").style.visibility = "hidden";
			console.log("flop"); 
	}
}

function openSipMenu()
{
	let sipMenu = document.getElementById("sip-menu");
	sipMenuOpen = true;

	sipMenu.style.bottom = "0px";
}

function closeSip()
{
	let sipMenu = document.getElementById("sip-menu");
	sipMenuOpen = false;

	sipMenu.style.bottom = "-200px";
}

function sipWater() 
{
	var waterFill = document.getElementById("water-fill");
	const totalLiquid = 1182.94;
	var ml = parseFloat(document.getElementById("sip-amount-input").value);

	if (isNaN(ml))
			ml = 0;

	var currentClip = getComputedStyle(waterFill).clipPath;

	// convert ml to percent
	let percent = ((ml / 1182.94) * (0.85 / 1)) * 100;
	
	// get current percent from regex
	let currentPercent = currentClip.match(/inset\(([\d.]+)%/);
	if (!currentPercent) return;

	let currentTop = parseFloat(currentPercent[1]);

	// add new sip to clip path percent
	let newTop = currentTop + percent;

	// make sure it cant go over 100
	newTop = Math.min(newTop, 100);

	bottleState.remainingWater -= ml;
	bottleState.remainingWater = Math.max(0, bottleState.remainingWater); // prevent negative

	setWaterLevel(newTop, bottleState.remainingWater);
}

function ozToMl(oz)
{
	return (oz * 29.5735);
}

function mlToOz(ml)
{
	return (ml / 29.5735);
}

function setWaterLevel(percent, ml)
{
	var waterFill = document.getElementById("water-fill");
	var currentClip = getComputedStyle(waterFill).clipPath;

	// apply the new clip-path css
	waterFill.style.clipPath = `inset(${percent}% 0 0 0)`;

	bottleState.percent = percent;
	bottleState.remainingWater = ml;

	document.getElementById("remaining-ml").innerHTML = String(ml.toFixed(1)) + " ml";
	document.getElementById("remaining-oz").innerHTML = String(mlToOz(ml).toFixed(1)) + " oz";
}

function getTopToPercent()
{
	var waterFill = document.getElementById("water-fill");
	var currentClip = getComputedStyle(waterFill).clipPath;

	let currentPercent = currentClip.match(/inset\(([\d.]+)%/);
	if (!currentPercent) return;

	let currentTop = parseFloat(currentPercent[1]);

	console.log(currentTop);
	return currentTop * 0.01;
}

function refillWater()
{
	setWaterLevel(15, bottleState.totalWater);
}

setWaterLevel(15, bottleState.totalWater);

// Fill Menu Things:

const slider = document.getElementById("fill-slider");
const fillPercent = document.getElementById("fill-percent");

// update number on input
slider.addEventListener("input", function () {
	fillPercent.textContent = this.value + "%";
	const val = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(to right, #7FE2E2 ${val}%, #5c5964 ${val}%)`;
});

const overlay = document.getElementById("darkscreen1");
const fillMenu = document.getElementById("fill-menu");

var overlayOn = false;

function toggleOverlay() {
	if (overlayOn)
		hideOverlay();
	else
		showOverlay();
}

function showOverlay() {
	overlay.classList.add("active");
	fillMenu.classList.add("active");
	overlayOn = true;
}

function hideOverlay() {
	overlay.classList.remove("active");
	fillMenu.classList.remove("active");
	overlayOn = false;
}

function setMenuFill() {
	let sliderValue = parseInt(slider.value);
	mlAsPercent = (sliderValue / 100) * bottleState.totalWater;
	offsetPercent = 100 - ((sliderValue / 100) * 85); // maps to 100–15
	console.log(offsetPercent);

	setWaterLevel(offsetPercent, mlAsPercent);
	toggleOverlay();
}